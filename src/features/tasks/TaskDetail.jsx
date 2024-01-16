import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import { useUpdateTask } from '../../hooks/useUpdateTask';
import { useTask } from '../../hooks/useTask';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useDeleteTask } from '../../hooks/useDeleteTask';
import { usePoints } from '../../hooks/usePoints';

import { TASK_FINISH_POINT } from '../../utils/constants';
import { formatDate, formatDaysLeft } from '../../utils/helpers';

import Heading from '../../ui/Heading';
import Loader from '../../ui/Loader';
import ButtonText from '../../ui/ButtonText';
import PriorityBadge from '../../ui/PriorityBadge';
import Button from '../../ui/Button';
import ConfirmDelete from '../../ui/ConfirmDelete';
import StatusBadge from '../../ui/StatusBadge';
import Select from '../../ui/Select';
import PageContainer from '../../ui/PageContainer';
import ConfirmComplete from '../../ui/ConfirmComplete';

const HeadingWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Emoji = styled.div`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-big);
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-100);
  transition: background-color var(--transition);
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  & > div:nth-child(2) {
    margin: unset;
  }
`;

const Title = styled.h2`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-extrabold);
  transition: color var(--transition);
`;

const Description = styled.div`
  padding: 24px;
  border-radius: var(--round-md);
  background-color: var(--color-primary-50);
  transition: background-color var(--transition);

  p {
    line-height: 1.6;
    transition: color var(--transition);
  }
`;

const InfoSection = styled.section`
  display: flex;
  align-items: flex-start;
  gap: 32px;

  & div:nth-child(3) {
    margin-left: auto;
  }

  & select {
    font-size: var(--font-size-sm);
  }
`;

const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  & p {
    color: var(--color-gray-400);
    font-size: var(--font-size-smaller);
    font-weight: var(--font-weight-extrabold);
    text-transform: uppercase;
    transition: color var(--transition);
  }

  & span {
    padding: 8px 0;
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    transition: color var(--transition);
  }
`;

const Finish = styled.div`
  margin-top: -24px;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-50);
  transition: color var(--transition), background-color var(--transition);
`;

const ButtonFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 42px;

  & > div:nth-child(2) {
    display: flex;
    align-items: center;
    gap: 6px;
  }
`;

const CheckboxLayout = styled.div`
  display: flex;
  gap: 12px;
  padding: 16px;

  & input[type='checkbox'] {
    height: 18px;
    width: 18px;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-primary-500);
    cursor: pointer;
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-primary-500);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 8px;
    transition: color var(--transition);
    cursor: pointer;
  }
`;

function TaskDetail() {
  const moveBack = useMoveBack();
  const statusArr = ['Not started', 'In progress', 'Complete'];

  const { points } = usePoints();
  const { task, isLoading } = useTask();
  const { deleteTask, isLoading: isDeleting } = useDeleteTask();
  const { updateTask, isLoading: isUpdating } = useUpdateTask();
  const { register, handleSubmit, reset } = useForm();

  const [curPoints, setCurPoints] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [priorityOp, setPriorityOp] = useState(false);
  const [statusOp, setStatusOp] = useState('');

  useEffect(
    function () {
      if (!isLoading) {
        setPriorityOp(task?.at(0)?.priority);
        setCurPoints(points?.at(0)?.points);
      }
    },
    [task, isLoading, points]
  );

  if (isLoading) return <Loader />;

  const [
    {
      user_id,
      task_id,
      emoji,
      title,
      status,
      due_date,
      priority,
      description,
      is_finished,
    },
  ] = task;

  function onSubmit(data) {
    const addPoints = formatDaysLeft(due_date, 'count') >= 0;

    const updatedTask = {
      is_finished: data.is_finished,
      priority: data.priority_remove ? false : data.priority_set ? true : false,
      task_id,
      user_id,
      status: statusOp === '' ? status : statusOp,
      points: data.is_finished
        ? addPoints
          ? curPoints + TASK_FINISH_POINT
          : curPoints
        : curPoints,
    };

    updateTask(updatedTask);
    setStatusOp('');
    reset();
  }

  function onChange(e) {
    if (e.target.value === 'Complete') setShowConfirm(true);
    else handleUpdate(e.target.value);
  }

  function handleUpdate(value) {
    const updatedTask = {
      task_id,
      user_id,
      status: value === '' ? status : value,
      is_finished: value === 'Complete' ? true : false,
    };

    updateTask(updatedTask);
    setStatusOp('');
  }

  function handleDelete(taskId) {
    deleteTask(taskId);
  }

  return (
    <PageContainer>
      <HeadingWrapper>
        <Heading as="h1">Task information</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </HeadingWrapper>
      <div>
        <DetailContainer>
          <HeaderWrapper>
            <Emoji>{emoji}</Emoji>
            {priority && <PriorityBadge priority={priority} />}
          </HeaderWrapper>
          <Title>{title}</Title>
          <InfoSection>
            <InfoWrapper>
              <p>Due date</p>
              <span>{due_date ? formatDate(due_date) : 'No due date'}</span>
            </InfoWrapper>
            <InfoWrapper>
              <p>Status</p>
              {is_finished ? (
                <StatusBadge status="finished" position="detail" />
              ) : (
                <StatusBadge status={status} position="detail" />
              )}
            </InfoWrapper>
            {!is_finished && (
              <div>
                <Select value={statusOp} onChange={e => onChange(e)}>
                  <option value="">-- Pick new status --</option>
                  {statusArr.map(
                    option =>
                      option !== status && (
                        <option value={option} key={option}>
                          {option}
                        </option>
                      )
                  )}
                </Select>
              </div>
            )}
          </InfoSection>
          <div>
            {description && (
              <Description>
                <p>{description}</p>
              </Description>
            )}
          </div>
          <Form onSubmit={handleSubmit(onSubmit)}>
            {!is_finished && (
              <CheckboxLayout>
                {priority ? (
                  <>
                    <input
                      type="checkbox"
                      id="priority_remove"
                      name="priority_remove"
                      {...register('priority_remove')}
                      disabled={isDeleting || isUpdating}
                    />
                    <label htmlFor="priority_remove">
                      우선순위에서 제외하기
                    </label>
                  </>
                ) : (
                  <>
                    <input
                      type="checkbox"
                      id="priority_set"
                      name="priority_set"
                      {...register('priority_set')}
                      disabled={isDeleting || isUpdating}
                    />
                    <label htmlFor="priority_set">우선순위로 설정하기</label>
                  </>
                )}
              </CheckboxLayout>
            )}
            <ButtonFooter>
              <div>
                <Button
                  type="danger"
                  disabled={isDeleting || isUpdating}
                  onClick={e => {
                    e.preventDefault();
                    setShowModal(show => !show);
                  }}
                >
                  삭제
                </Button>
              </div>
              {!is_finished && (
                <div>
                  <Button type="linear" disabled={isDeleting || isUpdating}>
                    <Link to={`/tasks/${task_id}/edit`}>편집</Link>
                  </Button>
                  <Button type="primary" disabled={isDeleting || isUpdating}>
                    확인
                  </Button>
                </div>
              )}
            </ButtonFooter>
          </Form>
          {showModal && (
            <ConfirmDelete
              content="할 일을"
              onDelete={() => handleDelete(task_id)}
              onCloseModal={() => setShowModal(false)}
            />
          )}
          {showConfirm && (
            <ConfirmComplete
              content="할 일을"
              onComplete={() => {
                handleUpdate('Complete');
                setShowConfirm(false);
              }}
              onCloseModal={() => setShowConfirm(false)}
            />
          )}
        </DetailContainer>
      </div>
    </PageContainer>
  );
}

export default TaskDetail;

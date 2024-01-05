import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import { useCreateProjectTask } from '../../hooks/useCreateProjectTask';
import { useProject } from '../../hooks/useProject';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useDeleteProject } from '../../hooks/useDeleteProject';
import { useUpdateProject } from '../../hooks/useUpdateProject';
import { formatDate, formatDaysLeft, randomID } from '../../utils/helpers';
import { HiOutlineCalendarDays, HiMiniCheckCircle } from 'react-icons/hi2';
import { LuCircle } from 'react-icons/lu';

import Loader from '../../ui/Loader';
import Heading from '../../ui/Heading';
import PageLayout from '../../ui/PageLayout';
import ProjectTaskList from './ProjectTaskList';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import FormRow from '../../ui/FormRow';
import ConfirmDelete from '../../ui/ConfirmDelete';
import PageContainer from '../../ui/PageContainer';
import ConfirmComplete from '../../ui/ConfirmComplete';
import StatusBadge from '../../ui/StatusBadge';
import { usePoints } from '../../hooks/usePoints';
import { PROJECT_FINISH_POINT } from '../../utils/constants';

const HeadingWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 48px;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

const TitleWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const Emoji = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-big);
  border-radius: 50%;
  background-color: var(--color-pale-purple-100);
  transition: background-color var(--transition);
`;

const Title = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  transition: color var(--transition);

  & > h2 {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-extrabold);
  }

  & > span {
    display: flex;
    align-items: center;
    gap: 24px;
    color: var(--color-gray-500);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);

    & > span {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    & > div {
      margin: unset;
    }
  }
`;

const DueDate = styled.span`
  min-width: 72px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-50);
  transition: background-color var(--transition);
`;

const ProgressWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const ProgressLabel = styled.label`
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: color var(--transition);

  & > span:nth-child(2) {
    font-weight: var(--font-weight-bold);
  }
`;

const Progress = styled.progress`
  width: 100%;
  height: 6px;
  border-radius: 1000px;
  appearance: none;

  &::-webkit-progress-bar {
    border-radius: 1000px;
    background-color: var(--color-pale-purple-100);
    transition: background-color var(--transition);
  }

  &::-webkit-progress-value {
    border-radius: 1000px;
    background-color: var(--color-primary-500);
    transition: background-color var(--transition);
  }
`;

const ButtonTextCustom = styled.button`
  align-self: flex-start;
  padding: 12px;
  color: var(--color-primary-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  border-radius: var(--round-sm);
  transition: color var(--transition), background-color var(--transition);

  &:hover {
    color: var(--color-primary-600);
    background-color: var(--color-pale-purple-50);
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 12px;

  & > div {
    display: flex;
    align-items: center;
    gap: 6px;
  }

  & p {
    margin-right: auto;
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  display: block;
  padding: 16px;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-100);
  transition: color var(--transition), background-color var(--transition);
`;

const Footer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 6px;

  & button:nth-child(2) {
    margin-left: auto;
  }

  &:not(:has(button[type='linear'])) button:last-child {
    margin-left: auto;
  }
`;

const ButtonConfirm = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  font-weight: var(--font-weight-semibold);
  border-radius: var(--round-sm);
  background-color: var(--color-primary-50);
`;

const CompleteText = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 16px 12px;
  font-weight: var(--font-weight-semibold);
  border-radius: var(--round-sm);
  background-color: var(--color-primary-50);
  transition: background-color var(--transition);
  cursor: not-allowed;

  & > svg {
    color: var(--color-primary-600);
  }

  & > span {
    opacity: 0.75;
    transition: color var(--transition), opacity var(--transition);
  }
`;

function ProjectDetail() {
  const moveBack = useMoveBack();

  const [showForm, setShowForm] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  const [isFinishedCheck, setIsFinishedCheck] = useState(false);
  const [curPoints, setCurPoints] = useState(0);

  const { project, isLoading } = useProject();
  const { points, isLoading: isLoadingPoints } = usePoints();
  const { deleteProject, isLoading: isDeleting } = useDeleteProject();
  const { updateProject, isLoading: isUpdating } = useUpdateProject();
  const { createProjectTask, isLoading: isCreating } = useCreateProjectTask();

  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  useEffect(
    function () {
      if (!isLoadingPoints) {
        setCurPoints(points?.at(0)?.points);
      }
    },
    [isLoadingPoints, points]
  );

  if (isLoading) return <Loader />;

  const [{ emoji, due_date, name, tasks, project_id, is_finished }] = project;

  let completeTasks, completePercentage;

  if (tasks?.length) {
    completeTasks = tasks?.filter(task => task.complete);
    completePercentage = Math.round(
      (completeTasks.length / tasks.length) * 100
    );
  } else {
    completePercentage = 0;
  }

  function onSubmit({ task }) {
    const newTask = [
      {
        id: randomID(),
        title: task,
        complete: false,
      },
    ];

    createProjectTask(newTask, {
      onSettled: () => setShowForm(false),
    });
    reset();
  }

  function onComplete() {
    const addPoints = Boolean(formatDaysLeft(due_date, 'count'));

    const newProject = {
      is_finished: !is_finished,
      points: !is_finished
        ? addPoints
          ? curPoints + PROJECT_FINISH_POINT
          : curPoints
        : curPoints,
    };

    updateProject(newProject, {
      onSettled: () => setShowComplete(false),
    });
  }

  return (
    <PageLayout>
      <PageContainer>
        <HeadingWrapper>
          <Heading as="h1">Project information</Heading>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </HeadingWrapper>
        <DetailContainer>
          <TitleWrapper>
            <div>
              <Emoji>{emoji}</Emoji>
              <div>
                <Title>
                  <h2>{name}</h2>
                  <span>
                    <span>
                      <HiOutlineCalendarDays /> {formatDate(due_date)}
                    </span>
                    {is_finished && <StatusBadge status="finished" />}
                  </span>
                </Title>
              </div>
            </div>
            <DueDate>{formatDaysLeft(due_date, 'd-day')}</DueDate>
          </TitleWrapper>
          <ProgressWrapper>
            <ProgressLabel>
              {tasks?.length ? (
                <span>
                  {completeTasks.length}/{tasks?.length}
                </span>
              ) : (
                <span></span>
              )}
              <span>{completePercentage}%</span>
            </ProgressLabel>
            <Progress value={completePercentage} max={100}></Progress>
          </ProgressWrapper>
          {tasks?.length > 0 && (
            <ProjectTaskList
              projectId={project_id}
              due_date={due_date}
              is_finished={is_finished}
              tasks={tasks}
            />
          )}
          {showForm && (
            <Form onSubmit={handleSubmit(onSubmit)}>
              <FormRow error={errors?.task?.message}>
                <Textarea
                  id="task"
                  name="task"
                  disabled={isCreating}
                  {...register('task', {
                    required: 'This field is required',
                  })}
                ></Textarea>
              </FormRow>
              <div>
                <Button
                  type="linear"
                  disabled={isCreating}
                  onClick={e => {
                    e.preventDefault();
                    setShowForm(false);
                    reset();
                  }}
                >
                  Cancel
                </Button>
                <Button type="primary" disabled={isCreating}>
                  Add
                </Button>
              </div>
            </Form>
          )}
          {is_finished ? (
            <CompleteText>
              <HiMiniCheckCircle />
              <span>마감된 프로젝트입니다</span>
            </CompleteText>
          ) : (
            <ButtonConfirm
              disabled={is_finished}
              onClick={() => setShowComplete(true)}
            >
              <LuCircle />
              <span>프로젝트 마감하기</span>
            </ButtonConfirm>
          )}
          <Footer>
            {!is_finished && (
              <ButtonTextCustom onClick={() => setShowForm(show => !show)}>
                &#43; 할 일 목록 추가하기
              </ButtonTextCustom>
            )}
            {!is_finished && (
              <Button type="linear">
                <Link to={`/projects/${project_id}/edit`}>편집</Link>
              </Button>
            )}
            <Button
              type="danger"
              onClick={e => {
                e.preventDefault();
                setShowDelete(true);
              }}
            >
              삭제
            </Button>
          </Footer>
          {showDelete && (
            <ConfirmDelete
              content="프로젝트를"
              onDelete={() => deleteProject(project_id)}
              onCloseModal={() => setShowDelete(false)}
            />
          )}
          {showComplete && (
            <ConfirmComplete
              content="프로젝트를"
              onComplete={onComplete}
              onCloseModal={() => setShowComplete(false)}
            />
          )}
        </DetailContainer>
      </PageContainer>
    </PageLayout>
  );
}

export default ProjectDetail;

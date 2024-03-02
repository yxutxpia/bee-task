import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styled from 'styled-components';

import { useMoveBack } from '../../hooks/useMoveBack';
import { randomID } from '../../utils/helpers';
import { HiOutlineTrash } from 'react-icons/hi2';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Picker from 'emoji-picker-react';
import Button from '../../ui/Button';
import { useCreateProject } from '../../hooks/useCreateProject';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const StyledCreateTaskForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const EmojiWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 14px;
  position: relative;
`;

const EmojiBox = styled.div`
  width: 72px;
  height: 72px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-max);
  border-radius: var(--round-sm);
  background-color: var(--color-primary-50);
  transition: background-color var(--transition);
`;

const EmojiButton = styled.button`
  padding: 12px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  border: 1px solid var(--color-gray-100);
  border-radius: var(--round-sm);
  transition: color var(--transition), border-color var(--transition);

  &:hover {
    color: var(--color-primary-600);
  }
`;

const EmojiDeleteButton = styled.button`
  color: var(--color-danger-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);

  &:hover {
    color: var(--color-danger-600);
  }
`;

const EmojiButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
`;

const TaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-50);
  transition: color var(--transition), border-color var(--transition);
`;

const TaskListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    opacity: 0.25;
    transition: opacity var(--transition);

    &:hover {
      opacity: 0.75;
    }
  }
`;

const TaskInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  & input {
    width: 100%;
  }
`;

const ButtonTask = styled.button`
  display: flex;
  align-items: center;
  gap: 16px;
  transition: color var(--transition), border-color var(--transition);

  & span:nth-child(1) {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: var(--color-gray-400);
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    border: var(--border-solid);
    border-radius: 50%;
    transition: color var(--transition), border-color var(--transition);

    &:hover {
      color: var(--color-primary-600);
    }
  }
`;

function CreateProjectForm({ projectToUpdate = [{}] }) {
  const [{ project_id: editId, ...editValues }] = projectToUpdate;
  const isUpdateSession = Boolean(editId);

  const [task, setTask] = useState('');
  const [taskList, setTaskList] = useState(() =>
    isUpdateSession ? editValues.tasks : []
  );

  const [emoji, setEmoji] = useState(() =>
    isUpdateSession ? editValues.emoji : ''
  );
  const [showPicker, setShowPicker] = useState(false);
  const [showTaskInput, setShowTaskInput] = useState(false);

  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { createProject, isLoading: isSubmitting } = useCreateProject();
  const { register, handleSubmit, formState, reset } = useForm({
    defaultValues: isUpdateSession ? editValues : {},
  });
  const { errors } = formState;

  const moveBack = useMoveBack();

  function onEmojiClick({ emoji }) {
    if (emoji.length > 1) setEmoji(emoji => emoji.slice(-1));

    setEmoji(emoji);
    setShowPicker(false);
  }

  function handleDeleteEmoji() {
    setEmoji('');
  }

  function onSubmit({ name, due_date }) {
    const newProject = {
      id: user?.at(0)?.id,
      user_id: user?.at(0)?.user_id,
      project_id: randomID(),
      name,
      due_date,
      emoji,
      tasks: taskList,
    };

    createProject(newProject, {
      onSettled: moveBack,
    });

    setEmoji('');
    reset();
  }

  function handleAddTask(e) {
    e.preventDefault();
    setShowTaskInput(true);
  }

  function handleSubmitTask(e) {
    e.preventDefault();

    if (!task) {
      setShowTaskInput(false);
      return;
    }

    setTaskList(curTask => [
      ...curTask,
      { id: randomID(), title: task, complete: false },
    ]);

    setShowTaskInput(false);
    setTask('');
  }

  function handleDeleteTask(e, id) {
    e.preventDefault();
    setTaskList(curTasks => curTasks.filter(curTask => curTask.id !== id));
  }

  if (isLoadingUser) return null;

  return (
    <StyledCreateTaskForm onSubmit={handleSubmit(onSubmit)}>
      <EmojiWrapper>
        <EmojiBox>{emoji}</EmojiBox>
        <EmojiButtonWrapper>
          <EmojiButton
            onClick={e => {
              e.preventDefault();
              setShowPicker(show => !show);
            }}
          >
            이모지 선택하기
          </EmojiButton>
          {emoji && (
            <EmojiDeleteButton onClick={handleDeleteEmoji}>
              삭제하기
            </EmojiDeleteButton>
          )}
        </EmojiButtonWrapper>
        {showPicker && (
          <Picker pickerStyle={{ width: '80%' }} onEmojiClick={onEmojiClick} />
        )}
      </EmojiWrapper>

      <FormRow label="프로젝트 이름" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          name="name"
          autoComplete="off"
          disabled={isSubmitting}
          {...register('name', {
            required: '항목을 입력해주세요',
          })}
        />
      </FormRow>

      <FormRow label="마감일" error={errors?.due_date?.message}>
        <Input
          type="date"
          id="due_date"
          name="due_date"
          disabled={isSubmitting}
          {...register('due_date', {
            required: '항목을 입력해주세요',
          })}
        />
      </FormRow>

      {taskList.length > 0 && (
        <TaskList>
          {taskList.map(
            (task, i) =>
              task.title && (
                <TaskListItem key={i}>
                  <span>{task.title}</span>
                  <button onClick={e => handleDeleteTask(e, task.id)}>
                    <HiOutlineTrash />
                  </button>
                </TaskListItem>
              )
          )}
        </TaskList>
      )}

      <TaskInputWrapper>
        {!showTaskInput && (
          <ButtonTask onClick={e => handleAddTask(e)}>
            <span>+</span>
            <span>할 일 추가하기</span>
          </ButtonTask>
        )}
        {showTaskInput && (
          <>
            <ButtonTask onClick={e => handleSubmitTask(e)}>
              <span>✓</span>
            </ButtonTask>
            <Input
              type="text"
              id="task"
              name="task"
              value={task}
              onChange={e => setTask(e.target.value)}
            />
          </>
        )}
      </TaskInputWrapper>
      <ButtonWrapper>
        <Button
          type="linear"
          onClick={e => {
            e.preventDefault();
            moveBack();
          }}
          disabled={isSubmitting}
        >
          취소하기
        </Button>
        <Button type="primary" disabled={isSubmitting}>
          {isUpdateSession ? '편집하기' : '추가하기'}
        </Button>
      </ButtonWrapper>
    </StyledCreateTaskForm>
  );
}

export default CreateProjectForm;

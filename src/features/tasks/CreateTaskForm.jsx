import { useState } from 'react';
import { useForm } from 'react-hook-form';

import styled, { css } from 'styled-components';

import { useMoveBack } from '../../hooks/useMoveBack';
import { useCreateTask } from '../../hooks/useCreateTask';
import { useUser } from '../../hooks/useUser';
import { useUpdateTask } from '../../hooks/useUpdateTask';
import { randomID } from '../../utils/helpers';

import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Picker from 'emoji-picker-react';
import Button from '../../ui/Button';
import Checkbox from '../../ui/Checkbox';
import Select from '../../ui/Select';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { BsFillCheckSquareFill, BsSquare } from 'react-icons/bs';

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

const Textarea = styled.textarea`
  line-height: 1.6;
  background-color: var(--color-pale-purple-50);
  transition: background-color var(--transition);
`;

const StyledPriorityOp = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;

  & > span > svg {
    width: 16px;
    height: 16px;
  }

  ${props =>
    props.priority &&
    css`
      & > span > svg {
        color: var(--color-primary-500);
      }
    `}
`;

function CreateTaskForm({ taskToUpdate = [{}] }) {
  const [{ task_id: editId, ...editValues }] = taskToUpdate;
  const isUpdateSession = Boolean(editId);

  const [emoji, setEmoji] = useState(() =>
    isUpdateSession ? editValues.emoji : ''
  );
  const [showPicker, setShowPicker] = useState(false);
  const [priorityOp, setPriorityOp] = useState(() =>
    isUpdateSession ? editValues.priority : false
  );

  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { updateTask, isLoading: isUpdating } = useUpdateTask();
  const { createTask, isLoading: isSubmitting } = useCreateTask();
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

  function handleDelete() {
    setEmoji('');
  }

  function onSubmit({ title, description, due_date, status }) {
    const newTask = {
      id: user?.at(0)?.id,
      user_id: user?.at(0)?.user_id,
      task_id: isUpdateSession ? editId : randomID(),
      title,
      status,
      due_date: due_date ? due_date : null,
      description,
      priority: priorityOp,
      emoji,
    };

    console.log(newTask);

    if (isUpdateSession) {
      updateTask(newTask, {
        onSettled: moveBack,
      });
    } else {
      createTask(newTask, {
        onSettled: moveBack,
      });
    }

    setPriorityOp(false);
    setEmoji('');
    reset();
  }

  function handlePriority() {
    setPriorityOp(priority => !priority);
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
            <EmojiDeleteButton onClick={handleDelete}>
              삭제하기
            </EmojiDeleteButton>
          )}
        </EmojiButtonWrapper>
        {showPicker && (
          <Picker pickerStyle={{ width: '80%' }} onEmojiClick={onEmojiClick} />
        )}
      </EmojiWrapper>

      <FormRow label="제목" error={errors?.title?.message}>
        <Input
          type="text"
          id="title"
          name="title"
          autoComplete="off"
          disabled={isSubmitting || isUpdating}
          {...register('title', {
            required: '항목을 입력해주세요',
          })}
        />
      </FormRow>

      <FormRow label="마감일" error={errors?.due_date?.message}>
        <Input
          type="date"
          id="due_date"
          name="due_date"
          disabled={isSubmitting || isUpdating}
          {...register('due_date')}
        />
      </FormRow>

      <FormRow label="상태" error={errors?.status?.message}>
        <Select
          id="status"
          name="status"
          disabled={isSubmitting || isUpdating}
          {...register('status', {
            required: '항목을 선택해주세요',
          })}
        >
          <option value="">-- Pick task status --</option>
          <option value="Not started">Not started</option>
          <option value="In progress">In progress</option>
        </Select>
      </FormRow>
      <FormRow label="메모">
        <Textarea
          rows={6}
          id="description"
          name="description"
          {...register('description')}
        ></Textarea>
      </FormRow>
      <StyledPriorityOp
        checked={priorityOp}
        priority={priorityOp}
        onClick={handlePriority}
      >
        <span>{priorityOp ? <BsFillCheckSquareFill /> : <BsSquare />}</span>
        <p>우선순위로 설정하기</p>
      </StyledPriorityOp>
      <ButtonWrapper>
        <Button
          type="linear"
          onClick={e => {
            e.preventDefault();
            moveBack();
          }}
          disabled={isSubmitting || isUpdating}
        >
          취소하기
        </Button>
        <Button type="primary" disabled={isSubmitting || isUpdating}>
          {isUpdateSession ? '편집하기' : '추가하기'}
        </Button>
      </ButtonWrapper>
    </StyledCreateTaskForm>
  );
}

export default CreateTaskForm;

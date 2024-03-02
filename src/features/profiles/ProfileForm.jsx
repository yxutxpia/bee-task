import styled from 'styled-components';
import Button from '../../ui/Button';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import { useState } from 'react';
import { randomID } from '../../utils/helpers';
import { useUpdateMessage } from '../../hooks/useUpdateMessage';

const StyledProfileForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);

  /* &:hover {
    background-color: var(--color-gray-0);
  } */

  & > button {
    align-self: flex-end;
  }
`;

const Label = styled.label`
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
`;

const Textarea = styled.textarea`
  width: 100%;
  height: 120px;
  display: block;
  padding: 16px;
  line-height: 1.6;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-50);
  transition: background-color var(--transition);
`;

function ProfileForm() {
  const [message, setMessage] = useState('');
  const { user, isLoading } = useCurrentUser();
  const { updateMessage, isLoading: isUpdating } = useUpdateMessage();

  if (isLoading) return null;

  function handleSubmit(e) {
    e.preventDefault();

    if (!message.trim()) return;

    const newMsg = {
      id: randomID(),
      sender: [
        {
          avatar: user?.at(0)?.avatar,
          user_id: user?.at(0)?.user_id,
          username: user?.at(0)?.username,
          verified: user?.at(0)?.verified,
        },
      ],
      date: new Date(),
      message,
    };

    updateMessage(newMsg, {
      onSettled: () => setMessage(''),
    });
  }

  return (
    <StyledProfileForm onSubmit={handleSubmit}>
      <Label htmlFor="message">메시지 작성하기</Label>
      <Textarea
        id="message"
        value={message}
        disabled={isUpdating}
        onChange={e => setMessage(e.target.value)}
      ></Textarea>
      <Button type="primary" disabled={isUpdating}>
        Submit
      </Button>
    </StyledProfileForm>
  );
}

export default ProfileForm;

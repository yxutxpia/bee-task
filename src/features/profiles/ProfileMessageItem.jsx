import styled from 'styled-components';
import { HiCheckBadge } from 'react-icons/hi2';
import { formatMsgDays } from '../../utils/helpers';
import { Link, useParams } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Avatar from '../../ui/Avatar';
import { useDeleteMessage } from '../../hooks/useDeleteMessage';
import { useState } from 'react';
import ConfirmDelete from '../../ui/ConfirmDelete';

const StyledProfileMessageItem = styled.li`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 32px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Username = styled.h4`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 3px;
  transition: color var(--transition);

  & > svg {
    color: var(--color-primary-500);
  }
`;

const Id = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  letter-spacing: 0.25px;
  transition: color var(--transition);
`;

const Date = styled.p`
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
  opacity: 0.5;
`;

const Message = styled.div`
  padding: 16px;
  line-height: 1.6;
  border: var(--border-solid);
  border-radius: var(--round-md);
  transition: color var(--transition), border-color var(--transition);
`;

const ButtonDelete = styled.button`
  align-self: flex-start;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
  opacity: 0.45;
`;

function ProfileMessageItem({ message }) {
  const { userId } = useParams();
  const { user, isLoading } = useCurrentUser();
  const { deleteMessage, isLoading: isDeleting } = useDeleteMessage();
  const [showDelete, setShowDelete] = useState(false);

  if (isLoading) return null;

  const { id, date, message: text, sender } = message;
  const [{ user_id, username, avatar, verified }] = sender;

  function handleDelete() {
    deleteMessage(id);
  }

  return (
    <StyledProfileMessageItem>
      <Header>
        <Profile>
          <Link to={`/profile/${user_id}`}>
            <Avatar size={36} avatar={avatar} />
          </Link>
          <div>
            <Link to={`/profile/${user_id}`}>
              <Username>
                <span>{username}</span>
                {verified && <HiCheckBadge />}
              </Username>
            </Link>
            <Id>@{user_id}</Id>
          </div>
        </Profile>
        <Date>{formatMsgDays(date, 'kor')}</Date>
      </Header>
      <Message>{text}</Message>
      {userId === user?.at(0)?.user_id ||
        (user_id === user?.at(0)?.user_id && (
          <ButtonDelete onClick={() => setShowDelete(true)}>
            삭제하기
          </ButtonDelete>
        ))}
      {showDelete && (
        <ConfirmDelete
          content="메시지를"
          onDelete={handleDelete}
          onCloseModal={() => setShowDelete(false)}
        />
      )}
    </StyledProfileMessageItem>
  );
}

export default ProfileMessageItem;

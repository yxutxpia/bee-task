import styled from 'styled-components';
import { useMessages } from '../../hooks/useMessages';
import Loader from '../../ui/Loader';
import ProfileMessageItem from './ProfileMessageItem';
import { useParams } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const StyledProfileMessageList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

function ProfileMessageList() {
  let filteredMsg;

  const { userId } = useParams();
  const { user, isLoading: isLoadingUser } = useCurrentUser();
  const { messages, isLoading } = useMessages();

  if (isLoading || isLoadingUser) return <Loader />;

  const user_id = user?.at(0)?.user_id;

  if (userId === user_id) filteredMsg = messages;
  else
    filteredMsg = messages.filter(msg => {
      const senderId = msg.sender.at(0).user_id;
      return user_id === senderId;
    });

  return (
    <StyledProfileMessageList>
      {filteredMsg.map(msg => (
        <ProfileMessageItem key={msg.id} message={msg} />
      ))}
    </StyledProfileMessageList>
  );
}

export default ProfileMessageList;

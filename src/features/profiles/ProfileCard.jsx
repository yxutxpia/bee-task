import styled from 'styled-components';
import { useProfileById } from '../../hooks/useProfileById';
import Loader from '../../ui/Loader';
import { DEFAULT_AVATAR } from '../../utils/constants';
import { HiCheckBadge } from 'react-icons/hi2';
import Avatar from '../../ui/Avatar';

const StyledProfileCard = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  position: relative;

  &::before {
    content: '';
    width: 72px;
    height: 4px;
    position: absolute;
    top: -32px;
    left: 0;
    background-color: var(--color-primary-500);
    transition: background-color var(--transition);
  }
`;

const Username = styled.h2`
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-extrabold);
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

const Points = styled.div`
  min-width: 54px;
  height: 54px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 3px;
  padding: 0 12px;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-100);
  transition: color var(--transition), background-color var(--transition);

  & > span:nth-child(1) {
    color: var(--color-gray-500);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-extrabold);
  }

  & > span:nth-child(2) {
    font-size: var(--font-size-big);
    font-weight: var(--font-weight-extrabold);
  }
`;

function ProfileCard() {
  const { profileById, isLoading } = useProfileById();

  if (isLoading) return <Loader />;

  const [{ avatar, username, user_id, points, verified }] = profileById;

  return (
    <StyledProfileCard>
      <Profile>
        <Avatar size={72} avatar={avatar} />
        <div>
          <Username>
            <span>{username}</span>
            {verified && <HiCheckBadge />}
          </Username>
          <Id>@{user_id}</Id>
        </div>
      </Profile>
      <Points>
        <span>Points</span>
        <span>{points}</span>
      </Points>
    </StyledProfileCard>
  );
}

export default ProfileCard;

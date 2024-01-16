import styled from 'styled-components';
import { useProfileById } from '../../hooks/useProfileById';
import Loader from '../../ui/Loader';
import { HiCheckBadge } from 'react-icons/hi2';
import Avatar from '../../ui/Avatar';

const StyledProfileCard = styled.div`
  display: flex;
  flex-direction: column;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

const Background = styled.div`
  width: 100%;
  aspect-ratio: 4 / 1;
  border-radius: var(--round-md);
  background-color: var(--color-primary-50);
  transition: background-color var(--transition);
`;

const BackgroundImg = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`;

const Profile = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-top: -40px;
  margin-left: 24px;

  & > div {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-top: -24px;
    margin-left: 8px;
  }

  & > img {
    border: 8px solid var(--color-gray-0);
    transition: border-color var(--transition);
  }
`;

const Username = styled.h2`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 3px;
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

  const [{ avatar, username, user_id, points, verified, background_img }] =
    profileById;

  return (
    <StyledProfileCard>
      <Background>
        {background_img && <BackgroundImg src={background_img} />}
      </Background>
      <Profile>
        <Avatar size={80} avatar={avatar} />
        <div>
          <div>
            <Username>
              <span>{username}</span>
              {verified && <HiCheckBadge />}
            </Username>
            <Id>@{user_id}</Id>
          </div>
          <Points>
            <span>Points</span>
            <span>{points}</span>
          </Points>
        </div>
      </Profile>
    </StyledProfileCard>
  );
}

export default ProfileCard;

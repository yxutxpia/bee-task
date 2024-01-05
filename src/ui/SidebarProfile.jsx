import styled from 'styled-components';
import { useProfile } from '../hooks/useProfile';
import { HiCheckBadge, HiOutlineCog6Tooth } from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import { DEFAULT_AVATAR } from '../utils/constants';
import { useCurrentUser } from '../hooks/useCurrentUser';

const StyledSidebarProfile = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;

  & > div {
    display: flex;
    align-items: center;
    gap: 12px;
  }
`;

const Img = styled.img`
  width: 48px;
  height: 48px;
  display: block;
  object-fit: cover;
  border-radius: 50%;
`;

const Username = styled.h2`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-bottom: 3px;
  font-size: var(--font-size-regular);
  transition: color var(--transition);

  & > svg {
    color: var(--color-primary-500);
  }
`;

const UserId = styled.p`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  transition: color var(--transition);
`;

const StyledLink = styled(Link)`
  & > svg {
    width: 18px;
    height: 18px;
    transition: color var(--transition), opacity var(--transition);
    opacity: 0.5;

    &:hover {
      opacity: 0.8;
    }
  }
`;

function SidebarProfile() {
  const { user, isLoading } = useCurrentUser();

  if (isLoading) return null;

  const [{ avatar, username, user_id, verified }] = user;

  return (
    <StyledSidebarProfile>
      <div>
        <Img
          src={avatar ? avatar : DEFAULT_AVATAR}
          alt={`${username} avatar`}
        />
        <div>
          <Username>
            <span>{username}</span>
            {verified && <HiCheckBadge />}
          </Username>
          <UserId>@{user_id}</UserId>
        </div>
      </div>
      <StyledLink to="/setting">
        <HiOutlineCog6Tooth />
      </StyledLink>
    </StyledSidebarProfile>
  );
}

export default SidebarProfile;

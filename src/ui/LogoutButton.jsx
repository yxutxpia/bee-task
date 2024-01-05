import styled from 'styled-components';
import { useLogout } from '../hooks/useLogout';
import { HiMiniArrowRightOnRectangle } from 'react-icons/hi2';

const StyledLogoutButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 10px 16px;
  font-weight: var(--font-weight-bold);
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-primary-500);
  }

  span {
    transition: color var(--transition);
  }

  &:hover,
  &:hover svg {
    color: var(--color-primary-text);
  }
`;

function LogoutButton() {
  const { logout } = useLogout();

  return (
    <StyledLogoutButton onClick={logout}>
      <HiMiniArrowRightOnRectangle />
      <span>Logout</span>
    </StyledLogoutButton>
  );
}

export default LogoutButton;

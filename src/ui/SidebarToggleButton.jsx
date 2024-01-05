import { HiBars3 } from 'react-icons/hi2';
import styled from 'styled-components';
import { useSidebarToggle } from '../context/SidebarToggleContext';

const StyledSidebarToggleButton = styled.button`
  width: 34px;
  height: 34px;
  display: none;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: var(--color-gray-0);
  transition: background-color vaR(--transition);

  &:hover svg {
    color: var(--color-primary-500);
  }

  @media only screen and (max-width: 1035px) {
    display: flex;
  }
`;

function SidebarToggleButton() {
  const { active, dispatch } = useSidebarToggle();

  return (
    <StyledSidebarToggleButton
      onClick={() => dispatch({ type: 'sidebar/toggle', payload: !active })}
    >
      <HiBars3 />
    </StyledSidebarToggleButton>
  );
}

export default SidebarToggleButton;

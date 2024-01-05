import styled, { css } from 'styled-components';
import Nav from './Nav';
import SidebarProfile from './SidebarProfile';
import LogoText from './LogoText';
import { useSidebarToggle } from '../context/SidebarToggleContext';

const StyledSidebar = styled.aside`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 38px;
  z-index: 100;

  & > a {
    display: none;
  }

  @media only screen and (max-width: 1035px) {
    width: 280px;
    height: 100dvh;
    justify-content: unset;
    gap: 48px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-pale-purple-200);
    transform: translateX(-101%);
    transition: background-color var(--transition), transform var(--transition);
    overflow-y: scroll;

    & > a {
      display: block;
    }

    ${props =>
      props.active &&
      css`
        transform: translateX(0);
      `}
  }
`;

const Overlay = styled.div`
  @media only screen and (max-width: 1035px) {
    width: 100dvw;
    height: 100dvh;
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    background-color: var(--color-modal-bg);
    z-index: 100;

    ${props =>
      props.active &&
      css`
        display: block;
      `}
  }
`;

function Sidebar() {
  const { active, dispatch } = useSidebarToggle();

  return (
    <Overlay
      active={active}
      onClick={() => dispatch({ type: 'sidebar/toggle', payload: !active })}
    >
      <StyledSidebar
        active={active}
        onClick={e => {
          // e.stopPropagation();
        }}
      >
        <LogoText />
        <Nav />
        <SidebarProfile />
      </StyledSidebar>
    </Overlay>
  );
}

export default Sidebar;

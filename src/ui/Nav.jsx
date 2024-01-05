import {
  HiOutlineCalendarDays,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineHome,
  HiOutlinePencilSquare,
  HiOutlineUser,
} from 'react-icons/hi2';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledNav = styled.nav``;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 14px 16px;
  border-radius: 1000px;
  transition: background-color var(--transition);

  &:link,
  &:visited {
    color: var(--color-slate-400);
    font-size: var(--font-size-lg);
    font-weight: 500;
  }

  &:link span,
  &:visited span {
    transition: color var(--transition);
  }

  &.active:link,
  &.active:visited {
    color: var(--color-font);
  }

  &:hover,
  &:active {
    background-color: var(--color-pale-purple-100);
  }
`;

function Nav() {
  return (
    <StyledNav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard">
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/projects">
            <HiOutlineCalendarDays />
            <span>Projects</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/tasks">
            <HiOutlinePencilSquare />
            <span>Tasks</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/profile">
            <HiOutlineUser />
            <span>Profile</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/feedback">
            <HiOutlineChatBubbleBottomCenterText />
            <span>Feedback</span>
          </StyledNavLink>
        </li>
      </NavList>
    </StyledNav>
  );
}

export default Nav;

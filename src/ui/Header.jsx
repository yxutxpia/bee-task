import { Link } from 'react-router-dom';
import styled from 'styled-components';
import LogoutButton from './LogoutButton';
import DarkModeButton from './DarkModeButton';
import LogoText from './LogoText';
import SidebarToggleButton from './SidebarToggleButton';
import Search from './Search';
import SearchToggleButton from './SearchToggleButton';
import SearchResponsive from './SearchResponsive';
import { useSearchToggle } from '../context/SearchToggleContext';

const StyledHeader = styled.header`
  height: 90px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-column: 1 / -1;
  padding-left: 38px;

  & > div {
    display: flex;
    align-items: center;
    gap: 18px;
  }

  & > div:nth-child(1) {
    gap: 56px;
  }

  @media only screen and (max-width: 1035px) {
    padding-left: 0;

    & > div {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    & > div:nth-child(1) {
      gap: 18px;
    }
  }
`;

function Header() {
  const { active } = useSearchToggle();

  return (
    <>
      {active && <SearchResponsive />}
      <StyledHeader>
        <div>
          <LogoText />
          <Search />
          <SearchToggleButton />
        </div>
        <div>
          <SidebarToggleButton />
          <DarkModeButton />
          <LogoutButton />
        </div>
      </StyledHeader>
    </>
  );
}

export default Header;

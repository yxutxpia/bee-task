import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledLogoLink = styled(Link)`
  &:link,
  &:visited {
    font-size: var(--font-size-big);
    font-weight: 800;
    transition: color var(--transition);
  }

  span {
    color: var(--color-primary-500);
    transition: color var(--transition);
  }
`;

function LogoText() {
  return (
    <StyledLogoLink to="/dashboard">
      <span>B</span>eeTask
    </StyledLogoLink>
  );
}

export default LogoText;

import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledButtonAddNew = styled.div`
  & button:nth-child(2) a:link,
  & button:nth-child(2) a:visited {
    width: 32px;
    height: 32px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: var(--font-size-lg);
  }

  & button:nth-child(2) {
    display: none;
  }

  @media only screen and (max-width: 640px) {
    & button:nth-child(1) {
      display: ${props => (props.shortened ? 'none' : 'flex')};
    }

    & button:nth-child(2) {
      display: block;
    }
  }
`;

const StyledLink = styled(Link)`
  &:link,
  &:visited {
    padding: 12px 16px;
    color: var(--color-primary-text);
    font-size: var(--font-size-sm);
    font-weight: var(--font-weight-bold);
    border-radius: var(--round-sm);
    background-color: var(--color-primary-500);
    transition: color var(--transition), background-color var(--transition);

    &:hover,
    &:active {
      background-color: var(--color-primary-600);
    }
  }
`;

function ButtonAddNew({ to, subject, shortened = true }) {
  return (
    <StyledButtonAddNew shortened={shortened}>
      <button>
        <StyledLink to={to}>{subject} 추가하기</StyledLink>
      </button>
      {shortened && (
        <button>
          <StyledLink to={to}>+</StyledLink>
        </button>
      )}
    </StyledButtonAddNew>
  );
}

export default ButtonAddNew;

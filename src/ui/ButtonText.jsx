import styled from 'styled-components';

const StyledButtonText = styled.button`
  display: flex;
  align-self: flex-start;
  align-items: center;
  gap: 6px;
  color: var(--color-primary-500);
  font-size: 16px;
  font-weight: 500;
  transition: color var(--transition);

  &:hover {
    color: var(--color-primary-600);
  }
`;

function ButtonText({ children, onClick }) {
  if (onClick)
    return <StyledButtonText onClick={onClick}>{children}</StyledButtonText>;

  return <StyledButtonText>{children}</StyledButtonText>;
}

export default ButtonText;

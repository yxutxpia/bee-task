import styled from 'styled-components';

const StyledFormRow = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Label = styled.label`
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
`;

const Error = styled.p`
  color: var(--color-danger-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
`;

function FormRow({ label, error, children }) {
  return (
    <StyledFormRow>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;

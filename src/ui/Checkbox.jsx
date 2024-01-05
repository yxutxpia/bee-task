import styled from 'styled-components';

const StyledCheckbox = styled.div`
  display: flex;
  gap: 12px;

  & input[type='checkbox'] {
    height: 18px;
    width: 18px;
    outline-offset: 2px;
    transform-origin: 0;
    accent-color: var(--color-primary-500);
    cursor: pointer;
  }

  & input[type='checkbox']:disabled {
    accent-color: var(--color-primary-500);
  }

  & label {
    flex: 1;

    display: flex;
    align-items: center;
    gap: 8px;
    transition: color var(--transition);
    cursor: pointer;
  }
`;

function Checkbox({ checked, onChange, disabled = false, id, children }) {
  return (
    <StyledCheckbox>
      <input
        type="checkbox"
        id={id}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
      <label htmlFor={!disabled ? id : ''}>{children}</label>
    </StyledCheckbox>
  );
}

export default Checkbox;

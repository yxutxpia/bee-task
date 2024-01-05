import styled, { css } from 'styled-components';

const InputDefault = css`
  display: block;
  padding: 12px;
  border: 1px solid var(--color-gray-200);
  border-radius: var(--round-sm);
  transition: color var(--transition), border-color var(--transition);

  &:focus {
    border-color: var(--color-primary-500);
  }
`;

const Input = styled.input`
  width: 320px;
  max-width: 100%;

  ${props => props.type === 'text' && InputDefault}

  ${props => props.type === 'date' && InputDefault}

  ${props => props.type === 'password' && InputDefault}

@media only screen and (max-width: 640px) {
    width: 290px;
    max-width: 100%;
  }
`;

export default Input;

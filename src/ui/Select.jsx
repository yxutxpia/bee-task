import styled from 'styled-components';

const Select = styled.select`
  width: fit-content;
  max-width: 320px;
  color: inherit;
  font: inherit;
  padding: 12px 16px;
  border: 1px solid var(--color-gray-100);
  border-radius: var(--round-sm);
  background-color: transparent;
  transition: color var(--transition), border-color var(--transition);
  cursor: pointer;
  outline: none;
`;

export default Select;

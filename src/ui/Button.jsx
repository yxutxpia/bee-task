import styled, { css } from 'styled-components';

const Button = styled.button`
  &:has(a) a {
    display: inline-block;
    padding: 12px 16px;
  }

  &:not(:has(a)) {
    padding: 12px 16px;
  }

  border-radius: var(--round-sm);

  ${props =>
    props.type === 'primary' &&
    css`
      color: var(--color-primary-text);
      font-weight: var(--font-weight-semibold);
      background-color: var(--color-primary-500);

      &:hover {
        background-color: var(--color-primary-600);
      }
    `}

  ${props =>
    props.type === 'linear' &&
    css`
      border: 1px solid var(--color-gray-100);

      &:hover {
        color: var(--color-primary-600);
      }
    `}

${props =>
    props.type === 'danger' &&
    css`
      color: #fff;
      background-color: var(--color-danger-500);

      &:hover {
        background-color: var(--color-danger-600);
      }
    `}

  transition-property: color, border-color, background-color;
  transition-duration: var(--duration);
  transition-timing-function: easel;
`;

export default Button;

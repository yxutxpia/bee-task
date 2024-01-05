import styled, { css } from 'styled-components';

const Heading = styled.header`
  ${props =>
    props.as === 'h1' &&
    css`
      font-size: var(--font-size-big);
      font-weight: var(--font-weight-extrabold);
    `}

  ${props =>
    props.as === 'h3' &&
    css`
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-extrabold);
    `}

${props =>
    props.as === 'h4' &&
    css`
      font-size: 16px;
      font-weight: var(--font-weight-extrabold);
    `}

  transition: color var(--transition);
`;

export default Heading;

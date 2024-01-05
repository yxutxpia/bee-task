import styled, { css } from 'styled-components';
import Badge from './Badge';

const StyledStatusBadge = styled(Badge)`
  ${props =>
    props.status.toLowerCase() === 'complete' &&
    css`
      color: var(--color-green-600);
      background-color: var(--color-green-100);
    `}

  ${props =>
    props.status.toLowerCase() === 'in progress' &&
    css`
      color: var(--color-blue-600);
      background-color: var(--color-blue-100);
    `}
    
    ${props =>
    props.status.toLowerCase() === 'not started' &&
    css`
      color: var(--color-orange-600);
      background-color: var(--color-orange-100);
    `}
    
    ${props =>
    props.status.toLowerCase() === 'finished' &&
    css`
      color: var(--color-gray-600);
      background-color: var(--color-gray-100);
    `}

    ${props =>
    props.position === 'detail' &&
    css`
      margin-left: -5px;
    `}
`;

function StatusBadge({ status, position }) {
  return (
    <StyledStatusBadge status={status} position={position}>
      {status}
    </StyledStatusBadge>
  );
}

export default StatusBadge;

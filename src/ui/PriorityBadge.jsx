import styled, { css } from 'styled-components';
import Badge from './Badge';

const StyledPriorityBadge = styled(Badge)`
  color: var(--color-red-600);
  background-color: var(--color-red-100);

  ${props =>
    props.priority === false &&
    css`
      padding: 0;
    `}
`;

function PriorityBadge({ priority }) {
  return (
    <StyledPriorityBadge priority={priority}>
      {priority && 'Priority'}
    </StyledPriorityBadge>
  );
}

export default PriorityBadge;

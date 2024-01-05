import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDaysLeft } from '../../utils/helpers';

const StyledLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 12px;

  &:hover p,
  &:active p {
    color: var(--color-primary-600);
  }
`;

const Emoji = styled.div`
  width: 38px;
  height: 38px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-lg);
  border-radius: var(--round-sm);
  background-color: var(--color-primary-100);
  transition: background-color var(--transition);
`;

const DaysLeft = styled.span`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
`;

const Title = styled.p`
  display: -webkit-box;
  font-weight: var(--font-weight-bold);
  text-overflow: ellipsis;
  line-height: 1.4;
  word-break: break-all;
  white-space: pre-wrap;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  transition: color var(--transition);
  overflow: hidden;
`;

function TaskDayCountItem({ task }) {
  const { task_id, emoji, title, due_date } = task;

  return (
    <li>
      <StyledLink to={`/tasks/${task_id}`}>
        <Emoji>{emoji}</Emoji>
        <div>
          <DaysLeft>{formatDaysLeft(due_date, 'd-day')}</DaysLeft>
          <Title>{title}</Title>
        </div>
      </StyledLink>
    </li>
  );
}

export default TaskDayCountItem;

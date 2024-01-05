import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { formatDate } from '../../utils/helpers';
import { HiEllipsisVertical } from 'react-icons/hi2';
import PriorityBadge from '../../ui/PriorityBadge';
import StatusBadge from '../../ui/StatusBadge';

const TaskLink = styled(Link)`
  display: grid;
  grid-template-columns: auto 1fr 0.325fr 0.325fr;
  align-items: center;
  column-gap: 18px;
  padding: 12px 16px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }

  @media only screen and (max-width: 1320px) {
    grid-template-columns: auto 0.8fr 0.325fr 0.325fr;
  }

  @media only screen and (max-width: 1220px) {
    grid-template-columns: auto 0.8fr 0.325fr 0.325fr;
  }

  @media only screen and (max-width: 680px) {
    grid-template-columns: 42px 0.8fr 0.425fr;

    & > div:nth-child(4) {
      display: none;
    }
  }
`;

const Emoji = styled.div`
  width: 42px;
  height: 42px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: var(--font-size-lg);
  border-radius: 50%;
  background-color: var(--color-pale-purple-200);
  transition: background-color var(--transition);
`;

const TitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const Title = styled.h2`
  display: -webkit-box;
  font-size: var(--font-size-regular);
  font-weight: var(--font-weight-bold);
  line-height: 1.4;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: pre-wrap;
  -webkit-box-orient: vertical;
  line-clamp: 1;
  -webkit-line-clamp: 1;
  transition: color var(--transition);
  overflow: hidden;
`;

const DueDate = styled.span`
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  transition: color var(--transition);
`;

function TaskRow({ task }) {
  const { task_id, emoji, title, status, due_date, priority, is_finished } =
    task;

  return (
    <TaskLink to={`/tasks/${task_id}`}>
      <Emoji>{emoji}</Emoji>
      <TitleWrapper>
        <Title>{title}</Title>
        {due_date && <DueDate>{formatDate(due_date)}</DueDate>}
      </TitleWrapper>
      <StatusBadge status={is_finished ? 'finished' : status}>
        {status}
      </StatusBadge>
      <PriorityBadge priority={priority}>
        {priority && 'Priority'}
      </PriorityBadge>
    </TaskLink>
  );
}

export default TaskRow;

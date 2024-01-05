import styled from 'styled-components';
import { useTasks } from '../../hooks/useTasks';
import TaskDayCountItem from './TaskDayCountItem';
import Heading from '../../ui/Heading';
import { HiMiniFire } from 'react-icons/hi2';

const StyledTaskDayCount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }
`;

const HeadingWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    color: var(--color-primary-500);
  }
`;

const List = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

function TaskDayCount() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) return null;

  const tasksWithDate = tasks.filter(task => task.due_date);

  const sortedTasks = tasksWithDate
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 5);

  return (
    <StyledTaskDayCount>
      <HeadingWrapper>
        <Heading as="h4">Task tracker</Heading>
        <HiMiniFire />
      </HeadingWrapper>
      <List>
        {sortedTasks.map(task => (
          <TaskDayCountItem key={task.task_id} task={task} />
        ))}
      </List>
    </StyledTaskDayCount>
  );
}

export default TaskDayCount;

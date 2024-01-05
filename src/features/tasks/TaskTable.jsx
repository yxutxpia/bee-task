import styled from 'styled-components';
import { useTasks } from '../../hooks/useTasks';
import Loader from '../../ui/Loader';
import TaskRow from './TaskRow';
import { useSearchParams } from 'react-router-dom';
import EmptyContent from '../../ui/EmptyContent';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const StyledTaskTable = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

function TaskTable() {
  let filteredTasks;

  const { tasks, isLoading } = useTasks();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status') || 'all';

  if (isLoading) return <Loader />;

  if (filterValue === 'all') filteredTasks = tasks;
  if (filterValue === 'not-started')
    filteredTasks = tasks.filter(
      task => task.status.toLowerCase() === 'not started'
    );
  if (filterValue === 'in-progress')
    filteredTasks = tasks.filter(
      task => task.status.toLowerCase() === 'in progress'
    );
  if (filterValue === 'complete')
    filteredTasks = tasks.filter(
      task => task.status.toLowerCase() === 'complete'
    );
  if (filterValue === 'priority')
    filteredTasks = tasks.filter(task => task.priority);

  return (
    <StyledTaskTable>
      {filteredTasks.map(task => (
        <TaskRow key={task.task_id} task={task} />
      ))}
    </StyledTaskTable>
  );
}

export default TaskTable;

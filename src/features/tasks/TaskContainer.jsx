import styled from 'styled-components';
import ButtonAddNew from '../../ui/ButtonAddNew';
import TaskOperations from './TaskOperations';
import TaskStatus from './TaskStatus';
import TaskTable from './TaskTable';
import Loader from '../../ui/Loader';
import EmptyContent from '../../ui/EmptyContent';

import { useTasks } from '../../hooks/useTasks';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

const StyledTaskContainer = styled.div`
  display: grid;
  grid-template-columns: 6fr 3fr;
  gap: 24px;

  & > div {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  @media only screen and (max-width: 1220px) {
    display: block;
  }
`;

const TaskActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function TaskContainer() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) return <Loader />;

  if (!tasks || !tasks.length)
    return (
      <EmptyContent
        to="/tasks/new"
        subject="할 일"
        icon={<HiOutlineClipboardDocumentList />}
      />
    );

  return (
    <>
      <div>
        <TaskActions>
          <TaskOperations />
          <ButtonAddNew subject="할 일" to="/tasks/new" />
        </TaskActions>
        <TaskTable />
      </div>
    </>
  );
}

export default TaskContainer;

import styled from 'styled-components';
import Heading from '../../ui/Heading';
import PageLayout from '../../ui/PageLayout';
import CreateTaskForm from './CreateTaskForm';
import Loader from '../../ui/Loader';

import { useTask } from '../../hooks/useTask';

const StyledUpdateTask = styled.div`
  width: 60%;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

function UpdateTask() {
  const { task, isLoading } = useTask();

  if (isLoading) return <Loader />;

  return (
    <PageLayout>
      <Heading as="h1">Edit task</Heading>
      <StyledUpdateTask>
        <CreateTaskForm taskToUpdate={task} />
      </StyledUpdateTask>
    </PageLayout>
  );
}

export default UpdateTask;

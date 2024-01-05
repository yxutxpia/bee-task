import styled from 'styled-components';
import PageLayout from '../../ui/PageLayout';
import Heading from '../../ui/Heading';
import CreateTaskForm from './CreateTaskForm';
import PageContainer from '../../ui/PageContainer';

const StyledCreateTask = styled.div`
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

function CreateTask() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Add new task</Heading>
        <StyledCreateTask>
          <CreateTaskForm />
        </StyledCreateTask>
      </PageContainer>
    </PageLayout>
  );
}

export default CreateTask;

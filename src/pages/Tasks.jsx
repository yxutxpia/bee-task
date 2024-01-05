import Heading from '../ui/Heading';
import PageLayout from '../ui/PageLayout';
import TaskContainer from '../features/tasks/TaskContainer';
import PageContainer from '../ui/PageContainer';
import TaskStatus from '../features/tasks/TaskStatus';

function Tasks() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Tasks</Heading>
        <TaskContainer />
        <TaskStatus />
      </PageContainer>
    </PageLayout>
  );
}

export default Tasks;

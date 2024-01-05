import styled from 'styled-components';
import CreateProjectForm from './CreateProjectForm';
import PageLayout from '../../ui/PageLayout';
import Heading from '../../ui/Heading';
import PageContainer from '../../ui/PageContainer';

const StyledCreateProject = styled.div`
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

function CreateProject() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Add new project</Heading>
        <StyledCreateProject>
          <CreateProjectForm />
        </StyledCreateProject>
      </PageContainer>
    </PageLayout>
  );
}

export default CreateProject;

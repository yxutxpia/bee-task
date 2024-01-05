import styled from 'styled-components';
import PageLayout from '../../ui/PageLayout';
import Heading from '../../ui/Heading';
import { useProject } from '../../hooks/useProject';
import Loader from '../../ui/Loader';
import CreateProjectForm from './CreateProjectForm';

const StyledUpdateProject = styled.div`
  width: 60%;
  padding: 32px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0);
  transition: background-color var(--transition);
`;

function UpdateProject() {
  const { project, isLoading } = useProject();

  if (isLoading) return <Loader />;

  return (
    <PageLayout>
      <Heading as="h1">Edit project</Heading>
      <StyledUpdateProject>
        <CreateProjectForm projectToUpdate={project} />
      </StyledUpdateProject>
    </PageLayout>
  );
}

export default UpdateProject;

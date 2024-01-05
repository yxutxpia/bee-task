import Heading from '../ui/Heading';
import PageLayout from '../ui/PageLayout';
import ProjectContainer from '../features/projects/ProjectContainer';
import PageContainer from '../ui/PageContainer';
import ProjectStatus from '../features/projects/ProjectStatus';

function Projects() {
  return (
    <PageLayout>
      <PageContainer>
        <Heading as="h1">Projects</Heading>
        <ProjectContainer />
        <ProjectStatus />
      </PageContainer>
    </PageLayout>
  );
}

export default Projects;

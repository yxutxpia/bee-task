import styled from 'styled-components';
import { useProjects } from '../../hooks/useProjects';
import Loader from '../../ui/Loader';
import ProjectItem from './ProjectItem';
import { useSearchParams } from 'react-router-dom';

const StyledProjectList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;

  @media only screen and (max-width: 690px) {
    grid-template-columns: 1fr;
  }
`;

function ProjectList() {
  let filteredProjects;

  const { projects, isLoading } = useProjects();
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get('status') || 'all';

  if (isLoading) return <Loader />;

  if (filterValue === 'all') filteredProjects = projects;
  if (filterValue === 'not-started')
    filteredProjects = projects.filter(
      project =>
        project.tasks.length ===
          project.tasks.filter(task => !task.complete).length &&
        !project.is_finished
    );
  if (filterValue === 'in-progress')
    filteredProjects = projects.filter(
      project =>
        !project.is_finished &&
        project.tasks.filter(task => task.complete).length
    );
  if (filterValue === 'complete')
    filteredProjects = projects.filter(project => project.is_finished);

  return (
    <StyledProjectList>
      {filteredProjects.map(project => (
        <ProjectItem
          key={project.project_id}
          projectId={project.project_id}
          project={project}
        />
      ))}
    </StyledProjectList>
  );
}

export default ProjectList;

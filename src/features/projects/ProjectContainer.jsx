import styled from 'styled-components';
import ButtonAddNew from '../../ui/ButtonAddNew';
import Loader from '../../ui/Loader';
import EmptyContent from '../../ui/EmptyContent';

import { useProjects } from '../../hooks/useProjects';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';
import ProjectList from './ProjectList';
import ProjectOperations from './ProjectOperations';

const ProjectActions = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & button {
    margin-left: auto;
  }
`;

function ProjectContainer() {
  const { projects, isLoading } = useProjects();

  if (isLoading) return <Loader />;

  if (!projects || !projects.length)
    return (
      <EmptyContent
        to="/projects/new"
        subject="프로젝트"
        icon={<HiOutlineClipboardDocumentList />}
      />
    );

  return (
    <div>
      <ProjectActions>
        <ProjectOperations />
        <ButtonAddNew subject="프로젝트" to="/projects/new" />
      </ProjectActions>
      <ProjectList />
    </div>
  );
}

export default ProjectContainer;

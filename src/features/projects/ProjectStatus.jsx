import styled from 'styled-components';
import ProjectTracker from './ProjectTracker';

const StyledProjectStatus = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media only screen and (max-width: 1035px) {
    display: none;
  }
`;

function ProjectStatus() {
  return (
    <StyledProjectStatus>
      <ProjectTracker />
    </StyledProjectStatus>
  );
}

export default ProjectStatus;

import styled from 'styled-components';
import ProjectTaskItem from './ProjectTaskItem';

const StyledProjectTaskList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 14px;
  padding: 18px;
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-50);
  transition: background-color var(--transition);
`;

function ProjectTaskList({ projectId, due_date, is_finished, tasks }) {
  return (
    <StyledProjectTaskList>
      {tasks.map(task => (
        <ProjectTaskItem
          key={task.id}
          projectId={projectId}
          due_date={due_date}
          is_finished={is_finished}
          task={task}
        />
      ))}
    </StyledProjectTaskList>
  );
}

export default ProjectTaskList;

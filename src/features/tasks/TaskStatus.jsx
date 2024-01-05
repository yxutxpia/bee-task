import styled from 'styled-components';
import TaskPercentage from './TaskPercentage';
import TaskDayCount from './TaskDayCount';

const StyledTaskStatus = styled.aside`
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media only screen and (max-width: 1035px) {
    display: none;
  }
`;

function TaskStatus() {
  return (
    <StyledTaskStatus>
      <TaskPercentage />
      <TaskDayCount />
    </StyledTaskStatus>
  );
}

export default TaskStatus;

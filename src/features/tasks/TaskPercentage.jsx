import styled from 'styled-components';
import { useTasks } from '../../hooks/useTasks';
import Heading from '../../ui/Heading';
import { HiMiniChartBar } from 'react-icons/hi2';

const StyledTaskPercentage = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: calc(29px + 16px);
  padding: 24px;
  border-radius: var(--round-md);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover {
    background-color: var(--color-gray-0);
  }

  & > div {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }
`;

const HeadingWrapper = styled.span`
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 24px;
    height: 24px;
    color: var(--color-primary-500);
  }
`;

const ProgressLabelWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  span {
    font-size: var(--font-size-lg);
    font-weight: var(--font-weight-bold);
    transition: color var(--transition);
  }
`;

const ProgressLabel = styled.label`
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);
`;

const Progress = styled.progress`
  width: 100%;
  height: 6px;
  border-radius: 1000px;
  appearance: none;

  &::-webkit-progress-bar {
    border-radius: 1000px;
    background-color: var(--color-pale-purple-100);
    transition: background-color var(--transition);
  }

  &::-webkit-progress-value {
    border-radius: 1000px;
    transition: background-color var(--transition);
  }

  &#not-started::-webkit-progress-value {
    background-color: var(--color-orange-600);
  }

  &#in-progress::-webkit-progress-value {
    background-color: var(--color-blue-600);
  }

  &#complete::-webkit-progress-value {
    background-color: var(--color-green-600);
  }
`;

function TaskPercentage() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) return null;

  const completeTasks = tasks.filter(
    task => task.status.toLowerCase() === 'complete'
  );

  const inProgressTasks = tasks.filter(
    task => task.status.toLowerCase() === 'in progress'
  );

  const notStartedTasks = tasks.filter(
    task => task.status.toLowerCase() === 'not started'
  );

  const completePercentage = Math.floor(
    (completeTasks.length / tasks.length) * 100
  );

  const inProgressPercentage = Math.floor(
    (inProgressTasks.length / tasks.length) * 100
  );

  const notStartedPercentage = Math.floor(
    (notStartedTasks.length / tasks.length) * 100
  );

  return (
    <StyledTaskPercentage>
      <HeadingWrapper>
        <Heading as="h4">Task percentage</Heading>
        <HiMiniChartBar />
      </HeadingWrapper>
      <div>
        <div>
          <ProgressLabelWrapper>
            <ProgressLabel htmlFor="not-started">Not started</ProgressLabel>
            <span>{notStartedPercentage}%</span>
          </ProgressLabelWrapper>
          <Progress
            id="not-started"
            max={100}
            value={notStartedPercentage}
          ></Progress>
        </div>
        <div>
          <ProgressLabelWrapper>
            <ProgressLabel htmlFor="in-progress">In progress</ProgressLabel>
            <span>{inProgressPercentage}%</span>
          </ProgressLabelWrapper>
          <Progress
            id="in-progress"
            max={100}
            value={inProgressPercentage}
          ></Progress>
        </div>
        <div>
          <ProgressLabelWrapper>
            <ProgressLabel htmlFor="complete">Complete</ProgressLabel>
            <span>{completePercentage}%</span>
          </ProgressLabelWrapper>
          <Progress
            id="complete"
            max={100}
            value={completePercentage}
          ></Progress>
        </div>
      </div>
    </StyledTaskPercentage>
  );
}

export default TaskPercentage;

import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

import { formatDate } from '../../utils/helpers';
import { HiOutlineCalendarDays } from 'react-icons/hi2';
import StatusBadge from '../../ui/StatusBadge';

const StyledProjectItem = styled.li`
  & > a {
    --color-accent: var(--color-accent-orange);
    border-left: 4px solid var(--color-accent);
    transition: border-color var(--transition),
      background-color var(--transition);
  }

  &:nth-child(2n) > a {
    --color-accent: var(--color-accent-purple);
  }

  &:nth-child(3n) > a {
    --color-accent: var(--color-accent-pink);
  }

  &:nth-child(4n) > a {
    --color-accent: var(--color-accent-yellow);
  }

  &:nth-child(5n) > a {
    --color-accent: var(--color-accent-green);
  }

  &:nth-child(6n) > a {
    --color-accent: var(--color-accent-blue);
  }

  ${props =>
    props.finished &&
    css`
      & > a {
        --color-accent: var(--color-gray-400) !important;
      }
    `}
`;

const StyledLink = styled(Link)`
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 24px;
  border-radius: var(--round-sm);
  background-color: var(--color-gray-0--50);
  transition: background-color var(--transition);

  &:hover,
  &:active {
    background-color: var(--color-gray-0);
  }

  & > div:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 8px;

    & > div {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    & > div:nth-child(2) {
      width: 100%;
    }
  }
`;

const Emoji = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  font-size: var(--font-size-lg);
  border-radius: var(--round-sm);
  background-color: var(--color-pale-purple-100);
  transition: background-color var(--transition);
`;

const ProgressWrapper = styled.div`
  gap: 12px;

  & label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: var(--font-weight-bold);
    transition: color var(--transition);
    cursor: pointer;

    & span:nth-child(1) {
      color: var(--color-gray-400);
      font-size: var(--font-size-sm);
    }
  }

  & progress {
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
      background-color: var(--color-accent);
      transition: background-color var(--transition);
    }
  }
`;

const ProjectTitle = styled.h4`
  font-weight: var(--font-weight-extrabold);
  transition: color var(--transition);
`;

const DueDate = styled.p`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 4px;
  color: var(--color-gray-500);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  transition: color var(--transition);

  & span:nth-child(1) {
    display: flex;
    align-items: center;
    gap: 4px;
  }

  & div:nth-child(2) {
    padding: 6px 8px;
    font-size: var(--font-size-min);
    font-weight: var(--font-weight-extrabold);
    text-transform: uppercase;
    border-radius: 1000px;
    background-color: var(--color-gray-100);
    transition: color var(--transition), background-color var(--transition);
  }
`;

function ProjectItem({ projectId, project }) {
  const { emoji, name, tasks, due_date, is_finished } = project;

  let completeTasks, taskPercentage;

  if (!tasks?.length) {
    completeTasks = 0;
    taskPercentage = 0;
  } else {
    completeTasks = tasks?.filter(task => task.complete);
    taskPercentage = (completeTasks.length / tasks?.length) * 100;
  }

  return (
    <StyledProjectItem finished={is_finished}>
      <StyledLink to={`/projects/${projectId}`}>
        <div>
          <Emoji>{emoji}</Emoji>
          <div>
            <ProjectTitle>{name}</ProjectTitle>
            <DueDate>
              <span>
                <HiOutlineCalendarDays />
                <span>{formatDate(due_date)}</span>
              </span>
              {is_finished && <StatusBadge status="finished" />}
            </DueDate>
          </div>
        </div>
        <ProgressWrapper>
          <label htmlFor="percentage">
            {tasks?.length ? (
              <span>
                {completeTasks?.length} / {tasks?.length} Tasks
              </span>
            ) : (
              <span></span>
            )}
            <span>{Math.round(taskPercentage)}%</span>
          </label>
          <progress id="percentage" max={100} value={taskPercentage}></progress>
        </ProgressWrapper>
      </StyledLink>
    </StyledProjectItem>
  );
}

export default ProjectItem;

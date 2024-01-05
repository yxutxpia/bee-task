import styled, { css } from 'styled-components';
import { LuCheckCircle, LuCircle } from 'react-icons/lu';
import { useEffect, useState } from 'react';
import { useUpdateProjectTask } from '../../hooks/useUpdateProjectTask';
import { HiOutlineTrash } from 'react-icons/hi2';
import ConfirmDelete from '../../ui/ConfirmDelete';
import { useDeleteProjectTask } from '../../hooks/useDeleteProjectTask';
import { formatDaysLeft } from '../../utils/helpers';
import { usePoints } from '../../hooks/usePoints';
import { PROJECT_TASK_FINISH_POINT } from '../../utils/constants';

const StyledProjectTaskItem = styled.li`
  display: flex;
  align-items: center;
  gap: 12px;

  ${props =>
    props.complete &&
    css`
      text-decoration: line-through;

      & span,
      & p {
        opacity: 0.5;
      }

      & p {
        width: 100%;
      }
    `}

  cursor: pointer;

  ${props =>
    props.is_finished &&
    css`
      cursor: not-allowed;
    `}
`;

const Button = styled.button`
  margin-left: auto;
  transition: opacity var(--transition);
  opacity: 0.25;

  &:hover {
    opacity: 0.75;
  }
`;

function ProjectTaskItem({ projectId, due_date, is_finished, task }) {
  const { id, title, complete } = task;
  const { points, isLoading: isLoadingPoints } = usePoints();
  const { updateProjectTask, isLoading } = useUpdateProjectTask();
  const { deleteProjectTask, isLoading: isDeleting } = useDeleteProjectTask();

  const [showModal, setShowModal] = useState(false);
  const [curPoints, setCurPoints] = useState(0);

  useEffect(
    function () {
      if (!isLoadingPoints) {
        setCurPoints(points?.at(0)?.points);
      }
    },
    [points, isLoadingPoints]
  );

  function handleClick() {
    if (is_finished) return;
    const addPoints = Boolean(formatDaysLeft(due_date, 'count'));

    const points = !complete
      ? addPoints
        ? curPoints + PROJECT_TASK_FINISH_POINT
        : curPoints
      : curPoints;

    updateProjectTask({ projectId, id, complete: !complete, points });
  }

  function handleDelete() {
    if (is_finished) return;

    deleteProjectTask(id);
  }

  if (isLoading) return null;

  return (
    <StyledProjectTaskItem complete={complete} is_finished={is_finished}>
      <span onClick={handleClick}>
        {complete ? <LuCheckCircle /> : <LuCircle />}
      </span>
      <p onClick={handleClick}>{title}</p>
      {!is_finished && (
        <Button
          onClick={e => {
            e.preventDefault();
            setShowModal(show => !show);
          }}
        >
          <HiOutlineTrash />
        </Button>
      )}
      {showModal && (
        <ConfirmDelete
          content="task"
          onDelete={() => {
            handleDelete();
            setShowModal(false);
          }}
          onCloseModal={() => setShowModal(false)}
        />
      )}
    </StyledProjectTaskItem>
  );
}

export default ProjectTaskItem;

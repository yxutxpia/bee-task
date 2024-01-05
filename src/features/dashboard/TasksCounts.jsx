import { HiOutlinePencilSquare } from 'react-icons/hi2';
import { useTasks } from '../../hooks/useTasks';
import MiniCard from '../../ui/MiniCard';

function TasksCounts() {
  const { tasks, isLoading } = useTasks();

  if (isLoading) return null;

  return (
    <MiniCard
      color="yellow"
      icon={<HiOutlinePencilSquare />}
      heading="Tasks"
      count={tasks.length}
    />
  );
}

export default TasksCounts;

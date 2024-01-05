import { HiOutlineTrophy } from 'react-icons/hi2';
import { useProjects } from '../../hooks/useProjects';
import { useTasks } from '../../hooks/useTasks';
import MiniCard from '../../ui/MiniCard';
import LoaderMini from '../../ui/LoaderMini';

function Achievments() {
  const { tasks, isLoading: isLoadingTasks } = useTasks();
  const { projects, isLoading: isLoadingProjects } = useProjects();

  if (isLoadingTasks || isLoadingProjects)
    return (
      <MiniCard>
        <LoaderMini />
      </MiniCard>
    );

  const completeTasks = tasks.filter(task => task.status === 'Complete');
  const completeProjects = projects.filter(project => project.is_finished);

  const percentage =
    ((completeTasks.length + completeProjects.length) /
      (tasks.length + projects.length)) *
    100;

  return (
    <MiniCard
      color="orange"
      icon={<HiOutlineTrophy />}
      heading="Achievments"
      count={`${percentage ? Math.round(percentage) : '0'}%`}
    />
  );
}

export default Achievments;

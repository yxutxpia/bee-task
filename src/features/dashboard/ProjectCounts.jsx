import { HiOutlineCalendarDays } from 'react-icons/hi2';
import { useProjects } from '../../hooks/useProjects';
import MiniCard from '../../ui/MiniCard';
import LoaderMini from '../../ui/LoaderMini';

function ProjectCounts() {
  const { projects, isLoading } = useProjects();

  if (isLoading)
    return (
      <MiniCard>
        <LoaderMini />
      </MiniCard>
    );

  return (
    <MiniCard
      color="blue"
      heading="Projects"
      icon={<HiOutlineCalendarDays />}
      count={projects.length}
    />
  );
}

export default ProjectCounts;

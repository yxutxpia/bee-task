import { getMonth, getYear } from 'date-fns';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';

export function MonthlyData() {
  const { tasks, isLoading: isLoadingTasks } = useTasks();
  const { projects, isLoading: isLoadingProjects } = useProjects();

  if (isLoadingTasks || isLoadingProjects) return null;

  const janTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 0 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const febTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 1 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const marTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 2 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const aprTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 3 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const mayTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 4 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const junTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 5 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const julTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 6 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const augTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 7 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const sepTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 8 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const octTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 9 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const novTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 10 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const decTasks = tasks.filter(task => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(task.due_date)) === 11 &&
      getYear(new Date(task.due_date)) === year
    );
  });

  const janProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 0 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const febProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 1 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const marProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 2 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const aprProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 3 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const mayProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 4 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const junProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 5 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const julProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 6 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const augProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 7 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const sepProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 8 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const octProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 9 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const novProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 10 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  const decProjects = projects.filter(project => {
    const year = new Date().getFullYear();
    return (
      getMonth(new Date(project.due_date)) === 11 &&
      getYear(new Date(project.due_date)) === year
    );
  });

  return [
    {
      name: 'Jan',
      tasks: janTasks.length,
      projects: janProjects.length,
    },
    {
      name: 'Feb',
      tasks: febTasks.length,
      projects: febProjects.length,
    },
    {
      name: 'Mar',
      tasks: marTasks.length,
      projects: marProjects.length,
    },
    {
      name: 'Apr',
      tasks: aprTasks.length,
      projects: aprProjects.length,
    },
    {
      name: 'May',
      tasks: mayTasks.length,
      projects: mayProjects.length,
    },
    {
      name: 'Jun',
      tasks: junTasks.length,
      projects: junProjects.length,
    },
    {
      name: 'Jul',
      tasks: julTasks.length,
      projects: julProjects.length,
    },
    {
      name: 'Aug',
      tasks: augTasks.length,
      projects: augProjects.length,
    },
    {
      name: 'Sep',
      tasks: sepTasks.length,
      projects: sepProjects.length,
    },
    {
      name: 'Oct',
      tasks: octTasks.length,
      projects: octProjects.length,
    },
    {
      name: 'Nov',
      tasks: novTasks.length,
      projects: novProjects.length,
    },
    {
      name: 'Dec',
      tasks: decTasks.length,
      projects: decProjects.length,
    },
  ];
}

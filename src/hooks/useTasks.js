import { useQuery } from '@tanstack/react-query';
import { getTasks } from '../services/apiTasks';

export function useTasks() {
  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  return { tasks, isLoading, error };
}

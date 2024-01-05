import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getTask } from '../services/apiTasks';

export function useTask() {
  const { taskId } = useParams();

  const {
    data: task,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => getTask(taskId),
    retry: false,
  });

  return { task, isLoading, error };
}

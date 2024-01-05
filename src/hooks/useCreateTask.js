import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask as createTaskApi } from '../services/apiTasks';
import toast from 'react-hot-toast';

export function useCreateTask() {
  const queryClient = useQueryClient();

  const { mutate: createTask, isLoading } = useMutation({
    mutationKey: ['tasks'],
    mutationFn: createTaskApi,
    onSuccess: () => {
      toast.success('할 일이 추가되었습니다');
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
    },
  });

  return { createTask, isLoading };
}

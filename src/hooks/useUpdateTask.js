import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateTask as updateTaskApi } from '../services/apiTasks';
import toast from 'react-hot-toast';

export function useUpdateTask() {
  const queryClient = useQueryClient();

  const { mutate: updateTask, isLoading } = useMutation({
    mutationKey: ['task'],
    mutationFn: updateTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['task'] });
      toast.success('업데이트되었습니다');
    },
    onError: err => {
      toast.error(err.message);
    },
  });

  return { updateTask, isLoading };
}

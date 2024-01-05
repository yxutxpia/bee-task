import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteTask as deleteTaskApi } from '../services/apiTasks';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useDeleteTask() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteTask, isLoading } = useMutation({
    mutationKey: ['tasks'],
    mutationFn: deleteTaskApi,
    onSuccess: () => {
      toast.success('할 일이 삭제되었습니다');
      queryClient.invalidateQueries({
        queryKey: ['tasks'],
      });
      navigate(-1);
    },
    onError: err => toast.error(err.message),
  });

  return { deleteTask, isLoading };
}

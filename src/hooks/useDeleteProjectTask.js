import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { deleteProjectTask as deleteProjectTaskApi } from '../services/apiProject';
import toast from 'react-hot-toast';

export function useDeleteProjectTask() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteProjectTask, isLoading } = useMutation({
    mutationKey: ['project', projectId],
    mutationFn: taskId => deleteProjectTaskApi({ taskId, projectId }),
    onSuccess: () => {
      toast.success('할 일이 삭제되었습니다');
      queryClient.invalidateQueries(['project', projectId]);
    },
    onError: err => toast.error(err.message),
  });

  return { deleteProjectTask, isLoading };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProjectTask as updateProjectTaskApi } from '../services/apiProject';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useUpdateProjectTask() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: updateProjectTask, isLoading } = useMutation({
    mutationKey: ['project', projectId],
    mutationFn: updateProjectTaskApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('업데이트되었습니다');
    },
    onError: err => toast.error(err.message),
  });

  return { updateProjectTask, isLoading };
}

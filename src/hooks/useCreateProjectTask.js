import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProjectTask as createProjectTaskApi } from '../services/apiProject';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useCreateProjectTask() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: createProjectTask, isLoading } = useMutation({
    mutationKey: ['project', projectId],
    mutationFn: newTask => createProjectTaskApi({ newTask, projectId }),
    onSuccess: () => {
      toast.success('할 일이 추가되었습니다');
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
    },
    onError: err => toast.error(err.message),
  });

  return { createProjectTask, isLoading };
}

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { updateProject as updateProjectApi } from '../services/apiProject';
import toast from 'react-hot-toast';

export function useUpdateProject() {
  const { projectId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: updateProject, isLoading } = useMutation({
    mutationKey: ['project', projectId],
    mutationFn: newProject => updateProjectApi({ newProject, projectId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['project', projectId] });
      toast.success('프로젝트가 업데이트되었습니다');
    },
    onError: err => toast.error(err.message),
  });

  return { updateProject, isLoading };
}

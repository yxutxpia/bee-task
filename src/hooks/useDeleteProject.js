import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteProject as deleteProjectApi } from '../services/apiProject';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useDeleteProject() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: deleteProject, isLoading } = useMutation({
    mutationKey: ['project'],
    mutationFn: deleteProjectApi,
    onSuccess: () => {
      toast.success('프로젝트가 삭제되었습니다');
      queryClient.invalidateQueries({ queryKey: ['project'] });
      navigate(-1);
    },
  });

  return { deleteProject, isLoading };
}

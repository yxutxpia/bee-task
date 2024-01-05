import { useMutation } from '@tanstack/react-query';
import { createProject as createProjectApi } from '../services/apiProject';
import toast from 'react-hot-toast';

export function useCreateProject() {
  const { mutate: createProject, isLoading } = useMutation({
    mutationKey: ['projects'],
    mutationFn: createProjectApi,
    onSuccess: () => {
      toast.success('프로젝트가 추가되었습니다');
    },
    onError: err => toast.error(err.message),
  });

  return { createProject, isLoading };
}

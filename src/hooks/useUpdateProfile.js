import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateProfile as updateProfileApi } from '../services/apiProfile';
import toast from 'react-hot-toast';

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  const { mutate: updateProfile, isLoading } = useMutation({
    mutationKey: ['profile'],
    mutationFn: updateProfileApi,
    onSuccess: () => {
      toast.success('프로필이 업데이트되었습니다');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['current_user'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateProfile, isLoading };
}

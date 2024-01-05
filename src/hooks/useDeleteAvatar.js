import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteAvatar as deleteAvatarApi } from '../services/apiProfile';
import toast from 'react-hot-toast';

export function useDeleteAvatar() {
  const queryClient = useQueryClient();

  const { mutate: deleteAvatar, isLoading } = useMutation({
    mutationKey: ['profile'],
    mutationFn: deleteAvatarApi,
    onSuccess: () => {
      toast.success('이미지가 삭제되었습니다');
      queryClient.invalidateQueries({ queryKey: ['user'] });
      queryClient.invalidateQueries({ queryKey: ['current_user'] });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteAvatar, isLoading };
}

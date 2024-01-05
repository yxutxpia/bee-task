import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateMessage as updateMessageApi } from '../services/apiProfile';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

export function useUpdateMessage() {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: updateMessage, isLoading } = useMutation({
    mutationKey: ['profile'],
    mutationFn: newMsg => updateMessageApi(newMsg, userId),
    onSuccess: () => {
      toast.success('메시지가 등록되었습니다');
      queryClient.invalidateQueries({ queryKey: ['message'] });
    },
    onError: err => toast.error(err.message),
  });

  return { updateMessage, isLoading };
}

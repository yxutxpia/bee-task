import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteMessage as deleteMessageApi } from '../services/apiProfile';
import toast from 'react-hot-toast';

export function useDeleteMessage() {
  const { userId } = useParams();
  const queryClient = useQueryClient();

  const { mutate: deleteMessage, isLoading } = useMutation({
    mutationKey: ['message'],
    mutationFn: messageId => deleteMessageApi(messageId, userId),
    onSuccess: () => {
      toast.success('메시지가 삭제되었습니다');
      queryClient.invalidateQueries({ queryKey: ['message'] });
    },
    onError: err => toast.error(err.message),
  });

  return { deleteMessage, isLoading };
}

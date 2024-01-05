import { useMutation } from '@tanstack/react-query';
import { createFeedback as createFeedbackApi } from '../services/apiFeedback';
import toast from 'react-hot-toast';

export function useFeedback() {
  const { mutate: createFeedback, isLoading } = useMutation({
    mutationKey: ['feedback'],
    mutationFn: createFeedbackApi,
    onSuccess: () => {
      toast.success('성공적으로 전송되었습니다');
    },
    onError: err => toast.error(err.message),
  });

  return { createFeedback, isLoading };
}

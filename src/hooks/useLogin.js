import { useMutation, useQueryClient } from '@tanstack/react-query';
import { login as loginApi } from '../services/apiAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: login, isLoading } = useMutation({
    mutationKey: ['user'],
    mutationFn: loginApi,
    onSuccess: user => {
      navigate('/dashboard', { replace: true });
      queryClient.setQueryData(['user'], user.user);
    },
    onError: err => toast.error(err.message),
  });

  return { login, isLoading };
}

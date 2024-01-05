import { useMutation } from '@tanstack/react-query';
import { signUp as signUpApi } from '../services/apiAuth';

export function useSignUp() {
  const { mutate: signUp, isLoading } = useMutation({
    mutationKey: ['user'],
    mutationFn: signUpApi,
  });

  return { signUp, isLoading };
}

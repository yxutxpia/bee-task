import { useQuery } from '@tanstack/react-query';
import { getCurrentUser } from '../services/apiAuth';

export function useCurrentUser() {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['current_user'],
    queryFn: getCurrentUser,
  });

  return { user, isLoading, error };
}

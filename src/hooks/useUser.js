import { useQuery } from '@tanstack/react-query';
import { getUserAuth } from '../services/apiAuth';

export function useUser() {
  const { data: user, isLoading } = useQuery({
    queryKey: ['user'],
    queryFn: getUserAuth,
  });

  return { user, isLoading, isAuthenticated: user?.role === 'authenticated' };
}

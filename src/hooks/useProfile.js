import { useQuery } from '@tanstack/react-query';
import { getProfile } from '../services/apiProfile';

export function useProfile() {
  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
  });

  return { profile, isLoading, error };
}

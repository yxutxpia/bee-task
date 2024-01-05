import { useQuery } from '@tanstack/react-query';
import { getProfiles } from '../services/apiProfile';

export function useProfiles() {
  const {
    data: profiles,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfiles,
  });

  return { profiles, isLoading, error };
}

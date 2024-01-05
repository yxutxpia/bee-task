import { useQuery } from '@tanstack/react-query';
import { getPublicProfile } from '../services/apiProfile';
import { useParams } from 'react-router-dom';

export function usePublicProfile() {
  const { userId } = useParams();

  const { data: publicProfile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getPublicProfile(userId),
  });

  return { publicProfile, isLoading };
}

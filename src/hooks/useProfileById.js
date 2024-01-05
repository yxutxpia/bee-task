import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProfileById } from '../services/apiProfile';

export function useProfileById() {
  const { userId } = useParams();

  const { data: profileById, isLoading } = useQuery({
    queryKey: ['profile_id', userId],
    queryFn: () => getProfileById(userId),
  });

  return { profileById, isLoading };
}

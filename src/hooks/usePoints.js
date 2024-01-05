import { useQuery } from '@tanstack/react-query';
import { getPoints } from '../services/apiProfile';

export function usePoints() {
  const { data: points, isLoading } = useQuery({
    queryKey: ['points'],
    queryFn: getPoints,
  });

  return { points, isLoading };
}

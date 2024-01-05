import { useQuery } from '@tanstack/react-query';
import { getProjects } from '../services/apiProject';

export function useProjects() {
  const {
    data: projects,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['projects'],
    queryFn: getProjects,
  });

  return { projects, isLoading, error };
}

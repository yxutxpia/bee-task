import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getProject } from '../services/apiProject';

export function useProject() {
  const { projectId } = useParams();

  const {
    data: project,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => getProject(projectId),
  });

  return { project, isLoading, error };
}

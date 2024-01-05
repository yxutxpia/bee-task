import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getMessages } from '../services/apiProfile';

export function useMessages() {
  const { userId } = useParams();

  const { data: messages, isLoading } = useQuery({
    queryKey: ['message', userId],
    queryFn: () => getMessages(userId),
  });

  return { messages, isLoading };
}

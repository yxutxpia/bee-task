import { useNavigate } from 'react-router-dom';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Loader from '../../ui/Loader';
import { useEffect } from 'react';

function RedirectProfile() {
  const navigate = useNavigate();
  const { user, isLoading } = useCurrentUser();

  useEffect(
    function () {
      if (!isLoading)
        navigate(`/profile/${user?.at(0)?.user_id}`, { replace: true });
    },
    [user, navigate, isLoading]
  );

  if (isLoading) return <Loader />;

  return null;
}

export default RedirectProfile;

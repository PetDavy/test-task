import { Navigate } from '@tanstack/react-location';
import { useLayoutEffect, useState, PropsWithChildren } from 'react';
import { authWithUserId } from '~/api';
import { UserContext } from '~/contexts';

export const ProtectedRout = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userId, setUserId] = useState<number | null>(null);
  const [isPending, setIsPending] = useState(true);

  useLayoutEffect(() => {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (userId) {
      authWithUserId(Number(userId))
        .then((user) => {
          setIsAuthenticated(true);
          setUserId(user.id);
        })
        .catch(() => setIsAuthenticated(false))
        .finally(() => setIsPending(false));
    } else {
      setIsPending(false);
    }
  }, []);

  if (isPending) {
    return <div>loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/auth/login" />;
  }

  return <UserContext.Provider value={userId}>{children as JSX.Element}</UserContext.Provider>;
};

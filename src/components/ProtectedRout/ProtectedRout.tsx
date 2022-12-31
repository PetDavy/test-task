import { Navigate } from '@tanstack/react-location';
import { useLayoutEffect, useState, PropsWithChildren } from 'react';
import { authWithUserId } from '~/api';

export const ProtectedRout = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isPending, setIsPending] = useState(true);

  useLayoutEffect(() => {
    const userId = localStorage.getItem('userId') || sessionStorage.getItem('userId');
    if (userId) {
      authWithUserId(Number(userId))
        .then((user) => user.id && setIsAuthenticated(true))
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

  return children as JSX.Element;
};

import { Navigate } from '@tanstack/react-location';
import { useLayoutEffect, useState, PropsWithChildren } from 'react';

export const ProtectedRout = ({ children }: PropsWithChildren) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useLayoutEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  if (!isAuthenticated) {
    return <Navigate to="/anotations/login" />;
  }

  return children as JSX.Element;
};

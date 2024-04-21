import { useAppSelector } from '@hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const { user, me } = useAppSelector((state) => state.user);

  const isLoading: boolean | null = me.isLoading;

  if (isLoading === false && !user) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

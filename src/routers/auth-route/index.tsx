import { useAppSelector } from '@hooks';
import { Navigate, Outlet } from 'react-router-dom';

export const AuthRoute = () => {
  const { user, me } = useAppSelector((state) => state.user);

  const isLoading: boolean | null = me.isLoading;

  if (user && isLoading === false) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

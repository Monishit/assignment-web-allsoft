import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { PATH_TO_DASHBOARD } from '../routes/paths';

export default function AuthGuard({ children }) {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={PATH_TO_DASHBOARD.auth.login}
        state={{ from: location }}
        replace
      />
    );
  }

  return children;
}
import { useRoutes, Navigate } from 'react-router-dom';
import { PATH_TO_DASHBOARD } from '@routes/paths';
import AuthGuard from '@components/authGuard/AuthGuard';
import DashboardLayout from '@layouts/dashboard/DashboardLayout';

// Pages
import LoginPage from '@pages/auth/LoginPage';
import RegisterPage from '@pages/auth/RegisterPage';
import DashboardAppPage from '@pages/dashboard/AppPage';
import DashboardUserPage from '@pages/dashboard/UserPage';

export default function Router() {
  return useRoutes([
    // Auth routes
    {
      path: PATH_TO_DASHBOARD.auth.root,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        { index: true, element: <Navigate to={PATH_TO_DASHBOARD.auth.login} replace /> }
      ]
    },

    // Dashboard routes
    {
      path: PATH_TO_DASHBOARD.dashboard.root,
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <DashboardUserPage /> },
        { index: true, element: <Navigate to={PATH_TO_DASHBOARD.dashboard.app} replace /> }
      ]
    },

    // Redirects
    { path: '/', element: <Navigate to={PATH_TO_DASHBOARD.auth.login} replace /> },
    { path: '*', element: <Navigate to={PATH_TO_DASHBOARD.auth.login} replace /> }
  ]);
}
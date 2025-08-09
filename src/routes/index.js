import { useRoutes, Navigate } from 'react-router-dom';
import { PATH_TO_DASHBOARD } from '../routes/paths';
import AuthGuard from '../components/authGuard/AuthGuard';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';

// Pages
import LoginPage from '../views/auth/LoginPage';
import RegisterPage from '../views/auth/RegisterPage';
import HomePage from '../views/dashboard/HomePage'; // ✅ import new page

export default function Router() {
  return useRoutes([
    // Auth routes
    {
      path: PATH_TO_DASHBOARD.auth.root,
      children: [
        { path: 'login', element: <LoginPage /> },
        { path: 'register', element: <RegisterPage /> },
        {
          index: true,
          element: <Navigate to={PATH_TO_DASHBOARD.auth.login} replace />,
        },
      ],
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
        { path: 'app', element: <HomePage /> }, // ✅ home page route
        {
          index: true,
          element: <Navigate to={PATH_TO_DASHBOARD.dashboard.app} replace />,
        },
        { path: 'user', element: <HomePage /> },
      ],
    },

    // Redirects
    {
      path: '/',
      element: <Navigate to={PATH_TO_DASHBOARD.auth.login} replace />,
    },
    {
      path: '*',
      element: <Navigate to={PATH_TO_DASHBOARD.auth.login} replace />,
    },
  ]);
}

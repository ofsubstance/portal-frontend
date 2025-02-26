import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';
import { UserRole } from '@/constants/enums';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: UserRole;
}

export default function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, saveIntendedPath } = useAuth();
  const location = useLocation();

  // If not authenticated, redirect to login and save the intended path
  if (!isAuthenticated) {
    saveIntendedPath(location.pathname);
    return <Navigate to="/signin" replace />;
  }

  // If a specific role is required, check if the user has it
  // The role is already normalized in the useAuth hook
  if (requiredRole && user && user.role !== requiredRole) {
    // Redirect based on user's role
    if (user.role === UserRole.Admin) {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/" replace />;
    }
  }

  return <>{children}</>;
}

import { UserRole } from '@/constants/enums';
import { useAuth } from '@/hooks/useAuth';
import { Navigate, useLocation } from 'react-router-dom';

interface AuthGuardProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

export default function AuthGuard({
  allowedRoles = Object.values(UserRole),
  children,
}: AuthGuardProps) {
  const { user, isAuthenticated, saveIntendedPath } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    saveIntendedPath(location.pathname);
    return <Navigate to="/signin" replace />;
  }

  if (user) {
    // The role is already normalized in the useAuth hook
    const userRole = user.role as UserRole;

    if (!allowedRoles.includes(userRole)) {
      // Redirect to appropriate page based on role
      if (userRole === UserRole.Admin) {
        return <Navigate to="/admin/dashboard" replace />;
      } else {
        return <Navigate to="/" replace />;
      }
    }
  }

  return <>{children}</>;
}

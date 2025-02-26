import { UserRole } from '@/constants/enums';
import { AuthContext } from '@/contexts/AuthContextProvider';
import { getRedirectPath } from '@/utils/authRedirect';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

/**
 * Helper function to normalize role for comparison
 * @param role The role to normalize
 * @returns Normalized role
 */
const normalizeRole = (role: string): UserRole => {
  const lowerRole = role.toLowerCase();
  return lowerRole === 'admin' ? UserRole.Admin : UserRole.User;
};

/**
 * Hook for accessing authentication state and methods
 * Provides a consistent interface for authentication across the application
 */
export function useAuth() {
  const { authData, authenticated, setAuthenticated } = useContext(AuthContext);
  const navigate = useNavigate();

  /**
   * Saves the intended path for redirection after authentication
   * @param path The path to redirect to after authentication
   */
  const saveIntendedPath = (path: string) => {
    if (!path.startsWith('/signin') && !path.startsWith('/signup')) {
      localStorage.setItem('intendedPath', path);
    }
  };

  /**
   * Gets the intended path for redirection after authentication
   * @returns The intended path or null if none exists
   */
  const getIntendedPath = (): string | null => {
    return localStorage.getItem('intendedPath');
  };

  /**
   * Clears the intended path
   */
  const clearIntendedPath = () => {
    localStorage.removeItem('intendedPath');
  };

  /**
   * Redirects the user based on their role
   * @param intendedPath Optional path to redirect to if appropriate for the user's role
   */
  const redirectBasedOnRole = (intendedPath?: string | null) => {
    if (!authData) return;

    console.log('User data in redirectBasedOnRole:', authData);
    console.log('User role:', authData.role);

    // Normalize the role to handle case sensitivity
    const normalizedRole = normalizeRole(authData.role);
    console.log('Normalized role:', normalizedRole);

    console.log('Is admin?', normalizedRole === UserRole.Admin);

    const redirectPath = getRedirectPath(
      { ...authData, role: normalizedRole },
      intendedPath || getIntendedPath()
    );

    console.log('Redirect path:', redirectPath);

    navigate(redirectPath, { replace: true });
    clearIntendedPath();
  };

  return {
    user: authData
      ? { ...authData, role: normalizeRole(authData.role) }
      : undefined,
    isAuthenticated: authenticated,
    setAuthenticated,
    saveIntendedPath,
    getIntendedPath,
    clearIntendedPath,
    redirectBasedOnRole,
  };
}

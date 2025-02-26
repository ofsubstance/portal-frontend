import { UserRole } from '@/constants/enums';
import { UserDto } from '@/dtos/user.dto';

interface RedirectPaths {
  [key: string]: string;
}

// Default redirect paths based on user roles
const DEFAULT_REDIRECT_PATHS: RedirectPaths = {
  [UserRole.Admin]: '/admin/dashboard',
  [UserRole.User]: '/',
  // Add other roles as needed
};

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
 * Determines the appropriate redirect path based on user role
 * @param user The authenticated user
 * @param intendedPath Optional path the user was trying to access before authentication
 * @returns The path to redirect to
 */
export const getRedirectPath = (
  user: UserDto,
  intendedPath?: string | null
): string => {
  console.log('getRedirectPath - User:', user);
  console.log('getRedirectPath - User role:', user.role);

  // Normalize the role to handle case sensitivity
  const normalizedRole = normalizeRole(user.role);
  console.log('getRedirectPath - Normalized role:', normalizedRole);

  console.log('getRedirectPath - UserRole.Admin:', UserRole.Admin);
  console.log(
    'getRedirectPath - Role comparison:',
    normalizedRole === UserRole.Admin
  );
  console.log('getRedirectPath - Intended path:', intendedPath);
  console.log('getRedirectPath - Default paths:', DEFAULT_REDIRECT_PATHS);
  console.log(
    'getRedirectPath - Default path for role:',
    DEFAULT_REDIRECT_PATHS[normalizedRole]
  );

  // If there's an intended path and it's appropriate for the user's role, use it
  if (intendedPath) {
    // Admin paths should only be accessible to admins
    if (
      intendedPath.startsWith('/admin/') &&
      normalizedRole !== UserRole.Admin
    ) {
      console.log(
        'getRedirectPath - User is not admin, redirecting to default path'
      );
      return DEFAULT_REDIRECT_PATHS[normalizedRole] || '/';
    }

    // For non-admin paths, we can redirect to the intended path
    if (
      !intendedPath.startsWith('/signin') &&
      !intendedPath.startsWith('/signup')
    ) {
      console.log('getRedirectPath - Using intended path:', intendedPath);
      return intendedPath;
    }
  }

  // Otherwise, use the default path for the user's role
  console.log(
    'getRedirectPath - Using default path for role:',
    DEFAULT_REDIRECT_PATHS[normalizedRole]
  );
  return DEFAULT_REDIRECT_PATHS[normalizedRole] || '/';
};

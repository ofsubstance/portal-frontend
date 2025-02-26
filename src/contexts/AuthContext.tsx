import { getRedirectPath } from '@/utils/authRedirect';
import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
  isLoading: boolean;
  user: any;
  isAuthenticated: boolean;
  saveIntendedPath: (path: string) => void;
  intendedPath: string | null;
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [intendedPath, setIntendedPath] = useState<string | null>(null);
  const navigate = useNavigate();

  const saveIntendedPath = (path: string) => {
    if (!path.startsWith('/auth/')) {
      setIntendedPath(path);
    }
  };

  const handleSignIn = async (data: SigninDto) => {
    setIsLoading(true);
    try {
      const response = await authService.signin(data);
      setUser(response.user);
      setIsAuthenticated(true);

      const redirectPath = getRedirectPath(response.user, intendedPath);
      navigate(redirectPath);

      setIntendedPath(null);

      return { success: true };
    } catch (error) {
      console.error('Sign in error:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to sign in',
      };
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoading,
        user,
        isAuthenticated,
        saveIntendedPath,
        intendedPath,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

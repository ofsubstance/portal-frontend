import React, { createContext, useCallback, useEffect, useState } from 'react';

import { UserDto } from '@/dtos/user.dto';
import storageService from '../services/storage.service';
import sessionService from '../services/session.service';
import useUserActions from '../hooks/useUserAction';

interface AuthContextProps {
  authData?: UserDto;
  setAuthData: (data?: UserDto) => void;
  authenticated: boolean;
  setAuthenticated: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authData: undefined,
  setAuthData: () => {},
  authenticated: false,
  setAuthenticated: () => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState(storageService.getCurrentUser());
  const [authenticated, setAuthenticated] = useState(
    !!storageService.getAuthData()
  );

  const { useCurrentUserQuery } = useUserActions();

  const { data: user } = useCurrentUserQuery(authenticated);

  useEffect(() => {
    if (!authenticated) {
      setAuthData(undefined);
      sessionService.stopHeartbeat();
    } else {
      setAuthData(user ?? storageService.getCurrentUser());
      sessionService.startHeartbeat();
    }
  }, [authenticated, user]);

  // Stable handler so addEventListener/removeEventListener can match the same ref
  const handleLogout = useCallback(() => {
    setAuthenticated(false);
    setAuthData(undefined);
    sessionService.stopHeartbeat();
  }, []);

  useEffect(() => {
    document.addEventListener('logout', handleLogout);

    if (authenticated && storageService.getSessionId()) {
      sessionService.startHeartbeat();
    }

    return () => {
      document.removeEventListener('logout', handleLogout);
      sessionService.stopHeartbeat();
    };
  }, [handleLogout]);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

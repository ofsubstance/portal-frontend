import React, { createContext, useEffect, useState } from 'react';

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
      // Start the session heartbeat
      sessionService.startHeartbeat();
    }
  }, [authenticated, user]);

  useEffect(() => {
    document.addEventListener('logout', () => {
      setAuthenticated(false);
      setAuthData(undefined);
      sessionService.stopHeartbeat();
    });

    // Check if we already have a session ID and start heartbeat if authenticated
    if (authenticated && storageService.getSessionId()) {
      sessionService.startHeartbeat();
    }

    return () => {
      document.removeEventListener('logout', () => {
        setAuthenticated(false);
        setAuthData(undefined);
        sessionService.stopHeartbeat();
      });
      sessionService.stopHeartbeat();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, authenticated, setAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

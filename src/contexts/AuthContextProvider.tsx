import React, { createContext, useEffect, useState } from "react";

import { UserDto } from "@/dtos/user.dto";
import useUserActions from "../hooks/useUserAction";
import storageService from "../services/storage.service";

interface AuthContextProps {
  authData?: UserDto;
  setAuthData: (data?: UserDto) => void;
  isAuthenticated: boolean;
  setIsAuthenticated: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authData: undefined,
  setAuthData: (_data) => {},
  isAuthenticated: false,
  setIsAuthenticated: (_data) => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState(storageService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storageService.getAuthData()
  );

  const { useCurrentUserQuery } = useUserActions();

  const { data: user } = useCurrentUserQuery(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) setAuthData(undefined);
    else setAuthData(user ?? storageService.getCurrentUser());
  }, [isAuthenticated, user]);

  useEffect(() => {
    document.addEventListener("logout", () => {
      setIsAuthenticated(false);
      setAuthData(undefined);
    });

    return () => {
      document.removeEventListener("logout", () => {
        setIsAuthenticated(false);
        setAuthData(undefined);
      });
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ authData, setAuthData, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };

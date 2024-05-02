import React, { createContext, useEffect, useState } from "react";

import { SigninRes } from "@/dtos/auth.dto";
import authService from "../services/auth.service";
import storageService from "../services/storage.service";
import useUserActions from "../hooks/useUserAction";

const AuthContext = createContext({
  authData: undefined as SigninRes["user"] | undefined,
  setAuthData: (_data?: SigninRes["user"]) => {},
  isAuthenticated: false,
  setIsAuthenticated: (_data: boolean) => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState(storageService.getCurrentUser());
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!storageService.getAuthData()
  );

  const { fetchCurrentUser } = useUserActions();

  const { data: user } = fetchCurrentUser(isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) setAuthData(undefined);
    else setAuthData(user ?? storageService.getCurrentUser());
  }, [isAuthenticated, user]);

  useEffect(() => {
    document.addEventListener("logout", () => setIsAuthenticated(false));

    authService.refreshAccessToken();

    return () => {
      document.removeEventListener("logout", () => setIsAuthenticated(false));
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

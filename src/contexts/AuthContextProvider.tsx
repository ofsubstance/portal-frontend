import React, { createContext, useEffect, useState } from "react";

import { UserDto } from "@/dtos/user.dto";
import storageService from "../services/storage.service";
import { useNavigate } from "react-router-dom";
import useUserActions from "../hooks/useUserAction";

interface AuthContextProps {
  authData?: UserDto;
  setAuthData: (data?: UserDto) => void;
  authenticated: boolean;
  setAuthenticated: (data: boolean) => void;
}

const AuthContext = createContext<AuthContextProps>({
  authData: undefined,
  setAuthData: (_data) => {},
  authenticated: false,
  setAuthenticated: (_data) => {},
});

function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [authData, setAuthData] = useState(storageService.getCurrentUser());
  const [authenticated, setAuthenticated] = useState(
    !!storageService.getAuthData()
  );

  const { useCurrentUserQuery } = useUserActions();

  const { data: user } = useCurrentUserQuery(authenticated);

  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) setAuthData(undefined);
    else {
      setAuthData(user ?? storageService.getCurrentUser());
      authData?.role === "admin"
        ? navigate("/admin", { replace: true })
        : navigate("/", { replace: true });
    }
  }, [authenticated, user]);

  useEffect(() => {
    document.addEventListener("logout", () => {
      setAuthenticated(false);
      setAuthData(undefined);
    });

    return () => {
      document.removeEventListener("logout", () => {
        setAuthenticated(false);
        setAuthData(undefined);
      });
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

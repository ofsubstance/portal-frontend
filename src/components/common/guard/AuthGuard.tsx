import { UserRole } from "@/constants/enums";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { useContext } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  allowedRoles?: UserRole[];
  children: React.ReactNode;
}

export default function AuthGuard({
  allowedRoles = Object.values(UserRole),
  children,
}: AuthGuardProps) {
  const { authData } = useContext(AuthContext);

  if (!authData) {
    return <Navigate to="/signin" replace />;
  }

  if (!allowedRoles.includes(authData.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}

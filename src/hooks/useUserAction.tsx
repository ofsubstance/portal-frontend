import { useQuery } from "@tanstack/react-query";
import userService from "../services/user.service";

function useUserActions() {
  const useCurrentUserQuery = (isAuthenticated: boolean) =>
    useQuery({
      enabled: isAuthenticated,
      queryKey: ["getCurrentUser"],
      queryFn: userService.getCurrentUser,
      staleTime: 0,
    });

  return {
    useCurrentUserQuery,
  };
}

export default useUserActions;

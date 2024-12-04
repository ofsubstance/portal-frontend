import { useQuery } from "@tanstack/react-query";
import userService from "../services/user.service";

function useUserActions() {
  const useCurrentUserQuery = (authenticated: boolean) =>
    useQuery({
      enabled: authenticated,
      queryKey: ["getCurrentUser"],
      queryFn: userService.getCurrentUser,
      staleTime: 0,
    });

  const useUserQuery = (userId?: string) =>
    useQuery({
      enabled: !!userId,
      queryKey: ["getUser", userId],
      queryFn: async () =>
        userId ? await userService.getUser(userId) : undefined,
    });

  return {
    useCurrentUserQuery,
    useUserQuery,
  };
}

export default useUserActions;

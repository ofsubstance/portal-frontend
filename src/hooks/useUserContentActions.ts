import userContentService from '@/services/userContent.service';
import { useQuery } from '@tanstack/react-query';

const useUserContentActions = () => {
  const useUserProfileQuery = () => {
    return useQuery({
      queryKey: ['user-profile'],
      queryFn: () => userContentService.getUserProfile(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useUserCommentsQuery = () => {
    return useQuery({
      queryKey: ['user-comments'],
      queryFn: () => userContentService.getUserComments(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useUserFeedbacksQuery = () => {
    return useQuery({
      queryKey: ['user-feedbacks'],
      queryFn: () => userContentService.getUserFeedbacks(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  const useUserSharelinksQuery = () => {
    return useQuery({
      queryKey: ['user-sharelinks'],
      queryFn: () => userContentService.getUserSharelinks(),
      staleTime: 5 * 60 * 1000, // 5 minutes
    });
  };

  return {
    useUserProfileQuery,
    useUserCommentsQuery,
    useUserFeedbacksQuery,
    useUserSharelinksQuery,
  };
};

export default useUserContentActions;

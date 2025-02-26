import {
  CreateShareLinkDto,
  ShareLinkAnalyticsDto,
  ShareLinkDto,
} from '@/dtos/sharelink.dto';
import shareLinkService from '@/services/sharelink.service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface ErrorResponse {
  message: string;
  status?: number;
}

export default function useShareLinkAction() {
  const createShareLinkMutation = useMutation({
    mutationFn: (data: CreateShareLinkDto) =>
      shareLinkService.createShareLink(data),
    onSuccess: () => {
      toast.success('Share link created successfully');
    },
    onError: (error: ErrorResponse) => {
      toast.error(error.message || 'Failed to create share link');
    },
  });

  const useUserShareLinksQuery = () => {
    return useQuery<ShareLinkDto[], Error>({
      queryKey: ['userShareLinks'],
      queryFn: () => shareLinkService.getUserShareLinks(),
    });
  };

  const useShareLinkByIdQuery = (id: string) => {
    return useQuery<ShareLinkDto, Error>({
      queryKey: ['shareLink', id],
      queryFn: () => shareLinkService.getShareLinkById(id),
      enabled: !!id,
    });
  };

  const useVerifyShareLinkQuery = (uniqueId: string) => {
    return useQuery({
      queryKey: ['verifyShareLink', uniqueId],
      queryFn: () => shareLinkService.verifyShareLinkByUniqueId(uniqueId),
      enabled: !!uniqueId,
      retry: false,
    });
  };

  const useShareLinkAnalyticsQuery = () => {
    return useQuery<ShareLinkAnalyticsDto[], Error>({
      queryKey: ['shareLinkAnalytics'],
      queryFn: () => shareLinkService.getComprehensiveAnalytics(),
    });
  };

  return {
    createShareLinkMutation,
    useUserShareLinksQuery,
    useShareLinkByIdQuery,
    useVerifyShareLinkQuery,
    useShareLinkAnalyticsQuery,
  };
}

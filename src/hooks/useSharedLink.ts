import { ShareLinkDto } from '@/dtos/sharelink.dto';
import shareLinkService from '@/services/sharelink.service';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useShareLinkAction from './useShareLinkAction';

interface UseSharedLinkResult {
  isLoading: boolean;
  isError: boolean;
  isExpired: boolean;
  error: string | null;
  shareLink: ShareLinkDto | null;
}

export default function useSharedLink(): UseSharedLinkResult {
  const { videoId, uniqueId } = useParams<{
    videoId: string;
    uniqueId: string;
  }>();
  const [isExpired, setIsExpired] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [shareLink, setShareLink] = useState<ShareLinkDto | null>(null);

  const { useVerifyShareLinkQuery } = useShareLinkAction();
  const { data, isLoading, isError } = useVerifyShareLinkQuery(uniqueId || '');

  useEffect(() => {
    // Reset states when params change
    setError(null);
    setIsExpired(false);
    setShareLink(null);

    if (isError) {
      setError('This shared link is invalid or has been removed.');
      return;
    }

    if (data && data.body) {
      const linkData = data.body as ShareLinkDto;

      // Check if the link has expired
      if (
        linkData.expiration_time &&
        new Date(linkData.expiration_time) < new Date()
      ) {
        setIsExpired(true);
        setError('This shared link has expired.');
        return;
      }

      // Check if the video ID in the URL matches the one in the share link
      if (linkData.video && linkData.video.id !== videoId) {
        setError('Invalid video ID for this shared link.');
        return;
      }

      // If all checks pass, set the share link data
      setShareLink(linkData);

      // Track the visit
      if (uniqueId) {
        trackVisit(uniqueId, linkData.user?.id);
      }
    }
  }, [data, isError, videoId, uniqueId]);

  // Function to track the visit
  const trackVisit = (uniqueLinkId: string, referrerId?: string) => {
    const visitData = {
      ip_address: '0.0.0.0', // We'll let the server determine this
      user_agent: navigator.userAgent,
      referrer: referrerId || 'unknown',
    };

    // Send the tracking data silently
    shareLinkService.trackShareLinkVisit(uniqueLinkId, visitData);
  };

  return {
    isLoading,
    isError,
    isExpired,
    error,
    shareLink,
  };
}

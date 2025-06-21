import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import {
  Toolbar,
  Box,
  Container,
  alpha,
  useTheme,
  Divider,
} from '@mui/material';
import FlimFeedbackForm from '@/components/user/feedback/FlimFeedbackForm';
import { ModalHookLayout } from '@/components/common/modal/ModalLayout';
import VideoCommentInput from '@/components/user/video/VideoCommentInput';
import VideoCommentList from '@/components/user/video/VideoCommentList';
import VideoDetailsHero from '@/components/user/video/VideoDetailsHero';
import VideoPlayerSection from '@/components/user/video/VideoPlayerSection';
import VideoListSection from '@/components/user/home/VideoListSection';
import ShareLinkModal from '@/components/user/video/ShareLinkModal';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useModal } from '@ebay/nice-modal-react';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import ReactPlayer from 'react-player';
import sessionService from '@/services/session.service';
import useFeedbackActions from '@/hooks/useFeedbackActions';
import { toast } from 'react-toastify';

dayjs.extend(relativeTime);

export default function VideoDetailsPage() {
  const modal = useModal(ModalHookLayout);
  const { videoId } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();
  const [engagementTracked, setEngagementTracked] = useState(false);
  const theme = useTheme();

  const { useVideoQuery } = useVideoManagementActions();
  const { useVideoListQuery } = useVideoManagementActions();

  const { data: videos = [] } = useVideoListQuery();
  const { data: video } = useVideoQuery(videoId!);
  const { submitFilmFeedback, isSubmittingFeedback } = useFeedbackActions();

  // Track content engagement when the video details page loads
  useEffect(() => {
    if (videoId && !engagementTracked) {
      // Track the content engagement
      sessionService
        .trackContentEngagement()
        .then(() => {
          setEngagementTracked(true);
        })
        .catch((error) => {
          console.error('Error tracking content engagement:', error);
        });
    }
  }, [videoId, engagementTracked]);

  const handlePlayClick = () => {
    setSearchParam({ playing: 'true' });
  };

  const handlePlayTrailerClick = (type: 'trailer' | 'preroll') => {
    modal.show({
      title: `${video?.title} ${type === 'trailer' ? 'Trailer' : 'Preroll'}`,
      maxWidth: 'lg',
      darkMode: true,
      children: (
        <Box
          sx={{
            width: '100%',
            maxWidth: '800px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            p: 2,
            borderRadius: 2,
          }}
        >
          {video && (
            <Box
              sx={{
                width: '100%',
                aspectRatio: '16 / 9',
                overflow: 'hidden',
                borderRadius: 1,
              }}
            >
              <ReactPlayer
                url={type === 'trailer' ? video.trailer_url : video.preroll_url}
                width="100%"
                height="100%"
                controls
                light={false}
                playing
                config={{
                  youtube: {
                    playerVars: {
                      showinfo: 0,
                      controls: 1,
                      modestbranding: 1,
                    },
                  },
                }}
              />
            </Box>
          )}
        </Box>
      ),
    });
  };

  const handleFeedbackClick = () => {
    modal.show({
      title: 'Feedback on ' + video?.title,
      darkMode: true,
      children: (
        <FlimFeedbackForm
          filmTitle={video?.title || ''}
          isSubmitting={isSubmittingFeedback}
          onSubmit={async (data) => {
            try {
              if (!videoId) return;

              await submitFilmFeedback(videoId, data);

              toast.success('Thank you for your feedback!');
              modal.hide();
            } catch (error) {
              console.error('Failed to submit feedback:', error);
              toast.error('Failed to submit feedback. Please try again.');
            }
          }}
        />
      ),
    });
  };

  const handleShareClick = () => {
    if (!videoId) return;

    modal.show({
      title: 'Share ' + video?.title,
      darkMode: true,
      children: (
        <ShareLinkModal videoId={videoId} onClose={() => modal.hide()} />
      ),
    });
  };

  if (!video) return null;

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.7)), url(${video.thumbnail_url})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: 'white',
          minHeight: 'calc(100vh)',
          position: 'relative',
        }}
      >
        <Box
          sx={{
            minHeight: 'calc(100vh)',
            backdropFilter: 'blur(5px)',
            backgroundColor: alpha(theme.palette.common.black, 0.3),
          }}
        >
          <Toolbar sx={{ minHeight: '64px !important', p: 0 }} />
          {searchParam.get('playing') === 'true' ? (
            <VideoPlayerSection
              data={video}
              onFeedback={handleFeedbackClick}
              onShare={handleShareClick}
            />
          ) : (
            <VideoDetailsHero
              data={video}
              onPlay={handlePlayClick}
              onPlayTrailer={handlePlayTrailerClick}
              onShare={handleShareClick}
            />
          )}
        </Box>
      </Box>

      <Container
        maxWidth="xl"
        sx={{
          py: { xs: 4, md: 1 },
          px: { xs: 2, sm: 4, md: 4 },
        }}
      >
        {videoId && (
          <Box sx={{ mb: 8 }}>
            <VideoCommentInput videoId={videoId} />
            <VideoCommentList videoId={videoId} />
          </Box>
        )}

        <Divider sx={{ mb: 6, opacity: 0.3 }} />

        <Box sx={{ mb: 6 }}>
          <VideoListSection videos={videos} />
        </Box>
      </Container>
    </Box>
  );
}

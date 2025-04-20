import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { Toolbar } from '@mui/material';
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
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#000',
            padding: '1rem',
            borderRadius: '8px',
          }}
        >
          {video && (
            <div
              style={{
                width: '100%',
                aspectRatio: '16 / 9',
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
            </div>
          )}
        </div>
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
    <div className="space-y-10">
      <div
        className="bg-fit bg-center text-white min-h-screen relative"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.6)), url(${video.thumbnail_url})`,
        }}
      >
        <div className="min-h-screen backdrop-filter backdrop-blur-md bg-black bg-opacity-20">
          <Toolbar />
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
        </div>
      </div>

      <div className="px-10 md:px-20 space-y-4">
        {videoId && (
          <>
            <VideoCommentInput videoId={videoId} />
            <VideoCommentList videoId={videoId} />
          </>
        )}
      </div>
      <div className="space-y-6 px-10 md:px-20">
        <VideoListSection videos={videos} />
      </div>
    </div>
  );
}

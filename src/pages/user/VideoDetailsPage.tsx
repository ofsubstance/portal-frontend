import { Link, useParams, useSearchParams } from 'react-router-dom';
import { Toolbar, Typography } from '@mui/material';
import { RiArrowRightSLine as ArrowRightIcon } from 'react-icons/ri';
import FlimFeedbackForm from '@/components/user/feedback/FlimFeedbackForm';
import { ModalHookLayout } from '@/components/common/modal/ModalLayout';
import VideoCommentItem from '@/components/user/video/VideoCommentItem';
import VideoDetailsHero from '@/components/user/video/VideoDetailsHero';
import VideoGridItem from '@/components/videoItem/VideoGridItem';
import VideoPlayerSection from '@/components/user/video/VideoPlayerSection';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useModal } from '@ebay/nice-modal-react';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import ReactPlayer from 'react-player';

dayjs.extend(relativeTime);

export default function VideoDetailsPage() {
  const modal = useModal(ModalHookLayout);
  const { videoId } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();

  const { useVideoQuery } = useVideoManagementActions();
  const { useVideoListQuery } = useVideoManagementActions();

  const { data: videos = [] } = useVideoListQuery();

  const { data: video } = useVideoQuery(videoId!);

  const handlePlayClick = () => {
    setSearchParam({ playing: 'true' });
  };

  const handlePlayTrailerClick = (type: 'trailer' | 'preroll') => {
    modal.show({
      title: `${video?.title} ${type === 'trailer' ? 'Trailer' : 'Preroll'}`,
      maxWidth: 'lg',
      children: (
        <div
          style={{
            width: '100%',
            maxWidth: '800px',
            margin: 'auto',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
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
      children: (
        <FlimFeedbackForm
          filmTitle={video?.title || ''}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
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
          {searchParam.get('playing') == 'true' ? (
            <VideoPlayerSection data={video} onFeedback={handleFeedbackClick} />
          ) : (
            <VideoDetailsHero
              data={video}
              onPlay={handlePlayClick}
              onPlayTrailer={handlePlayTrailerClick}
            />
          )}
        </div>
      </div>

      <div className="space-y-6 px-10 md:px-20">
        <Typography
          variant="h6"
          fontWeight={600}
          className="flex items-center gap-2 cursor-pointer hover:gap-4 transition-[gap]"
        >
          More Films <ArrowRightIcon size={30} />
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {videos.slice(0, 4).map((video) => (
            <Link key={video.id} to={'/video/' + video.id}>
              <VideoGridItem data={video} />
            </Link>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 space-y-4">
        <Typography variant="h6" fontWeight={600}>
          Comments
        </Typography>
        <div className="space-y-6">
          {Array.from(Array(5)).map((_, index) => (
            <VideoCommentItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

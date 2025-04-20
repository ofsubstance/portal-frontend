import { RiArrowRightSLine as ArrowRightIcon } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Pagination, Typography } from '@mui/material';
import VideoGridItem from '@/components/videoItem/VideoGridItem';
import { VideoDto } from '@/dtos/video.dto';
import { useState, useMemo } from 'react';

export default function VideoListSection({ videos }: { videos: VideoDto[] }) {
  const [page, setPage] = useState(1);
  const videosPerPage = 6;

  // Calculate total pages
  const totalPages = Math.ceil(videos.length / videosPerPage);

  // Get current page videos
  const currentVideos = useMemo(() => {
    const startIndex = (page - 1) * videosPerPage;
    return videos.slice(startIndex, startIndex + videosPerPage);
  }, [videos, page]);

  // Handle page change
  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
    // Scroll to top of the section
    window.scrollTo({
      top: document.getElementById('video-list-section')?.offsetTop || 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="space-y-6" id="video-list-section">
      <div className="flex justify-between items-center">
        <Typography
          variant="h6"
          fontWeight={600}
          className="flex items-center gap-2 cursor-pointer hover:gap-4 transition-[gap]"
        >
          Our Collection <ArrowRightIcon size={30} />
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Showing {Math.min((page - 1) * videosPerPage + 1, videos.length)} -{' '}
          {Math.min(page * videosPerPage, videos.length)} of {videos.length}{' '}
          videos
        </Typography>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {currentVideos.map((video) => (
          <Link key={video.id} to={'/video/' + video.id}>
            <VideoGridItem data={video} />
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </div>
      )}
    </div>
  );
}

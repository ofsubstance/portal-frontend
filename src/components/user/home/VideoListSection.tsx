import { RiArrowRightSLine as ArrowRightIcon } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import { Pagination, Typography, CircularProgress, Box, Skeleton } from '@mui/material';
import VideoGridItem from '@/components/videoItem/VideoGridItem';
import { VideoDto } from '@/dtos/video.dto';
import { useState, useMemo } from 'react';

interface VideoListSectionProps {
  videos: VideoDto[];
  isLoading?: boolean;
}

export default function VideoListSection({ videos, isLoading = false }: VideoListSectionProps) {
  const [page, setPage] = useState(1);
  const videosPerPage = 9;

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

  if (isLoading) {
    return (
      <div className="space-y-6" id="video-list-section">
        <div className="flex justify-between items-center">
          <Typography
            variant="h6"
            fontWeight={600}
            className="flex items-center gap-2"
          >
            Our Collection <ArrowRightIcon size={30} />
          </Typography>
          <Skeleton width={120} height={20} />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <Box key={index} className="space-y-3">
              <Skeleton variant="rectangular" height={224} sx={{ borderRadius: 2 }} />
              <Skeleton width="80%" height={24} />
              <Skeleton width="60%" height={20} />
            </Box>
          ))}
        </div>
      </div>
    );
  }

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
          {videos.length === 0 ? (
            'No videos found'
          ) : (
            <>
              Showing {Math.min((page - 1) * videosPerPage + 1, videos.length)} -{' '}
              {Math.min(page * videosPerPage, videos.length)} of {videos.length}{' '}
              videos
            </>
          )}
        </Typography>
      </div>

      {currentVideos.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="w-24 h-24 mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <Typography variant="h6" color="text.secondary" className="mb-2">
            No videos found
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Try adjusting your filters or check back later for new content.
          </Typography>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentVideos.map((video) => (
            <Link key={video.id} to={'/video/' + video.id}>
              <VideoGridItem data={video} />
            </Link>
          ))}
        </div>
      )}

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

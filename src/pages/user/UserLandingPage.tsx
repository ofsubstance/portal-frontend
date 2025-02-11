import { Chip, Divider, Paper, Typography } from '@mui/material';
import HeroSlider from '@/components/user/home/HeroSlider';
import VideoListSection from '@/components/user/home/VideoListSection';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import { useEffect, useState } from 'react';
import { VideoDto } from '@/dtos/video.dto';

export default function UserLandingPage() {
  const { useVideoListQuery } = useVideoManagementActions();

  const { data: videos = [] } = useVideoListQuery();

  const [videoList, setVideoList] = useState<VideoDto[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');

  useEffect(() => {
    setVideoList(videos);
  }, [videos]);

  const slideshowVideos = videos.filter((video) => video.slideshow);

  const genres = Array.from(
    new Set(videos.map((video) => video.genre.split(',')).flat())
  );

  const updateVideoList = (genre: string) => {
    setSelectedGenre(genre);
    const filteredVideos = videos.filter((video) =>
      video.genre.toLowerCase().includes(genre.toLowerCase())
    );
    setVideoList(filteredVideos);
  };

  return (
    <div>
      <HeroSlider videos={slideshowVideos} />
      <div className="flex gap-10 p-6 md:p-10 md:px-20">
        <div className="flex-1 space-y-14">
          <VideoListSection videos={videoList} />
        </div>
        <div className="flex-[0.3] space-y-10 hidden md:block">
          <Paper variant="outlined">
            <div className="flex justify-between items-center">
              <Typography variant="body1" fontWeight={600} p={2}>
                Genres
              </Typography>
              <div className="px-2">
                <Chip
                  label="Clear Filter"
                  variant={selectedGenre === '' ? 'filled' : 'outlined'}
                  onClick={() => {
                    setSelectedGenre('');
                    setVideoList(videos);
                  }}
                />
              </div>
            </div>
            <Divider />
            <div className="p-2">
              {genres.map((genre) => (
                <Chip
                  sx={{ margin: 1 }}
                  key={genre}
                  label={genre}
                  color={selectedGenre === genre ? 'primary' : 'default'}
                  variant={selectedGenre === genre ? 'filled' : 'outlined'}
                  onClick={() => updateVideoList(genre)}
                />
              ))}
            </div>
          </Paper>
        </div>
      </div>
      <Divider />
    </div>
  );
}

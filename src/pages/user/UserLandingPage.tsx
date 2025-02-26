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
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setVideoList(videos);
  }, [videos]);

  const slideshowVideos = videos.filter((video) => video.slideshow);

  // Extract unique genres
  const genres = Array.from(
    new Set(
      videos
        .map((video) => video.genre.split(','))
        .flat()
        .map((g) => g.trim())
    )
  );

  // Extract unique tags from all videos
  const tags = Array.from(new Set(videos.flatMap((video) => video.tags || [])));

  // Update video list based on selected filters (genre and tags)
  useEffect(() => {
    let filteredVideos = [...videos];

    // Apply genre filter if selected
    if (selectedGenre) {
      filteredVideos = filteredVideos.filter((video) =>
        video.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Apply tags filter if any tags are selected
    if (selectedTags.length > 0) {
      filteredVideos = filteredVideos.filter((video) =>
        selectedTags.every((tag) => video.tags?.includes(tag))
      );
    }

    setVideoList(filteredVideos);
  }, [selectedGenre, selectedTags, videos]);

  // Handle genre selection
  const handleGenreSelect = (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre);
  };

  // Handle tag selection
  const handleTagSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSelectedGenre('');
    setSelectedTags([]);
  };

  return (
    <div>
      <HeroSlider videos={slideshowVideos} />
      <div className="flex gap-10 p-6 md:p-10 md:px-20">
        <div className="flex-1 space-y-14">
          <VideoListSection videos={videoList} />
        </div>
        <div className="flex-[0.3] space-y-10 hidden md:block">
          {/* Genres Filter */}
          <Paper variant="outlined">
            <div className="flex justify-between items-center">
              <Typography variant="body1" fontWeight={600} p={2}>
                Genres
              </Typography>
              <div className="px-2">
                <Chip
                  label="Clear Filter"
                  variant={selectedGenre === '' ? 'filled' : 'outlined'}
                  onClick={() => setSelectedGenre('')}
                  size="small"
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
                  onClick={() => handleGenreSelect(genre)}
                />
              ))}
            </div>
          </Paper>

          {/* Tags Filter */}
          {tags.length > 0 && (
            <Paper variant="outlined">
              <div className="flex justify-between items-center">
                <Typography variant="body1" fontWeight={600} p={2}>
                  Tags
                </Typography>
                <div className="px-2">
                  <Chip
                    label="Clear Tags"
                    variant={selectedTags.length === 0 ? 'filled' : 'outlined'}
                    onClick={() => setSelectedTags([])}
                    size="small"
                  />
                </div>
              </div>
              <Divider />
              <div className="p-2">
                {tags.map((tag) => (
                  <Chip
                    sx={{ margin: 1 }}
                    key={tag}
                    label={tag}
                    color={selectedTags.includes(tag) ? 'primary' : 'default'}
                    variant={selectedTags.includes(tag) ? 'filled' : 'outlined'}
                    onClick={() => handleTagSelect(tag)}
                  />
                ))}
              </div>
            </Paper>
          )}

          {/* Clear All Filters Button */}
          {(selectedGenre || selectedTags.length > 0) && (
            <div className="flex justify-center mt-4">
              <Chip
                label="Clear All Filters"
                color="primary"
                onClick={clearAllFilters}
                sx={{ fontWeight: 'bold' }}
              />
            </div>
          )}
        </div>
      </div>
      <Divider />
    </div>
  );
}

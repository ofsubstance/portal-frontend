import {
  Chip,
  Divider,
  Paper,
  Typography,
  Box,
  Button,
  Container,
  Grid,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import HeroSlider from '@/components/user/home/HeroSlider';
import VideoListSection from '@/components/user/home/VideoListSection';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import { useEffect, useState } from 'react';
import { VideoDto } from '@/dtos/video.dto';
import { useAuth } from '@/hooks/useAuth';

export default function UserLandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { useVideoListQuery } = useVideoManagementActions();
  const { user } = useAuth();
  const { data: videos = [] } = useVideoListQuery();

  const [videoList, setVideoList] = useState<VideoDto[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState<boolean>(!isMobile);

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

      {/* Welcome Section */}
      <Container maxWidth="xl" sx={{ mt: 4, mb: 2 }}>
        <Box sx={{ py: 2 }}>
          <Typography variant="h4" fontWeight={600} gutterBottom>
            Welcome{user?.firstname ? `, ${user.firstname}` : ''}!
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Discover inspiring films and stories that matter.
          </Typography>
        </Box>
      </Container>

      {/* Main Content Area */}
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          {/* Video List */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 4 }}>
              <VideoListSection videos={videoList} />
            </Box>
          </Grid>

          {/* Filters Panel - Moved to the right */}
          <Grid item xs={12} md={3}>
            {(showFilters || !isMobile) && (
              <Box className="space-y-6 sticky" sx={{ top: 20 }}>
                <Typography variant="h6" fontWeight={600}>
                  Refine Your Search
                </Typography>

                {/* Genres Filter */}
                <Paper variant="outlined" sx={{ mb: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 2,
                    }}
                  >
                    <Typography variant="body1" fontWeight={600}>
                      Genres
                    </Typography>
                    {selectedGenre && (
                      <Chip
                        label="Clear"
                        variant="outlined"
                        onClick={() => setSelectedGenre('')}
                        size="small"
                      />
                    )}
                  </Box>
                  <Divider />
                  <Box sx={{ p: 2 }}>
                    {genres.map((genre) => (
                      <Chip
                        sx={{ margin: 0.5 }}
                        key={genre}
                        label={genre}
                        color={selectedGenre === genre ? 'primary' : 'default'}
                        variant={
                          selectedGenre === genre ? 'filled' : 'outlined'
                        }
                        onClick={() => handleGenreSelect(genre)}
                      />
                    ))}
                  </Box>
                </Paper>

                {/* Tags Filter */}
                {tags.length > 0 && (
                  <Paper variant="outlined" sx={{ mb: 3 }}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: 2,
                      }}
                    >
                      <Typography variant="body1" fontWeight={600}>
                        Tags
                      </Typography>
                      {selectedTags.length > 0 && (
                        <Chip
                          label="Clear"
                          variant="outlined"
                          onClick={() => setSelectedTags([])}
                          size="small"
                        />
                      )}
                    </Box>
                    <Divider />
                    <Box sx={{ p: 2 }}>
                      {tags.map((tag) => (
                        <Chip
                          sx={{ margin: 0.5 }}
                          key={tag}
                          label={tag}
                          color={
                            selectedTags.includes(tag) ? 'primary' : 'default'
                          }
                          variant={
                            selectedTags.includes(tag) ? 'filled' : 'outlined'
                          }
                          onClick={() => handleTagSelect(tag)}
                        />
                      ))}
                    </Box>
                  </Paper>
                )}

                {/* Clear All Filters Button */}
                {(selectedGenre || selectedTags.length > 0) && (
                  <Button
                    variant="outlined"
                    fullWidth
                    onClick={clearAllFilters}
                    sx={{ mb: 3 }}
                  >
                    Clear All Filters
                  </Button>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Container>

      <Divider sx={{ mt: 4 }} />
    </div>
  );
}

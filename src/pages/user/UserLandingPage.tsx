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
  TextField,
  InputAdornment,
} from '@mui/material';
import HeroSlider from '@/components/user/home/HeroSlider';
import VideoListSection from '@/components/user/home/VideoListSection';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import { useEffect, useState, useMemo } from 'react';
import { VideoDto } from '@/dtos/video.dto';
import { useAuth } from '@/hooks/useAuth';
import { RiSearchLine as SearchIcon } from 'react-icons/ri';

export default function UserLandingPage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { useVideoListQuery } = useVideoManagementActions();
  const { user } = useAuth();
  const { data: videos = [], isLoading: isLoadingVideos } = useVideoListQuery();

  const [videoList, setVideoList] = useState<VideoDto[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [showFilters] = useState<boolean>(!isMobile);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    setVideoList(videos);
  }, [videos]);

  const slideshowVideos = useMemo(() => {
    return videos.filter((video) => video.slideshow);
  }, [videos]);

  // Extract unique genres with memoization
  const genres = useMemo(() => {
    return Array.from(
      new Set(
        videos
          .map((video) => video.genre.split(','))
          .flat()
          .map((g) => g.trim())
      )
    );
  }, [videos]);

  // Extract unique tags from all videos with memoization
  const tags = useMemo(() => {
    return Array.from(new Set(videos.flatMap((video) => video.tags || [])));
  }, [videos]);

  // Memoized filtered videos
  const filteredVideos = useMemo(() => {
    let filtered = [...videos];

    // Apply search query filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((video) =>
        video.title.toLowerCase().includes(query) ||
        video.short_desc.toLowerCase().includes(query) ||
        video.genre.toLowerCase().includes(query) ||
        video.tags?.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply genre filter if selected
    if (selectedGenre) {
      filtered = filtered.filter((video) =>
        video.genre.toLowerCase().includes(selectedGenre.toLowerCase())
      );
    }

    // Apply tags filter if any tags are selected
    if (selectedTags.length > 0) {
      filtered = filtered.filter((video) =>
        selectedTags.every((tag) => video.tags?.includes(tag))
      );
    }

    return filtered;
  }, [videos, searchQuery, selectedGenre, selectedTags]);

  // Update video list when filters change
  useEffect(() => {
    setVideoList(filteredVideos);
  }, [filteredVideos]);

  // Handle genre selection
  const handleGenreSelect = useMemo(() => (genre: string) => {
    setSelectedGenre(genre === selectedGenre ? '' : genre);
  }, [selectedGenre]);

  // Handle tag selection
  const handleTagSelect = useMemo(() => (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  // Clear all filters
  const clearAllFilters = useMemo(() => () => {
    setSelectedGenre('');
    setSelectedTags([]);
  }, []);

  return (
    <div>
      {!isMobile && <HeroSlider videos={slideshowVideos} />}

      {/* Welcome Section */}
      <Container maxWidth="xl" sx={{ mt: isMobile ? 8 : 4, mb: 2 }}>
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
        {/* Search Bar */}
        <Box sx={{ mb: 4 }}>
          <TextField
            fullWidth
            placeholder="Search videos by title, description, genre, or tags..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon size={20} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: 2,
                backgroundColor: 'background.paper',
                '&:hover': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                  },
                },
                '&.Mui-focused': {
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'primary.main',
                    borderWidth: 2,
                  },
                },
              },
            }}
          />
        </Box>

        <Grid container spacing={3}>
          {/* Video List */}
          <Grid item xs={12} md={9}>
            <Box sx={{ mb: 4 }}>
              <VideoListSection videos={videoList} isLoading={isLoadingVideos} />
            </Box>
          </Grid>

          {/* Filters Panel - Moved to the right */}
          <Grid item xs={12} md={3}>
            {(showFilters || !isMobile) && (
              <Box className="space-y-4 md:space-y-6 sticky" sx={{ top: 20 }}>
                <Typography variant="h6" fontWeight={600} className="text-sm md:text-base">
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
                    <Box sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: 1,
                      justifyContent: isMobile ? 'center' : 'flex-start'
                    }}>
                      {genres.map((genre) => (
                        <Chip
                          key={genre}
                          label={genre}
                          size={isMobile ? "small" : "medium"}
                          color={selectedGenre === genre ? 'primary' : 'default'}
                          variant={
                            selectedGenre === genre ? 'filled' : 'outlined'
                          }
                          onClick={() => handleGenreSelect(genre)}
                          sx={{
                            margin: 0.5,
                            fontSize: isMobile ? '0.75rem' : '0.875rem'
                          }}
                        />
                      ))}
                    </Box>
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
                      <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 1,
                        justifyContent: isMobile ? 'center' : 'flex-start'
                      }}>
                        {tags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size={isMobile ? "small" : "medium"}
                            color={
                              selectedTags.includes(tag) ? 'primary' : 'default'
                            }
                            variant={
                              selectedTags.includes(tag) ? 'filled' : 'outlined'
                            }
                            onClick={() => handleTagSelect(tag)}
                            sx={{
                              margin: 0.5,
                              fontSize: isMobile ? '0.75rem' : '0.875rem'
                            }}
                          />
                        ))}
                      </Box>
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

import React, { useMemo, useState } from 'react';
import {
  RiVideoAddLine as AddVideoIcon,
  RiSearchLine as SearchIcon,
} from 'react-icons/ri';
import {
  Button,
  Grid,
  IconButton,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

import VideoGridItem from '@/components/videoItem/VideoGridItem';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import videoManagementImg from '@/assets/videoManagement.svg';

function VideoManagementPage() {
  const navigate = useNavigate();
  const { useVideoListQuery } = useVideoManagementActions();

  const { data: videosList = [] } = useVideoListQuery();

  // Search and filtering state
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState('title');

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [videosPerPage] = useState(9);

  // Sorting state
  const [sortBy, setSortBy] = useState('uploadDate');

  // Memoized filtering and sorting
  const processedVideos = useMemo(() => {
    let filteredVideos = videosList;

    // Filter videos based on search term and type
    if (searchTerm) {
      filteredVideos = filteredVideos.filter((video) => {
        const searchValue = searchTerm.toLowerCase();
        if (searchType === 'title') {
          return video.title.toLowerCase().includes(searchValue);
        } else if (searchType === 'genre') {
          return video.genre.toLowerCase().includes(searchValue);
        }
        return true;
      });
    }

    // Sort videos
    filteredVideos.sort((a, b) => {
      if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      }
      // Default to upload date (assuming video objects have an uploadDate property)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

    return filteredVideos;
  }, [videosList, searchTerm, searchType, sortBy]);

  // Pagination logic
  const indexOfLastVideo = currentPage * videosPerPage;
  const indexOfFirstVideo = indexOfLastVideo - videosPerPage;
  const currentVideos = processedVideos.slice(
    indexOfFirstVideo,
    indexOfLastVideo
  );

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: React.SetStateAction<number>
  ) => {
    setCurrentPage(value);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Header Section */}
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Video Management
          </Typography>

          <Typography variant="subtitle1">
            Manage films or upload new ones
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddVideoIcon />}
            size="large"
            fullWidth
            onClick={() => navigate('/admin/video-management/upload')}
          >
            Upload Video
          </Button>
        </div>
        <object
          role="img"
          type="image/svg+xml"
          data={videoManagementImg}
          className="max-h-48"
        />
      </Paper>

      {/* Video List Management Section */}
      <Paper className="px-4 py-3 space-y-4">
        <div className="flex gap-5 items-center md:flex-row flex-col">
          <Typography variant="h6" fontWeight={600}>
            Video List
          </Typography>

          {/* Search and Filter Controls */}
          <div className="flex items-center justify-center">
            <Select
              variant="outlined"
              size="small"
              value={searchType}
              autoWidth
              onChange={(e) => setSearchType(e.target.value)}
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                bgcolor: 'action.hover',
              }}
            >
              <MenuItem value="title">Title</MenuItem>
              <MenuItem value="genre">Genre</MenuItem>
            </Select>

            <TextField
              variant="outlined"
              placeholder="Search for videos"
              size="small"
              sx={{ maxWidth: 300 }}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1); // Reset to first page on new search
              }}
              InputProps={{
                endAdornment: (
                  <IconButton edge="end">
                    <SearchIcon />
                  </IconButton>
                ),
                sx: {
                  borderTopLeftRadius: 0,
                  borderBottomLeftRadius: 0,
                },
              }}
            />
          </div>

          {/* Sorting Tabs */}
          <Tabs
            value={sortBy}
            onChange={(e, newValue) => setSortBy(newValue)}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              ml: {
                lg: 'auto',
              },
            }}
          >
            <Tab value="uploadDate" label="Upload Date" />
            <Tab value="title" label="Title" />
          </Tabs>
        </div>

        {/* Video Grid */}
        {currentVideos.length > 0 ? (
          <Grid
            container
            rowSpacing={5}
            columnSpacing={3}
            columns={{ md: 2, lg: 3, xs: 1 }}
          >
            {currentVideos.map((video) => (
              <Grid item xs={1} key={video.id}>
                <Link to={`/admin/video-management/${video.id}`}>
                  <VideoGridItem data={video} />
                </Link>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            variant="body1"
            align="center"
            color="textSecondary"
            className="py-8"
          >
            No videos found
          </Typography>
        )}

        {/* Pagination */}
        {processedVideos.length > 0 && (
          <Pagination
            count={Math.ceil(processedVideos.length / videosPerPage)}
            page={currentPage}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
            color="primary"
            sx={{
              display: 'flex',
              justifyContent: 'center',
              py: 2,
            }}
          />
        )}
      </Paper>
    </div>
  );
}

export default VideoManagementPage;

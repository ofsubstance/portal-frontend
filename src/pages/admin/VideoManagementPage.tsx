import {
  RiVideoAddLine as AddVideoIcon,
  RiSearchLine as SearchIcon,
} from "react-icons/ri";
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
} from "@mui/material";

import VideoGridItem from "@/components/videoItem/VideoGridItem";
import { useNavigate } from "react-router-dom";
import videoManagementImg from "@/assets/videoManagement.svg";

function VideoManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-8 md:py-0 py-8">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Video Management
          </Typography>

          <Typography variant="subtitle1">
            Manage your videos or upload new ones
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddVideoIcon />}
            size="large"
            fullWidth
            onClick={() => navigate("/video-management/upload")}
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

      <Paper className="px-8 py-4 space-y-6">
        <div className="flex gap-5 items-center md:flex-row flex-col">
          <Typography variant="h6" fontWeight={600}>
            Video List
          </Typography>

          <div className="flex items-center justify-center">
            <Select
              variant="outlined"
              size="small"
              autoWidth
              defaultValue={"title"}
              sx={{
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
                bgcolor: "action.hover",
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

          <Tabs
            value="1"
            onChange={() => {}}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            sx={{
              ml: {
                lg: "auto",
              },
            }}
          >
            <Tab value="1" label="Upload Date" />
            <Tab value="2" label="Title" />
          </Tabs>
        </div>

        <Grid
          container
          rowSpacing={5}
          columnSpacing={3}
          columns={{ md: 2, lg: 3, xs: 1 }}
        >
          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={1} key={index}>
              <VideoGridItem />
            </Grid>
          ))}
        </Grid>

        <Pagination
          count={10}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{
            display: "flex",
            justifyContent: "center",
            py: 2,
          }}
        />
      </Paper>
    </div>
  );
}

export default VideoManagementPage;

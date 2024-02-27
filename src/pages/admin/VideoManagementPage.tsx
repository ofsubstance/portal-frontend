import {
  Button,
  Grid,
  Pagination,
  Paper,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";

import { RiVideoAddLine as AddVideoIcon } from "react-icons/ri";
import VideoItem from "@/components/videoManagement/VideoItem";
import { useNavigate } from "react-router-dom";
import videoManagementImg from "@/assets/videoManagement.svg";

function VideoManagementPage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-8 md:py-0 py-8">
        <div className="space-y-4 text-slate-500">
          <Typography variant="h5" fontWeight={600}>
            Video Management
          </Typography>

          <Typography variant="subtitle1">
            Manage your videos or upload new ones
          </Typography>

          <Button
            variant="contained"
            startIcon={<AddVideoIcon />}
            disableElevation
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
        <div className="flex gap-5 justify-between items-center md:flex-row flex-col">
          <Typography variant="h6" fontWeight={600} className="text-slate-500">
            Video List
          </Typography>

          <Tabs
            value="1"
            onChange={() => {}}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab value="1" label="Upload Date" />
            <Tab value="2" label="Title" />
            <Tab value="3" label="Duration" />
          </Tabs>
        </div>

        <Grid
          container
          rowSpacing={5}
          columnSpacing={2}
          columns={{ md: 2, lg: 3, xs: 1 }}
        >
          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={1} key={index}>
              <VideoItem />
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

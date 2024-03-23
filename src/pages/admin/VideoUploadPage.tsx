import {
  Button,
  MenuItem,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";

import MediaDrop from "@/components/common/input/MediaDrop";
import { RiVideoUploadFill as VideoIcon } from "react-icons/ri";

function MetaDataSection() {
  return (
    <Paper className="w-full p-4 space-y-4">
      <Typography variant="h6">Meta Data</Typography>
      <Typography variant="body1" fontWeight={600}>
        Thumbnail
      </Typography>
      <MediaDrop variant="image" />
      <TextField label="Title" variant="outlined" fullWidth />
      <TextField
        label="Genre"
        variant="outlined"
        fullWidth
        helperText="Separate multiple genres with a comma"
      />
      <TextField label="Duration (MM:SS)" variant="outlined" fullWidth />
      <TextField label="Video Quality" variant="outlined" fullWidth select>
        {["1080p", "720p", "480p", "360p"].map((quality) => (
          <MenuItem key={quality} value={quality}>
            {quality}
          </MenuItem>
        ))}
      </TextField>
    </Paper>
  );
}

function DetailsSection() {
  return (
    <Paper className="w-full p-4 space-y-4">
      <Typography variant="h6">Details</Typography>
      <TextField
        label="About"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
      />
      <TextField
        label="Primary Lesson"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
      />
      <TextField
        label="Theme"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
      />
      <TextField
        label="Story Impact"
        variant="outlined"
        fullWidth
        multiline
        rows={5}
      />
    </Paper>
  );
}

function VideoUploadPage() {
  const theme = useTheme();

  return (
    <div className="flex flex-col gap-4 pb-10">
      <Typography variant="h5" fontWeight={600}>
        <VideoIcon
          className="inline-block mr-3"
          size={40}
          color={theme.palette.primary.main}
        />
        Video Upload
      </Typography>

      <MediaDrop
        variant="video"
        maxSizeMB={500}
        onChange={(file) => console.log(file)}
      />

      <div className="flex gap-4 lg:flex-row flex-col">
        <MetaDataSection />
        <DetailsSection />
      </div>

      <Button variant="contained" size="large" fullWidth>
        Upload Video
      </Button>
    </div>
  );
}

export default VideoUploadPage;

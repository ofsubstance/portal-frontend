import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
} from "@mui/material";
import {
  RiCalendarLine as CalendarIcon,
  RiDeleteBinLine as DeleteIcon,
  RiDownload2Line as DownloadIcon,
  RiTimeLine as DurationIcon,
  RiEdit2Line as EditIcon,
  RiArrowDownSLine as ExpandMoreIcon,
  RiPlayCircleLine as PlayIcon,
} from "react-icons/ri";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useState } from "react";
import { videoData } from "@/data/dummyData";

dayjs.extend(relativeTime);

interface VideoDescriptionItemProps {
  title: string;
  details: string;
}

function VideoDescriptionItem({ title, details }: VideoDescriptionItemProps) {
  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{
        backgroundColor: "transparent",
        boxShadow: "none",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon size={24} />}
        sx={{ px: 0 }}
      >
        <Typography variant="h6" fontWeight={600}>
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 0 }}>{details}</AccordionDetails>
    </Accordion>
  );
}

function VideoDetailsPage() {
  const [videoPlay, setVideoPlay] = useState(false);

  const [data, setData] = useState(videoData);

  return (
    <div className="space-y-8 text-slate-600">
      {videoPlay && (
        <video controls className="w-full rounded-md aspect-video">
          <source src={data.videoData[0].url} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      )}

      <div className="flex gap-10 flex-col lg:flex-row">
        <div className="space-y-4">
          <img
            className="rounded-md w-[700px] object-cover"
            src={data.thumbnail}
            alt="thumbnail"
          />

          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayIcon />}
            onClick={() => setVideoPlay(true)}
          >
            Watch Video
          </Button>

          <Button variant="outlined" fullWidth startIcon={<DownloadIcon />}>
            Download Video
          </Button>

          <div className="flex gap-2">
            <Button
              variant="contained"
              color={"info"}
              fullWidth
              startIcon={<EditIcon />}
            >
              Edit
            </Button>

            <Button
              variant="contained"
              color={"error"}
              fullWidth
              startIcon={<DeleteIcon />}
            >
              Delete
            </Button>
          </div>
        </div>

        <div className="space-y-8">
          <Typography variant="h4" fontWeight={600}>
            {data.title}
          </Typography>
          <div className="space-y-4">
            <Typography variant="body1" className="flex items-center gap-2">
              <CalendarIcon size={20} /> Published on{" "}
              {dayjs(data.createdAt).format("MMMM DD, YYYY h:mm A")}
            </Typography>
            <Typography variant="body1" className="flex items-center gap-2">
              <CalendarIcon size={20} /> Last updated{" "}
              {dayjs(data.updatedAt).fromNow()}
            </Typography>
            <Typography variant="body1" className="flex items-center gap-2">
              <DurationIcon size={20} /> Duration:{" "}
              {Math.floor(data.duration / 60)} min
            </Typography>
          </div>
          <div className="space-y-2">
            <Typography variant="h6" fontWeight={600}>
              Genres
            </Typography>
            <div className="flex gap-2 flex-wrap">
              {data.genre.map((genre) => (
                <Chip key={genre} label={genre} />
              ))}
            </div>
          </div>

          <div>
            <VideoDescriptionItem title="About" details={data.about} />

            <VideoDescriptionItem
              title="Primary Lesson"
              details={data.primaryLesson}
            />

            <VideoDescriptionItem title="Theme" details={data.theme} />

            <VideoDescriptionItem title="Impact" details={data.impact} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default VideoDetailsPage;

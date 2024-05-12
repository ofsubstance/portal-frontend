import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Toolbar,
  Typography,
} from "@mui/material";
import {
  RiArrowRightSLine as ArrowRightIcon,
  RiArrowDownSLine as ExpandMoreIcon,
  RiPlayCircleLine as PlayIcon,
} from "react-icons/ri";

import VideoGridItem from "@/components/videoItem/VideoGridItem";
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
        color: "white",
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon size={24} className="text-white" />}
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

export default function VideoDetailsPage() {
  const [data, setData] = useState(videoData);

  return (
    <div>
      <div
        className="bg-cover bg-center text-white"
        style={{ backgroundImage: `url(${data.thumbnail})` }}
      >
        <Toolbar />
        <div className="backdrop-filter backdrop-blur-md flex bg-black bg-opacity-20">
          <div className="w-1/3 space-y-6 p-20 bg-white backdrop-filter backdrop-blur-md bg-opacity-15">
            <img
              className="rounded-md w-full object-cover"
              src={data.thumbnail}
              alt="thumbnail"
            />

            <div className="flex gap-2">
              <Button
                variant="contained"
                color="ghost"
                fullWidth
                startIcon={<PlayIcon />}
              >
                Watch Trailer
              </Button>

              <Button variant="contained" fullWidth startIcon={<PlayIcon />}>
                Watch Video
              </Button>
            </div>

            <Typography variant="subtitle1" fontWeight={300}>
              <span className="font-semibold">Title: </span>
              {data.title}
            </Typography>

            <Typography variant="subtitle1" fontWeight={300}>
              <span className="font-semibold">Publish Date: </span>
              {dayjs(data.createdAt).format("MMMM DD, YYYY")}
            </Typography>

            <Typography variant="subtitle1" fontWeight={300}>
              <span className="font-semibold">Last Updated: </span>
              {dayjs(data.updatedAt).fromNow()}
            </Typography>

            <Typography variant="subtitle1" fontWeight={300}>
              <span className="font-semibold">Duration: </span>
              {Math.floor(data.duration / 60)} min
            </Typography>

            <Typography
              variant="subtitle1"
              fontWeight={300}
              className="flex gap-2 flex-wrap"
            >
              <span className="font-semibold">Genres: </span>
              {data.genre.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                />
              ))}
            </Typography>
          </div>
          {/* {videoPlay && (
            <div className="p-20 mx-auto space-y-6 w-full">
              <video controls className="w-full rounded-md aspect-video">
                <source src={data.videoData[0].url} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          )} */}

          <div className="p-20 mx-auto space-y-6">
            <Typography variant="h4" fontWeight={600}>
              {data.title}
            </Typography>

            <div className="flex gap-2 flex-wrap">
              {data.genre.map((genre) => (
                <Chip
                  key={genre}
                  label={genre}
                  variant="outlined"
                  sx={{ color: "white", borderColor: "white" }}
                />
              ))}
            </div>

            <Typography variant="body1">{data.summary}</Typography>

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

      <div className="space-y-6 p-20">
        <Typography
          variant="h6"
          fontWeight={600}
          className="flex items-center gap-2 cursor-pointer hover:gap-4 transition-[gap]"
        >
          Recommended For You <ArrowRightIcon size={30} />
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from(Array(4)).map((_, index) => (
            <VideoGridItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

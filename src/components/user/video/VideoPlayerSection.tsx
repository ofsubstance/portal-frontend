import { Chip, Fab, Typography } from "@mui/material";
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiFeedbackLine as FeedbackIcon,
} from "react-icons/ri";

import { IVideo } from "@/data/dummyData";
import Vimeo from "@u-wave/react-vimeo";

interface VideoPlayerSectionProps {
  data: IVideo;
}

export default function VideoPlayerSection({ data }: VideoPlayerSectionProps) {
  return (
    <div className="flex md:flex-row flex-col items-start gap-8 p-6">
      <div className="flex-1 w-full">
        <Vimeo
          video={"https://vimeo.com/862974723/04dbe39eaf?share=copy"}
          responsive={true}
        />
      </div>
      <div className="flex flex-col items-start gap-6 flex-[0.4]">
        <img
          className="rounded-md w-3/5 object-cover"
          src={data.thumbnail}
          alt="thumbnail"
        />

        <Typography variant="h4">{data.title}</Typography>

        <div className="flex gap-4 items-center">
          <Typography variant="body1" className="flex gap-2">
            <CalendarIcon size={20} />
            {data.createdAt.toDateString()}
          </Typography>

          <Typography variant="body1" className="flex gap-2">
            <ClockIcon size={20} />
            {data.duration}
          </Typography>
        </div>
        <div className="flex gap-2">
          {data.genre.map((genre) => (
            <Chip
              key={genre}
              label={genre}
              variant="outlined"
              sx={{
                borderColor: "white",
                color: "white",
              }}
            />
          ))}
        </div>
        <Typography variant="body1">{data.summary}</Typography>

        <Fab variant="extended" size="large" color="primary">
          <FeedbackIcon size={20} className="mr-2" />
          Leave A Feedback
        </Fab>
      </div>
    </div>
  );
}

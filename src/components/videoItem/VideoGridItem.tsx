import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiLock2Fill as LockIcon,
} from "react-icons/ri";
import { Chip, Typography } from "@mui/material";

import { VideoDto } from "@/dtos/video.dto";
import dayjs from "dayjs";

interface VideoGridItemProps {
  data: VideoDto;
}

export default function VideoGridItem({ data }: VideoGridItemProps) {
  return (
    <div className="cursor-pointer [&:hover_.bg-gradient-to-t]:m-0 [&:hover_.bg-gradient-to-t]:pt-3">
      <div
        className="relative w-full h-56 rounded-xl overflow-clip drop-shadow-lg shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${data.thumbnail_url})` }}
      >
        <div className="absolute inset-0 p-3 pt-32 mt-16 flex flex-col gap-2 bg-gradient-to-t from-black transition-all duration-300">
          <Typography variant="body1" className="flex gap-2 text-white ">
            <ClockIcon size={20} />
            {data.duration} min
            <LockIcon size={22} className="ml-auto" />
          </Typography>

          <div className="flex gap-1 flex-wrap">
            {data.genre.split(",").map((genre) => (
              <Chip
                key={genre}
                label={genre.trim()}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                }}
              />
            ))}
          </div>

          <Typography variant="body1" className="text-white line-clamp-5">
            {data.short_desc}
          </Typography>
        </div>
      </div>

      <div className="pt-3 flex gap-2 justify-between">
        <Typography variant="h6" fontWeight={600}>
          {data.title}
        </Typography>

        {/* <VideoItemMenu /> */}
      </div>

      <Typography
        variant="subtitle1"
        color="text.secondary"
        className="flex gap-2 items-center"
      >
        <CalendarIcon size={20} />
        {dayjs(data.createdAt).format("MMMM DD, YYYY")}
      </Typography>
    </div>
  );
}

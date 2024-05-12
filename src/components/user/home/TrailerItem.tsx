import {
  RiCalendar2Line as CalendarIcon,
  RiPlayFill as PlayIcon,
} from "react-icons/ri";
import { Chip, Typography } from "@mui/material";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { videoData } from "@/data/dummyData";

export default function TrailerItem() {
  const navigate = useNavigate();

  const [data, setData] = useState(videoData);

  return (
    <div
      className="flex gap-4 cursor-pointer [&:hover_.bg-opacity-0]:bg-opacity-40 [&:hover_.opacity-0]:opacity-100"
      onClick={() => navigate("/admin/video-management/details/1")}
    >
      <div className="relative h-24 aspect-video rounded-md overflow-clip">
        <img src={data.thumbnail} alt="thumbnail" className="object-cover" />

        <div className="absolute grid place-content-center inset-0 bg-black bg-opacity-0 transition-[background] duration-500">
          <PlayIcon
            size={40}
            className="text-white opacity-0 transition-opacity duration-500"
          />
        </div>

        <Chip
          size="small"
          className="absolute bottom-2 right-2"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white" }}
          label={`${Math.floor(data.duration / 60)} min`}
        />
      </div>

      <div className="flex flex-col gap-2 flex-1">
        <Typography variant="body1" fontWeight={600}>
          {data.title}
        </Typography>

        <Typography variant="subtitle2" className="inline-flex gap-2">
          <CalendarIcon size={20} />
          {dayjs(data.createdAt).format("MMMM DD, YYYY h:mm A")}
        </Typography>
      </div>
    </div>
  );
}

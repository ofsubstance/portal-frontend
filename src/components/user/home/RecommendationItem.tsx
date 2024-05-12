import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
} from "react-icons/ri";
import { Chip, Typography } from "@mui/material";

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { videoData } from "@/data/dummyData";

export default function RecommendationItem() {
  const navigate = useNavigate();

  const [data, setData] = useState(videoData);

  return (
    <div
      className="space-y-2 cursor-pointer"
      onClick={() => navigate("/admin/video-management/details/1")}
    >
      <div
        className="relative w-full h-60 rounded-xl overflow-clip drop-shadow-lg shadow-lg bg-cover bg-center"
        style={{ backgroundImage: `url(${data.thumbnail})` }}
      >
        <div className="absolute inset-0 p-3 pt-36 mt-16 flex flex-col gap-2 bg-gradient-to-t from-black hover:m-0 hover:pt-3 transition-all duration-300">
          <Typography variant="body1" className="flex gap-2 text-white ">
            <ClockIcon size={20} />
            {data.duration / 60} min
          </Typography>

          <div className="flex gap-1 flex-wrap">
            {data.genre.map((g) => (
              <Chip
                key={g}
                label={g}
                size="small"
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                }}
              />
            ))}
          </div>

          <Typography variant="body1" className="text-white line-clamp-6">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
            velit, vulputate eu pharetra nec, mattis ac neque. Lorem ipsum dolor
            sit amet, consectetur adipiscing elit.
          </Typography>
        </div>
      </div>

      <Typography variant="h6" fontWeight={600}>
        {data.title}
      </Typography>

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

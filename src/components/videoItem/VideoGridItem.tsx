import { Chip, Typography } from "@mui/material";

import VideoItemMenu from "@/components/menu/VideoItemMenu";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { videoData } from "@/data/dummyData";

function VideoGridItem() {
  const navigate = useNavigate();

  const [data, setData] = useState(videoData);

  return (
    <div
      className="space-y-2 cursor-pointer"
      onClick={() => navigate("/admin/video-management/details/1")}
    >
      <div className="relative">
        <img
          src={data.thumbnail}
          alt="thumbnail"
          className="w-full h-44 object-cover rounded-lg"
        />

        <Chip
          className="absolute bottom-2 right-2"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white" }}
          label={`${Math.floor(data.duration / 60)} min`}
        />
      </div>

      <div className="space-y-1">
        <div className="flex gap-2 justify-between">
          <Typography variant="h6" fontWeight={600}>
            {data.title}
          </Typography>

          <VideoItemMenu />
        </div>
        <Typography variant="subtitle1" color="text.secondary">
          {dayjs(data.createdAt).format("MMMM DD, YYYY h:mm A")}
        </Typography>
        <div className="flex gap-1 pt-2 flex-wrap">
          {data.genre.map((g) => (
            <Chip key={g} label={g} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VideoGridItem;

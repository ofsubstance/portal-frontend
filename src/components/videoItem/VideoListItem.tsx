import { Chip, Theme, Typography, useMediaQuery } from "@mui/material";

import VideoGridItem from "./VideoGridItem";
import VideoItemMenu from "@/components/menu/VideoItemMenu";
import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { videoData } from "@/data/dummyData";

function VideoListItem() {
  const navigate = useNavigate();

  const smallScreen = useMediaQuery((theme: Theme) =>
    theme.breakpoints.down("md")
  );

  const [data, setData] = useState(videoData);

  if (smallScreen) {
    return <VideoGridItem />;
  }

  return (
    <div
      className="flex gap-4 cursor-pointer"
      onClick={() => navigate("/admin/video-management/details/1")}
    >
      <div className="relative h-24 aspect-video">
        <img
          src={data.thumbnail}
          alt="thumbnail"
          className="object-cover rounded-md"
        />

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

        <Typography variant="subtitle2">
          {dayjs(data.createdAt).format("MMMM DD, YYYY h:mm A")}
        </Typography>

        <div className="flex gap-1 flex-wrap mt-auto">
          {data.genre.map((g) => (
            <Chip key={g} label={g} />
          ))}
        </div>
      </div>
      <VideoItemMenu />
    </div>
  );
}

export default VideoListItem;

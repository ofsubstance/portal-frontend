import { RiArrowRightSLine as ArrowRightIcon } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import VideoGridItem from "@/components/videoItem/VideoGridItem";
import useVideoManagementActions from "@/hooks/useVideoManagementAction";

export default function UnlockVideoSection() {
  const { useVideoListQuery } = useVideoManagementActions();

  const { data: videos = [] } = useVideoListQuery();

  return (
    <div className="space-y-6">
      <Typography
        variant="h6"
        fontWeight={600}
        className="flex items-center gap-2 cursor-pointer hover:gap-4 transition-[gap]"
      >
        More Flims You Can Unlock <ArrowRightIcon size={30} />
      </Typography>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {videos.slice(0, 3).map((video) => (
          <Link key={video.id} to={"/video/" + video.id}>
            <VideoGridItem data={video} />
          </Link>
        ))}
      </div>
    </div>
  );
}

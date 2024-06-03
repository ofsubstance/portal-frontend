import { RiArrowRightSLine as ArrowRightIcon } from "react-icons/ri";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import VideoGridItem from "@/components/videoItem/VideoGridItem";

export default function UnlockVideoSection() {
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
        {Array.from(Array(3)).map((_, index) => (
          <Link key={index} to="/video/1">
            <VideoGridItem />
          </Link>
        ))}
      </div>
    </div>
  );
}

import { Link, useParams, useSearchParams } from "react-router-dom";
import { Toolbar, Typography } from "@mui/material";

import { RiArrowRightSLine as ArrowRightIcon } from "react-icons/ri";
import FlimFeedbackForm from "@/components/user/feedback/FlimFeedbackForm";
import GeneralFeedbackForm from "@/components/user/feedback/GeneralFeedbackForm";
import { ModalHookLayout } from "@/components/common/modal/ModalLayout";
import VideoCommentItem from "@/components/user/video/VideoCommentItem";
import VideoDetailsHero from "@/components/user/video/VideoDetailsHero";
import VideoGridItem from "@/components/videoItem/VideoGridItem";
import VideoPlayerSection from "@/components/user/video/VideoPlayerSection";
import Vimeo from "@u-wave/react-vimeo";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useModal } from "@ebay/nice-modal-react";
import useVideoManagementActions from "@/hooks/useVideoManagementAction";

dayjs.extend(relativeTime);

export default function VideoDetailsPage() {
  const modal = useModal(ModalHookLayout);
  const { videoId } = useParams();
  const [searchParam, setSearchParam] = useSearchParams();

  const { useVideoQuery } = useVideoManagementActions();

  const { data: video } = useVideoQuery(videoId!);

  const handlePlayClick = () => {
    setSearchParam({ playing: "true" });
  };

  const handlePlayTrailerClick = () => {
    modal.show({
      title: video?.title,
      maxWidth: "lg",
      children: (
        <div className="w-full">
          {video && <Vimeo video={video.trailer_url} responsive={true} />}
        </div>
      ),
    });
  };

  const handleUnlockClick = () => {
    modal.show({
      title: "Submit Feedback To Proceed Unlocking Video",
      children: (
        <GeneralFeedbackForm
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      ),
    });
  };

  const handleFeedbackClick = () => {
    modal.show({
      title: "Feedback on " + video?.title,
      children: (
        <FlimFeedbackForm
          filmTitle={video?.title || ""}
          onSubmit={(data) => {
            console.log(data);
          }}
        />
      ),
    });
  };

  if (!video) return null;

  return (
    <div className="space-y-10">
      <div
        className="bg-cover bg-center text-white min-h-screen"
        style={{ backgroundImage: `url(${video.thumbnail_url})` }}
      >
        <div className="min-h-screen backdrop-filter backdrop-blur-md bg-black bg-opacity-20">
          <Toolbar />
          {searchParam.get("playing") == "true" ? (
            <VideoPlayerSection data={video} onFeedback={handleFeedbackClick} />
          ) : (
            <VideoDetailsHero
              data={video}
              onPlay={handlePlayClick}
              onPlayTrailer={handlePlayTrailerClick}
              onUnlock={handleUnlockClick}
            />
          )}
        </div>
      </div>

      <div className="space-y-6 px-10 md:px-20">
        <Typography
          variant="h6"
          fontWeight={600}
          className="flex items-center gap-2 cursor-pointer hover:gap-4 transition-[gap]"
        >
          Recommended For You <ArrowRightIcon size={30} />
        </Typography>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {Array.from(Array(4)).map((_, index) => (
            <Link key={index} to={`/video/${video.id}`}>
              <VideoGridItem data={video} />
            </Link>
          ))}
        </div>
      </div>

      <div className="px-10 md:px-20 space-y-4">
        <Typography variant="h6" fontWeight={600}>
          Comments
        </Typography>
        <div className="space-y-6">
          {Array.from(Array(5)).map((_, index) => (
            <VideoCommentItem key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

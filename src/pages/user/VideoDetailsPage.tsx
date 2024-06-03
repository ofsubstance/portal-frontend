import { Toolbar, Typography } from "@mui/material";

import { RiArrowRightSLine as ArrowRightIcon } from "react-icons/ri";
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
import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import { videoData } from "@/data/dummyData";

dayjs.extend(relativeTime);

export default function VideoDetailsPage() {
  const modal = useModal(ModalHookLayout);
  const [data, setData] = useState(videoData);
  const [searchParam, setSearchParam] = useSearchParams();

  const handlePlayClick = () => {
    setSearchParam({ playing: "true" });
  };

  const handlePlayTrailerClick = () => {
    modal.show({
      title: data.title,
      maxWidth: "lg",
      children: (
        <div className="w-full">
          <Vimeo
            video={"https://vimeo.com/862974723/04dbe39eaf?share=copy"}
            responsive={true}
          />
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

  return (
    <div className="space-y-10">
      <div
        className="bg-cover bg-center text-white min-h-screen"
        style={{ backgroundImage: `url(${data.thumbnail})` }}
      >
        <div className="min-h-screen backdrop-filter backdrop-blur-md bg-black bg-opacity-20">
          <Toolbar />
          {searchParam.get("playing") == "true" ? (
            <VideoPlayerSection data={data} />
          ) : (
            <VideoDetailsHero
              data={data}
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
            <VideoGridItem key={index} />
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

import { Tab, Tabs, Typography } from "@mui/material";

import { RiArrowRightSLine as ArrowRightIcon } from "react-icons/ri";
import VideoGridItem from "@/components/videoItem/VideoGridItem";

export default function RecommendationSection() {
  return (
    <div className="space-y-6">
      <div className="flex gap-5 md:items-center justify-between flex-col md:flex-row">
        <Typography
          variant="h6"
          fontWeight={600}
          className="flex items-center gap-2 cursor-pointer hover:gap-4 transition-[gap]"
        >
          Our Collection <ArrowRightIcon size={30} />
        </Typography>

        <Tabs
          value="1"
          onChange={() => {}}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
          allowScrollButtonsMobile
          sx={{
            ml: {
              lg: "auto",
            },
          }}
        >
          <Tab value="1" label="Latest" />
          <Tab value="2" label="Popular" />
        </Tabs>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from(Array(3)).map((_, index) => (
          <VideoGridItem key={index} />
        ))}
      </div>
    </div>
  );
}

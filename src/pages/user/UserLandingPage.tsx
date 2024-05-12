import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";

import HeroSlider from "@/components/user/home/HeroSlider";
import Recommendation from "@/components/user/home/RecommendationSection";
import UnlockVideoSection from "@/components/user/home/UnlockVideoSection";
import VideoListItem from "@/components/videoItem/VideoListItem";

export default function UserLandingPage() {
  return (
    <div>
      <HeroSlider />
      <div className="flex gap-10 p-6 md:p-10 md:px-20">
        <div className="flex-1 space-y-14">
          <Recommendation />

          <Divider />

          <UnlockVideoSection />
        </div>
        <div className="flex-[0.4] space-y-10 hidden md:block">
          <Paper variant="outlined">
            <Typography variant="body1" fontWeight={600} p={2}>
              Categories
            </Typography>
            <Divider />

            <div className="p-2">
              {Array.from(Array(14)).map((_, index) => (
                <Chip className="m-2" key={index} label={"Category " + index} />
              ))}
            </div>
          </Paper>

          <Paper variant="outlined">
            <Typography variant="body1" fontWeight={600} p={2}>
              Watch Trailers
            </Typography>
            <Divider />

            <Stack spacing={2} divider={<Divider />} p={2}>
              {Array.from(Array(4)).map((_, index) => (
                <VideoListItem key={index} />
              ))}
            </Stack>
          </Paper>
        </div>
      </div>
    </div>
  );
}

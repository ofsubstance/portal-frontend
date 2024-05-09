import { Chip, Divider, Paper, Stack, Typography } from "@mui/material";

import HeroSlider from "@/components/user/home/HeroSlider";
import Recommendation from "@/components/user/home/Recommendation";
import VideoListItem from "@/components/videoItem/VideoListItem";

export default function UserLandingPage() {
  return (
    <div className="-mt-16">
      <HeroSlider />
      <div className="flex gap-10 px-20 py-10">
        <div className="flex-1">
          <Recommendation />
        </div>
        <div className="flex-[0.4] space-y-10">
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
              Top Videos
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

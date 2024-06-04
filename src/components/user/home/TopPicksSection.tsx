import { Divider, Paper, Stack, Typography } from "@mui/material";

import { PlaylistTag } from "@/constants/enums";
import VideoListItem from "@/components/videoItem/VideoListItem";
import usePlaylistManagementActions from "@/hooks/usePlaylistManagementAction";

export default function TopPicksSection() {
  const { usePlaylistTagQuery } = usePlaylistManagementActions();

  const { data: playlist } = usePlaylistTagQuery(PlaylistTag.TopPicks);
  return (
    <Paper variant="outlined">
      <Typography variant="body1" fontWeight={600} p={2}>
        Top Picks
      </Typography>
      <Divider />

      <Stack spacing={2} divider={<Divider />} p={2}>
        {playlist?.videos.slice(0, 4).map((video) => (
          <VideoListItem key={video.id} data={video} />
        ))}
      </Stack>
    </Paper>
  );
}

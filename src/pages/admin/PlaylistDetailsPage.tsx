import VideoListItem from '@/components/videoItem/VideoListItem';
import { Button, Divider, Paper, Stack, Typography } from '@mui/material';

import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

function PlaylistDetailsPage() {
  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="flex-1 relative">
        <Paper
          className="flex flex-col gap-5 sticky top-20 p-4"
          sx={{
            height: { sm: 'fit-content', md: '90vh' },
            borderRadius: 3,
          }}
        >
          <img
            src="https://s3-alpha.figma.com/hub/file/4248968834/6f12ec81-5d6b-4565-9db1-1b13feca29ae-cover.png"
            alt="playlist"
            className="object-cover rounded-md"
          />

          <Typography variant="h5" fontWeight={600}>
            The Shawshank Redemption
          </Typography>

          <Typography variant="subtitle1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam
            a nunc, aliquet.
          </Typography>

          <Stack
            direction={'row'}
            spacing={1}
            divider={<Divider orientation="vertical" flexItem />}
          >
            <Typography variant="subtitle2">10 videos</Typography>
            <Typography variant="subtitle2">
              Published on {dayjs().format('MMMM D, YYYY')}
            </Typography>
            <Typography variant="subtitle2">
              Updated {dayjs().fromNow()}
            </Typography>
          </Stack>

          <div className="flex gap-2">
            <Button fullWidth variant="contained">
              Edit
            </Button>
            <Button fullWidth variant="contained" color="error">
              Delete
            </Button>
          </div>
        </Paper>
      </div>

      <Stack spacing={2} divider={<Divider />} flex={2}>
        {Array.from(Array(12)).map((_, index) => (
          <VideoListItem key={index} />
        ))}
      </Stack>
    </div>
  );
}

export default PlaylistDetailsPage;

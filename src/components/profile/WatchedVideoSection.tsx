import { Grid, Pagination, Typography } from '@mui/material';

import VideoGridItem from '@/components/videoItem/VideoGridItem';

function WatchedVideoSection() {
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h6" fontWeight={600}>
        Watched Videos
      </Typography>

      <Grid
        container
        rowSpacing={5}
        columnSpacing={3}
        columns={{ md: 2, xs: 1 }}
      >
        {/* {Array.from(Array(12)).map((_, index) => (
          <Grid item xs={1} key={index}>
            <VideoGridItem />
          </Grid>
        ))} */}
      </Grid>

      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{
          display: 'flex',
          justifyContent: 'center',
          py: 2,
        }}
      />
    </div>
  );
}

export default WatchedVideoSection;

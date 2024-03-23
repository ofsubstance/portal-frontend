import { Pagination, Typography } from "@mui/material";

import VideoListItem from "@/components/videoItem/VideoListItem";

function BookmarkedVideoSection() {
  return (
    <div className="flex flex-col gap-6">
      <Typography variant="h6" fontWeight={600}>
        Bookmarked Videos
      </Typography>

      {Array.from(Array(12)).map((_, index) => (
        <VideoListItem key={index} />
      ))}

      <Pagination
        count={10}
        variant="outlined"
        shape="rounded"
        color="primary"
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
        }}
      />
    </div>
  );
}

export default BookmarkedVideoSection;

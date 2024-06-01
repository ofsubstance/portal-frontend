import { Avatar, IconButton, Paper, Typography, alpha } from "@mui/material";
import {
  RiAddFill as AddIcon,
  RiSubtractFill as SubtractIcon,
} from "react-icons/ri";

export default function VideoCommentItem() {
  return (
    <Paper variant="outlined" className="p-4 flex gap-4">
      <Paper
        sx={(theme) => ({
          backgroundColor: alpha(theme.palette.primary.main, 0.15),
          display: "flex",
          height: "fit-content",
          flexDirection: "column",
          background: "primary.light",
          alignItems: "center",
          borderRadius: 100,
          p: "4px",
        })}
      >
        <IconButton size="small">
          <AddIcon size={24} />
        </IconButton>
        <Typography variant="body1" fontWeight={600}>
          12
        </Typography>

        <IconButton size="small">
          <SubtractIcon size={24} />
        </IconButton>
      </Paper>
      <div className="flex flex-col gap-4 flex-1">
        <div className="flex items-center gap-2">
          <Avatar src="https://randomuser.me/api/port" variant="circular" />
          <Typography variant="body1" fontWeight={600}>
            John Doe
          </Typography>

          <Typography variant="body1" color="text.secondary" fontWeight={600}>
            2 hours ago
          </Typography>
        </div>

        <Typography variant="body2">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          euismod bibendum laoreet.
        </Typography>
      </div>
    </Paper>
  );
}

import {
  Chip,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  RiDeleteBin2Line as DeleteIcon,
  RiEdit2Line as EditIcon,
  RiMore2Fill as MoreIcon,
} from "react-icons/ri";
import React, { useState } from "react";

function VideoItem() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchorEl(null);
  };

  return (
    <div className="space-y-2">
      <div className="relative">
        <img
          src="https://uko-react.vercel.app/static/thumbnail/thumbnail-1.png"
          alt="thumbnail"
          className="w-full h-44 object-cover rounded-lg"
        />

        <Chip
          label="2:00:00"
          className="absolute bottom-2 right-2"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white" }}
        />
      </div>

      <div className="space-y-2 text-slate-600">
        <div className="flex gap-2 justify-between">
          <Typography variant="h6" fontWeight={600}>
            The Shawshank Redemption
          </Typography>

          <IconButton
            onClick={handleMenuClick}
            sx={{
              width: "40px",
              height: "40px",
            }}
          >
            <MoreIcon />
          </IconButton>

          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleMenuClose}
            transformOrigin={{ horizontal: "right", vertical: "top" }}
            anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            sx={{
              "& .MuiMenu-paper": {
                boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.1)",
              },
            }}
          >
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              Edit
            </MenuItem>
            <MenuItem onClick={handleMenuClose}>
              <ListItemIcon>
                <DeleteIcon />
              </ListItemIcon>
              Delete
            </MenuItem>
          </Menu>
        </div>
        <Typography variant="subtitle1" className="text-slate-500">
          12:00 PM, 10th Oct 2021
        </Typography>
        <div className="flex gap-1">
          <Chip label="Drama" />
          <Chip label="Crime" />
        </div>
      </div>
    </div>
  );
}

export default VideoItem;

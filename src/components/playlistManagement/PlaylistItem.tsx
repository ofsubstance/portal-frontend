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

import dayjs from "dayjs";
import { useNavigate } from "react-router-dom";
import { videoData } from "@/data/dummyData";

function PlaylistItemMenu() {
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (event: React.MouseEvent<HTMLLIElement>) => {
    event.stopPropagation();
    setMenuAnchorEl(null);
  };

  return (
    <>
      <IconButton
        onClick={handleMenuClick}
        sx={{
          width: "40px",
          height: "40px",
        }}
      >
        <MoreIcon className="text-slate-600" />
      </IconButton>

      <Menu
        anchorEl={menuAnchorEl}
        open={Boolean(menuAnchorEl)}
        onClose={handleMenuClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        MenuListProps={{
          dense: true,
          className: "text-slate-600",
        }}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.2))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <EditIcon size={20} className="text-slate-600" />
          </ListItemIcon>
          Edit
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <DeleteIcon size={20} className="text-slate-600" />
          </ListItemIcon>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
}

function PlaylistItem() {
  const navigate = useNavigate();

  const [data, setData] = useState(videoData);

  return (
    <div
      className="flex gap-4 cursor-pointer"
      onClick={() => navigate("/video-management/details/1")}
    >
      <div className="relative h-24 aspect-video">
        <img
          src={data.thumbnail}
          alt="thumbnail"
          className="object-cover rounded-md"
        />

        <Chip
          size="small"
          className="absolute bottom-2 right-2"
          sx={{ backgroundColor: "rgba(0, 0, 0, 0.6)", color: "white" }}
          label={`${Math.floor(data.duration / 60)} min`}
        />
      </div>

      <div className="flex flex-col gap-2 text-slate-600 flex-1">
        <Typography variant="body1" fontWeight={600}>
          {data.title}
        </Typography>

        <Typography variant="subtitle2">
          {dayjs(data.createdAt).format("MMMM DD, YYYY h:mm A")}
        </Typography>

        <div className="flex gap-1 flex-wrap mt-auto">
          {data.genre.map((g) => (
            <Chip key={g} label={g} />
          ))}
        </div>
      </div>
      <PlaylistItemMenu />
    </div>
  );
}

export default PlaylistItem;

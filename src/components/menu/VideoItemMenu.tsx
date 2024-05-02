import {
  RiDeleteBin2Line as DeleteIcon,
  RiEdit2Line as EditIcon,
  RiMore2Fill as MoreIcon,
} from "react-icons/ri";
import { IconButton, ListItemIcon, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";

export default function VideoItemMenu() {
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
        }}
        slotProps={{
          paper: {
            sx: {
              overflow: "visible",
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
                borderColor: "divider",
                borderWidth: "1px 0 0 1px",
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

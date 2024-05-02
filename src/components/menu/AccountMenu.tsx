import { Chip, Typography } from "@mui/material";

import Avatar from "@mui/material/Avatar";
import Divider from "@mui/material/Divider";
import ListItemIcon from "@mui/material/ListItemIcon";
import { RiLogoutCircleRLine as LogoutIcon } from "react-icons/ri";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import useAuthAction from "@/hooks/useAuthAction";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function AccountMenu() {
  const { signoutMutation } = useAuthAction();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signoutMutation.mutate();
    navigate("/signin");
  };

  return (
    <>
      <Chip
        avatar={
          <Avatar src="https://uko-react.vercel.app/static/avatar/001-man.svg" />
        }
        color="primary"
        label="John Doe"
        clickable
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          dense: true,
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
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
        <MenuItem>
          <Avatar
            alt="John Doe"
            src="https://uko-react.vercel.app/static/avatar/001-man.svg"
          />

          <div className="min-w-40">
            <Typography fontWeight={600} fontSize={14}>
              John Doe
            </Typography>
            <Typography fontSize={12}>john.doe@email.com</Typography>
          </div>
        </MenuItem>

        <Divider />

        <MenuItem onClick={handleClose}>Profile & Account</MenuItem>
        <MenuItem onClick={handleClose}>Account Settings</MenuItem>

        <Divider />

        <MenuItem onClick={handleLogout}>
          <ListItemIcon>
            <LogoutIcon size={18} className="text-slate-600" />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
}

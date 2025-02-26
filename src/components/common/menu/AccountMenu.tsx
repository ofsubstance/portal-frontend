import { Chip, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { ModalHookLayout } from '@/components/common/modal/ModalLayout';
import { UserRole } from '@/constants/enums';
import useAuthAction from '@/hooks/useAuthAction';
import { useAuth } from '@/hooks/useAuth';
import { useModal } from '@ebay/nice-modal-react';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  RiLogoutCircleRLine as LogoutIcon,
  RiDashboardLine as DashboardIcon,
} from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import UserGuide from '../../user/guide/UserGuide';

export default function AccountMenu() {
  const modal = useModal(ModalHookLayout);
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { user } = useAuth();
  const { signoutMutation } = useAuthAction();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    signoutMutation.mutate();
  };

  const handleProfileClick = () => {
    if (user?.role === UserRole.Admin) navigate(`/admin/profile/${user?.id}`);
    else navigate(`/profile/${user?.id}`);
  };

  const handleAccountSettingsClick = () => {
    if (user?.role === UserRole.Admin)
      navigate(`/admin/profile/settings/${user?.id}`);
    else navigate(`/profile/settings/${user?.id}`);
  };

  const handleAdminDashboardClick = () => {
    navigate('/admin');
  };

  const handleUserGuideClick = () => {
    modal.show({
      title: 'Welcome User!',
      children: <UserGuide />,
    });
  };

  useEffect(() => {
    if (!localStorage.getItem('userGuide') && user?.role === UserRole.User) {
      handleUserGuideClick();
      localStorage.setItem('userGuide', 'true');
    }
  }, []);

  return (
    <>
      <Chip
        avatar={
          <Avatar src="https://uko-react.vercel.app/static/avatar/001-man.svg" />
        }
        color="primary"
        label={user?.firstname}
        clickable
        onClick={handleClick}
      />
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
        MenuListProps={{
          dense: true,
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        slotProps={{
          paper: {
            sx: {
              overflow: 'visible',
              mt: 1.5,
              '& .MuiAvatar-root': {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              '&::before': {
                content: '""',
                display: 'block',
                position: 'absolute',
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                borderColor: 'divider',
                borderWidth: '1px 0 0 1px',
                bgcolor: 'background.paper',
                transform: 'translateY(-50%) rotate(45deg)',
                zIndex: 0,
              },
            },
          },
        }}
      >
        <MenuItem>
          <Avatar
            alt={user?.firstname}
            src="https://uko-react.vercel.app/static/avatar/001-man.svg"
          />

          <div className="min-w-40">
            <Typography fontWeight={600} fontSize={14}>
              {user?.firstname}
            </Typography>
            <Typography fontSize={12}>{user?.email}</Typography>
          </div>
        </MenuItem>

        <Divider />

        {user?.role === UserRole.Admin && (
          <MenuItem onClick={handleAdminDashboardClick}>
            <ListItemIcon>
              <DashboardIcon size={18} className="text-slate-600" />
            </ListItemIcon>
            Admin Dashboard
          </MenuItem>
        )}

        <MenuItem onClick={handleProfileClick}>Profile & Account</MenuItem>
        <MenuItem onClick={handleAccountSettingsClick}>
          Account Settings
        </MenuItem>
        {user?.role === UserRole.User && (
          <MenuItem onClick={handleUserGuideClick}>User Guide</MenuItem>
        )}

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

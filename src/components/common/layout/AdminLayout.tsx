import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  Toolbar,
  Typography,
  useTheme,
} from '@mui/material';
import { useContext, useState } from 'react';
import {
  RiPieChart2Line as AnalyticsIcon,
  RiMenu2Line as MenuIcon,
  RiDashboardLine as OverviewIcon,
  RiMoneyDollarCircleLine as PaymentsIcon,
  RiPlayList2Line as PlaylistManagementIcon,
  RiAccountCircleLine as ProfileIcon,
  RiSettings2Line as SettingsIcon,
  RiUserSettingsLine as UserManagementIcon,
  RiFolderVideoLine as VideoManagementIcon,
} from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountMenu from '@/components/common/menu/AccountMenu';
import { AuthContext } from '@/contexts/AuthContextProvider';
import useAuthAction from '@/hooks/useAuthAction';
import AppLogo from '../logo/AppLogo';

const navItems = (userId?: string) => [
  {
    group: 'Dashboard',
    items: [
      {
        link: '/admin',
        text: 'Overview',
        icon: OverviewIcon,
      },
      { link: '/admin/analytics', text: 'Analytics', icon: AnalyticsIcon },
    ],
  },
  {
    group: 'Management',
    items: [
      {
        link: '/admin/video-management',
        text: 'Video Management',
        icon: VideoManagementIcon,
      },
      // {
      //   link: "/admin/playlist-management",
      //   text: "Playlist Management",
      //   icon: PlaylistManagementIcon,
      // },
      {
        link: '/admin/user-management',
        text: 'User Management',
        icon: UserManagementIcon,
      },
      // {
      //   link: "/admin/payments-subscriptions",
      //   text: "Payments & Subscriptions",
      //   icon: PaymentsIcon,
      // },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        link: `/admin/profile/${userId}`,
        text: 'Profile Details',
        icon: ProfileIcon,
      },
      {
        link: `/admin/profile/settings/${userId}`,
        text: 'Settings',
        icon: SettingsIcon,
      },
    ],
  },
];

const drawerWidth = 300;

function DrawerContent() {
  const { signoutMutation } = useAuthAction();
  const { authData } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isActiveLink = (itemLink: string) => {
    return (
      location.pathname === itemLink ||
      (itemLink !== '/admin' && location.pathname.startsWith(itemLink))
    );
  };

  const handleLogout = () => {
    signoutMutation.mutate();
    navigate('/signin');
  };

  return (
    <Box className="flex flex-col gap-6 h-screen py-4">
      <span className="pl-8 py-4">
        <AppLogo />
      </span>
      {navItems(authData?.id).map((group) => (
        <div key={group.group} className="flex flex-col">
          <Typography
            variant="body2"
            fontWeight={600}
            pl={4}
            textTransform={'uppercase'}
          >
            {group.group}
          </Typography>
          <List dense component="nav">
            {group.items.map((item) => (
              <ListItem key={item.text} onClick={() => navigate(item.link)}>
                <ListItemButton
                  selected={isActiveLink(item.link)}
                  sx={{
                    borderRadius: 1,
                    paddingX: 2,
                    paddingY: 1.5,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 2,
                  }}
                >
                  <item.icon
                    size={20}
                    color={
                      isActiveLink(item.link)
                        ? theme.palette.primary.main
                        : theme.palette.text.primary
                    }
                  />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={
                      isActiveLink(item.link)
                        ? theme.palette.primary.main
                        : theme.palette.text.primary
                    }
                  >
                    {item.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      ))}

      <Button
        variant="contained"
        size="large"
        sx={{ marginTop: 'auto', mx: 2 }}
        onClick={handleLogout}
      >
        LOGOUT
      </Button>
    </Box>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'rgba(255, 255, 255, 0)',
          boxShadow: 'none',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <span className="sm:hidden">
            <AppLogo />
          </span>

          <Box sx={{ flexGrow: 1 }} />

          <AccountMenu />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          container={window.document.body}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': {
              boxSizing: 'border-box',
              width: drawerWidth,
              border: 'none',
            },
          }}
          open
        >
          <DrawerContent />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: '100vh',
          overflow: 'auto',
          backgroundColor: 'rgb(243, 244, 249)',
        }}
      >
        <Toolbar />
        <Box
          p={3}
          sx={{
            width: '100%',
            maxWidth: '1200px',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

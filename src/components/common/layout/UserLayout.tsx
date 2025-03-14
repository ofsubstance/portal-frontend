import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  InputBase,
  List,
  ListItem,
  ListItemButton,
  Paper,
  Toolbar,
  Typography,
  useTheme,
  CssBaseline,
} from '@mui/material';
import {
  RiPieChart2Line as AnalyticsIcon,
  RiMenu2Line as MenuIcon,
  RiDashboardLine as OverviewIcon,
  RiMoneyDollarCircleLine as PaymentsIcon,
  RiPlayList2Line as PlaylistManagementIcon,
  RiAccountCircleLine as ProfileIcon,
  RiSearch2Line as SearchIcon,
  RiSettings2Line as SettingsIcon,
  RiUserSettingsLine as UserManagementIcon,
  RiFolderVideoLine as VideoManagementIcon,
} from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';

import AccountMenu from '@/components/common/menu/AccountMenu';
import useAuthAction from '@/hooks/useAuthAction';
import { useState } from 'react';
import AppLogo from '../logo/AppLogo';

const navItems = [
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
      {
        link: '/admin/playlist-management',
        text: 'Playlist Management',
        icon: PlaylistManagementIcon,
      },
      {
        link: '/admin/user-management',
        text: 'User Management',
        icon: UserManagementIcon,
      },
      {
        link: '/admin/payments-subscriptions',
        text: 'Payments & Subscriptions',
        icon: PaymentsIcon,
      },
    ],
  },
  {
    group: 'Account',
    items: [
      {
        link: '/admin/profile/1',
        text: 'Profile Details',
        icon: ProfileIcon,
      },
      {
        link: '/admin/profile/settings',
        text: 'Settings',
        icon: SettingsIcon,
      },
    ],
  },
];

const drawerWidth = 300;

function DrawerContent() {
  const { signoutMutation } = useAuthAction();
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
      {navItems.map((group) => (
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

function SearchBar() {
  return (
    <Paper
      sx={{
        borderRadius: 100,
        ml: 4,
        display: 'flex',
        alignItems: 'center',
        bgcolor: 'rgba(255, 255, 255, 0.1)',
        width: 400,
      }}
    >
      <InputBase
        fullWidth
        sx={{ pl: 2, color: 'white' }}
        placeholder="Search…"
      />
      <IconButton sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
        <SearchIcon />
      </IconButton>
    </Paper>
  );
}

export default function UserLayout({
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
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { xs: '100%' },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'black',
          color: 'white',
          boxShadow: 0,
          borderBottom: '1px solid rgba(255,255,255,0.1)',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            px: 4,
          }}
        >
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>

          <div className="hidden md:block">
            <AppLogo color="white" />
          </div>

          <div className="block md:hidden">
            <AppLogo color="white" type="compact" />
          </div>

          <SearchBar />

          <Box sx={{ flexGrow: 1 }} />

          <div className="hidden md:block">
            <AccountMenu />
          </div>
        </Toolbar>
      </AppBar>

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

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 0,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          bgcolor: 'white',
          minHeight: '100vh',
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

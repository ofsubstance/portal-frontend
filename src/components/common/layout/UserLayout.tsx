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
import { useState, useRef, useEffect } from 'react';
import AppLogo from '../logo/AppLogo';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import { VideoDto } from '@/dtos/video.dto';

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
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [searchResults, setSearchResults] = useState<VideoDto[]>([]);
  const { useVideoListQuery } = useVideoManagementActions();
  const navigate = useNavigate();
  const searchRef = useRef<HTMLDivElement>(null);

  const { data: videos = [] } = useVideoListQuery();

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.trim().length > 0) {
      // Filter videos based on search term
      const filtered = videos.filter(
        (video: VideoDto) =>
          video.title.toLowerCase().includes(value.toLowerCase()) ||
          video.genre.toLowerCase().includes(value.toLowerCase()) ||
          video.short_desc.toLowerCase().includes(value.toLowerCase()) ||
          (video.tags &&
            video.tags.some((tag: string) =>
              tag.toLowerCase().includes(value.toLowerCase())
            ))
      );

      setSearchResults(filtered);
      setShowResults(true);
    } else {
      setShowResults(false);
    }
  };

  // Handle click outside to close search results
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle clicking on a search result
  const handleResultClick = (videoId: string) => {
    navigate(`/video/${videoId}`);
    setShowResults(false);
    setSearchTerm('');
  };

  return (
    <Paper
      ref={searchRef}
      sx={{
        borderRadius: 100,
        ml: 4,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        width: 400,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          bgcolor: '#333333',
          borderRadius: 100,
        }}
      >
        <InputBase
          fullWidth
          sx={{
            pl: 2,
            color: 'white',
            '&::placeholder': {
              color: 'rgba(255, 255, 255, 0.7)',
              opacity: 1,
            },
          }}
          placeholder="Search…"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <IconButton sx={{ color: 'white' }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {showResults && searchResults.length > 0 && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1000,
            maxHeight: 400,
            overflow: 'auto',
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <List>
            {searchResults.map((video) => (
              <ListItem
                key={video.id}
                onClick={() => handleResultClick(video.id)}
                sx={{
                  cursor: 'pointer',
                  '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                <Box
                  sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                >
                  <Box
                    sx={{
                      width: 80,
                      height: 45,
                      mr: 2,
                      borderRadius: 1,
                      overflow: 'hidden',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={video.thumbnail_url}
                      alt={video.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" noWrap>
                      {video.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                      {video.genre}
                    </Typography>
                  </Box>
                </Box>
              </ListItem>
            ))}
          </List>
        </Paper>
      )}

      {showResults && searchResults.length === 0 && searchTerm && (
        <Paper
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            zIndex: 1000,
            borderRadius: 2,
            boxShadow: 3,
            p: 2,
          }}
        >
          <Typography>No results found for "{searchTerm}"</Typography>
        </Paper>
      )}
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
        {children}
      </Box>
    </Box>
  );
}

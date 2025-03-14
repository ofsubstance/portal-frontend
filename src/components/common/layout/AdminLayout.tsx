import {
  AppBar,
  Box,
  Button,
  Collapse,
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
  RiAccountCircleLine as ProfileIcon,
  RiSettings2Line as SettingsIcon,
  RiUserSettingsLine as UserManagementIcon,
  RiFolderVideoLine as VideoManagementIcon,
  RiChat1Line as CommentManagementIcon,
  RiShareLine as ShareLinkIcon,
  RiArrowDownSLine as ExpandMoreIcon,
  RiArrowRightSLine as ExpandLessIcon,
  RiLineChartLine as PerformanceIcon,
  RiUserHeartLine as EngagementIcon,
  RiBarChartBoxLine as MacroMetricsIcon,
  RiBarChartGroupedLine as ContentMetricsIcon,
} from 'react-icons/ri';
import { useLocation, useNavigate } from 'react-router-dom';
import { IconType } from 'react-icons';

import AccountMenu from '@/components/common/menu/AccountMenu';
import { AuthContext } from '@/contexts/AuthContextProvider';
import useAuthAction from '@/hooks/useAuthAction';
import AppLogo from '../logo/AppLogo';

interface SubNavItem {
  link: string;
  text: string;
  icon: IconType;
}

interface NavItem {
  link?: string;
  text: string;
  icon: IconType;
  subItems?: SubNavItem[];
}

interface NavGroup {
  group: string;
  items: NavItem[];
}

const navItems = (userId?: string): NavGroup[] => [
  {
    group: 'Dashboard',
    items: [
      {
        link: '/admin',
        text: 'Overview',
        icon: OverviewIcon,
      },
      {
        text: 'Analytics',
        icon: AnalyticsIcon,
        subItems: [
          {
            link: '/admin/analytics/performance',
            text: 'App Performance Metrics',
            icon: PerformanceIcon,
          },
          {
            link: '/admin/analytics/engagement',
            text: 'User Engagement Metrics',
            icon: EngagementIcon,
          },
          {
            link: '/admin/analytics/macro-content',
            text: 'Macro Content Engagement Metrics',
            icon: MacroMetricsIcon,
          },
          {
            link: '/admin/analytics/content-performance',
            text: 'Content Performance Metrics',
            icon: ContentMetricsIcon,
          },
        ],
      },
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
        link: '/admin/comment-management',
        text: 'Comment Management',
        icon: CommentManagementIcon,
      },
      {
        link: '/admin/sharelink-analytics',
        text: 'ShareLink Analytics',
        icon: ShareLinkIcon,
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
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    Analytics: false,
  });

  const isActiveLink = (itemLink?: string) => {
    if (!itemLink) return false;
    return (
      location.pathname === itemLink ||
      (itemLink !== '/admin' && location.pathname.startsWith(itemLink))
    );
  };

  const isActiveParent = (item: NavItem) => {
    if (!item.subItems) return false;
    return item.subItems.some((subItem) => isActiveLink(subItem.link));
  };

  const handleToggleExpand = (itemText: string) => {
    setExpandedItems((prev) => ({
      ...prev,
      [itemText]: !prev[itemText],
    }));
  };

  const handleLogout = () => {
    signoutMutation.mutate();
    navigate('/signin');
  };

  return (
    <Box className="flex flex-col gap-6 h-screen py-4">
      <span className="pl-8 py-4">
        <Typography
          fontSize={'2rem'}
          color="black"
          fontFamily={'Pistilli-Roman'}
        >
          Of Substance.
        </Typography>
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
              <div key={item.text}>
                <ListItem
                  disablePadding
                  onClick={() => {
                    if (item.subItems) {
                      handleToggleExpand(item.text);
                    } else if (item.link) {
                      navigate(item.link);
                    }
                  }}
                >
                  <ListItemButton
                    selected={
                      item.link ? isActiveLink(item.link) : isActiveParent(item)
                    }
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
                        (
                          item.link
                            ? isActiveLink(item.link)
                            : isActiveParent(item)
                        )
                          ? theme.palette.primary.main
                          : theme.palette.text.primary
                      }
                    />
                    <Typography
                      variant="body2"
                      fontWeight={500}
                      color={
                        (
                          item.link
                            ? isActiveLink(item.link)
                            : isActiveParent(item)
                        )
                          ? theme.palette.primary.main
                          : theme.palette.text.primary
                      }
                      sx={{ flexGrow: 1 }}
                    >
                      {item.text}
                    </Typography>
                    {item.subItems &&
                      (expandedItems[item.text] ? (
                        <ExpandMoreIcon size={18} />
                      ) : (
                        <ExpandLessIcon size={18} />
                      ))}
                  </ListItemButton>
                </ListItem>

                {item.subItems && (
                  <Collapse
                    in={expandedItems[item.text]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem
                          key={subItem.text}
                          disablePadding
                          onClick={() => navigate(subItem.link)}
                        >
                          <ListItemButton
                            selected={isActiveLink(subItem.link)}
                            sx={{
                              pl: 6,
                              py: 1,
                              borderRadius: 1,
                              ml: 2,
                              display: 'flex',
                              alignItems: 'center',
                              gap: 2,
                            }}
                          >
                            <subItem.icon
                              size={18}
                              color={
                                isActiveLink(subItem.link)
                                  ? theme.palette.primary.main
                                  : theme.palette.text.secondary
                              }
                            />
                            <Typography
                              variant="body2"
                              fontWeight={400}
                              color={
                                isActiveLink(subItem.link)
                                  ? theme.palette.primary.main
                                  : theme.palette.text.secondary
                              }
                            >
                              {subItem.text}
                            </Typography>
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                )}
              </div>
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
          width: { sm: `calc(100% - ${drawerWidth}px)`, xs: '100%' },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: 'rgba(255, 255, 255, 0)',
          boxShadow: 'none',
          backdropFilter: 'blur(12px)',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            maxWidth: '100%',
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
          p={2}
          sx={{
            width: '100%',
            maxWidth: '100%',
            mx: 'auto',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

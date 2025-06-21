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
  RiLogoutBoxRLine as LogoutIcon,
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
    <Box className="flex flex-col h-screen bg-white">
      {/* Logo Section */}
      <Box className="px-6 py-5 border-b border-gray-100">
        <Typography
          fontSize={'2rem'}
          color="black"
          fontFamily={'Pistilli-Roman'}
          className="tracking-tight"
        >
          Of Substance.
        </Typography>
      </Box>

      {/* Navigation Section */}
      <Box className="flex-1 overflow-y-auto px-4 py-6">
        {navItems(authData?.id).map((group) => (
          <div key={group.group} className="mb-8">
            <Typography
              variant="caption"
              fontWeight={600}
              className="px-3 mb-4 block text-gray-500 uppercase tracking-wider"
            >
              {group.group}
            </Typography>
            <List className="space-y-1">
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
                        item.link
                          ? isActiveLink(item.link)
                          : isActiveParent(item)
                      }
                      sx={{
                        borderRadius: '8px',
                        padding: '10px 12px',
                        transition: 'all 0.2s',
                        '&.Mui-selected': {
                          backgroundColor: 'rgba(25, 118, 210, 0.08)',
                          '&:hover': {
                            backgroundColor: 'rgba(25, 118, 210, 0.12)',
                          },
                        },
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        },
                      }}
                    >
                      <item.icon
                        size={20}
                        className={`${
                          (
                            item.link
                              ? isActiveLink(item.link)
                              : isActiveParent(item)
                          )
                            ? 'text-primary'
                            : 'text-gray-600'
                        } transition-colors`}
                      />
                      <Typography
                        variant="body2"
                        fontWeight={500}
                        sx={{
                          ml: 2,
                          flexGrow: 1,
                          color: (
                            item.link
                              ? isActiveLink(item.link)
                              : isActiveParent(item)
                          )
                            ? 'primary.main'
                            : 'text.primary',
                        }}
                      >
                        {item.text}
                      </Typography>
                      {item.subItems &&
                        (expandedItems[item.text] ? (
                          <ExpandMoreIcon size={18} className="text-gray-400" />
                        ) : (
                          <ExpandLessIcon size={18} className="text-gray-400" />
                        ))}
                    </ListItemButton>
                  </ListItem>

                  {item.subItems && (
                    <Collapse
                      in={expandedItems[item.text]}
                      timeout="auto"
                      unmountOnExit
                    >
                      <List component="div" className="mt-1">
                        {item.subItems.map((subItem) => (
                          <ListItem
                            key={subItem.text}
                            disablePadding
                            onClick={() => navigate(subItem.link)}
                          >
                            <ListItemButton
                              selected={isActiveLink(subItem.link)}
                              sx={{
                                borderRadius: '8px',
                                ml: 2,
                                padding: '8px 12px',
                                transition: 'all 0.2s',
                                '&.Mui-selected': {
                                  backgroundColor: 'rgba(25, 118, 210, 0.08)',
                                  '&:hover': {
                                    backgroundColor: 'rgba(25, 118, 210, 0.12)',
                                  },
                                },
                                '&:hover': {
                                  backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                },
                              }}
                            >
                              <subItem.icon
                                size={18}
                                className={`${
                                  isActiveLink(subItem.link)
                                    ? 'text-primary'
                                    : 'text-gray-500'
                                } transition-colors`}
                              />
                              <Typography
                                variant="body2"
                                sx={{
                                  ml: 2,
                                  color: isActiveLink(subItem.link)
                                    ? 'primary.main'
                                    : 'text.secondary',
                                  fontWeight: isActiveLink(subItem.link)
                                    ? 500
                                    : 400,
                                }}
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
      </Box>

      {/* Logout Section */}
      <Box className="p-4 border-t border-gray-100">
        <Button
          variant="outlined"
          fullWidth
          size="large"
          onClick={handleLogout}
          startIcon={<LogoutIcon size={20} />}
          sx={{
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Logout
        </Button>
      </Box>
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
          backgroundColor: 'white',
          borderBottom: '1px solid',
          borderColor: 'rgba(0, 0, 0, 0.06)',
          boxShadow: 'none',
        }}
      >
        <Toolbar
          sx={{
            width: '100%',
            maxWidth: '100%',
            mx: 'auto',
            height: '70px',
          }}
        >
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{
              mr: 2,
              display: { sm: 'none' },
              '&:hover': {
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
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
              borderRight: '1px solid rgba(0, 0, 0, 0.06)',
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
              borderRight: '1px solid rgba(0, 0, 0, 0.06)',
              boxShadow: 'none',
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
          pt: '70px',
        }}
      >
        <Box
          p={3}
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

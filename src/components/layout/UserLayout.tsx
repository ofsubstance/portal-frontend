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
} from "react-icons/ri";
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
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import AccountMenu from "@/components/menu/AccountMenu";
import AppLogo from "../common/logo/AppLogo";
import useAuthAction from "@/hooks/useAuthAction";
import { useState } from "react";

const navItems = [
  {
    group: "Dashboard",
    items: [
      {
        link: "/admin",
        text: "Overview",
        icon: OverviewIcon,
      },
      { link: "/admin/analytics", text: "Analytics", icon: AnalyticsIcon },
    ],
  },
  {
    group: "Management",
    items: [
      {
        link: "/admin/video-management",
        text: "Video Management",
        icon: VideoManagementIcon,
      },
      {
        link: "/admin/playlist-management",
        text: "Playlist Management",
        icon: PlaylistManagementIcon,
      },
      {
        link: "/admin/user-management",
        text: "User Management",
        icon: UserManagementIcon,
      },
      {
        link: "/admin/payments-subscriptions",
        text: "Payments & Subscriptions",
        icon: PaymentsIcon,
      },
    ],
  },
  {
    group: "Account",
    items: [
      {
        link: "/admin/profile/1",
        text: "Profile Details",
        icon: ProfileIcon,
      },
      {
        link: "/admin/profile/settings",
        text: "Settings",
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
      (itemLink !== "/admin" && location.pathname.startsWith(itemLink))
    );
  };

  const handleLogout = () => {
    signoutMutation.mutate();
    navigate("/signin");
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
            textTransform={"uppercase"}
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
                    display: "flex",
                    alignItems: "center",
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
        sx={{ marginTop: "auto", mx: 2 }}
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
        display: "flex",
        alignItems: "center",
        bgcolor: "rgba(255, 255, 255, 0.2)",
        width: 400,
      }}
    >
      <InputBase
        fullWidth
        sx={{ pl: 2, color: "white" }}
        placeholder="Search…"
      />
      <IconButton>
        <SearchIcon className="text-gray-400" />
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
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.3)",
          boxShadow: "none",
          backdropFilter: "blur(12px)",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            px: 4,
          }}
        >
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <AppLogo color="white" />

          <SearchBar />

          <Box sx={{ flexGrow: 1 }} />

          <AccountMenu />
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
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
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
          height: "100vh",
          overflow: "auto",
        }}
      >
        <Toolbar />
        <Box
          sx={{
            width: "100%",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}

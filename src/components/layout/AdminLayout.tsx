import {
  RiPieChart2Line as AnalyticsIcon,
  RiMenu2Line as MenuIcon,
  RiMoneyDollarCircleLine as PaymentsIcon,
  RiPlayList2Line as PlaylistManagementIcon,
  RiFileList2Line as ReportsIcon,
  RiUserSettingsLine as UserManagementIcon,
  RiFolder2Line as VideoManagementIcon,
} from "react-icons/ri";
import { IconButton, ListItem, useTheme } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { twMerge } from "tailwind-merge";
import { useState } from "react";

const navItems = [
  {
    group: "Dashboard",
    items: [
      {
        link: "/",
        text: "Reports",
        icon: ReportsIcon,
      },
      { link: "/analytics", text: "Analytics", icon: AnalyticsIcon },
    ],
  },
  {
    group: "Management",
    items: [
      {
        link: "/video-management",
        text: "Video Management",
        icon: VideoManagementIcon,
      },
      {
        link: "/playlist-management",
        text: "Playlist Management",
        icon: PlaylistManagementIcon,
      },
      {
        link: "/user-management",
        text: "User Management",
        icon: UserManagementIcon,
      },
      {
        link: "/payments-subscriptions",
        text: "Payments & Subscriptions",
        icon: PaymentsIcon,
      },
    ],
  },
];

const drawerWidth = 300;

function DrawerContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();

  const isActiveLink = (itemLink: string) => {
    return (
      location.pathname === itemLink ||
      (itemLink !== "/" && location.pathname.startsWith(itemLink))
    );
  };

  return (
    <Box className="flex flex-col gap-6">
      <Typography variant="h5" pl={4} py={4} fontWeight={600}>
        Of Substance.
      </Typography>
      {navItems.map((group) => (
        <div key={group.group} className="flex flex-col">
          <Typography
            variant="body2"
            fontWeight={600}
            pl={4}
            textTransform={"uppercase"}
            className="text-slate-500"
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
                        : undefined
                    }
                    className={twMerge(
                      !isActiveLink(item.link) && "text-slate-500"
                    )}
                  />
                  <Typography
                    variant="body2"
                    fontWeight={500}
                    color={
                      isActiveLink(item.link)
                        ? theme.palette.primary.main
                        : undefined
                    }
                    className={twMerge(
                      !isActiveLink(item.link) && "text-slate-500"
                    )}
                  >
                    {item.text}
                  </Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      ))}
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
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          backgroundColor: "rgba( 255, 255, 255, 0)",
          boxShadow: "none",
          backdropFilter: "blur(6px)",
        }}
      >
        <Toolbar>
          <IconButton
            color="primary"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
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
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <DrawerContent />
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
              border: "none",
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
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100vh",
          overflow: "auto",
          backgroundColor: "rgb(243, 244, 249)",
        }}
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
}

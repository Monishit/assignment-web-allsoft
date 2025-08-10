import { useState } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { styled, useTheme } from "@mui/material/styles";
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar,
  AppBar,
  Typography,
  Popover,
  Button,
  Avatar,
  Divider,
} from "@mui/material";
import { Icon } from "@iconify/react";
import { PATH_TO_DASHBOARD } from "../../routes/paths";

const drawerWidth = 280;

const DashboardSidebarRoot = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("md")]: {
    width: drawerWidth,
    flexShrink: 0,
    boxShadow: "rgba(0, 0, 0, 0.1) 4px 0px 8px -2px",
    transformStyle: "preserve-3d",
    transform: "translateZ(0)",
    backgroundColor: theme.palette.background.paper,
    height: "100vh",
    position: "fixed",
    overflow: "hidden",
  },
}));

const navItems = [
  {
    path: PATH_TO_DASHBOARD.dashboard.app,
    icon: "mdi:view-dashboard",
    title: "Dashboard",
  },
  {
    path: PATH_TO_DASHBOARD.dashboard.upload,
    icon: "entypo:upload",
    title: "Upload",
  },
  {
    path: PATH_TO_DASHBOARD.dashboard.search,
    icon: "material-symbols:tab-search-sharp",
    title: "Searrch",
  },
];

export default function DashboardSidebar() {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  // Profile popover
  const [anchorEl, setAnchorEl] = useState(null);
  const handleProfileClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleProfileClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    handleProfileClose();
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login"); // Or clear auth state first
  };
  const openPopover = Boolean(anchorEl);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <Typography variant="h6" fontWeight={"bold"}>
          ALL SOFT
        </Typography>
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              "&.Mui-selected": {
                background:
                  "linear-gradient(90deg, #6b11cb57 0%, #2574fc58 100%)",
                color: "#fff",
                "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
                  color: "#fff",
                },
                "&:hover": {
                  background:
                    "linear-gradient(90deg, #590fc962 0%, #1e65e054 100%)",
                },
              },
            }}
          >
            <ListItemIcon>
              <Icon icon={item.icon} width={30} height={30} />
            </ListItemIcon>
            <ListItemText fontWeight={"bold"} primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Mobile top bar */}
      <Toolbar
        sx={{
          display: { md: "none", xs: "flex" },
          position: "fixed",
          width: "100%",
          backgroundColor: theme.palette.background.paper,
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Icon icon="line-md:menu-unfold-left" width={24} height={24} />
        </IconButton>
      </Toolbar>

      {/* Sidebar */}
      <DashboardSidebarRoot>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              position: "relative",
              height: "100vh",
            },
          }}
        >
          {drawerContent}
        </Drawer>

        <Drawer
          variant="persistent"
          open
          PaperProps={{
            sx: {
              width: drawerWidth,
              position: "fixed",
              height: "100vh",
              boxSizing: "border-box",
            },
          }}
          sx={{
            display: { xs: "none", md: "block" },
          }}
        >
          {drawerContent}
        </Drawer>
      </DashboardSidebarRoot>

      {/* Main content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          mt: { xs: 7, md: 0 },
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
          height: "100vh",
          overflowY: "auto",
        }}
      >
        {/* Narrow AppBar */}
        <AppBar
          position="sticky"
          elevation={3}
          sx={{
            maxWidth: 900,
            mx: "auto",
            mt: 2,
            borderRadius: 2,
            mb: 2,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h6" noWrap component="div">
              {/* Dashboard AppBar */}
            </Typography>

            {/* Profile Icon */}
            <IconButton onClick={handleProfileClick}>
              <Avatar alt="User Profile" src="" />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Profile Popover */}
        <Popover
          open={openPopover}
          anchorEl={anchorEl}
          onClose={handleProfileClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <Box sx={{ p: 2, width: 200 }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar alt="User Profile" src="" sx={{ mr: 1 }} />
              <Typography variant="subtitle1">John Doe</Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              johndoe@example.com
            </Typography>
            <Divider sx={{ my: 1 }} />
            <Button
              fullWidth
              variant="outlined"
              color="error"
              onClick={handleLogout}
            >
              Logout
            </Button>
          </Box>
        </Popover>

        {/* Page content */}
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 }, pb: 4 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

import { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Toolbar
} from '@mui/material';
import { Icon } from '@iconify/react';
import { PATH_TO_DASHBOARD } from '../../routes/paths';

const drawerWidth = 280;

const DashboardSidebarRoot = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0
  }
}));

const navItems = [
  {
    path: PATH_TO_DASHBOARD.dashboard.app,
    icon: 'mdi:view-dashboard',
    title: 'Dashboard'
  },
  {
    path: PATH_TO_DASHBOARD.dashboard.user,
    icon: 'mdi:account-group',
    title: 'Users'
  }
];

export default function DashboardSidebar() {
  const theme = useTheme();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const drawerContent = (
    <Box>
      <Box sx={{ p: 3, fontWeight: 'bold', textAlign: 'center' }}>
        LOGO
      </Box>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
          >
            <ListItemIcon>
              <Icon icon={item.icon} width={22} height={22} />
            </ListItemIcon>
            <ListItemText primary={item.title} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Top bar for mobile */}
      <Toolbar
        sx={{
          display: { md: 'none', xs: 'flex' },
          position: 'fixed',
          width: '100%',
          backgroundColor: theme.palette.background.paper,
          zIndex: theme.zIndex.drawer + 1
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Icon icon="line-md:menu-unfold-left" width={24} height={24} />
        </IconButton>
      </Toolbar>

      {/* Sidebar Navigation */}
      <DashboardSidebarRoot>
        {/* Mobile drawer */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true
          }}
          PaperProps={{
            sx: { width: drawerWidth }
          }}
          sx={{
            display: { xs: 'block', md: 'none' }
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant="persistent"
          open
          PaperProps={{
            sx: { width: drawerWidth }
          }}
          sx={{
            display: { xs: 'none', md: 'block' }
          }}
        >
          {drawerContent}
        </Drawer>
      </DashboardSidebarRoot>

      {/* Main content area where nested routes render */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, md: 0 }
        }}
      >
        <Outlet /> {/* This is where the child page renders */}
      </Box>
    </Box>
  );
}

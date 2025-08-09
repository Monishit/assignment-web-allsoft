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
  Toolbar,
  AppBar,
  Typography,
} from '@mui/material';
import { Icon } from '@iconify/react';
import { PATH_TO_DASHBOARD } from '../../routes/paths';

const drawerWidth = 280;

const DashboardSidebarRoot = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    width: drawerWidth,
    flexShrink: 0,
    // 3D-ish style for desktop sidebar
    boxShadow: 'rgba(0, 0, 0, 0.1) 4px 0px 8px -2px',
    transformStyle: 'preserve-3d',
    transform: 'translateZ(0)',
    backgroundColor: theme.palette.background.paper,
  },
}));

const navItems = [
  {
    path: PATH_TO_DASHBOARD.dashboard.app,
    icon: 'mdi:view-dashboard',
    title: 'Dashboard',
  },
  {
    path: PATH_TO_DASHBOARD.dashboard.user,
    icon: 'mdi:account-group',
    title: 'Users',
  },
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
      <Box sx={{ p: 3, fontWeight: 'bold', textAlign: 'center' }}>LOGO</Box>
      <List>
        {navItems.map((item) => (
          <ListItemButton
            key={item.path}
            component={Link}
            to={item.path}
            selected={location.pathname === item.path}
            sx={{
              '&.Mui-selected': {
                background: 'linear-gradient(90deg, #6b11cb57 0%, #2574fc58 100%)',
                color: '#fff',
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                  color: '#fff',
                },
                '&:hover': {
                  background:
                    'linear-gradient(90deg, #590fc962 0%, #1e65e054 100%)',
                },
              },
            }}
          >
            <ListItemIcon>
              <Icon icon={item.icon} width={30} height={30} />
            </ListItemIcon>
            <ListItemText fontWeight={'bold'} primary={item.title} />
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
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <IconButton onClick={handleDrawerToggle}>
          <Icon icon='line-md:menu-unfold-left' width={24} height={24} />
        </IconButton>
      </Toolbar>

      {/* Sidebar Navigation */}
      <DashboardSidebarRoot>
        {/* Mobile drawer */}
        <Drawer
          variant='temporary'
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          PaperProps={{
            sx: { width: drawerWidth },
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            height: '100vh',
          }}
        >
          {drawerContent}
        </Drawer>

        {/* Desktop drawer */}
        <Drawer
          variant='persistent'
          open
          PaperProps={{
            sx: { width: drawerWidth },
          }}
          sx={{
            display: { xs: 'none', md: 'block' },
            height: '100vh',
          }}
        >
          {drawerContent}
        </Drawer>
      </DashboardSidebarRoot>

      {/* Main content area */}
      <Box
        component='main'
        sx={{
          flexGrow: 1,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          mt: { xs: 7, md: 0 },
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: '#fff',
        }}
      >
        {/* AppBar on top of main content with horizontal gaps */}
        <AppBar
          position='sticky'
          elevation={3}
          sx={{
            mx: { xs: 2, md: 4 }, // horizontal margin on both sides
            borderRadius: 2,
            mb: 2,
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
            boxShadow: '0 4px 6px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.06)', // subtle 3D shadow
          }}
        >
          <Toolbar>
            <Typography variant='h6' noWrap component='div'>
              Dashboard AppBar
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Content rendered below the AppBar */}
        <Box sx={{ flexGrow: 1, px: { xs: 2, md: 4 } }}>
          <Outlet /> {/* This is where the child page renders */}
        </Box>
      </Box>
    </Box>
  );
}

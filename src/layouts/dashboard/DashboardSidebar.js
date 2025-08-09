import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { 
  Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText 
} from '@mui/material';
import { Icon } from '@iconify/react';
import { PATH_TO_DASHBOARD } from '../../routes/paths';

// Styled root container for sidebar
const DashboardSidebarRoot = styled('div')(({ theme }) => ({
  width: 280,
  position: 'fixed',
  top: 0,
  left: 0,
  height: '100%',
  zIndex: 1200
}));

// Navigation items with Iconify icons
const navItems = [
  {
    path: PATH_TO_DASHBOARD.dashboard.app,
    icon: <Icon icon="mdi:view-dashboard-outline" width={24} height={24} />,
    title: 'Dashboard'
  },
  {
    path: PATH_TO_DASHBOARD.dashboard.user,
    icon: <Icon icon="mdi:account-group-outline" width={24} height={24} />,
    title: 'Users'
  }
];

export default function DashboardSidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  return (
    <DashboardSidebarRoot>
      <Drawer
        anchor="left"
        open
        variant="persistent"
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: 'background.paper'
          }
        }}
      >
        <Box sx={{ p: 3 }}>
          <Logo />
        </Box>
        
        <List>
          {navItems.map((item) => (
            <ListItemButton
              key={item.path}
              component={Link}
              to={item.path}
              selected={location.pathname === item.path}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          ))}
        </List>
      </Drawer>
    </DashboardSidebarRoot>
  );
}

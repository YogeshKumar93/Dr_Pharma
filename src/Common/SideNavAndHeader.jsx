import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  Box,
  CssBaseline,
  Drawer,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Tooltip,
  Divider,
} from '@mui/material';

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ShoppingCart as ShoppingCartIcon,
  Inventory as InventoryIcon,
  LocalPharmacy as LocalPharmacyIcon,
  Payment as PaymentIcon,
  ExitToApp as LogoutIcon,
  Receipt as ReceiptIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import Logo from "../assets/Logo.png";

const DRAWER_WIDTH = 240;
const COLLAPSED_DRAWER_WIDTH = 70;

const Sidebar = ({ onItemClick, collapsed }) => {
  const location = useLocation();

  const menuItems = [
    { 
      text: 'Dashboard', 
      icon: <DashboardIcon />, 
      path: '/dashboard',
      tooltip: 'Dashboard Overview'
    },
    { 
      text: 'Users', 
      icon: <PeopleIcon />, 
      path: '/users',
      tooltip: 'User Management'
    },
    { 
      text: 'All Orders', 
      icon: <ShoppingCartIcon />, 
      path: '/allorders',
      tooltip: 'Order Management'
    },
    { 
      text: 'All Products', 
      icon: <InventoryIcon />, 
      path: '/allproducts',
      tooltip: 'Product Inventory'
    },    
    { 
      text: 'Prescriptions', 
      icon: <LocalPharmacyIcon />, 
      path: '/prescriptions',
      tooltip: 'Prescription Management'
    },    
    { 
      text: 'Payments', 
      icon: <PaymentIcon />, 
      path: '/payments',
      tooltip: 'Payment Transactions'
    },     
    { 
      text: 'Settings', 
      icon: <SettingsIcon />, 
      path: '/settings',
      tooltip: 'System Settings'
    },
    { 
      text: 'Logout', 
      icon: <LogoutIcon />, 
      path: '/logout',
      tooltip: 'Logout from System'
    },
  ];

  return (
    <Box sx={{ 
      height: '100%', 
      bgcolor: '#f8f9fa', 
      color: '#333',
      borderRight: '1px solid #e0e0e0',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Logo Section */}
     <Box
  sx={{
    p: 2,
    textAlign: "center",
    borderBottom: "1px solid #e0e0e0",
    minHeight: 64,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    bgcolor: "white",
  }}
>
  <Box
    component="img"
    src={Logo}
    alt="Pharmacy Logo"
    sx={{
      height: collapsed ? 36 : 44,
      width: "auto",
      transition: "all 0.3s ease",
      objectFit: "contain",
    }}
  />
</Box>


      {/* Menu Items */}
      <List sx={{ p: 1, flex: 1 }}>
        {menuItems.map((item) => (
          <Tooltip 
            key={item.text} 
            title={item.tooltip} 
            placement="right"
            disableHoverListener={!collapsed}
          >
            <ListItem
              button
              component={Link}
              to={item.path}
              onClick={onItemClick}
              sx={{
                mb: 0.5,
                borderRadius: 2,
                minHeight: 48,
                justifyContent: collapsed ? 'center' : 'flex-start',
                px: collapsed ? 2 : 2.5,
                backgroundColor: location.pathname === item.path ? '#e8f5e9' : 'transparent',
                '&:hover': { 
                  backgroundColor: location.pathname === item.path ? '#e8f5e9' : '#f5f5f5',
                },
                borderLeft: location.pathname === item.path ? '4px solid #2e7d32' : '4px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <ListItemIcon 
                sx={{ 
                  color: location.pathname === item.path ? '#2e7d32' : '#666',
                  minWidth: collapsed ? 0 : 40,
                  justifyContent: 'center',
                  mr: collapsed ? 0 : 2,
                }}
              >
                {item.icon}
              </ListItemIcon>
              {!collapsed && (
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{
                    variant: 'body2',
                    fontWeight: location.pathname === item.path ? 600 : 400,
                    color: location.pathname === item.path ? '#2e7d32' : '#333',
                  }}
                />
              )}
            </ListItem>
          </Tooltip>
        ))}
      </List>

      {/* Admin Info (only shown when expanded) */}
      {!collapsed && (
        <Box sx={{ 
          p: 2, 
          borderTop: '1px solid #e0e0e0',
          bgcolor: 'white',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
            <PersonIcon sx={{ color: '#666', mr: 1, fontSize: 20 }} />
            <Typography variant="caption" sx={{ color: '#666' }}>
              Admin User
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: '#999', fontSize: '0.7rem' }}>
            Last login: Today
          </Typography>
        </Box>
      )}
    </Box>
  );
};

const SideNavAndHeader = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/users': 'User Management',
    '/allorders': 'Order Management',
    '/allproducts': 'Product Management',
    '/medicines': 'Medicines',
    '/payments': 'Payment Management',
    '/prescriptions': 'Prescription Management', 
    '/settings': 'System Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'Dr. Pharma Admin';

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
    } else {
      setCollapsed(!collapsed);
    }
  };

  const drawerWidth = collapsed ? COLLAPSED_DRAWER_WIDTH : DRAWER_WIDTH;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          bgcolor: 'white',
          color: '#333',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          borderBottom: '1px solid #e0e0e0',
          zIndex: theme.zIndex.drawer + 1,
        }}
      >
        <Toolbar>
          <IconButton 
            color="inherit" 
            onClick={handleDrawerToggle} 
            sx={{ 
              mr: 2,
              color: '#666',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" sx={{ flexGrow: 1, fontWeight: 600, color: '#2e7d32' }}>
            {currentTitle}
          </Typography>

          {/* You can add user profile or notifications here */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="body2" sx={{ color: '#666', display: { xs: 'none', sm: 'block' } }}>
              Welcome, Admin
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Desktop Sidebar - Persistent */}
      <Drawer
        variant="permanent"
        anchor="left"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { 
            width: drawerWidth,
            boxSizing: 'border-box',
            borderRight: '1px solid #e0e0e0',
            overflowX: 'hidden',
            transition: theme.transitions.create(['width'], {
              easing: theme.transitions.easing.sharp,
              duration: theme.transitions.duration.leavingScreen,
            }),
            ...(collapsed && {
              transition: theme.transitions.create(['width'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
            }),
          },
        }}
        open
      >
        <Sidebar collapsed={collapsed} />
      </Drawer>

      {/* Mobile Sidebar - Temporary */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        ModalProps={{
          keepMounted: true, // Better mobile performance
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { 
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
          },
        }}
      >
        <Sidebar onItemClick={() => setMobileOpen(false)} collapsed={false} />
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: 8,
          width: { md: `calc(100% - ${drawerWidth}px)` },
          ml: { md: `${drawerWidth}px` },
          minHeight: 'calc(100vh - 120px)',
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Outlet />
      </Box>

      {/* Footer */}
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: { md: `calc(100% - ${drawerWidth}px)`, xs: "100%" },
          ml: { md: `${drawerWidth}px` },
          bgcolor: "white",
          color: "#333",
          p: { xs: 1.5, sm: 2 },
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          justifyContent: "space-between",
          alignItems: "center",
          textAlign: { xs: "center", sm: "left" },
          gap: { xs: 0.5, sm: 1.5 },
          zIndex: 1000,
          boxShadow: "0 -1px 3px rgba(0,0,0,0.1)",
          borderTop: "1px solid #e0e0e0",
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Typography 
          variant="body2" 
          sx={{ 
            fontWeight: 400,
            color: '#666',
            fontSize: { xs: "0.75rem", sm: "0.875rem" }
          }}
        >
          © {new Date().getFullYear()} Doctor Pharma | All rights reserved
        </Typography>
        
        <Box 
          sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            alignItems: "center",
            gap: { xs: 0.5, sm: 1.5 }
          }}
        >
          <Typography 
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: '#666',
              fontSize: { xs: "0.75rem", sm: "0.875rem" }
            }}
          >
            <EmailIcon sx={{ fontSize: 14, color: '#2e7d32' }} />
            drpharmaonline@gmail.com
          </Typography>
          
          <Typography 
            variant="body2"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 0.5,
              color: '#666',
              fontSize: { xs: "0.75rem", sm: "0.875rem" }
            }}
          >
            <PhoneIcon sx={{ fontSize: 14, color: '#2e7d32' }} />
            +91-9876543210
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SideNavAndHeader;
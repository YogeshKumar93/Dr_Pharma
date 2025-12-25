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
} from '@mui/material';

import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Settings as SettingsIcon,
  ChevronLeft as ChevronLeftIcon,
} from '@mui/icons-material';
import EmailIcon from '@mui/icons-material/Email';  // ✅ Import the icon
import PhoneIcon from '@mui/icons-material/Phone';

const DRAWER_WIDTH = 240;

const Sidebar = ({ onItemClick }) => {
  const location = useLocation();

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Users', icon: <PeopleIcon />, path: '/users' },
    { text: 'All Orders', icon: <AssessmentIcon />, path: '/allorders' },
    { text: 'All Products', icon: <PeopleIcon />, path: '/allproducts' },    
    { text: 'Prescriptions', icon: <AssessmentIcon />, path: '/prescriptions' },    
    { text: 'Payments', icon: <AssessmentIcon />, path: '/payments' },     
    { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
    { text: 'Logout', icon: <AssessmentIcon />, path: '/logout' },
  ];

  return (
    <Box sx={{ height: '100%', bgcolor: '#87a83bff', color: 'white' }}>
      <Box sx={{ p: 3, textAlign: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          Dr. Pharma
        </Typography>
        <Typography variant="caption">Admin Panel</Typography>
      </Box>

      <List sx={{ p: 2 }}>
        {menuItems.map((item) => (
          <ListItem
            key={item.text}
            button
            component={Link}
            to={item.path}
            onClick={onItemClick}
            sx={{
              mb: 1,
              borderRadius: 1,
              backgroundColor: location.pathname === item.path ? '#585064ff' : 'transparent',
              '&:hover': { backgroundColor: 'primary.main' },
            }}
          >
            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
            <ListItemText
              primary={item.text}
              primaryTypographyProps={{
                variant: 'h6',
                fontWeight: location.pathname === item.path ? 600 : 400,
                color: 'white',
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

const SideNavAndHeader = () => {
  const theme = useTheme();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopOpen, setDesktopOpen] = useState(true);

  const pageTitles = {
    '/dashboard': 'Dashboard',
    '/users': 'Users',
    '/allorders': 'All Orders',
    '/allproducts': 'All Products',
    '/medicines': 'Medicines',
    '/payments': 'Payments',
    '/prescriptions': 'Prescriptions', 
    
    '/settings': 'Settings',
  };

  const currentTitle = pageTitles[location.pathname] || 'My App';

  const handleDrawerToggle = () => {
    if (isMobile) setMobileOpen(!mobileOpen);
    else setDesktopOpen(!desktopOpen);
  };

    
  return (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
      <CssBaseline />

      {/* Top Bar */}
      <AppBar
        position="fixed"
        sx={{
          width: { md: desktopOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          ml: { md: desktopOpen ? `${DRAWER_WIDTH}px` : 0 },
          bgcolor: '#87a83bff',
          color: 'white',
        
        }}
      >
        <Toolbar>
          <IconButton color="inherit" onClick={handleDrawerToggle} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>

          <Typography variant="h4" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
            {currentTitle}
          </Typography>
       
        </Toolbar>
      </AppBar>

      {/* Desktop Sidebar */}
      {!isMobile && (
        <Drawer
          // variant="persistent"
          anchor="left"
          open={desktopOpen}
          sx={{
            width: DRAWER_WIDTH,
            '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
            <IconButton onClick={() => setDesktopOpen(false)}>
              <ChevronLeftIcon />
            </IconButton>
          </Box>

          <Sidebar />
        </Drawer>
      )}

      {/* Mobile Sidebar */}
      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { width: DRAWER_WIDTH },
        }}
      >
        <Sidebar onItemClick={() => setMobileOpen(false)} />
      </Drawer>

      {/* MAIN CONTENT WITH OUTLET */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 1,
          mt: 7,
          width: { md: desktopOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : '100%' },
          ml: { md: desktopOpen ? `${DRAWER_WIDTH}px` : 0 },
        }}
      >
        <Outlet />
      </Box>

{/* *********************** Footer Section ********************************* */}
<Box
  sx={{
    position: "fixed",
    bottom: 0,
    left: 0,
    width: {
      xs: "100%",
      md: desktopOpen ? `calc(100% - ${DRAWER_WIDTH}px)` : "100%",
    },
    ml: { md: desktopOpen ? `${DRAWER_WIDTH}px` : 0 },
    bgcolor: "#87a83bff", // Deeper blue for better contrast
    background: "linear-gradient(135deg, #87a83bff 0%, #87a83bff 100%)", // Gradient for depth
    color: "#fff",
    p: { xs: 1.5, sm: 2 },
    display: "flex",
    flexDirection: { xs: "column", sm: "row" },
    justifyContent: "space-between",
    alignItems: "center",
    textAlign: { xs: "center", sm: "left" },
    gap: { xs: 0.5, sm: 1.5 },
    zIndex: 1200,
    boxShadow: "0 -4px 20px rgba(0, 0, 0, 0.15)", // Subtle shadow for elevation
    borderTop: "1px solid rgba(255, 255, 255, 0.1)", // Subtle top border
    backdropFilter: "blur(10px)", // Frosted glass effect
  }}
>
  <Typography 
    variant="body2" 
    sx={{ 
      fontWeight: 500,
      opacity: 0.9,
      fontSize: { xs: "0.75rem", sm: "0.875rem" }
    }}
  >
    © Doctor Pharma Online Services | All rights reserved
  </Typography>
  
  <Box 
    sx={{ 
      display: "flex", 
      flexDirection: { xs: "column", sm: "row" },
      alignItems: "center",
      gap: { xs: 0.25, sm: 1.5 }
    }}
  >
    <Typography 
      variant="body2"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        opacity: 0.9,
        fontSize: { xs: "0.75rem", sm: "0.875rem" }
      }}
    >
      Contact:{" "}
      <Link 
        href="mailto:bmsonline@gmail.com" 
        color="white"
        sx={{
          
          textDecoration: "none",
          color: "#f8f9faff", // Lighter blue for better contrast
          "&:hover": {
            color: "#e3f2fd",
            textDecoration: "underline",
          },
          transition: "color 0.2s ease",
          display: "inline-flex",
          alignItems: "center",
          gap: 0.5,
         
        }}
      >
        <EmailIcon sx={{ fontSize: 14 }} />
        drpharmaonline@gmail.com
      </Link>
    </Typography>
    
    <Typography 
      variant="body2"
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 0.5,
        opacity: 0.9,
        fontSize: { xs: "0.75rem", sm: "0.875rem" }
      }}
    >
      <PhoneIcon sx={{ fontSize: 14 }} />
      Phone: +91-XXXXXXXXXX
    </Typography>
  </Box>
</Box>


    </Box>
  );
};

export default SideNavAndHeader;

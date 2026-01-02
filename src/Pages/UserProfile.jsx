import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  Avatar,
  Tabs,
  Tab,
  Chip,
  Divider,
  CircularProgress,
  Alert,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  alpha,
  LinearProgress,
  Stack,
  Card,
  CardContent,
  IconButton,
  Button,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import SecurityIcon from "@mui/icons-material/Security";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EditIcon from "@mui/icons-material/Edit";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import PendingIcon from "@mui/icons-material/Pending";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssignmentIcon from "@mui/icons-material/Assignment";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";
import { apiCall } from "../api/api";

const TabPanel = ({ value, index, children }) => {
  if (value !== index) return null;
  return <Box sx={{ mt: 2 }}>{children}</Box>;
};

const UserProfile = () => {
  const [tab, setTab] = useState(0);
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadProfile = async () => {
    try {
      const res = await apiCall("GET", "me");
      setUser(res.response);
    } catch {
      setError("Failed to load profile");
    }
  };

  const loadOrders = async () => {
    try {
      const res = await apiCall("POST", "orders/myorders");
      setOrders(res.response || []);
    } catch {
      setOrders([]);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([loadProfile(), loadOrders()]);
      setLoading(false);
    };
    init();
  }, []);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return <CheckCircleIcon sx={{ fontSize: 16, color: '#4caf50' }} />;
      case 'shipped': return <LocalShippingIcon sx={{ fontSize: 16, color: '#2196f3' }} />;
      case 'processing': return <PendingIcon sx={{ fontSize: 16, color: '#ff9800' }} />;
      default: return <InventoryIcon sx={{ fontSize: 16, color: '#757575' }} />;
    }
  };

  const getTrackingProgress = (status) => {
    const steps = {
      'ordered': 25,
      'processing': 50,
      'shipped': 75,
      'delivered': 100
    };
    return steps[status] || 25;
  };

  const sameTabSize = {
  width: "100%",
  minHeight: 550,   // this makes all tabs same height
};


  const getLatestOrder = () => {
    if (orders.length === 0) return null;
    return orders.sort((a, b) => new Date(b.created_at) - new Date(a.created_at))[0];
  };

  const latestOrder = getLatestOrder();

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="60vh">
        <CircularProgress size={40} />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ width: "100%", p: 2 }}>
        <Alert severity="error">Unable to load user</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      width: "100%", 
      p: 1.5,
      maxWidth: { lg: '1600px', xl: '1800px' },
      // mx: 'auto',
      mt:"-30px"
    }}>
     

      {/* MAIN LAYOUT */}
      <Grid container spacing={3} alignItems="stretch">
        {/* LEFT SIDEBAR - USER PROFILE */}
        <Grid item xs={12} md={5}>
          <Paper sx={{ 
            p: 6, 
            borderRadius: 2.5,
            height: '92%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #667eea 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden',
            boxShadow: '0 10px 30px rgba(102, 126, 234, 0.2)'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: -40, 
              right: -40, 
              width: 250, 
              height: 150, 
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)'
            }} />
            
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              {/* USER AVATAR */}
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffffff&color=667eea&bold=true&size=150`}
                  sx={{ 
                    width: 100, 
                    height: 100, 
                    border: '4px solid rgba(255,255,255,0.3)',
                    mb: 2,
                    boxShadow: '0 8px 16px rgba(0,0,0,0.1)'
                  }}
                >
                  {user.name?.charAt(0)}
                </Avatar>
                <Typography variant="h6" fontWeight="700" align="center">{user.name}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9, textAlign: 'center' }}>{user.email}</Typography>
              </Box>

              {/* USER STATUS */}
              <Box sx={{ 
                bgcolor: 'rgba(255,255,255,0.1)', 
                p: 2, 
                borderRadius: 2,
                mb: 3,
                backdropFilter: 'blur(10px)'
              }}>
                <Stack direction="row" spacing={1} justifyContent="center">
                  <Chip 
                    icon={<VerifiedUserIcon />}
                    label={user.role}
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(255,255,255,0.2)',
                      color: 'white',
                      fontWeight: '600',
                      '& .MuiChip-icon': { color: 'white' }
                    }} 
                  />
                  <Chip
                    label={user.status}
                    size="small"
                    sx={{
                      bgcolor: user.status === "active" ? 'rgba(76, 175, 80, 0.3)' : 'rgba(244, 67, 54, 0.3)',
                      color: 'white',
                      fontWeight: '600',
                      border: '1px solid rgba(255,255,255,0.3)'
                    }}
                  />
                </Stack>
              </Box>

              {/* MEMBER INFO */}
              <Box sx={{ 
                bgcolor: 'rgba(255,255,255,0.08)', 
                p: 2, 
                borderRadius: 2,
                border: '1px solid rgba(255,255,255,0.1)'
              }}>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1.5 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon sx={{ fontSize: 18, mr: 1, opacity: 0.8 }} />
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>Member Since</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="500">
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric' 
                    }) : 'N/A'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <MonetizationOnIcon sx={{ fontSize: 18, mr: 1, opacity: 0.8 }} />
                    <Typography variant="caption" sx={{ opacity: 0.9 }}>Total Orders</Typography>
                  </Box>
                  <Typography variant="body2" fontWeight="500">{orders.length}</Typography>
                </Box>
              </Box>

              {/* EDIT PROFILE BUTTON */}
              <Button
                fullWidth
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ 
                  mt: 3, 
                  bgcolor: 'white', 
                  color: '#667eea',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.9)',
                  },
                  fontWeight: '600',
                  borderRadius: 2,
                  py: 1
                }}
              >
                Edit Profile
              </Button>
            </Box>
          </Paper>
        </Grid>

        {/* RIGHT CONTENT */}
        <Grid item xs={12} md={7}>
          {/* STATS CARDS */}
          <Grid container spacing={5.5} sx={{ mb: 1 }}>
            <Grid item xs={6} md={3}>
              <Card sx={{ 
                p: 2, 
                borderRadius: 2,
                borderLeft: '4px solid #2196f3',
                boxShadow: '0 4px 12px rgba(33, 150, 243, 0.1)'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '600', mb: 1 }}>
                  Total Orders
                </Typography>
                <Typography variant="h4" fontWeight="700" color="#2196f3">
                  {orders.length}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ 
                p: 2, 
                borderRadius: 2,
                borderLeft: '4px solid #ff9800',
                boxShadow: '0 4px 12px rgba(255, 152, 0, 0.1)'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '600', mb: 1 }}>
                  Pending
                </Typography>
                <Typography variant="h4" fontWeight="700" color="#ff9800">
                  {orders.filter(o => o.status === 'processing').length}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ 
                p: 2, 
                borderRadius: 2,
                borderLeft: '4px solid #4caf50',
                boxShadow: '0 4px 12px rgba(76, 175, 80, 0.1)'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '600', mb: 1 }}>
                  Delivered
                </Typography>
                <Typography variant="h4" fontWeight="700" color="#4caf50">
                  {orders.filter(o => o.status === 'delivered').length}
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} md={3}>
              <Card sx={{ 
                p: 2, 
                borderRadius: 2,
                borderLeft: '4px solid #9c27b0',
                boxShadow: '0 4px 12px rgba(156, 39, 176, 0.1)'
              }}>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: '600', mb: 1 }}>
                  Total Spent
                </Typography>
                <Typography variant="h4" fontWeight="700" color="#9c27b0">
                  ₹{orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0).toLocaleString('en-IN')}
                </Typography>
              </Card>
            </Grid>
          </Grid>

          {/* ORDER TRACKING */}
          {latestOrder && (
            <Card sx={{ 
              p: 4.5, 
              mb: 3, 
              borderRadius: 2,
              border: '1px solid',
              borderColor: 'divider',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="600" sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocalShippingIcon sx={{ mr: 1, color: 'primary.main' }} />
                  Track Recent Order
                </Typography>
                <Chip
                  icon={getStatusIcon(latestOrder.status)}
                  label={latestOrder.status}
                  size="small"
                  sx={{
                    fontWeight: '600',
                    bgcolor: latestOrder.status === "delivered" ? alpha('#4caf50', 0.1) : 
                             latestOrder.status === "shipped" ? alpha('#2196f3', 0.1) : alpha('#ff9800', 0.1),
                    color: latestOrder.status === "delivered" ? '#2e7d32' : 
                           latestOrder.status === "shipped" ? '#1976d2' : '#ed6c02',
                  }}
                />
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" color="text.secondary">
                  Order #{latestOrder.order_no || latestOrder.id} • 
                  {latestOrder.created_at ? new Date(latestOrder.created_at).toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric'
                  }) : 'N/A'}
                </Typography>
                <Typography variant="h6" fontWeight="600" sx={{ mt: 0.5 }}>
                  ₹{latestOrder.total_amount}
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
  {/* Progress Bar */}
  <LinearProgress
    variant="determinate"
    value={getTrackingProgress(latestOrder.status)}
    sx={{
      height: 10,
      borderRadius: 5,
      width: "100%",
      mb: 3,
      bgcolor: alpha("#e0e0e0", 0.6),
      "& .MuiLinearProgress-bar": {
        background:
          latestOrder.status === "delivered"
            ? "linear-gradient(90deg, #4caf50, #2e7d32)"
            : latestOrder.status === "shipped"
            ? "linear-gradient(90deg, #2196f3, #1976d2)"
            : "linear-gradient(90deg, #ff9800, #f57c00)",
        borderRadius: 5,
      },
    }}
  />

  {/* Order Steps */}
  <Grid
    container
    justifyContent="space-between"
    alignItems="center"
    sx={{ px: 1 }}
  >
    {["Ordered", "Processing", "Shipped", "Delivered"].map((step, index) => {
      const active =
        getTrackingProgress(latestOrder.status) >= (index + 1) * 25;

      return (
        <Grid item xs={3} key={step}>
          <Box sx={{ textAlign: "center" }}>
            <Box
              sx={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                mx: "auto",
                mb: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                bgcolor: active
                  ? latestOrder.status === "delivered"
                    ? "#4caf50"
                    : latestOrder.status === "shipped" && index <= 2
                    ? "#2196f3"
                    : "#ff9800"
                  : "#e0e0e0",
                color: "white",
                fontSize: "0.8rem",
                fontWeight: 600,
                transition: "all 0.3s ease",
              }}
            >
              {index + 1}
            </Box>

            <Typography
              variant="caption"
              sx={{
                fontWeight: active ? 600 : 400,
                color: active ? "text.primary" : "text.secondary",
                whiteSpace: "nowrap",
              }}
            >
              {step}
            </Typography>
          </Box>
        </Grid>
      );
    })}
  </Grid>
</Box>


             
            </Card>
          )}

          {/* TABS SECTION */}
          <Paper sx={{ 
            p: 3, 
            borderRadius: 2,
            boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
          }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
              <Tabs 
                value={tab} 
                onChange={(e, v) => setTab(v)}
                sx={{
                  '& .MuiTab-root': {
                    textTransform: 'none',
                    fontWeight: '600',
                    fontSize: '0.95rem',
                    minHeight: 48,
                    '&.Mui-selected': {
                      color: 'primary.main',
                    }
                  }
                }}
              >
                <Tab icon={<PersonIcon />} label="Profile Details" />
                <Tab icon={<ShoppingBagIcon />} label={`Order History (${orders.length})`} />
                <Tab icon={<SecurityIcon />} label="Security" />
              </Tabs>
            </Box>

            {/* PROFILE TAB */}
            <TabPanel value={tab} index={0}>
                 <Box sx={sameTabSize}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    p: 2.5, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%'
                  }}>
                    <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                      Contact Information
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <EmailIcon sx={{ fontSize: 22, mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Email Address</Typography>
                        <Typography variant="body1" fontWeight="500">{user.email}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                      <PhoneIcon sx={{ fontSize: 22, mr: 2, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                        <Typography variant="body1" fontWeight="500">{user.phone || "Not provided"}</Typography>
                      </Box>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <LocationOnIcon sx={{ fontSize: 22, mr: 2, mt: 0.5, color: 'primary.main' }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="caption" color="text.secondary">Shipping Address</Typography>
                        <Typography variant="body1" fontWeight="500">{user.address || "No address added"}</Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    p: 2.5, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)'
                  }}>
                    <Typography variant="subtitle1" fontWeight="600" gutterBottom sx={{ mb: 2 }}>
                      Account Security
                    </Typography>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Password Strength
                      </Typography>
                      <LinearProgress 
                        variant="determinate" 
                        value={70} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          bgcolor: alpha('#e0e0e0', 0.5),
                          '& .MuiLinearProgress-bar': {
                            background: 'linear-gradient(90deg, #4caf50, #2e7d32)',
                          }
                        }} 
                      />
                    </Box>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Last Password Change
                      </Typography>
                      <Typography variant="body1" fontWeight="500">
                        {user.updated_at ? new Date(user.updated_at).toLocaleDateString('en-IN', { 
                          day: 'numeric', 
                          month: 'long', 
                          year: 'numeric' 
                        }) : 'Not available'}
                      </Typography>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
              </Box>
            </TabPanel>

            {/* ORDERS TAB */}
            <TabPanel value={tab} index={1}>
                 <Box sx={sameTabSize}>
              <Box sx={{ width: '100%' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Typography variant="h6" fontWeight="600">
                    Order History
                  </Typography>
                  <Button 
                    variant="outlined" 
                    startIcon={<AssignmentIcon />}
                    sx={{ borderRadius: 2 }}
                  >
                    Export Orders
                  </Button>
                </Box>
                
                {orders.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <ShoppingBagIcon sx={{ fontSize: 60, color: 'text.disabled', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary" gutterBottom>
                      No orders found
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Start shopping to see your orders here
                    </Typography>
                  </Box>
                ) : (
                  <Table sx={{ minWidth: 800 }}>
                    <TableHead>
                      <TableRow sx={{ 
                        bgcolor: alpha('#1976d2', 0.05),
                        '& th': { 
                          fontWeight: '600', 
                          fontSize: '0.9rem',
                          py: 2,
                          borderBottom: '2px solid',
                          borderColor: 'divider'
                        }
                      }}>
                        <TableCell width="15%">Order ID</TableCell>
                        <TableCell width="20%">Date</TableCell>
                        <TableCell width="25%">Items</TableCell>
                        <TableCell width="15%">Amount</TableCell>
                        <TableCell width="15%">Status</TableCell>
                        <TableCell width="10%">Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((o) => (
                        <TableRow 
                          key={o.id} 
                          hover 
                          sx={{ 
                            '&:hover': { bgcolor: alpha('#1976d2', 0.02) },
                            transition: 'background-color 0.2s'
                          }}
                        >
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body2" fontWeight="500" color="primary">
                              #{o.order_no || o.id}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body2">
                              {o.created_at ? new Date(o.created_at).toLocaleDateString('en-IN', {
                                day: '2-digit',
                                month: 'short',
                                year: 'numeric'
                              }) : 'N/A'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body2">
                              {o.items?.map(item => item.name).join(', ') || '1 item'}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Typography variant="body1" fontWeight="600">
                              ₹{o.total_amount}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getStatusIcon(o.status)}
                              <Chip
                                label={o.status}
                                size="small"
                                sx={{
                                  fontWeight: '600',
                                  bgcolor: o.status === "delivered" ? alpha('#4caf50', 0.1) : 
                                           o.status === "shipped" ? alpha('#2196f3', 0.1) : alpha('#ff9800', 0.1),
                                  color: o.status === "delivered" ? '#2e7d32' : 
                                         o.status === "shipped" ? '#1976d2' : '#ed6c02',
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 2 }}>
                            <Button 
                              size="small" 
                              variant="outlined"
                              sx={{ borderRadius: 1.5 }}
                            >
                              Track
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </Box>
              </Box>
            </TabPanel>

            {/* SECURITY TAB */}
            <TabPanel value={tab} index={2}>
                 <Box sx={sameTabSize}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <SecurityIcon sx={{ fontSize: 24, mr: 2, color: 'primary.main' }} />
                      <Typography variant="subtitle1" fontWeight="600">Password Management</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                      Last changed: 2 months ago
                    </Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        borderRadius: 2,
                        py: 1.2,
                        fontWeight: '600'
                      }}
                    >
                      Change Password
                    </Button>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ 
                    p: 3, 
                    borderRadius: 2,
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%'
                  }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <VerifiedUserIcon sx={{ fontSize: 24, mr: 2, color: 'primary.main' }} />
                      <Typography variant="subtitle1" fontWeight="600">Two-Factor Authentication</Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary" paragraph sx={{ mb: 3 }}>
                      Add an extra layer of security to your account
                    </Typography>
                    <Button 
                      variant="outlined" 
                      fullWidth 
                      sx={{ 
                        borderRadius: 2,
                        py: 1.2,
                        fontWeight: '600'
                      }}
                    >
                      Enable 2FA
                    </Button>
                  </Card>
                </Grid>
              </Grid>
              </Box>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
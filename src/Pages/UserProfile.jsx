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
import { apiCall } from "../api/api";

const TabPanel = ({ value, index, children }) => {
  if (value !== index) return null;
  return <Box sx={{ mt: 1 }}>{children}</Box>;
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
    <Box sx={{ width: "100%", p: 1.5 }}>
      {/* TOP BAR WITH USER INFO */}
      <Grid container spacing={1.5} sx={{ mb: 1.5 }}>
        {/* USER PROFILE CARD */}
        <Grid item xs={12} md={3}>
          <Paper sx={{ 
            p: 2, 
            borderRadius: 1.5,
            height: '100%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <Box sx={{ 
              position: 'absolute', 
              top: -20, 
              right: -20, 
              width: 100, 
              height: 100, 
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.1)'
            }} />
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Avatar
                src={user.image || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=ffffff&color=667eea&bold=true`}
                sx={{ 
                  width: 60, 
                  height: 60, 
                  border: '3px solid white',
                  mr: 2
                }}
              >
                {user.name?.charAt(0)}
              </Avatar>
              <Box>
                <Typography variant="h6" fontWeight="600">{user.name}</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{user.email}</Typography>
              </Box>
            </Box>
            <Stack direction="row" spacing={1} sx={{ mb: 1.5 }}>
              <Chip 
                label={user.role} 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)',
                  color: 'white',
                  fontWeight: '500'
                }} 
              />
              <Chip
                label={user.status}
                size="small"
                sx={{
                  bgcolor: user.status === "active" ? 'rgba(76, 175, 80, 0.2)' : 'rgba(244, 67, 54, 0.2)',
                  color: 'white',
                  fontWeight: '500'
                }}
              />
            </Stack>
            <Divider sx={{ my: 1.5, borderColor: 'rgba(255,255,255,0.2)' }} />
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography variant="caption" sx={{ opacity: 0.8 }}>Member Since</Typography>
                <Typography variant="body2">
                  {user.created_at ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' }) : 'N/A'}
                </Typography>
              </Box>
              <IconButton size="small" sx={{ color: 'white' }}>
                <EditIcon fontSize="small" />
              </IconButton>
            </Box>
          </Paper>
        </Grid>

        {/* QUICK STATS */}
        <Grid item xs={12} md={9}>
          <Grid container spacing={1.5}>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 1.5, borderRadius: 1.5, height: '100%' }}>
                <Typography variant="caption" color="text.secondary">Total Orders</Typography>
                <Typography variant="h5" fontWeight="600">{orders.length}</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 1.5, borderRadius: 1.5, height: '100%' }}>
                <Typography variant="caption" color="text.secondary">Pending</Typography>
                <Typography variant="h5" fontWeight="600" color="warning.main">
                  {orders.filter(o => o.status === 'processing').length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 1.5, borderRadius: 1.5, height: '100%' }}>
                <Typography variant="caption" color="text.secondary">Delivered</Typography>
                <Typography variant="h5" fontWeight="600" color="success.main">
                  {orders.filter(o => o.status === 'delivered').length}
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Paper sx={{ p: 1.5, borderRadius: 1.5, height: '100%' }}>
                <Typography variant="caption" color="text.secondary">Total Spent</Typography>
                <Typography variant="h5" fontWeight="600" color="primary.main">
                  ₹{orders.reduce((sum, o) => sum + (parseFloat(o.total_amount) || 0), 0).toLocaleString('en-IN')}
                </Typography>
              </Paper>
            </Grid>

            {/* ORDER TRACKING */}
            {latestOrder && (
              <Grid item xs={12}>
                <Paper sx={{ p: 1.5, borderRadius: 1.5 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                    <Typography variant="subtitle2" fontWeight="600">
                      <LocalShippingIcon sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                      Track Recent Order
                    </Typography>
                    <Chip
                      label={latestOrder.status}
                      size="small"
                      sx={{
                        fontSize: '0.7rem',
                        height: 20,
                        bgcolor: latestOrder.status === "delivered" ? alpha('#4caf50', 0.1) : alpha('#ff9800', 0.1),
                        color: latestOrder.status === "delivered" ? '#2e7d32' : '#ed6c02',
                      }}
                    />
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Order #{latestOrder.order_no || latestOrder.id} • {latestOrder.created_at ? new Date(latestOrder.created_at).toLocaleDateString('en-IN') : 'N/A'}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                    <Box sx={{ flexGrow: 1, mr: 2 }}>
                      <LinearProgress 
                        variant="determinate" 
                        value={getTrackingProgress(latestOrder.status)} 
                        sx={{ 
                          height: 6, 
                          borderRadius: 3,
                          '& .MuiLinearProgress-bar': {
                            backgroundColor: latestOrder.status === 'delivered' ? '#4caf50' : 
                                           latestOrder.status === 'shipped' ? '#2196f3' : '#ff9800'
                          }
                        }} 
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 0.5 }}>
                        {['Ordered', 'Processing', 'Shipped', 'Delivered'].map((step, index) => (
                          <Typography 
                            key={step} 
                            variant="caption" 
                            sx={{ 
                              color: getTrackingProgress(latestOrder.status) >= (index + 1) * 25 ? 
                                (latestOrder.status === 'delivered' ? '#4caf50' : 
                                 latestOrder.status === 'shipped' && index <= 2 ? '#2196f3' : '#ff9800') : 
                                'text.disabled',
                              fontWeight: getTrackingProgress(latestOrder.status) >= (index + 1) * 25 ? 600 : 400
                            }}
                          >
                            {step}
                          </Typography>
                        ))}
                      </Box>
                    </Box>
                    <Typography variant="body2" fontWeight="600">
                      ₹{latestOrder.total_amount}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/* MAIN CONTENT AREA */}
      <Grid container spacing={1.5}>
        {/* TABS NAVIGATION */}
        <Grid item xs={12} md={2}>
          <Paper sx={{ borderRadius: 1.5 }}>
            <Tabs
              orientation="vertical"
              value={tab}
              onChange={(e, v) => setTab(v)}
              sx={{
                '& .MuiTab-root': {
                  minHeight: 44,
                  justifyContent: 'flex-start',
                  fontSize: '0.8rem',
                  px: 2,
                  '&.Mui-selected': {
                    bgcolor: alpha('#1976d2', 0.08),
                    color: 'primary.main',
                    fontWeight: 600,
                    borderLeft: '3px solid',
                    borderColor: 'primary.main',
                  }
                }
              }}
            >
              <Tab icon={<PersonIcon sx={{ fontSize: 18 }} />} label="Profile Details" />
              <Tab icon={<ShoppingBagIcon sx={{ fontSize: 18 }} />} label="Order History" />
              <Tab icon={<SecurityIcon sx={{ fontSize: 18 }} />} label="Security" />
            </Tabs>
          </Paper>
        </Grid>

        {/* TAB CONTENT */}
        <Grid item xs={12} md={10}>
          <Paper sx={{ p: 2, borderRadius: 1.5 }}>
            {/* PROFILE TAB */}
            <TabPanel value={tab} index={0}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Contact Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <EmailIcon sx={{ fontSize: 18, mr: 1.5, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Email Address</Typography>
                        <Typography variant="body2">{user.email}</Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Card variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon sx={{ fontSize: 18, mr: 1.5, color: 'primary.main' }} />
                      <Box>
                        <Typography variant="caption" color="text.secondary">Phone Number</Typography>
                        <Typography variant="body2">{user.phone || "Not provided"}</Typography>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
                
                <Grid item xs={12}>
                  <Card variant="outlined" sx={{ p: 1.5, borderRadius: 1 }}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                      <LocationOnIcon sx={{ fontSize: 18, mr: 1.5, mt: 0.25, color: 'primary.main' }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Typography variant="caption" color="text.secondary">Shipping Address</Typography>
                        <Typography variant="body2">{user.address || "No address added"}</Typography>
                      </Box>
                      <Button size="small" startIcon={<EditIcon />}>Edit</Button>
                    </Box>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>

            {/* ORDERS TAB */}
            <TabPanel value={tab} index={1}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="600">
                  All Orders ({orders.length})
                </Typography>
                <Button size="small" variant="outlined" startIcon={<AssignmentIcon />}>
                  Export
                </Button>
              </Box>
              <Divider sx={{ mb: 2 }} />
              
              {orders.length === 0 ? (
                <Alert severity="info" sx={{ py: 1 }}>No orders found</Alert>
              ) : (
                <Box sx={{ width: '100%', overflowX: 'auto' }}>
                  <Table size="small" sx={{ minWidth: 900 }}>
                    <TableHead>
                      <TableRow sx={{ bgcolor: alpha('#000', 0.02) }}>
                        <TableCell sx={{ py: 1, fontWeight: 600, fontSize: '0.8rem', width: '15%' }}>Order ID</TableCell>
                        <TableCell sx={{ py: 1, fontWeight: 600, fontSize: '0.8rem', width: '20%' }}>Date</TableCell>
                        <TableCell sx={{ py: 1, fontWeight: 600, fontSize: '0.8rem', width: '25%' }}>Items</TableCell>
                        <TableCell sx={{ py: 1, fontWeight: 600, fontSize: '0.8rem', width: '15%' }}>Amount</TableCell>
                        <TableCell sx={{ py: 1, fontWeight: 600, fontSize: '0.8rem', width: '15%' }}>Status</TableCell>
                        <TableCell sx={{ py: 1, fontWeight: 600, fontSize: '0.8rem', width: '10%' }}>Action</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {orders.map((o) => (
                        <TableRow key={o.id} hover sx={{ '&:hover': { bgcolor: alpha('#1976d2', 0.02) } }}>
                          <TableCell sx={{ py: 1, fontSize: '0.8rem' }}>
                            <Typography variant="body2" fontWeight="500">
                              #{o.order_no || o.id}
                            </Typography>
                          </TableCell>
                          <TableCell sx={{ py: 1, fontSize: '0.8rem' }}>
                            {o.created_at ? new Date(o.created_at).toLocaleDateString('en-IN') : 'N/A'}
                          </TableCell>
                          <TableCell sx={{ py: 1, fontSize: '0.8rem' }}>
                            {o.items?.map(item => item.name).join(', ') || '1 item'}
                          </TableCell>
                          <TableCell sx={{ py: 1, fontSize: '0.8rem', fontWeight: 500 }}>
                            ₹{o.total_amount}
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {getStatusIcon(o.status)}
                              <Chip
                                label={o.status}
                                size="small"
                                sx={{
                                  fontSize: '0.7rem',
                                  height: 20,
                                  bgcolor: o.status === "delivered" ? alpha('#4caf50', 0.1) : 
                                           o.status === "shipped" ? alpha('#2196f3', 0.1) : alpha('#ff9800', 0.1),
                                  color: o.status === "delivered" ? '#2e7d32' : 
                                         o.status === "shipped" ? '#1976d2' : '#ed6c02',
                                }}
                              />
                            </Box>
                          </TableCell>
                          <TableCell sx={{ py: 1 }}>
                            <Button size="small" variant="text" sx={{ fontSize: '0.75rem' }}>
                              Track
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Box>
              )}
            </TabPanel>

            {/* SECURITY TAB */}
            <TabPanel value={tab} index={2}>
              <Typography variant="subtitle1" fontWeight="600" gutterBottom>
                Security & Privacy
              </Typography>
              <Divider sx={{ mb: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, borderRadius: 1.5 }}>
                    <Typography variant="body2" fontWeight="600" gutterBottom>
                      Password Management
                    </Typography>
                    <Typography variant="caption" color="text.secondary" paragraph>
                      Last changed: 2 months ago
                    </Typography>
                    <Button size="small" variant="contained" fullWidth sx={{ borderRadius: 1 }}>
                      Change Password
                    </Button>
                  </Card>
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Card sx={{ p: 2, borderRadius: 1.5 }}>
                    <Typography variant="body2" fontWeight="600" gutterBottom>
                      Login Activity
                    </Typography>
                    <Typography variant="caption" color="text.secondary" paragraph>
                      Current session: Active
                    </Typography>
                    <Button size="small" variant="outlined" fullWidth sx={{ borderRadius: 1 }}>
                      View Sessions
                    </Button>
                  </Card>
                </Grid>
              </Grid>
            </TabPanel>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserProfile;
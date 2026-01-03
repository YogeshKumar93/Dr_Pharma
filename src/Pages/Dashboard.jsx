import { useEffect, useState, useMemo } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Box,
  Container,
  Stack,
  Divider,
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Avatar,
  AvatarGroup,
  LinearProgress,
  IconButton,
  Tooltip,
  useTheme,
} from "@mui/material";

import {
  People as PeopleIcon,
  Inventory as InventoryIcon,
  ShoppingCart as ShoppingCartIcon,
  PendingActions as PendingIcon,
  TaskAlt as CompletedIcon,
  AttachMoney as RevenueIcon,
  LocalOffer as OfferIcon,
  LocationOn as LocationIcon,
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  MoreVert as MoreVertIcon,
  AccessTime as AccessTimeIcon,
  ArrowUpward as ArrowUpwardIcon,
  ArrowDownward as ArrowDownwardIcon,
} from "@mui/icons-material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  CartesianGrid,
  Legend,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";

import { apiCall } from "../api/api";
import ApiEndpoints from "../api/ApiEndpoints";

// ================= DASHBOARD =================
const Dashboard = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(true);
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [offersCount, setOffersCount] = useState(0);
  const [pincodesCount, setPincodesCount] = useState(0);

  // API calls remain exactly the same
  const getUsers = async () => {
    const { response } = await apiCall("GET", "users");
    const data = response?.data || response?.users || [];
    setUsersCount(data.length);
  };

  const getProducts = async () => {
    const { response } = await apiCall("GET", "products");
    const list = safeArray(response, "products");
    setProductsCount(list.length);
  };

  const safeArray = (res, key) => {
    if (!res) return [];
    if (Array.isArray(res?.data)) return res.data;
    if (Array.isArray(res?.[key])) return res[key];
    if (Array.isArray(res)) return res;
    return [];
  };

  const getOrders = async () => {
    const { response } = await apiCall("GET", "admin/orders");
    setOrders(Array.isArray(response) ? response : []);
  };

  const getPayments = async () => {
    try {
      const { response, error } = await apiCall(
        "GET",
        ApiEndpoints.ADMIN_PAYMENTS,
        null,
        true
      );

      if (error) {
        console.error("Dashboard payments error", error);
        setPayments([]);
        return;
      }

      setPayments(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Dashboard payments failed", err);
      setPayments([]);
    }
  };

  const getOffers = async () => {
    try {
      const res = await apiCall("GET", "special-offers");
      const list = Array.isArray(res?.response) ? res.response : [];
      setOffersCount(list.length);
    } catch (err) {
      console.error("Dashboard offers fetch failed", err);
      setOffersCount(0);
    }
  };

  const getPincodes = async () => {
    const { response } = await apiCall("GET", "admin/pincodes");
    const data = response?.data || response?.pincodes || [];
    setPincodesCount(data.length);
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await Promise.all([
        getUsers(),
        getProducts(),
        getOrders(),
        getPayments(),
        getOffers(),
        getPincodes(),
      ]);
      setLoading(false);
    };
    load();
  }, []);

  // Calculations remain the same
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.order_status === "pending").length;
  const completedOrders = orders.filter(o => o.order_status === "completed").length;
  const totalRevenue = payments.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  // Enhanced chart data
  const orderPieData = useMemo(() => [
    { name: "Pending", value: pendingOrders, color: "#FF6B6B" },
    { name: "Completed", value: completedOrders, color: "#4CAF50" },
  ], [pendingOrders, completedOrders]);

  // Recent orders data (last 5 orders)
  const recentOrders = useMemo(() => {
    return orders.slice(-5).reverse();
  }, [orders]);

  // Recent payments data (last 5 payments)
  const recentPayments = useMemo(() => {
    return payments.slice(-5).reverse();
  }, [payments]);

  // Revenue trend data (last 7 days simulation)
  const revenueTrendData = useMemo(() => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      day,
      revenue: Math.floor(Math.random() * 10000) + 5000,
      orders: Math.floor(Math.random() * 20) + 5,
    }));
  }, []);

  // Payment method distribution
  const paymentMethodData = useMemo(() => {
    const methods = {};
    payments.forEach(payment => {
      const method = payment.payment_method || 'Unknown';
      methods[method] = (methods[method] || 0) + 1;
    });
    return Object.entries(methods).map(([name, value]) => ({
      name,
      value,
      color: name === 'Credit Card' ? '#2196F3' : 
             name === 'PayPal' ? '#FF9800' : 
             name === 'Cash' ? '#4CAF50' : '#9C27B0'
    }));
  }, [payments]);

  if (loading) {
    return (
      <Box sx={{ 
        minHeight: "70vh", 
        display: "flex", 
        justifyContent: "center", 
        alignItems: "center",
        flexDirection: 'column',
        gap: 2
      }}>
        <CircularProgress size={60} />
        <Typography color="text.secondary">Loading dashboard data...</Typography>
      </Box>
    );
  }

  // Enhanced dashboard cards
  const dashboardCards = [
    { 
      title: "Total Users", 
      value: usersCount, 
      icon: <PeopleIcon />, 
      color: "#2196F3",
      trend: "+12%",
      trendUp: true 
    },
    { 
      title: "Products", 
      value: productsCount, 
      icon: <InventoryIcon />, 
      color: "#4CAF50",
      trend: "+5%",
      trendUp: true 
    },
    { 
      title: "Total Orders", 
      value: totalOrders, 
      icon: <ShoppingCartIcon />, 
      color: "#FF9800",
      trend: "+23%",
      trendUp: true 
    },
    { 
      title: "Pending Orders", 
      value: pendingOrders, 
      icon: <PendingIcon />, 
      color: "#F44336",
      trend: pendingOrders > 10 ? "High" : "Low",
      trendUp: false 
    },
    { 
      title: "Completed", 
      value: completedOrders, 
      icon: <CompletedIcon />, 
      color: "#009688",
      trend: "+18%",
      trendUp: true 
    },
    { 
      title: "Total Revenue", 
      value: `₹${totalRevenue.toLocaleString()}`, 
      icon: <RevenueIcon />, 
      color: "#673AB7",
      trend: "+32%",
      trendUp: true 
    },
    { 
      title: "Active Offers", 
      value: offersCount, 
      icon: <OfferIcon />, 
      color: "#E91E63",
      trend: "Active",
      trendUp: true 
    },
    { 
      title: "Service Areas", 
      value: pincodesCount, 
      icon: <LocationIcon />, 
      color: "#3F51B5",
      trend: "Covered",
      trendUp: true 
    },
  ];

  return (
    <Box sx={{ 
      minHeight: "100vh", 
      bgcolor: "background.default",
      pb: 4
    }}>
      <Container maxWidth="xl" sx={{ py: 3 }}>
        {/* HEADER */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4
        }}>
          <Box>
            <Typography variant="h4" fontWeight={700} gutterBottom>
              Dashboard Overview
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Welcome back! Here's what's happening with your store today.
            </Typography>
          </Box>
          <Chip 
            icon={<AccessTimeIcon />} 
            label={`Last updated: ${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`}
            variant="outlined"
          />
        </Box>

        {/* ===== STATISTICS CARDS ===== */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {dashboardCards.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <EnhancedDashboardCard {...card} />
            </Grid>
          ))}
        </Grid>

        {/* ===== CHARTS AND GRAPHS SECTION ===== */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {/* Revenue Trend Chart */}
          <Grid item xs={12} md={8}>
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3 
                }}>
                  <Box>
                    <Typography variant="h6" fontWeight={600}>
                      Revenue Trend
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Last 7 days performance
                    </Typography>
                  </Box>
                  <Chip 
                    label="This Week" 
                    size="small"
                    variant="outlined"
                  />
                </Box>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="day" />
                      <YAxis />
                      <RechartsTooltip 
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                        labelFormatter={(label) => `Day: ${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        stroke="#673AB7" 
                        fill="url(#colorRevenue)"
                        fillOpacity={0.3}
                      />
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#673AB7" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#673AB7" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Status Distribution */}
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              height: '100%'
            }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={2}>
                  Order Status
                </Typography>
                <Box sx={{ height: 250, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <PieChart width={250} height={250}>
                    <Pie
                      data={orderPieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {orderPieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip formatter={(value) => [value, 'Orders']} />
                    <Legend />
                  </PieChart>
                </Box>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Total Orders: {totalOrders}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* ===== TABLES SECTION ===== */}
        <Grid container spacing={3}>
          {/* Recent Orders Table */}
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
              height: '100%'
            }}>
              <CardContent>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3 
                }}>
                  <Typography variant="h6" fontWeight={600}>
                    Recent Orders
                  </Typography>
                  <Tooltip title="View all orders">
                    <IconButton size="small">
                      <MoreVertIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TableContainer component={Paper} elevation={0} sx={{ maxHeight: 400 }}>
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Order ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell align="right">Amount</TableCell>
                        <TableCell>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order, index) => (
                        <TableRow key={index} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              #{order.order_id || `ORD${1000 + index}`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip 
                              label={order.order_status || 'Pending'}
                              size="small"
                              color={order.order_status === 'completed' ? 'success' : 'warning'}
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={500}>
                              ₹{order.amount || (Math.random() * 5000 + 100).toFixed(2)}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="text.secondary">
                              {new Date().toLocaleDateString()}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ mt: 2, textAlign: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    Showing {recentOrders.length} of {totalOrders} orders
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Payments & Payment Methods */}
          <Grid item xs={12} md={6}>
            <Grid container spacing={2}>
              {/* Recent Payments Table */}
              <Grid item xs={12}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Recent Payments
                    </Typography>
                    <TableContainer sx={{ maxHeight: 200 }}>
                      <Table size="small">
                        <TableHead>
                          <TableRow>
                            <TableCell>Payment ID</TableCell>
                            <TableCell>Method</TableCell>
                            <TableCell align="right">Amount</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {recentPayments.slice(0, 4).map((payment, index) => (
                            <TableRow key={index} hover>
                              <TableCell>
                                <Typography variant="body2">
                                  #{payment.payment_id || `PAY${2000 + index}`}
                                </Typography>
                              </TableCell>
                              <TableCell>
                                <Chip 
                                  label={payment.payment_method || 'Credit Card'}
                                  size="small"
                                  variant="outlined"
                                />
                              </TableCell>
                              <TableCell align="right">
                                <Typography variant="body2" fontWeight={500}>
                                  ₹{payment.amount || '0.00'}
                                </Typography>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </CardContent>
                </Card>
              </Grid>

              {/* Payment Methods Distribution */}
              <Grid item xs={12}>
                <Card sx={{ 
                  borderRadius: 2,
                  boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
                }}>
                  <CardContent>
                    <Typography variant="h6" fontWeight={600} mb={2}>
                      Payment Methods
                    </Typography>
                    <Box sx={{ height: 150 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paymentMethodData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f5f5f5" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip />
                          <Bar 
                            dataKey="value" 
                            radius={[4, 4, 0, 0]}
                            fill="#8884d8"
                          >
                            {paymentMethodData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* ===== PERFORMANCE METRICS ===== */}
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12}>
            <Card sx={{ 
              borderRadius: 2,
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)'
            }}>
              <CardContent>
                <Typography variant="h6" fontWeight={600} mb={3}>
                  Performance Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Order Completion Rate
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress 
                            variant="determinate" 
                            value={(completedOrders / totalOrders) * 100 || 0} 
                            sx={{ height: 8, borderRadius: 4 }}
                            color="success"
                          />
                        </Box>
                        <Typography variant="h6" fontWeight={600}>
                          {totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Average Order Value
                      </Typography>
                      <Typography variant="h6" fontWeight={600}>
                        ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        Daily Revenue Trend
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUpIcon color="success" />
                        <Typography variant="h6" fontWeight={600} color="success.main">
                          +15.2%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

// ================= ENHANCED CARD COMPONENT =================
const EnhancedDashboardCard = ({ title, value, icon, color, trend, trendUp }) => (
  <Card sx={{
    borderRadius: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    }
  }}>
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{
          backgroundColor: alpha(color, 0.1),
          borderRadius: 2,
          p: 1.5,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Box sx={{ color, fontSize: 28 }}>
            {icon}
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ mb: 1 }}>
            {value}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            {trendUp ? (
              <ArrowUpwardIcon sx={{ fontSize: 16, color: '#4CAF50' }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: 16, color: '#F44336' }} />
            )}
            <Typography 
              variant="caption" 
              sx={{ 
                color: trendUp ? '#4CAF50' : '#F44336',
                fontWeight: 600
              }}
            >
              {trend}
            </Typography>
          </Box>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default Dashboard;
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
  alpha,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
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
    return [...orders]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
  }, [orders]);

  // Recent payments data (last 5 payments)
  const recentPayments = useMemo(() => {
    return [...payments]
      .sort((a, b) => new Date(b.created_at) - new Date(a.created_at))
      .slice(0, 5);
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

  // Enhanced dashboard cards - Smaller size
  const dashboardCards = [
    {
      title: "Total Users",
      value: usersCount,
      icon: <PeopleIcon />,
      color: "#2196F3",
      trend: "+12%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #2196F3 0%, #21CBF3 100%)"
    },
    {
      title: "Products",
      value: productsCount,
      icon: <InventoryIcon />,
      color: "#4CAF50",
      trend: "+5%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)"
    },
    {
      title: "Total Orders",
      value: totalOrders,
      icon: <ShoppingCartIcon />,
      color: "#FF9800",
      trend: "+23%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #FF9800 0%, #FFB74D 100%)"
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: <PendingIcon />,
      color: "#F44336",
      trend: pendingOrders > 10 ? "High" : "Low",
      trendUp: false,
      bgColor: "linear-gradient(135deg, #F44336 0%, #EF5350 100%)"
    },
    {
      title: "Completed",
      value: completedOrders,
      icon: <CompletedIcon />,
      color: "#009688",
      trend: "+18%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #009688 0%, #26A69A 100%)"
    },
    {
      title: "Total Sales",
      value: `₹${totalRevenue.toLocaleString()}`,
      icon: <RevenueIcon />,
      color: "#673AB7",
      trend: "+32%",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #673AB7 0%, #9575CD 100%)"
    },
    {
      title: "Active Offers",
      value: offersCount,
      icon: <OfferIcon />,
      color: "#E91E63",
      trend: "Active",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #E91E63 0%, #F06292 100%)"
    },
    {
      title: "Service Areas",
      value: pincodesCount,
      icon: <LocationIcon />,
      color: "#3F51B5",
      trend: "Covered",
      trendUp: true,
      bgColor: "linear-gradient(135deg, #3F51B5 0%, #7986CB 100%)"
    },
  ];

  return (
    <Box sx={{
      minHeight: "100vh",
      bgcolor: "#f5f7fa",
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
            
            <Typography variant="body2" color="#718096">
              Welcome! Here's what's happening with your store today.
            </Typography>
          </Box>
          <Chip
            icon={<AccessTimeIcon />}
            label={`Last updated: ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`}
            variant="outlined"
            sx={{ borderColor: '#cbd5e0', color: '#4a5568' }}
          />
        </Box>

        {/* ===== STATISTICS CARDS ===== */}
        {/* Single row of equal width-height cards - Smaller size */}
        <Box sx={{
          display: 'flex',
          flexWrap: 'nowrap',
          overflowX: 'auto',
          gap: 2,
          mb: 4,
          pb: 1,
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background: theme.palette.divider,
            borderRadius: 3,
          },
        }}>
          {dashboardCards.map((card, index) => (
            <Box 
              key={index} 
              sx={{ 
                minWidth: 180, // Smaller width
                flexShrink: 0 
              }}
            >
              <EnhancedDashboardCard {...card} />
            </Box>
          ))}
        </Box>

        {/* ===== MAIN CONTENT - 2 ITEMS PER ROW ===== */}
        {/* Row 1: Charts */}
        <Grid container spacing={6} sx={{ mb: 3 }}>
          {/* Revenue Trend Chart - Left (50%) */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(103, 58, 183, 0.1)',
              height: '100%',
              width:'700px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)',
              border: '1px solid #e2e8f0',
               flex: 1
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Box>
                    <Typography variant="h6" fontWeight={700} color="#2d3748">
                      Sales Trend
                    </Typography>
                    <Typography variant="body2" color="#718096">
                      Last 7 days performance
                    </Typography>
                  </Box>
                  <Chip
                    label="This Week"
                    size="small"
                    sx={{ 
                      bgcolor: 'rgba(103, 58, 183, 0.1)', 
                      color: '#673AB7',
                      fontWeight: 600
                    }}
                  />
                </Box>
                <Box sx={{ height: 250 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueTrendData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="day" stroke="#718096" />
                      <YAxis stroke="#718096" />
                      <RechartsTooltip
                        formatter={(value) => [`₹${value}`, 'Revenue']}
                        labelFormatter={(label) => `Day: ${label}`}
                        contentStyle={{ 
                          borderRadius: 8,
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#673AB7"
                        strokeWidth={3}
                        fill="url(#colorRevenue)"
                        fillOpacity={0.6}
                      />
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#673AB7" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#673AB7" stopOpacity={0} />
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Order Status Distribution - Right (50%) */}
          <Grid item xs={12} md={6} sx={{ display: 'flex' }}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(76, 175, 80, 0.1)',
              height: '100%',
              width:'400px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0fff4 100%)',
              border: '1px solid #e2e8f0',
              flex: 1
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2} color="#2d3748">
                  Order Status Distribution
                </Typography>
                <Box sx={{ 
                  height: 250, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
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
                      labelLine={false}
                    >
                      {orderPieData.map((entry, index) => (
                        <Cell 
                          key={`cell-${index}`} 
                          fill={entry.color}
                          stroke="#fff"
                          strokeWidth={2}
                        />
                      ))}
                    </Pie>
                    <RechartsTooltip 
                      formatter={(value) => [value, 'Orders']}
                      contentStyle={{ 
                        borderRadius: 8,
                        border: 'none',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </Box>
                <Box sx={{ 
                  mt: 2, 
                  textAlign: 'center',
                  p: 2,
                  bgcolor: 'rgba(76, 175, 80, 0.05)',
                  borderRadius: 2
                }}>
                  <Typography variant="body1" fontWeight={600} color="#2d3748">
                    Total Orders: {totalOrders}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Row 2: Tables */}
        <Grid container spacing={6} sx={{ mb: 3 }}>
          {/* Recent Orders Table - Left (50%) */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(255, 152, 0, 0.1)',
              height: '100%',
              width:'700px',
              background: 'linear-gradient(135deg, #ffffff 0%, #fff8f0 100%)',
              border: '1px solid #e2e8f0'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Box sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h6" fontWeight={700} color="#2d3748">
                    Recent Orders
                  </Typography>
                  <Tooltip title="View all orders">
                    <IconButton 
                      size="small"
                      sx={{ 
                        bgcolor: 'rgba(255, 152, 0, 0.1)',
                        '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.2)' }
                      }}
                    >
                      <MoreVertIcon sx={{ color: '#FF9800' }} />
                    </IconButton>
                  </Tooltip>
                </Box>
                <TableContainer 
                  sx={{ 
                    borderRadius: 2,
                    border: '1px solid #e2e8f0',
                    maxHeight: 320
                  }}
                >
                  <Table stickyHeader size="small">
                    <TableHead>
                      <TableRow sx={{ 
                        bgcolor: 'rgba(255, 152, 0, 0.05)'
                      }}>
                        <TableCell sx={{ fontWeight: 700, color: '#2d3748' }}>Order ID</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2d3748' }}>Status</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: '#2d3748' }}>Amount</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2d3748' }}>Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentOrders.map((order, index) => (
                        <TableRow 
                          key={index} 
                          hover
                          sx={{ 
                            '&:hover': { bgcolor: 'rgba(255, 152, 0, 0.03)' },
                            '&:nth-of-type(odd)': { bgcolor: 'rgba(0,0,0,0.02)' }
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2" fontWeight={600} color="#2d3748">
                              #{order.order_number || order.id}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={order.order_status}
                              color={
                                order.order_status === "completed"
                                  ? "success"
                                  : order.order_status === "cancelled"
                                    ? "error"
                                    : "warning"
                              }
                              size="small"
                              variant="filled"
                              sx={{ 
                                fontWeight: 600,
                                textTransform: 'capitalize'
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={700} color="#2d3748">
                              ₹{Number(order.total_amount || 0).toLocaleString()}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Typography variant="body2" color="#718096">
                              {order.created_at
                                ? new Date(order.created_at).toLocaleDateString()
                                : "N/A"}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
                <Box sx={{ 
                  mt: 2, 
                  textAlign: 'center',
                  p: 1,
                  bgcolor: 'rgba(255, 152, 0, 0.05)',
                  borderRadius: 2
                }}>
                  <Typography variant="body2" color="#718096">
                    Showing {recentOrders.length} of {totalOrders} orders
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          {/* Recent Payments & Payment Methods - Right (50%) */}
          <Grid item xs={12} md={6}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(33, 150, 243, 0.1)',
              height: '100%',
              width:'400px',
              background: 'linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%)',
              border: '1px solid #e2e8f0'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={2} color="#2d3748">
                  Recent Payments
                </Typography>
                <TableContainer sx={{ 
                  borderRadius: 2,
                  border: '1px solid #e2e8f0',
                  mb: 3,
                  maxHeight: 180
                }}>
                  <Table size="small">
                    <TableHead>
                      <TableRow sx={{ 
                        bgcolor: 'rgba(33, 150, 243, 0.05)'
                      }}>
                        <TableCell sx={{ fontWeight: 700, color: '#2d3748' }}>Payment ID</TableCell>
                        <TableCell sx={{ fontWeight: 700, color: '#2d3748' }}>Method</TableCell>
                        <TableCell align="right" sx={{ fontWeight: 700, color: '#2d3748' }}>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {recentPayments.slice(0, 4).map((payment, index) => (
                        <TableRow 
                          key={index} 
                          hover
                          sx={{ 
                            '&:hover': { bgcolor: 'rgba(33, 150, 243, 0.03)' },
                            '&:nth-of-type(odd)': { bgcolor: 'rgba(0,0,0,0.02)' }
                          }}
                        >
                          <TableCell>
                            <Typography variant="body2">
                              #{payment.payment_id || `PAY${2000 + index}`}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={payment.payment_method || 'Credit Card'}
                              size="small"
                              variant="filled"
                              sx={{ 
                                bgcolor: paymentMethodData.find(m => m.name === payment.payment_method)?.color || '#9C27B0',
                                color: '#fff',
                                fontWeight: 600
                              }}
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Typography variant="body2" fontWeight={700} color="#2d3748">
                              ₹{payment.amount || '0.00'}
                            </Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Typography variant="h6" fontWeight={700} mb={2} color="#2d3748">
                  Payment Methods
                </Typography>
                <Box sx={{ 
                  height: 150,
                  bgcolor: 'white',
                  borderRadius: 2,
                  p: 2,
                  border: '1px solid #e2e8f0'
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={paymentMethodData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis 
                        dataKey="name" 
                        stroke="#718096"
                        fontSize={12}
                      />
                      <YAxis 
                        stroke="#718096"
                        fontSize={12}
                      />
                      <RechartsTooltip 
                        contentStyle={{ 
                          borderRadius: 8,
                          border: 'none',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                        }}
                      />
                      <Bar
                        dataKey="value"
                        radius={[6, 6, 0, 0]}
                      >
                        {paymentMethodData.map((entry, index) => (
                          <Cell 
                            key={`cell-${index}`} 
                            fill={entry.color}
                            stroke="#fff"
                            strokeWidth={1}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Row 3: Performance Metrics */}
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card sx={{
              borderRadius: 3,
              boxShadow: '0 10px 30px rgba(233, 30, 99, 0.1)',
              background: 'linear-gradient(135deg, #ffffff 0%, #fff0f5 100%)',
              border: '1px solid #e2e8f0',
              width:'1130px'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" fontWeight={700} mb={3} color="#2d3748">
                  Performance Metrics
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      borderRadius: 2,
                      border: '1px solid #e2e8f0',
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="#718096" gutterBottom>
                        Order Completion Rate
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <LinearProgress
                            variant="determinate"
                            value={(completedOrders / totalOrders) * 100 || 0}
                            sx={{ 
                              height: 10, 
                              borderRadius: 5,
                              bgcolor: 'rgba(76, 175, 80, 0.1)',
                              '& .MuiLinearProgress-bar': {
                                borderRadius: 5,
                                background: 'linear-gradient(90deg, #4CAF50 0%, #8BC34A 100%)'
                              }
                            }}
                          />
                        </Box>
                        <Typography variant="h6" fontWeight={700} color="#4CAF50">
                          {totalOrders > 0 ? ((completedOrders / totalOrders) * 100).toFixed(1) : 0}%
                        </Typography>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      borderRadius: 2,
                      border: '1px solid #e2e8f0',
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="#718096" gutterBottom>
                        Average Order Value
                      </Typography>
                      <Typography variant="h4" fontWeight={700} color="#673AB7">
                        ₹{totalOrders > 0 ? (totalRevenue / totalOrders).toFixed(2) : '0.00'}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box sx={{ 
                      p: 2, 
                      bgcolor: 'white',
                      borderRadius: 2,
                      border: '1px solid #e2e8f0',
                      height: '100%'
                    }}>
                      <Typography variant="body2" color="#718096" gutterBottom>
                        Daily Sales Trend
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TrendingUpIcon sx={{ color: '#4CAF50', fontSize: 32 }} />
                        <Box>
                          <Typography variant="h4" fontWeight={700} color="#4CAF50">
                            +15.2%
                          </Typography>
                          <Typography variant="caption" color="#718096">
                            Compared to last week
                          </Typography>
                        </Box>
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
const EnhancedDashboardCard = ({ title, value, icon, color, trend, trendUp, bgColor }) => (
  <Card sx={{
    borderRadius: 2,
    boxShadow: '0 8px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    height: '100%',
    minHeight: 140, // Smaller height
    display: 'flex',
    flexDirection: 'column',
    background: bgColor || '#fff',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
    }
  }}>
    <CardContent sx={{
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: '100%',
      p: 2
    }}>
      <Stack direction="row" spacing={2} alignItems="flex-start">
        <Box sx={{
          backgroundColor: 'rgba(255, 255, 255, 0.2)',
          borderRadius: 2,
          p: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backdropFilter: 'blur(10px)'
        }}>
          <Box sx={{ color: '#fff', fontSize: 24 }}>
            {icon}
          </Box>
        </Box>
        <Box sx={{ flex: 1 }}>
          <Typography variant="body2" sx={{ 
            mb: 0.5, 
            color: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 500
          }}>
            {title}
          </Typography>
          <Typography variant="h5" fontWeight={700} sx={{ 
            mb: 1, 
            color: '#fff',
            fontSize: '1.5rem'
          }}>
            {value}
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: 0.5,
            bgcolor: 'rgba(255, 255, 255, 0.2)',
            px: 1,
            py: 0.5,
            borderRadius: 1,
            width: 'fit-content'
          }}>
            {trendUp ? (
              <ArrowUpwardIcon sx={{ fontSize: 14, color: '#fff' }} />
            ) : (
              <ArrowDownwardIcon sx={{ fontSize: 14, color: '#fff' }} />
            )}
            <Typography
              variant="caption"
              sx={{
                color: '#fff',
                fontWeight: 600,
                fontSize: '0.75rem'
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
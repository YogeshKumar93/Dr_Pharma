import { useEffect, useState } from "react";
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  Skeleton,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Paper,
  Stack,
  Divider,
  Avatar,
  Badge,
  Tabs,
  Tab
} from "@mui/material";
import { apiCall } from "../api/api";
import {
  People as UsersIcon,
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  Payment as PaymentsIcon,
  PendingActions as PendingIcon,
  CheckCircle as PaidIcon,
  TrendingUp,
  TrendingDown,
  Refresh,
  CalendarToday,
  ViewWeek,
  BarChart,
  PieChart,
  Timeline,
  ArrowForward,
  LocalPharmacy,
  MedicalServices,
  Medication,
  Receipt,
  Inventory2,
  AttachMoney,
  HealthAndSafety,
  Download,
  MoreVert,
  FilterList,
  Dashboard as DashboardIcon,
  CheckCircle
} from "@mui/icons-material";
import {
  LineChart,
  Line,
  BarChart as RechartsBarChart,
  Bar,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as ChartTooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('overview');
  const [timeRange, setTimeRange] = useState('weekly');
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    setLoading(true);
    apiCall("GET", "admin/dashboard")
      .then(({ response }) => {
        setStats(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  // Generate pharmacy-specific data for charts
  const generatePharmacyChartData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({
      name: day,
      prescriptions: Math.floor(Math.random() * 80) + 40,
      medicines: Math.floor(Math.random() * 150) + 50,
      revenue: Math.floor(Math.random() * 8000) + 3000,
      consultations: Math.floor(Math.random() * 30) + 10,
      growth: Math.floor(Math.random() * 25) + 5,
    }));
  };

  const generateMedicineDistribution = (stats) => {
    return [
      { name: 'Pain Relief', value: Math.floor((stats?.products || 100) * 0.35), color: '#1A5276' },
      { name: 'Antibiotics', value: Math.floor((stats?.products || 100) * 0.25), color: '#3498DB' },
      { name: 'Vitamins', value: Math.floor((stats?.products || 100) * 0.20), color: '#27AE60' },
      { name: 'First Aid', value: Math.floor((stats?.products || 100) * 0.15), color: '#F39C12' },
      { name: 'Others', value: Math.floor((stats?.products || 100) * 0.05), color: '#9B59B6' },
    ];
  };

  const generateTodayData = (stats) => {
    return {
      prescriptions_today: Math.floor((stats?.orders || 0) * 0.2),
      medicines_sold: Math.floor((stats?.products || 0) * 0.1),
      consultations_today: Math.floor((stats?.users || 0) * 0.15),
      revenue_today: Math.floor((stats?.orders || 0) * 1800 * 0.15),
      emergency_orders: Math.floor((stats?.pending_orders || 0) * 0.3),
    };
  };

  const generateStockData = () => {
    const categories = [
      { name: 'Analgesics', value: 85, color: '#1A5276' },
      { name: 'Antibiotics', value: 65, color: '#3498DB' },
      { name: 'Cardiac', value: 45, color: '#E74C3C' },
      { name: 'Diabetic', value: 75, color: '#27AE60' },
      { name: 'Vitamins', value: 95, color: '#F39C12' },
      { name: 'Pediatric', value: 55, color: '#9B59B6' },
    ];
    return categories;
  };

  if (loading) {
    return <LoadingSkeleton isMobile={isMobile} />;
  }

  if (!stats) {
    return <ErrorState fetchData={fetchData} />;
  }

  const todayData = generateTodayData(stats);
  const chartData = generatePharmacyChartData();
  const pieData = generateMedicineDistribution(stats);
  const stockData = generateStockData();

  const cardData = viewMode === 'overview' ? [
    { 
      title: "Total Users", 
      value: stats.users, 
      icon: <UsersIcon />, 
      color: "#1A5276", 
      bgColor: "linear-gradient(135deg, rgba(26, 82, 118, 0.2) 0%, rgba(26, 82, 118, 0.05) 100%)",
      trend: 15.2,
      change: "positive",
      todayValue: todayData.consultations_today,
      prefix: "",
      chartColor: "#1A5276"
    },
    { 
      title: "Total Products", 
      value: stats.products, 
      icon: <Medication />, 
      color: "#2E86C1", 
      bgColor: "linear-gradient(135deg, rgba(46, 134, 193, 0.2) 0%, rgba(46, 134, 193, 0.05) 100%)",
      trend: 8.3,
      change: "positive",
      todayValue: todayData.medicines_sold,
      prefix: "",
      chartColor: "#2E86C1"
    },
    { 
      title: "Total Orders", 
      value: stats.orders, 
      icon: <Receipt />, 
      color: "#3498DB", 
      bgColor: "linear-gradient(135deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.05) 100%)",
      trend: 18.7,
      change: "positive",
      todayValue: todayData.prescriptions_today,
      prefix: "",
      chartColor: "#3498DB"
    },
    { 
      title: "Total Revenue", 
      value: stats.orders * 1800, 
      icon: <AttachMoney />, 
      color: "#27AE60", 
      bgColor: "linear-gradient(135deg, rgba(39, 174, 96, 0.2) 0%, rgba(39, 174, 96, 0.05) 100%)",
      trend: 22.1,
      change: "positive",
      todayValue: todayData.revenue_today,
      prefix: "₹",
      chartColor: "#27AE60"
    },
    { 
      title: "Pending Orders", 
      value: stats.pending_orders, 
      icon: <PendingIcon />, 
      color: "#E67E22", 
      bgColor: "linear-gradient(135deg, rgba(230, 126, 34, 0.2) 0%, rgba(230, 126, 34, 0.05) 100%)",
      trend: -3.2,
      change: "negative",
      todayValue: todayData.emergency_orders,
      prefix: "",
      chartColor: "#E67E22"
    },
    { 
      title: "Paid Payments", 
      value: stats.paid_payments, 
      icon: <CheckCircle />, 
      color: "#9B59B6", 
      bgColor: "linear-gradient(135deg, rgba(155, 89, 182, 0.2) 0%, rgba(155, 89, 182, 0.05) 100%)",
      trend: 12.5,
      change: "positive",
      todayValue: Math.floor(stats.paid_payments * 0.18),
      prefix: "",
      chartColor: "#9B59B6"
    },
  ] : [
    { 
      title: "New Users Today", 
      value: todayData.consultations_today, 
      icon: <UsersIcon />, 
      color: "#1A5276", 
      bgColor: "linear-gradient(135deg, rgba(26, 82, 118, 0.2) 0%, rgba(26, 82, 118, 0.05) 100%)",
      trend: 12.5,
      change: "positive",
      prefix: "",
      chartColor: "#1A5276"
    },
    { 
      title: "Products Sold", 
      value: todayData.medicines_sold, 
      icon: <Medication />, 
      color: "#2E86C1", 
      bgColor: "linear-gradient(135deg, rgba(46, 134, 193, 0.2) 0%, rgba(46, 134, 193, 0.05) 100%)",
      trend: 8.3,
      change: "positive",
      prefix: "",
      chartColor: "#2E86C1"
    },
    { 
      title: "Orders Today", 
      value: todayData.prescriptions_today, 
      icon: <Receipt />, 
      color: "#3498DB", 
      bgColor: "linear-gradient(135deg, rgba(52, 152, 219, 0.2) 0%, rgba(52, 152, 219, 0.05) 100%)",
      trend: 15.2,
      change: "positive",
      prefix: "",
      chartColor: "#3498DB"
    },
    { 
      title: "Revenue Today", 
      value: todayData.revenue_today, 
      icon: <AttachMoney />, 
      color: "#27AE60", 
      bgColor: "linear-gradient(135deg, rgba(39, 174, 96, 0.2) 0%, rgba(39, 174, 96, 0.05) 100%)",
      trend: 22.1,
      change: "positive",
      prefix: "₹",
      chartColor: "#27AE60"
    },
    { 
      title: "Emergency Orders", 
      value: todayData.emergency_orders, 
      icon: <HealthAndSafety />, 
      color: "#E74C3C", 
      bgColor: "linear-gradient(135deg, rgba(231, 76, 60, 0.2) 0%, rgba(231, 76, 60, 0.05) 100%)",
      trend: 5.4,
      change: "positive",
      prefix: "",
      chartColor: "#E74C3C"
    },
    { 
      title: "Stock Alert", 
      value: Math.floor(stats.products * 0.05), 
      icon: <Inventory2 />, 
      color: "#F39C12", 
      bgColor: "linear-gradient(135deg, rgba(243, 156, 18, 0.2) 0%, rgba(243, 156, 18, 0.05) 100%)",
      trend: -2.1,
      change: "negative",
      prefix: "",
      chartColor: "#F39C12"
    },
  ];

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      background: 'radial-gradient(circle at top right, #f8fafc 0%, #e8f0fa 50%, #dbeafe 100%)',
      overflowX: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <Box sx={{
        position: 'fixed',
        top: 0,
        right: 0,
        width: '40vw',
        height: '40vh',
        background: 'radial-gradient(circle at center, rgba(26, 82, 118, 0.1) 0%, rgba(26, 82, 118, 0) 70%)',
        zIndex: 0
      }} />
      <Box sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '30vw',
        height: '30vh',
        background: 'radial-gradient(circle at center, rgba(39, 174, 96, 0.1) 0%, rgba(39, 174, 96, 0) 70%)',
        zIndex: 0
      }} />

      {/* Main Content */}
      <Box sx={{ 
        position: 'relative',
        zIndex: 1,
        px: { xs: 2, sm: 3, md: 4, lg: 6 },
        py: { xs: 2, sm: 3, md: 4 }
      }}>
        {/* Header Section with Glass Morphism Effect */}
        <Paper 
          elevation={0}
          sx={{
            mb: 4,
            p: { xs: 2, sm: 3 },
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            boxShadow: '0 20px 40px rgba(26, 82, 118, 0.1)',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #1A5276 0%, #3498DB 50%, #27AE60 100%)',
              borderRadius: '4px 4px 0 0'
            }
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            flexDirection: isMobile ? 'column' : 'row',
            justifyContent: 'space-between', 
            alignItems: isMobile ? 'flex-start' : 'center',
            gap: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: 'transparent',
                  width: 60,
                  height: 60,
                  border: '3px solid #1A5276',
                  background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.1) 0%, rgba(26, 82, 118, 0.05) 100%)',
                  boxShadow: '0 10px 20px rgba(26, 82, 118, 0.2)'
                }}
              >
                <LocalPharmacy sx={{ fontSize: 32, color: '#1A5276' }} />
              </Avatar>
              <Box>
                <Typography variant="h4" sx={{ 
                  color: "#1A5276",
                  fontWeight: 900,
                  fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.2rem' },
                  background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text'
                }}>
                  PharmaCare Analytics
                </Typography>
                <Typography variant="body1" sx={{ 
                  color: '#5D6D7E', 
                  mt: 0.5, 
                  fontWeight: 500,
                  fontSize: { xs: '0.8rem', sm: '0.9rem' }
                }}>
                  {viewMode === 'overview' ? 'Comprehensive Business Intelligence Dashboard' : 'Real-time Performance Metrics'}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ 
              display: 'flex', 
              gap: 2, 
              flexWrap: 'wrap',
              justifyContent: isMobile ? 'flex-start' : 'flex-end'
            }}>
              <Box sx={{ 
                display: 'flex',
                gap: 1,
                p: 1,
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(26, 82, 118, 0.1)',
                boxShadow: '0 4px 12px rgba(26, 82, 118, 0.08)'
              }}>
                <Button
                  variant={viewMode === 'overview' ? 'contained' : 'text'}
                  onClick={() => setViewMode('overview')}
                  sx={{
                    background: viewMode === 'overview' ? 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)' : 'transparent',
                    color: viewMode === 'overview' ? 'white' : '#5D6D7E',
                    borderRadius: 2,
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    fontSize: '0.85rem',
                    minWidth: 'auto',
                    '&:hover': {
                      background: viewMode === 'overview' ? 'linear-gradient(135deg, #154360 0%, #21618C 100%)' : 'rgba(26, 82, 118, 0.05)'
                    }
                  }}
                >
                  <ViewWeek sx={{ mr: 1, fontSize: 18 }} />
                  Overview
                </Button>
                <Button
                  variant={viewMode === 'today' ? 'contained' : 'text'}
                  onClick={() => setViewMode('today')}
                  sx={{
                    background: viewMode === 'today' ? 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)' : 'transparent',
                    color: viewMode === 'today' ? 'white' : '#5D6D7E',
                    borderRadius: 2,
                    fontWeight: 600,
                    px: 3,
                    py: 1,
                    fontSize: '0.85rem',
                    minWidth: 'auto',
                    '&:hover': {
                      background: viewMode === 'today' ? 'linear-gradient(135deg, #229954 0%, #27AE60 100%)' : 'rgba(39, 174, 96, 0.05)'
                    }
                  }}
                >
                  <CalendarToday sx={{ mr: 1, fontSize: 18 }} />
                  Today
                </Button>
              </Box>
              
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Tooltip title="Refresh Dashboard">
                  <IconButton 
                    onClick={fetchData}
                    sx={{ 
                      bgcolor: 'rgba(26, 82, 118, 0.1)',
                      width: 40,
                      height: 40,
                      border: '1px solid rgba(26, 82, 118, 0.2)',
                      '&:hover': { 
                        bgcolor: 'rgba(26, 82, 118, 0.2)',
                        transform: 'rotate(180deg)',
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >
                    <Refresh sx={{ fontSize: 20, color: '#1A5276' }} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Export Report">
                  <IconButton 
                    sx={{ 
                      bgcolor: 'rgba(39, 174, 96, 0.1)',
                      width: 40,
                      height: 40,
                      border: '1px solid rgba(39, 174, 96, 0.2)',
                      '&:hover': { 
                        bgcolor: 'rgba(39, 174, 96, 0.2)',
                      }
                    }}
                  >
                    <Download sx={{ fontSize: 20, color: '#27AE60' }} />
                  </IconButton>
                </Tooltip>
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Stats Cards Grid - 3D Effect */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {cardData.map((card, index) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
              <DashboardCard {...card} viewMode={viewMode} index={index} />
            </Grid>
          ))}
        </Grid>

        {/* Charts Section with Glass Morphism */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          {/* Main Performance Chart */}
          <Grid item xs={12} lg={8}>
            <Paper 
              elevation={0}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(26, 82, 118, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #1A5276 0%, #3498DB 50%, #27AE60 100%)',
                  borderRadius: '4px 4px 0 0'
                }
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  flexDirection: isMobile ? 'column' : 'row',
                  justifyContent: 'space-between', 
                  alignItems: isMobile ? 'flex-start' : 'center',
                  mb: 4,
                  gap: 2
                }}>
                  <Box>
                    <Typography variant="h5" sx={{ 
                      fontWeight: 700, 
                      color: '#1A5276',
                      fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1.5
                    }}>
                      <Box sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #1A5276 0%, #3498DB 100%)'
                      }} />
                      Performance Analytics
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#5D6D7E',
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      ml: 3.5
                    }}>
                      Real-time metrics and trends analysis
                    </Typography>
                  </Box>
                  
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {['Day', 'Week', 'Month', 'Year'].map((item) => (
                      <Chip
                        key={item}
                        label={item}
                        variant={timeRange === item.toLowerCase() ? 'filled' : 'outlined'}
                        onClick={() => setTimeRange(item.toLowerCase())}
                        sx={{
                          bgcolor: timeRange === item.toLowerCase() ? '#1A5276' : 'transparent',
                          color: timeRange === item.toLowerCase() ? 'white' : '#5D6D7E',
                          borderColor: '#1A5276',
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          '&:hover': {
                            bgcolor: timeRange === item.toLowerCase() ? '#154360' : 'rgba(26, 82, 118, 0.05)'
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
                
                <Box sx={{ 
                  height: { xs: 300, sm: 350, md: 400 },
                  width: '100%'
                }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                      <defs>
                        <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#27AE60" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#27AE60" stopOpacity={0}/>
                        </linearGradient>
                        <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1A5276" stopOpacity={0.8}/>
                          <stop offset="95%" stopColor="#1A5276" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.05)" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#5D6D7E', fontWeight: 500 }}
                      />
                      <YAxis 
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#5D6D7E', fontWeight: 500 }}
                      />
                      <ChartTooltip 
                        contentStyle={{ 
                          borderRadius: 10,
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(26, 82, 118, 0.1)',
                          boxShadow: '0 10px 30px rgba(26, 82, 118, 0.1)'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="revenue" 
                        name="Revenue (₹)"
                        stroke="#27AE60" 
                        strokeWidth={3}
                        fill="url(#colorRevenue)" 
                        fillOpacity={0.6}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="prescriptions" 
                        name="Orders"
                        stroke="#1A5276" 
                        strokeWidth={3}
                        fill="url(#colorOrders)" 
                        fillOpacity={0.6}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Distribution & Quick Stats */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={3}>
              {/* Category Distribution */}
              <Paper 
                elevation={0}
                sx={{
                  borderRadius: 4,
                  background: 'rgba(255, 255, 255, 0.85)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 20px 40px rgba(26, 82, 118, 0.1)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '4px',
                    background: 'linear-gradient(90deg, #3498DB 0%, #5DADE2 100%)',
                    borderRadius: '4px 4px 0 0'
                  }
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    color: '#1A5276',
                    fontSize: { xs: '1.1rem', sm: '1.3rem' },
                    mb: 2
                  }}>
                    <PieChart sx={{ verticalAlign: 'middle', mr: 1.5 }} />
                    Category Distribution
                  </Typography>
                  <Box sx={{ height: 200, width: '100%' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieData}
                          cx="50%"
                          cy="50%"
                          innerRadius={40}
                          outerRadius={80}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip 
                          contentStyle={{ 
                            borderRadius: 8,
                            background: 'rgba(255, 255, 255, 0.95)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(26, 82, 118, 0.1)'
                          }}
                        />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </Box>
                </Box>
              </Paper>

              {/* Quick Stats Card */}
              <Paper 
                elevation={0}
                sx={{
                  borderRadius: 4,
                  background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.95) 0%, rgba(46, 134, 193, 0.95) 100%)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  boxShadow: '0 20px 40px rgba(26, 82, 118, 0.2)',
                  color: 'white',
                  overflow: 'hidden',
                  position: 'relative'
                }}
              >
                <Box sx={{ p: { xs: 2, sm: 3 } }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    mb: 3,
                    fontSize: { xs: '1.1rem', sm: '1.3rem' }
                  }}>
                    📊 Quick Stats
                  </Typography>
                  
                  <Stack spacing={2}>
                    <StatItem 
                      label="Avg. Order Value" 
                      value={`₹${stats.orders ? Math.round((stats.orders * 1800) / stats.orders) : 0}`}
                      change="+12.8%"
                      color="#27AE60"
                    />
                    <StatItem 
                      label="Conversion Rate" 
                      value={`${stats.users ? Math.round((stats.orders / stats.users) * 100) : 0}%`}
                      change="+5.2%"
                      color="#3498DB"
                    />
                    <StatItem 
                      label="User Retention" 
                      value="94.5%"
                      change="+3.1%"
                      color="#9B59B6"
                    />
                  </Stack>

                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      mt: 3,
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': { 
                        background: 'rgba(255, 255, 255, 0.3)',
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease',
                      fontWeight: 600
                    }}
                  >
                    View Detailed Analytics
                  </Button>
                </Box>
              </Paper>
            </Stack>
          </Grid>
        </Grid>

        {/* Bottom Section: Stock & Activity */}
        <Grid container spacing={3}>
          {/* Stock Analysis */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(26, 82, 118, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #E67E22 0%, #F39C12 100%)',
                  borderRadius: '4px 4px 0 0'
                }
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Typography variant="h5" sx={{ 
                  fontWeight: 700, 
                  color: '#1A5276',
                  fontSize: { xs: '1.1rem', sm: '1.3rem' },
                  mb: 3
                }}>
                  <MedicalServices sx={{ verticalAlign: 'middle', mr: 1.5 }} />
                  Stock Analysis
                </Typography>
                <Box sx={{ height: 250, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={stockData}>
                      <PolarGrid stroke="rgba(0,0,0,0.05)" />
                      <PolarAngleAxis 
                        dataKey="name" 
                        tick={{ fill: '#5D6D7E', fontWeight: 500, fontSize: 12 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} />
                      <Radar
                        name="Stock Level %"
                        dataKey="value"
                        stroke="#E67E22"
                        fill="#E67E22"
                        fillOpacity={0.6}
                        strokeWidth={2}
                      />
                      <ChartTooltip 
                        contentStyle={{ 
                          borderRadius: 8,
                          background: 'rgba(255, 255, 255, 0.95)',
                          backdropFilter: 'blur(10px)',
                          border: '1px solid rgba(26, 82, 118, 0.1)'
                        }}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </Box>
              </Box>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={6}>
            <Paper 
              elevation={0}
              sx={{
                borderRadius: 4,
                background: 'rgba(255, 255, 255, 0.85)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 20px 40px rgba(26, 82, 118, 0.1)',
                overflow: 'hidden',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #9B59B6 0%, #8E44AD 100%)',
                  borderRadius: '4px 4px 0 0'
                }
              }}
            >
              <Box sx={{ p: { xs: 2, sm: 3 } }}>
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  mb: 3
                }}>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    color: '#1A5276',
                    fontSize: { xs: '1.1rem', sm: '1.3rem' }
                  }}>
                    📋 Recent Activity
                  </Typography>
                  <IconButton size="small">
                    <MoreVert />
                  </IconButton>
                </Box>

                <Stack spacing={2}>
                  <ActivityItem 
                    icon="📦"
                    title="New Order Received"
                    description={`Order #${Math.floor(Math.random() * 1000)} for ${todayData.prescriptions_today} items`}
                    time="2 mins ago"
                    color="#1A5276"
                  />
                  <ActivityItem 
                    icon="💰"
                    title="Payment Received"
                    description={`₹${todayData.revenue_today.toLocaleString()} from Order #${Math.floor(Math.random() * 1000)}`}
                    time="15 mins ago"
                    color="#27AE60"
                  />
                  <ActivityItem 
                    icon="👤"
                    title="New User Registered"
                    description={`${todayData.consultations_today} new users joined today`}
                    time="1 hour ago"
                    color="#3498DB"
                  />
                  <ActivityItem 
                    icon="⚠️"
                    title="Stock Alert"
                    description="Paracetamol 500mg stock running low"
                    time="2 hours ago"
                    color="#E74C3C"
                  />
                </Stack>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const DashboardCard = ({ title, value, icon, color, bgColor, trend, change, todayValue, viewMode, prefix = '', suffix = '', chartColor, index }) => (
  <Box sx={{
    perspective: '1000px',
    height: '100%',
    '&:hover .card-inner': {
      transform: 'rotateY(10deg) rotateX(5deg)',
      boxShadow: `0 30px 60px ${color}40`,
    }
  }}>
    <Box className="card-inner"
      sx={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transition: 'transform 0.6s ease, box-shadow 0.6s ease',
        transformStyle: 'preserve-3d',
        borderRadius: 3,
        boxShadow: `0 15px 35px ${color}20`,
        background: bgColor,
        border: `1px solid ${color}30`,
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '100%',
          background: `linear-gradient(135deg, ${color}10 0%, transparent 50%)`,
          zIndex: 1
        }
      }}
    >
      {/* Animated Background Pattern */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: `radial-gradient(circle at 30% 20%, ${color}15 0%, transparent 50%)`,
        opacity: 0.6,
        animation: 'pulse 4s infinite',
        '@keyframes pulse': {
          '0%, 100%': { opacity: 0.6 },
          '50%': { opacity: 0.8 }
        }
      }} />

      <CardContent sx={{ 
        p: { xs: 2, sm: 2.5 },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        zIndex: 2
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'flex-start',
          mb: 2
        }}>
          <Typography variant="caption" sx={{ 
            color: `${color}CC`,
            fontWeight: 700,
            fontSize: '0.7rem',
            textTransform: 'uppercase',
            letterSpacing: '1px'
          }}>
            {title}
          </Typography>
          
          <Box sx={{
            width: 36,
            height: 36,
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
            border: `1px solid ${color}40`,
            boxShadow: `0 4px 12px ${color}20`
          }}>
            {icon}
          </Box>
        </Box>

        {/* Main Value */}
        <Typography variant="h3" sx={{ 
          color: color,
          fontWeight: 900,
          mb: 1,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
          lineHeight: 1,
          textShadow: `0 2px 10px ${color}20`,
          background: `linear-gradient(135deg, ${color} 0%, ${color}CC 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>
          {prefix}{value !== null && value !== undefined ? value.toLocaleString() : 0}{suffix}
        </Typography>

        {/* Trend Indicator */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mb: 2
        }}>
          <Box sx={{
            display: 'flex',
            alignItems: 'center',
            px: 1.5,
            py: 0.5,
            borderRadius: 20,
            background: change === 'positive' ? 'rgba(39, 174, 96, 0.15)' : 'rgba(231, 76, 60, 0.15)',
            border: `1px solid ${change === 'positive' ? '#27AE60' : '#E74C3C'}30`
          }}>
            {change === 'positive' ? 
              <TrendingUp sx={{ fontSize: 14, color: '#27AE60', mr: 0.5 }} /> : 
              <TrendingDown sx={{ fontSize: 14, color: '#E74C3C', mr: 0.5 }} />
            }
            <Typography variant="caption" sx={{ 
              fontWeight: 700,
              color: change === 'positive' ? '#27AE60' : '#E74C3C',
              fontSize: '0.75rem'
            }}>
              {trend}%
            </Typography>
          </Box>
        </Box>

        {/* Mini Chart */}
        <Box sx={{ mt: 'auto', pt: 2 }}>
          <Box sx={{ 
            height: 40, 
            width: '100%',
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 1
          }}>
            <Box sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: '100%',
              background: `linear-gradient(90deg, ${color}20, ${color}10)`,
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: `linear-gradient(90deg, transparent, ${color}15, transparent)`,
                animation: 'shimmer 2s infinite'
              }
            }}>
              {/* Chart Line */}
              <svg width="100%" height="100%" style={{ overflow: 'visible' }}>
                <path
                  d="M0,30 Q25,15 50,25 T100,20"
                  stroke={color}
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </Box>
          </Box>

          {/* Today's Value */}
          {viewMode === 'overview' && todayValue !== undefined && (
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center',
              justifyContent: 'space-between',
              mt: 1
            }}>
              <Typography variant="caption" sx={{ 
                color: `${color}CC`,
                fontWeight: 600,
                fontSize: '0.7rem'
              }}>
                Today's Activity
              </Typography>
              <Typography variant="body2" sx={{ 
                color: color,
                fontWeight: 800,
                fontSize: '0.9rem'
              }}>
                {prefix}{todayValue.toLocaleString()}{suffix}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Box>
  </Box>
);

const StatItem = ({ label, value, change, color }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 1.5,
    borderRadius: 2,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.15)',
      transform: 'translateX(5px)'
    }
  }}>
    <Box>
      <Typography variant="body2" sx={{ fontWeight: 500, opacity: 0.9 }}>
        {label}
      </Typography>
      <Typography variant="h5" sx={{ fontWeight: 800, mt: 0.5, color }}>
        {value}
      </Typography>
    </Box>
    <Chip
      label={change}
      size="small"
      sx={{
        bgcolor: 'rgba(255, 255, 255, 0.2)',
        color: 'white',
        fontWeight: 600,
        fontSize: '0.7rem'
      }}
    />
  </Box>
);

const ActivityItem = ({ icon, title, description, time, color }) => (
  <Box sx={{ 
    display: 'flex',
    alignItems: 'flex-start',
    gap: 2,
    p: 1.5,
    borderRadius: 2,
    background: 'rgba(255, 255, 255, 0.05)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'all 0.3s ease',
    '&:hover': {
      background: 'rgba(255, 255, 255, 0.1)',
      transform: 'translateX(5px)'
    }
  }}>
    <Box sx={{
      width: 40,
      height: 40,
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: `linear-gradient(135deg, ${color}30 0%, ${color}10 100%)`,
      border: `1px solid ${color}40`,
      fontSize: '1.2rem'
    }}>
      {icon}
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: '#1A5276', mb: 0.5 }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: '#5D6D7E', fontSize: '0.85rem', mb: 0.5 }}>
        {description}
      </Typography>
      <Typography variant="caption" sx={{ color: '#95A5A6', fontSize: '0.75rem' }}>
        {time}
      </Typography>
    </Box>
  </Box>
);

const LoadingSkeleton = ({ isMobile }) => (
  <Box sx={{ 
    p: { xs: 2, sm: 3, md: 4 },
    width: '100%',
    minHeight: '100vh',
    background: 'radial-gradient(circle at top right, #f8fafc 0%, #e8f0fa 50%, #dbeafe 100%)'
  }}>
    {/* Header Skeleton */}
    <Box sx={{ 
      mb: 4, 
      p: 3, 
      borderRadius: 4,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    }}>
      <Skeleton variant="rounded" width={300} height={40} sx={{ mb: 2, bgcolor: 'rgba(26, 82, 118, 0.1)', borderRadius: 2 }} />
      <Skeleton variant="text" width={200} sx={{ bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
    </Box>

    {/* Cards Skeleton */}
    <Grid container spacing={3} sx={{ mb: 6 }}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Skeleton 
            variant="rounded" 
            height={200} 
            sx={{ 
              borderRadius: 3,
              bgcolor: 'rgba(26, 82, 118, 0.1)'
            }} 
          />
        </Grid>
      ))}
    </Grid>

    {/* Charts Skeleton */}
    <Grid container spacing={3} sx={{ mb: 6 }}>
      <Grid item xs={12} lg={8}>
        <Skeleton variant="rounded" height={400} sx={{ borderRadius: 4, bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Stack spacing={3}>
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4, bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: 4, bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
        </Stack>
      </Grid>
    </Grid>
  </Box>
);

const ErrorState = ({ fetchData }) => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100vh',
    textAlign: 'center',
    p: { xs: 2, sm: 3, md: 4 },
    background: 'radial-gradient(circle at top right, #f8fafc 0%, #e8f0fa 50%, #dbeafe 100%)'
  }}>
    <Box sx={{ 
      width: { xs: 120, sm: 150 }, 
      height: { xs: 120, sm: 150 }, 
      borderRadius: '50%', 
      background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.1) 0%, rgba(26, 82, 118, 0.05) 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 4,
      animation: 'pulse 2s infinite',
      border: '2px solid rgba(26, 82, 118, 0.2)',
      boxShadow: '0 20px 40px rgba(26, 82, 118, 0.1)'
    }}>
      <LocalPharmacy sx={{ fontSize: { xs: 60, sm: 80 }, color: '#1A5276' }} />
    </Box>
    <Typography variant="h4" sx={{ 
      color: "#1A5276", 
      mb: 2, 
      fontWeight: 900,
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
      background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text'
    }}>
      Unable to Load Dashboard
    </Typography>
    <Typography variant="body1" sx={{ 
      color: '#5D6D7E', 
      mb: 4, 
      maxWidth: 500,
      fontSize: { xs: '0.9rem', sm: '1rem' }
    }}>
      There was an error loading your dashboard data. Please check your connection and try again.
    </Typography>
    <Button 
      variant="contained"
      startIcon={<Refresh />}
      onClick={fetchData}
      sx={{ 
        background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
        borderRadius: 3,
        px: { xs: 3, sm: 4 },
        py: { xs: 1, sm: 1.5 },
        fontWeight: 700,
        fontSize: { xs: '0.9rem', sm: '1rem' },
        boxShadow: '0 10px 25px rgba(26, 82, 118, 0.3)',
        '&:hover': {
          background: 'linear-gradient(135deg, #154360 0%, #21618C 100%)',
          transform: 'translateY(-2px)',
          boxShadow: '0 15px 30px rgba(26, 82, 118, 0.4)'
        },
        transition: 'all 0.3s ease'
      }}
    >
      Refresh Dashboard
    </Button>
  </Box>
);

export default Dashboard;
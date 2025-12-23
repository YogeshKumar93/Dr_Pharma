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
  Avatar
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
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

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
      bgColor: "rgba(26, 82, 118, 0.15)",
      trend: 15.2,
      change: "positive",
      todayValue: todayData.consultations_today,
      prefix: ""
    },
    { 
      title: "Products", 
      value: stats.products, 
      icon: <Medication />, 
      color: "#2E86C1", 
      bgColor: "rgba(46, 134, 193, 0.15)",
      trend: 8.3,
      change: "positive",
      todayValue: todayData.medicines_sold,
      prefix: ""
    },
    { 
      title: "Orders", 
      value: stats.orders, 
      icon: <Receipt />, 
      color: "#3498DB", 
      bgColor: "rgba(52, 152, 219, 0.15)",
      trend: 18.7,
      change: "positive",
      todayValue: todayData.prescriptions_today,
      prefix: ""
    },
    { 
      title: "Total Revenue", 
      value: stats.orders * 1800, 
      icon: <AttachMoney />, 
      color: "#27AE60", 
      bgColor: "rgba(39, 174, 96, 0.15)",
      trend: 22.1,
      change: "positive",
      todayValue: todayData.revenue_today,
      prefix: "₹"
    },
    { 
      title: "Pending Orders", 
      value: stats.pending_orders, 
      icon: <PendingIcon />, 
      color: "#E67E22", 
      bgColor: "rgba(230, 126, 34, 0.15)",
      trend: -3.2,
      change: "negative",
      todayValue: todayData.emergency_orders,
      prefix: ""
    },
    { 
      title: "Payments", 
      value: stats.paid_payments, 
      icon: <CheckCircle />, 
      color: "#9B59B6", 
      bgColor: "rgba(155, 89, 182, 0.15)",
      trend: 12.5,
      change: "positive",
      todayValue: Math.floor(stats.paid_payments * 0.18),
      prefix: ""
    },
  ] : [
    { 
      title: "New Users", 
      value: todayData.consultations_today, 
      icon: <UsersIcon />, 
      color: "#1A5276", 
      bgColor: "rgba(26, 82, 118, 0.15)",
      trend: 12.5,
      change: "positive",
      prefix: ""
    },
    { 
      title: "Products Sold", 
      value: todayData.medicines_sold, 
      icon: <Medication />, 
      color: "#2E86C1", 
      bgColor: "rgba(46, 134, 193, 0.15)",
      trend: 8.3,
      change: "positive",
      prefix: ""
    },
    { 
      title: "Orders Today", 
      value: todayData.prescriptions_today, 
      icon: <Receipt />, 
      color: "#3498DB", 
      bgColor: "rgba(52, 152, 219, 0.15)",
      trend: 15.2,
      change: "positive",
      prefix: ""
    },
    { 
      title: "Revenue Today", 
      value: todayData.revenue_today, 
      icon: <AttachMoney />, 
      color: "#27AE60", 
      bgColor: "rgba(39, 174, 96, 0.15)",
      trend: 22.1,
      change: "positive",
      prefix: "₹"
    },
    { 
      title: "Emergency Orders", 
      value: todayData.emergency_orders, 
      icon: <HealthAndSafety />, 
      color: "#E74C3C", 
      bgColor: "rgba(231, 76, 60, 0.15)",
      trend: 5.4,
      change: "positive",
      prefix: ""
    },
    { 
      title: "Stock Alert", 
      value: Math.floor(stats.products * 0.05), 
      icon: <Inventory2 />, 
      color: "#F39C12", 
      bgColor: "rgba(243, 156, 18, 0.15)",
      trend: -2.1,
      change: "negative",
      prefix: ""
    },
  ];

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      px: { xs: 1.5, sm: 2.5, md: 3.5, lg: 4.5 },
      py: { xs: 2, sm: 3, md: 4 },
      background: 'linear-gradient(135deg, #f5f9ff 0%, #e8f0fa 100%)',
      overflowX: 'hidden'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: { xs: 3, sm: 4, md: 5 },
        gap: 2,
        pt: 1
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ 
            bgcolor: '#1A5276',
            width: { xs: 48, sm: 56, md: 64 },
            height: { xs: 48, sm: 56, md: 64 },
            boxShadow: '0 6px 20px rgba(26, 82, 118, 0.25)'
          }}>
            <LocalPharmacy sx={{ fontSize: { xs: 26, sm: 30, md: 34 } }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ 
              color: "#1A5276",
              fontWeight: 800,
              fontSize: { xs: '1.4rem', sm: '1.8rem', md: '2.2rem', lg: '2.5rem' },
              lineHeight: 1.2
            }}>
              PharmaCare Analytics
            </Typography>
            <Typography variant="body2" sx={{ 
              color: '#5D6D7E', 
              mt: 0.5, 
              fontWeight: 500,
              fontSize: { xs: '0.8rem', sm: '0.9rem', md: '1rem' }
            }}>
              {viewMode === 'overview' ? 'Complete Business Overview' : 'Today\'s Performance Metrics'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ 
          display: 'flex', 
          gap: 1.5, 
          flexWrap: 'wrap',
          justifyContent: isMobile ? 'flex-start' : 'flex-end'
        }}>
          <Button
            variant={viewMode === 'overview' ? 'contained' : 'outlined'}
            startIcon={<ViewWeek />}
            onClick={() => setViewMode('overview')}
            sx={{
              background: viewMode === 'overview' ? 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)' : 'transparent',
              color: viewMode === 'overview' ? 'white' : '#1A5276',
              borderColor: '#1A5276',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              minWidth: { xs: 'auto', sm: '120px' }
            }}
          >
            Overview
          </Button>
          <Button
            variant={viewMode === 'today' ? 'contained' : 'outlined'}
            startIcon={<CalendarToday />}
            onClick={() => setViewMode('today')}
            sx={{
              background: viewMode === 'today' ? 'linear-gradient(135deg, #27AE60 0%, #2ECC71 100%)' : 'transparent',
              color: viewMode === 'today' ? 'white' : '#27AE60',
              borderColor: '#27AE60',
              borderRadius: 2,
              fontWeight: 600,
              px: { xs: 2, sm: 3 },
              py: { xs: 0.8, sm: 1 },
              fontSize: { xs: '0.75rem', sm: '0.875rem' },
              minWidth: { xs: 'auto', sm: '120px' }
            }}
          >
            Today
          </Button>
          <Tooltip title="Refresh Data">
            <IconButton 
              onClick={fetchData}
              sx={{ 
                bgcolor: 'rgba(26, 82, 118, 0.1)',
                width: { xs: 36, sm: 40 },
                height: { xs: 36, sm: 40 },
                '&:hover': { 
                  bgcolor: 'rgba(26, 82, 118, 0.2)',
                  transform: 'rotate(180deg)',
                  transition: 'transform 0.5s ease'
                }
              }}
            >
              <Refresh sx={{ fontSize: { xs: 20, sm: 22 } }} />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards Grid */}
      <Grid container spacing={2.5} sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
        {cardData.map((card, index) => (
          <Grid item xs={6} sm={4} md={2} key={index} sx={{ display: 'flex' }}>
            <DashboardCard {...card} viewMode={viewMode} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: { xs: 4, sm: 5, md: 6 } }}>
        {/* Main Analytics Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(26, 82, 118, 0.12)',
            height: '100%',
            width: '100%',
            border: 'none',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Box sx={{ 
                display: 'flex', 
                flexDirection: isMobile ? 'column' : 'row',
                justifyContent: 'space-between', 
                alignItems: isMobile ? 'flex-start' : 'center', 
                mb: 3,
                gap: 2
              }}>
                <Box>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 700, 
                    color: '#1A5276',
                    fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
                  }}>
                    <Timeline sx={{ verticalAlign: 'middle', mr: 1.5 }} />
                    Performance Analytics
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#5D6D7E',
                    fontSize: { xs: '0.75rem', sm: '0.85rem' },
                    ml: 4.5
                  }}>
                    Weekly trends for orders and revenue
                  </Typography>
                </Box>
                <Stack direction="row" spacing={1}>
                  <Chip 
                    label="Weekly" 
                    variant="outlined" 
                    sx={{ 
                      borderColor: '#1A5276', 
                      color: '#1A5276',
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' }
                    }}
                  />
                  <Chip 
                    label="Live" 
                    sx={{ 
                      bgcolor: 'rgba(39, 174, 96, 0.1)', 
                      color: '#27AE60',
                      fontWeight: 600,
                      fontSize: { xs: '0.7rem', sm: '0.8rem' }
                    }}
                  />
                </Stack>
              </Box>
              <Box sx={{ 
                height: { xs: 280, sm: 320, md: 360, lg: 380 },
                width: '100%'
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#5D6D7E', fontWeight: 500, fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#5D6D7E', fontWeight: 500, fontSize: 12 }}
                    />
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)',
                        fontSize: 12
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="prescriptions" 
                      name="Orders"
                      stroke="#1A5276" 
                      fill="url(#colorOrders)" 
                      strokeWidth={2.5}
                      fillOpacity={0.7}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue (₹)"
                      stroke="#27AE60" 
                      fill="url(#colorRevenue)" 
                      strokeWidth={2.5}
                      fillOpacity={0.5}
                    />
                    <defs>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A5276" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#1A5276" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#27AE60" stopOpacity={0.7}/>
                        <stop offset="95%" stopColor="#27AE60" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Distribution Chart */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(26, 82, 118, 0.12)',
            height: '100%',
            width: '100%',
            border: 'none',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#1A5276', 
                mb: 1,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
              }}>
                <PieChart sx={{ verticalAlign: 'middle', mr: 1.5 }} />
                Category Distribution
              </Typography>
              <Typography variant="body2" sx={{ 
                color: '#5D6D7E', 
                mb: 3,
                fontSize: { xs: '0.75rem', sm: '0.85rem' }
              }}>
                Product distribution across categories
              </Typography>
              <Box sx={{ 
                height: { xs: 240, sm: 280, md: 320, lg: 380 },
                width: '100%',
                position: 'relative'
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={isMobile ? 40 : 60}
                      outerRadius={isMobile ? 70 : 100}
                      paddingAngle={3}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        fontSize: 12
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3} sx={{ mb: { xs: 4, sm: 5 } }}>
        {/* Stock Levels */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(26, 82, 118, 0.12)',
            height: '100%',
            width: '100%',
            border: 'none'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                color: '#1A5276', 
                mb: 2,
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
              }}>
                <MedicalServices sx={{ verticalAlign: 'middle', mr: 1.5 }} />
                Stock Analysis
              </Typography>
              <Box sx={{ 
                height: { xs: 280, sm: 320, md: 340 },
                width: '100%'
              }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={stockData}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis 
                      dataKey="name" 
                      tick={{ fill: '#5D6D7E', fontWeight: 500, fontSize: isMobile ? 10 : 12 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Stock Level %"
                      dataKey="value"
                      stroke="#1A5276"
                      fill="#1A5276"
                      fillOpacity={0.6}
                      strokeWidth={1.5}
                    />
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 8,
                        border: '1px solid #e0e0e0',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        fontSize: 12
                      }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Insights & Actions */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 10px 30px rgba(26, 82, 118, 0.12)',
            height: '100%',
            width: '100%',
            border: 'none',
            background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.95) 0%, rgba(46, 134, 193, 0.95) 100%)',
            color: 'white'
          }}>
            <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
              <Typography variant="h5" sx={{ 
                fontWeight: 700, 
                mb: 3, 
                color: 'white',
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
              }}>
                📊 Key Insights
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    height: '100%'
                  }}>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      Avg. Order Value
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#27AE60', mt: 0.5 }}>
                      ₹{stats.orders ? Math.round((stats.orders * 1800) / stats.orders) : 0}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption">+12.8%</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 1.5, 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    height: '100%'
                  }}>
                    <Typography variant="body2" sx={{ opacity: 0.9, fontSize: { xs: '0.7rem', sm: '0.8rem' } }}>
                      Conversion Rate
                    </Typography>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#3498DB', mt: 0.5 }}>
                      {stats.users ? Math.round((stats.orders / stats.users) * 100) : 0}%
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 14, mr: 0.5 }} />
                      <Typography variant="caption">+5.2%</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 2.5, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

              <Typography variant="h6" sx={{ fontWeight: 600, mb: 2, color: 'white', fontSize: { xs: '0.9rem', sm: '1rem' } }}>
                Quick Actions
              </Typography>
              <Grid container spacing={1.5}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Inventory2 sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.25)' },
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      py: { xs: 0.8, sm: 1 }
                    }}
                  >
                    Manage Stock
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Receipt sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.25)',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.25)' },
                      fontSize: { xs: '0.7rem', sm: '0.8rem' },
                      py: { xs: 0.8, sm: 1 }
                    }}
                  >
                    View Orders
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForward sx={{ fontSize: { xs: 16, sm: 18 } }} />}
                    sx={{
                      mt: 2,
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(8px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.3)' },
                      fontSize: { xs: '0.75rem', sm: '0.85rem' },
                      py: { xs: 0.8, sm: 1 }
                    }}
                  >
                    Generate Report
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity */}
      <Card sx={{ 
        borderRadius: 3,
        boxShadow: '0 10px 30px rgba(26, 82, 118, 0.12)',
        border: 'none',
        mb: 4
      }}>
        <CardContent sx={{ p: { xs: 2, sm: 3 } }}>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: '#1A5276', 
            mb: 3,
            fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' }
          }}>
            📋 Recent Activity
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(26, 82, 118, 0.05)', 
                borderRadius: 2,
                height: '100%'
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 700, 
                  color: '#1A5276', 
                  mb: 1,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  🚨 Alerts
                </Typography>
                <Stack spacing={1}>
                  {['Stock running low', 'Pending orders', 'System update'].map((item, index) => (
                    <Paper key={index} sx={{ 
                      p: 1.5, 
                      borderRadius: 1,
                      border: '1px solid #FFEAA7',
                      bgcolor: '#FFF9E6'
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 600, fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                        {item}
                      </Typography>
                    </Paper>
                  ))}
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(39, 174, 96, 0.05)', 
                borderRadius: 2,
                height: '100%'
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 700, 
                  color: '#27AE60', 
                  mb: 1,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  ✅ Today's Summary
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    • {todayData.prescriptions_today} orders processed
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    • ₹{todayData.revenue_today.toLocaleString()} revenue
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    • {todayData.consultations_today} new users
                  </Typography>
                </Stack>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ 
                p: 2, 
                bgcolor: 'rgba(243, 156, 18, 0.05)', 
                borderRadius: 2,
                height: '100%'
              }}>
                <Typography variant="subtitle1" sx={{ 
                  fontWeight: 700, 
                  color: '#F39C12', 
                  mb: 1,
                  fontSize: { xs: '0.9rem', sm: '1rem' }
                }}>
                  📈 Performance
                </Typography>
                <Stack spacing={1}>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    • Orders up by 18.7%
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    • Revenue growth: 22.1%
                  </Typography>
                  <Typography variant="body2" sx={{ fontSize: { xs: '0.75rem', sm: '0.85rem' } }}>
                    • User satisfaction: 94.5%
                  </Typography>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

const DashboardCard = ({ title, value, icon, color, bgColor, trend, change, todayValue, viewMode, prefix = '', suffix = '' }) => (
  <Card sx={{
    borderRadius: 2.5,
    overflow: 'visible',
    position: 'relative',
    transition: 'all 0.3s ease',
    boxShadow: `0 6px 20px ${color}15`,
    background: 'white',
    border: 'none',
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: `0 12px 30px ${color}25`,
    }
  }}>
    <CardContent sx={{ 
      flexGrow: 1,
      p: { xs: 2, sm: 2.5 },
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      height: '100%'
    }}>
      {/* Floating Icon */}
      <Box sx={{
        position: 'absolute',
        top: { xs: -16, sm: -20 },
        right: { xs: 16, sm: 20 },
        width: { xs: 56, sm: 64 },
        height: { xs: 56, sm: 64 },
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        color: 'white',
        boxShadow: `0 6px 20px ${color}30`,
        zIndex: 1,
        '& .MuiSvgIcon-root': {
          fontSize: { xs: 26, sm: 30 },
        }
      }}>
        {icon}
      </Box>

      {/* Trend Badge */}
      <Box sx={{ 
        position: 'absolute',
        top: 12,
        left: 12,
        zIndex: 2
      }}>
        <Chip
          icon={change === 'positive' ? <TrendingUp /> : <TrendingDown />}
          label={`${trend}%`}
          size="small"
          sx={{
            bgcolor: change === 'positive' ? 'rgba(39, 174, 96, 0.12)' : 'rgba(231, 76, 60, 0.12)',
            color: change === 'positive' ? '#27AE60' : '#E74C3C',
            border: `1px solid ${change === 'positive' ? '#27AE60' : '#E74C3C'}30`,
            fontWeight: 700,
            fontSize: { xs: '0.7rem', sm: '0.75rem' },
            height: { xs: 24, sm: 26 }
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ 
        mt: 'auto',
        width: '100%'
      }}>
        <Typography variant="subtitle2" sx={{ 
          color: '#64748B',
          fontWeight: 600,
          mb: 1,
          fontSize: { xs: '0.75rem', sm: '0.85rem' },
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {title}
        </Typography>
        
        <Typography variant="h2" sx={{ 
          color: color,
          fontWeight: 800,
          mb: 2,
          fontSize: { xs: '2rem', sm: '2.5rem', md: '2.8rem' },
          lineHeight: 1,
          wordBreak: 'break-word'
        }}>
          {prefix}{value !== null && value !== undefined ? value.toLocaleString() : 0}{suffix}
        </Typography>

        {/* Today's value indicator */}
        {viewMode === 'overview' && todayValue !== undefined && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            mt: 2,
            pt: 2,
            borderTop: `1.5px solid ${color}20`
          }}>
            <Box sx={{ 
              width: 6, 
              height: 6, 
              borderRadius: '50%', 
              bgcolor: color,
              mr: 1.5,
              animation: 'pulse 1.5s infinite'
            }} />
            <Typography variant="body2" sx={{ 
              color: '#94A3B8', 
              mr: 1,
              fontSize: { xs: '0.7rem', sm: '0.8rem' }
            }}>
              Today:
            </Typography>
            <Typography variant="h6" sx={{ 
              color: color, 
              fontWeight: 800,
              fontSize: { xs: '0.9rem', sm: '1.1rem' }
            }}>
              {prefix}{todayValue.toLocaleString()}{suffix}
            </Typography>
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

const LoadingSkeleton = ({ isMobile }) => (
  <Box sx={{ 
    p: { xs: 2, sm: 3, md: 4 },
    width: '100%',
    minHeight: '100vh'
  }}>
    <Skeleton 
      variant="rounded" 
      width={isMobile ? '80%' : '40%'} 
      height={60} 
      sx={{ 
        mb: 4, 
        bgcolor: 'rgba(26, 82, 118, 0.1)', 
        borderRadius: 2 
      }} 
    />
    <Grid container spacing={2.5} sx={{ mb: 5 }}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={6} sm={4} md={2} key={index}>
          <Skeleton 
            variant="rounded" 
            height={160} 
            sx={{ 
              borderRadius: 2.5,
              bgcolor: 'rgba(26, 82, 118, 0.1)'
            }} 
          />
        </Grid>
      ))}
    </Grid>
    <Grid container spacing={3} sx={{ mb: 5 }}>
      <Grid item xs={12} lg={8}>
        <Skeleton variant="rounded" height={380} sx={{ borderRadius: 2.5, bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Skeleton variant="rounded" height={380} sx={{ borderRadius: 2.5, bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
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
    height: '80vh',
    textAlign: 'center',
    p: { xs: 2, sm: 3, md: 4 },
    background: 'linear-gradient(135deg, #f5f9ff 0%, #e8f0fa 100%)'
  }}>
    <Box sx={{ 
      width: { xs: 120, sm: 150 }, 
      height: { xs: 120, sm: 150 }, 
      borderRadius: '50%', 
      bgcolor: 'rgba(26, 82, 118, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 4,
      animation: 'pulse 2s infinite'
    }}>
      <LocalPharmacy sx={{ fontSize: { xs: 60, sm: 80 }, color: '#1A5276' }} />
    </Box>
    <Typography variant="h4" sx={{ 
      color: "#1A5276", 
      mb: 2, 
      fontWeight: 800,
      fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
    }}>
      Unable to Load Dashboard
    </Typography>
    <Typography variant="body1" sx={{ 
      color: 'text.secondary', 
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
        borderRadius: 2,
        px: { xs: 3, sm: 4 },
        py: { xs: 1, sm: 1.5 },
        fontWeight: 700,
        fontSize: { xs: '0.9rem', sm: '1rem' },
        '&:hover': {
          background: 'linear-gradient(135deg, #154360 0%, #21618C 100%)',
          transform: 'translateY(-2px)',
          boxShadow: '0 8px 25px rgba(26, 82, 118, 0.3)'
        }
      }}
    >
      Refresh Dashboard
    </Button>
  </Box>
);

// Add CSS animation for pulse effect
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = `
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `;
  document.head.appendChild(styleSheet);
}

export default Dashboard;
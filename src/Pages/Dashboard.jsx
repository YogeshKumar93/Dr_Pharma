import { useEffect, useState } from "react";
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  Box,
  LinearProgress,
  Skeleton,
  useTheme,
  useMediaQuery,
  Chip,
  Button,
  IconButton,
  Tooltip,
  Fab,
  Paper,
  Stack,
  Divider,
  Avatar,
  Badge
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
  Coronavirus,
  Vaccines,
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
  PolarRadiusAxis,
  ScatterChart,
  Scatter,
  ZAxis
} from 'recharts';
import PeopleIcon from "@mui/icons-material/People";


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
      title: "Total Patients", 
      value: stats.users, 
      icon: <PeopleIcon />, 
      color: "#1A5276", 
      bgColor: "rgba(26, 82, 118, 0.15)",
      trend: 15.2,
      change: "positive",
      todayValue: todayData.consultations_today,
      prefix: ""
    },
    { 
      title: "Medicines", 
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
      title: "Prescriptions", 
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
      title: "Completed", 
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
      title: "New Patients", 
      value: todayData.consultations_today, 
      icon: <PeopleIcon />, 
      color: "#1A5276", 
      bgColor: "rgba(26, 82, 118, 0.15)",
      trend: 12.5,
      change: "positive",
      prefix: ""
    },
    { 
      title: "Medicines Sold", 
      value: todayData.medicines_sold, 
      icon: <Medication />, 
      color: "#2E86C1", 
      bgColor: "rgba(46, 134, 193, 0.15)",
      trend: 8.3,
      change: "positive",
      prefix: ""
    },
    { 
      title: "Prescriptions", 
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
      width: '100vw',
      maxWidth: '100%',
      minHeight: '100vh',
      px: { xs: 1, sm: 2, md: 3, lg: 4 },
      py: { xs: 1, sm: 2, md: 3 },
      background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%)',
      overflowX: 'hidden'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: 4,
        gap: 2,
        pt: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar sx={{ 
            bgcolor: '#1A5276',
            width: 56,
            height: 56,
            boxShadow: '0 4px 20px rgba(26, 82, 118, 0.3)'
          }}>
            <LocalPharmacy sx={{ fontSize: 32 }} />
          </Avatar>
          <Box>
            <Typography variant="h4" sx={{ 
              color: "#1A5276",
              fontWeight: 900,
              textShadow: '0 2px 4px rgba(0,0,0,0.1)',
              fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
            }}>
              PharmaCare Dashboard
            </Typography>
            <Typography variant="body1" sx={{ color: '#5D6D7E', mt: 0.5, fontWeight: 500 }}>
              {viewMode === 'overview' ? 'Complete Pharmacy Management Overview' : 'Today\'s Pharmacy Operations'}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
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
              px: 3,
              py: 1
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
              px: 3,
              py: 1
            }}
          >
            Today's View
          </Button>
          <Tooltip title="Refresh Dashboard">
            <IconButton 
              onClick={fetchData}
              sx={{ 
                bgcolor: 'rgba(26, 82, 118, 0.1)',
                '&:hover': { 
                  bgcolor: 'rgba(26, 82, 118, 0.2)',
                  transform: 'rotate(180deg)',
                  transition: 'transform 0.5s ease'
                }
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards Grid - Full Width */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <DashboardCard {...card} viewMode={viewMode} />
          </Grid>
        ))}
      </Grid>

      {/* Main Charts Section - Full Width */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* Revenue & Prescriptions Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(26, 82, 118, 0.15)',
            height: '100%',
            border: 'none',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 0, height: '100%' }}>
              <Box sx={{ p: 3, pb: 0 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                  <Box>
                    <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A5276' }}>
                      <Timeline sx={{ verticalAlign: 'middle', mr: 2 }} />
                      Pharmacy Performance Analytics
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#5D6D7E', ml: 5 }}>
                      Weekly trends for prescriptions and revenue
                    </Typography>
                  </Box>
                  <Stack direction="row" spacing={1}>
                    <Chip 
                      label="Weekly" 
                      variant="outlined" 
                      sx={{ 
                        borderColor: '#1A5276', 
                        color: '#1A5276',
                        fontWeight: 600
                      }}
                    />
                    <Chip 
                      label="Real-time" 
                      sx={{ 
                        bgcolor: 'rgba(39, 174, 96, 0.1)', 
                        color: '#27AE60',
                        fontWeight: 600
                      }}
                    />
                  </Stack>
                </Box>
              </Box>
              <Box sx={{ height: 380, width: '100%', px: 2, pb: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" vertical={false} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#5D6D7E', fontWeight: 600 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#5D6D7E', fontWeight: 600 }}
                    />
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 10,
                        border: '2px solid #e0e0e0',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                        background: 'rgba(255, 255, 255, 0.95)',
                        backdropFilter: 'blur(10px)'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="prescriptions" 
                      name="Prescriptions"
                      stroke="#1A5276" 
                      fill="url(#colorPrescriptions)" 
                      strokeWidth={3}
                      fillOpacity={0.8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue (₹)"
                      stroke="#27AE60" 
                      fill="url(#colorRevenue)" 
                      strokeWidth={3}
                      fillOpacity={0.6}
                    />
                    <defs>
                      <linearGradient id="colorPrescriptions" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#1A5276" stopOpacity={0.9}/>
                        <stop offset="95%" stopColor="#1A5276" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#27AE60" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#27AE60" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Medicine Distribution & Stock */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(26, 82, 118, 0.15)',
            height: '100%',
            border: 'none',
            overflow: 'hidden'
          }}>
            <CardContent sx={{ p: 0, height: '100%' }}>
              <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A5276', mb: 1 }}>
                  <PieChart sx={{ verticalAlign: 'middle', mr: 2 }} />
                  Medicine Category Distribution
                </Typography>
                <Typography variant="body2" sx={{ color: '#5D6D7E', mb: 3 }}>
                  Stock analysis across medicine categories
                </Typography>
              </Box>
              <Box sx={{ height: 320, width: '100%', px: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 10,
                        border: '2px solid #e0e0e0',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                      }}
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ p: 3, pt: 0 }}>
                <Stack direction="row" spacing={2} justifyContent="center" flexWrap="wrap">
                  {pieData.slice(0, 3).map((item, index) => (
                    <Chip
                      key={index}
                      label={`${item.name}: ${item.value}`}
                      sx={{
                        bgcolor: `${item.color}20`,
                        color: item.color,
                        fontWeight: 600,
                        border: `1px solid ${item.color}40`
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Secondary Charts Section */}
      <Grid container spacing={3} sx={{ mb: 5 }}>
        {/* Stock Level Radar Chart */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(26, 82, 118, 0.15)',
            height: '100%',
            border: 'none'
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A5276', mb: 2 }}>
                <MedicalServices sx={{ verticalAlign: 'middle', mr: 2 }} />
                Stock Levels by Category
              </Typography>
              <Box sx={{ height: 350, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart data={stockData}>
                    <PolarGrid stroke="#e0e0e0" />
                    <PolarAngleAxis dataKey="name" tick={{ fill: '#5D6D7E', fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} />
                    <Radar
                      name="Stock Level %"
                      dataKey="value"
                      stroke="#1A5276"
                      fill="#1A5276"
                      fillOpacity={0.6}
                      strokeWidth={2}
                    />
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 10,
                        border: '2px solid #e0e0e0',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)'
                      }}
                    />
                    <Legend />
                  </RadarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Metrics & Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(26, 82, 118, 0.15)',
            height: '100%',
            border: 'none',
            background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.95) 0%, rgba(46, 134, 193, 0.95) 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 3, color: 'white' }}>
                📊 Pharmacy Performance Insights
              </Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Avg. Prescription Value
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#27AE60' }}>
                      ₹{stats.orders ? Math.round((stats.orders * 1800) / stats.orders) : 0}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption">+12.8%</Typography>
                    </Box>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ 
                    p: 2, 
                    borderRadius: 2,
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      Patient Retention
                    </Typography>
                    <Typography variant="h4" sx={{ fontWeight: 800, color: '#3498DB' }}>
                      {stats.users ? Math.round((stats.orders / stats.users) * 100) : 0}%
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                      <TrendingUp sx={{ fontSize: 16, mr: 0.5 }} />
                      <Typography variant="caption">+5.2%</Typography>
                    </Box>
                  </Paper>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.2)' }} />

              <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: 'white' }}>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Inventory2 />}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                    }}
                  >
                    Manage Stock
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Receipt />}
                    sx={{
                      background: 'rgba(255, 255, 255, 0.2)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                    }}
                  >
                    View Prescriptions
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      mt: 2,
                      background: 'rgba(255, 255, 255, 0.25)',
                      backdropFilter: 'blur(10px)',
                      border: '1px solid rgba(255, 255, 255, 0.4)',
                      '&:hover': { background: 'rgba(255, 255, 255, 0.35)' }
                    }}
                  >
                    Generate Full Report
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Activity & Alerts */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 12px 40px rgba(26, 82, 118, 0.15)',
            border: 'none'
          }}>
            <CardContent>
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#1A5276', mb: 3 }}>
                📋 Recent Pharmacy Activity & Alerts
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(26, 82, 118, 0.05)', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#1A5276', mb: 1 }}>
                      🚨 Stock Alerts
                    </Typography>
                    <Stack spacing={1}>
                      {['Paracetamol 500mg', 'Amoxicillin 250mg', 'Vitamin C Tablets'].map((item, index) => (
                        <Paper key={index} sx={{ 
                          p: 1.5, 
                          borderRadius: 1,
                          border: '1px solid #FFEAA7',
                          bgcolor: '#FFF9E6'
                        }}>
                          <Typography variant="body2" sx={{ fontWeight: 600 }}>
                            {item} - Low Stock
                          </Typography>
                        </Paper>
                      ))}
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(39, 174, 96, 0.05)', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#27AE60', mb: 1 }}>
                      ✅ Today's Highlights
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        • {todayData.prescriptions_today} prescriptions processed
                      </Typography>
                      <Typography variant="body2">
                        • ₹{todayData.revenue_today.toLocaleString()} revenue generated
                      </Typography>
                      <Typography variant="body2">
                        • {todayData.consultations_today} patient consultations
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box sx={{ p: 2, bgcolor: 'rgba(243, 156, 18, 0.05)', borderRadius: 2 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 700, color: '#F39C12', mb: 1 }}>
                      📈 Performance Trends
                    </Typography>
                    <Stack spacing={1}>
                      <Typography variant="body2">
                        • Prescriptions up by 18.7%
                      </Typography>
                      <Typography variant="body2">
                        • Revenue growth: 22.1%
                      </Typography>
                      <Typography variant="body2">
                        • Patient satisfaction: 94.5%
                      </Typography>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      {/* <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
          boxShadow: '0 12px 40px rgba(26, 82, 118, 0.4)',
          width: 60,
          height: 60,
          '&:hover': {
            background: 'linear-gradient(135deg, #154360 0%, #21618C 100%)',
            transform: 'scale(1.1)',
          }
        }}
        onClick={fetchData}
      >
        <Refresh sx={{ fontSize: 28 }} />
      </Fab> */}
    </Box>
  );
};

const DashboardCard = ({ title, value, icon, color, bgColor, trend, change, todayValue, viewMode, prefix = '', suffix = '' }) => (
  <Card sx={{
    borderRadius: 3,
    overflow: 'visible',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: `0 8px 32px ${color}20`,
    background: 'white',
    border: 'none',
    height: '100%',
    minHeight: 180,
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: `0 16px 48px ${color}30`,
    }
  }}>
    <CardContent sx={{ 
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Floating Icon */}
      <Box sx={{
        position: 'absolute',
        top: -20,
        right: 20,
        width: 70,
        height: 70,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${color} 0%, ${color}80 100%)`,
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: `0 8px 25px ${color}40`,
        zIndex: 1,
        '& .MuiSvgIcon-root': {
          fontSize: 34,
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
            bgcolor: change === 'positive' ? 'rgba(39, 174, 96, 0.15)' : 'rgba(231, 76, 60, 0.15)',
            color: change === 'positive' ? '#27AE60' : '#E74C3C',
            border: `1px solid ${change === 'positive' ? '#27AE60' : '#E74C3C'}40`,
            fontWeight: 700,
            fontSize: '0.75rem'
          }}
        />
      </Box>

      {/* Content */}
      <Box sx={{ mt: 'auto' }}>
        <Typography variant="subtitle2" sx={{ 
          color: '#64748B',
          fontWeight: 600,
          mb: 1,
          fontSize: '0.85rem',
          textTransform: 'uppercase',
          letterSpacing: '1px'
        }}>
          {title}
        </Typography>
        
        <Typography variant="h2" sx={{ 
          color: color,
          fontWeight: 900,
          mb: 2,
          fontSize: { xs: '2.5rem', sm: '3rem' },
          lineHeight: 1,
          textShadow: `0 2px 10px ${color}20`
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
            borderTop: `2px solid ${color}20`
          }}>
            <Box sx={{ 
              width: 8, 
              height: 8, 
              borderRadius: '50%', 
              bgcolor: color,
              mr: 1.5,
              animation: 'pulse 1.5s infinite'
            }} />
            <Typography variant="body2" sx={{ color: '#94A3B8', mr: 1 }}>
              Today:
            </Typography>
            <Typography variant="h6" sx={{ color: color, fontWeight: 800 }}>
              {prefix}{todayValue.toLocaleString()}{suffix}
            </Typography>
          </Box>
        )}
      </Box>
    </CardContent>
  </Card>
);

const LoadingSkeleton = ({ isMobile }) => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="rounded" width={400} height={60} sx={{ mb: 4, bgcolor: 'rgba(26, 82, 118, 0.1)', borderRadius: 3 }} />
    <Grid container spacing={3}>
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
    p: 3,
    background: 'linear-gradient(135deg, #f0f7ff 0%, #e6f0ff 100%)'
  }}>
    <Box sx={{ 
      width: 150, 
      height: 150, 
      borderRadius: '50%', 
      bgcolor: 'rgba(26, 82, 118, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 4,
      animation: 'pulse 2s infinite'
    }}>
      <LocalPharmacy sx={{ fontSize: 80, color: '#1A5276' }} />
    </Box>
    <Typography variant="h4" sx={{ color: "#1A5276", mb: 2, fontWeight: 900 }}>
      Unable to Load Pharmacy Dashboard
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 500 }}>
      There was an error loading your pharmacy dashboard data. Please check your connection and try again.
    </Typography>
    <Button 
      variant="contained" 
      startIcon={<Refresh />}
      onClick={fetchData}
      sx={{ 
        background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
        borderRadius: 2,
        px: 4,
        py: 1.5,
        fontWeight: 700,
        fontSize: '1.1rem',
        '&:hover': {
          background: 'linear-gradient(135deg, #154360 0%, #21618C 100%)',
          transform: 'translateY(-2px)',
          boxShadow: '0 12px 40px rgba(26, 82, 118, 0.3)'
        }
      }}
    >
      Refresh Dashboard
    </Button>
  </Box>
);

 

export default Dashboard;
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
  Menu,
  MenuItem,
  Divider,
  Tooltip,
  Fab
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
  MoreVert,
  Refresh,
  CalendarToday,
  ViewWeek,
  BarChart,
  PieChart,
  Timeline,
  ArrowForward
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
  Area
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('overview'); // 'overview' or 'today'
  const [timeRange, setTimeRange] = useState('weekly'); // 'daily', 'weekly', 'monthly'
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [anchorEl, setAnchorEl] = useState(null);

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

  // Generate sample data for charts (in real app, this would come from API)
  const generateChartData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day, index) => ({
      name: day,
      users: Math.floor(Math.random() * 50) + 20,
      orders: Math.floor(Math.random() * 100) + 30,
      revenue: Math.floor(Math.random() * 5000) + 2000,
      growth: Math.floor(Math.random() * 30) - 5,
    }));
  };

  const generatePieData = (stats) => {
    return [
      { name: 'Active', value: stats?.users ? Math.floor(stats.users * 0.7) : 70, color: '#1A5276' },
      { name: 'Inactive', value: stats?.users ? Math.floor(stats.users * 0.2) : 20, color: '#3498DB' },
      { name: 'New', value: stats?.users ? Math.floor(stats.users * 0.1) : 10, color: '#2ECC71' },
    ];
  };

  const generateTodayData = (stats) => {
    return {
      users_today: Math.floor((stats?.users || 0) * 0.1),
      products_today: Math.floor((stats?.products || 0) * 0.05),
      orders_today: Math.floor((stats?.orders || 0) * 0.15),
      payments_today: Math.floor((stats?.payments || 0) * 0.12),
      revenue_today: Math.floor((stats?.orders || 0) * 2500 * 0.15),
    };
  };

  if (loading) {
    return <LoadingSkeleton isMobile={isMobile} />;
  }

  if (!stats) {
    return <ErrorState />;
  }

  const todayData = generateTodayData(stats);
  const chartData = generateChartData();
  const pieData = generatePieData(stats);

  const cardData = viewMode === 'overview' ? [
    { 
      title: "Total Users", 
      value: stats.users, 
      icon: <UsersIcon />, 
      color: "#1A5276", 
      bgColor: "rgba(26, 82, 118, 0.1)",
      trend: 12.5,
      change: "positive",
      todayValue: todayData.users_today
    },
    { 
      title: "Total Products", 
      value: stats.products, 
      icon: <ProductsIcon />, 
      color: "#2E86C1", 
      bgColor: "rgba(46, 134, 193, 0.1)",
      trend: 8.3,
      change: "positive",
      todayValue: todayData.products_today
    },
    { 
      title: "Total Orders", 
      value: stats.orders, 
      icon: <OrdersIcon />, 
      color: "#3498DB", 
      bgColor: "rgba(52, 152, 219, 0.1)",
      trend: 15.2,
      change: "positive",
      todayValue: todayData.orders_today
    },
    { 
      title: "Total Payments", 
      value: stats.payments, 
      icon: <PaymentsIcon />, 
      color: "#5DADE2", 
      bgColor: "rgba(93, 173, 226, 0.1)",
      trend: 18.7,
      change: "positive",
      todayValue: todayData.payments_today
    },
    { 
      title: "Pending Orders", 
      value: stats.pending_orders, 
      icon: <PendingIcon />, 
      color: "#E67E22", 
      bgColor: "rgba(230, 126, 34, 0.1)",
      trend: -3.2,
      change: "negative",
      todayValue: Math.floor(stats.pending_orders * 0.2)
    },
    { 
      title: "Paid Payments", 
      value: stats.paid_payments, 
      icon: <PaidIcon />, 
      color: "#27AE60", 
      bgColor: "rgba(39, 174, 96, 0.1)",
      trend: 22.1,
      change: "positive",
      todayValue: Math.floor(stats.paid_payments * 0.18)
    },
  ] : [
    { 
      title: "Users Today", 
      value: todayData.users_today, 
      icon: <UsersIcon />, 
      color: "#1A5276", 
      bgColor: "rgba(26, 82, 118, 0.1)",
      trend: 12.5,
      change: "positive"
    },
    { 
      title: "Products Added", 
      value: todayData.products_today, 
      icon: <ProductsIcon />, 
      color: "#2E86C1", 
      bgColor: "rgba(46, 134, 193, 0.1)",
      trend: 8.3,
      change: "positive"
    },
    { 
      title: "Orders Today", 
      value: todayData.orders_today, 
      icon: <OrdersIcon />, 
      color: "#3498DB", 
      bgColor: "rgba(52, 152, 219, 0.1)",
      trend: 15.2,
      change: "positive"
    },
    { 
      title: "Payments Today", 
      value: todayData.payments_today, 
      icon: <PaymentsIcon />, 
      color: "#5DADE2", 
      bgColor: "rgba(93, 173, 226, 0.1)",
      trend: 18.7,
      change: "positive"
    },
    { 
      title: "Revenue Today", 
      value: todayData.revenue_today, 
      icon: <PaidIcon />, 
      color: "#27AE60", 
      bgColor: "rgba(39, 174, 96, 0.1)",
      trend: 22.1,
      change: "positive",
      prefix: "₹"
    },
    { 
      title: "Conversion Rate", 
      value: stats.users ? Math.round((todayData.orders_today / todayData.users_today) * 100) : 0, 
      icon: <TrendingUp />, 
      color: "#9B59B6", 
      bgColor: "rgba(155, 89, 182, 0.1)",
      trend: 5.4,
      change: "positive",
      suffix: "%"
    },
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
    }}>
      {/* Header Section */}
      <Box sx={{ 
        display: 'flex', 
        flexDirection: isMobile ? 'column' : 'row',
        justifyContent: 'space-between', 
        alignItems: isMobile ? 'flex-start' : 'center',
        mb: 4,
        gap: 2
      }}>
        <Box>
          <Typography variant="h4" sx={{ 
            color: "#1A5276",
            fontWeight: 800,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            📊 Analytics Dashboard
          </Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 0.5 }}>
            {viewMode === 'overview' ? 'Complete business overview' : 'Today\'s performance metrics'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Button
            variant={viewMode === 'overview' ? 'contained' : 'outlined'}
            startIcon={<ViewWeek />}
            onClick={() => setViewMode('overview')}
            sx={{
              background: viewMode === 'overview' ? 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)' : 'transparent',
              color: viewMode === 'overview' ? 'white' : '#1A5276',
              borderColor: '#1A5276'
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
              borderColor: '#27AE60'
            }}
          >
            Today's View
          </Button>
          <Tooltip title="Refresh Data">
            <IconButton 
              onClick={fetchData}
              sx={{ 
                bgcolor: 'rgba(26, 82, 118, 0.1)',
                '&:hover': { bgcolor: 'rgba(26, 82, 118, 0.2)' }
              }}
            >
              <Refresh />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards Grid */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <DashboardCard {...card} viewMode={viewMode} />
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Growth Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(26, 82, 118, 0.1)',
            height: '100%'
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A5276' }}>
                  <Timeline sx={{ verticalAlign: 'middle', mr: 1 }} />
                  Growth Analytics
                </Typography>
                <Chip 
                  label={timeRange === 'weekly' ? 'Weekly' : timeRange === 'daily' ? 'Daily' : 'Monthly'} 
                  variant="outlined" 
                  sx={{ borderColor: '#1A5276', color: '#1A5276' }}
                />
              </Box>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    contentStyle={{ 
                      borderRadius: 8,
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="orders" 
                    stackId="1"
                    stroke="#1A5276" 
                    fill="url(#colorOrders)" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="users" 
                    stackId="2"
                    stroke="#3498DB" 
                    fill="url(#colorUsers)" 
                    fillOpacity={0.6}
                  />
                  <defs>
                    <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1A5276" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#1A5276" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3498DB" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3498DB" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Distribution Pie Chart */}
        <Grid item xs={12} lg={4}>
          <Card sx={{ 
            borderRadius: 3,
            boxShadow: '0 8px 32px rgba(26, 82, 118, 0.1)',
            height: '100%'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A5276', mb: 3 }}>
                <PieChart sx={{ verticalAlign: 'middle', mr: 1 }} />
                User Distribution
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <ChartTooltip />
                  <Legend />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Metrics */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card sx={{ borderRadius: 3, boxShadow: '0 8px 32px rgba(26, 82, 118, 0.1)' }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, color: '#1A5276', mb: 3 }}>
                <BarChart sx={{ verticalAlign: 'middle', mr: 1 }} />
                Performance Metrics
              </Typography>
              <ResponsiveContainer width="100%" height={250}>
                <RechartsBarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <ChartTooltip 
                    contentStyle={{ 
                      borderRadius: 8,
                      border: '1px solid #e0e0e0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#1A5276" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="orders" fill="#3498DB" radius={[4, 4, 0, 0]} />
                </RechartsBarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 3, 
            boxShadow: '0 8px 32px rgba(26, 82, 118, 0.1)',
            background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.95) 0%, rgba(46, 134, 193, 0.95) 100%)',
            color: 'white'
          }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 700, mb: 3, color: 'white' }}>
                📈 Quick Insights
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <InsightItem 
                  title="Average Order Value" 
                  value={`₹${stats.orders ? Math.round((stats.orders * 2500) / stats.orders) : 0}`}
                  change="+12.8%"
                  positive
                />
                <InsightItem 
                  title="Conversion Rate" 
                  value={`${stats.users ? Math.round((stats.orders / stats.users) * 100) : 0}%`}
                  change="+5.2%"
                  positive
                />
                <InsightItem 
                  title="Customer Retention" 
                  value="78.5%"
                  change="+3.1%"
                  positive
                />
                <InsightItem 
                  title="Bounce Rate" 
                  value="22.3%"
                  change="-4.7%"
                  positive={false}
                />
              </Box>
              <Button 
                variant="contained" 
                endIcon={<ArrowForward />}
                sx={{ 
                  mt: 3,
                  background: 'rgba(255, 255, 255, 0.2)',
                  backdropFilter: 'blur(10px)',
                  '&:hover': { background: 'rgba(255, 255, 255, 0.3)' }
                }}
              >
                View Detailed Report
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Action Button */}
      <Fab
        color="primary"
        sx={{
          position: 'fixed',
          bottom: 32,
          right: 32,
          background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
          boxShadow: '0 8px 32px rgba(26, 82, 118, 0.4)',
          '&:hover': {
            background: 'linear-gradient(135deg, #154360 0%, #21618C 100%)',
          }
        }}
        onClick={fetchData}
      >
        <Refresh />
      </Fab>
    </Box>
  );
};

const DashboardCard = ({ title, value, icon, color, bgColor, trend, change, todayValue, viewMode, prefix = '', suffix = '' }) => (
  <Card sx={{
    borderRadius: 3,
    overflow: 'visible',
    position: 'relative',
    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    background: 'white',
    border: '1px solid rgba(0,0,0,0.05)',
    height: '100%',
    '&:hover': {
      transform: 'translateY(-4px)',
      boxShadow: `0 12px 40px ${color}20`,
    }
  }}>
    <CardContent sx={{ p: 2.5 }}>
      {/* Header with icon and trend */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1.5 }}>
        <Box sx={{
          width: 48,
          height: 48,
          borderRadius: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: bgColor,
          color: color,
          boxShadow: `0 4px 12px ${color}30`,
        }}>
          {icon}
        </Box>
        <Chip
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {change === 'positive' ? <TrendingUp fontSize="small" /> : <TrendingDown fontSize="small" />}
              <Typography variant="caption" sx={{ fontWeight: 600 }}>
                {trend}%
              </Typography>
            </Box>
          }
          size="small"
          sx={{
            bgcolor: change === 'positive' ? 'rgba(39, 174, 96, 0.1)' : 'rgba(231, 76, 60, 0.1)',
            color: change === 'positive' ? '#27AE60' : '#E74C3C',
            border: 'none'
          }}
        />
      </Box>

      {/* Title */}
      <Typography variant="subtitle2" sx={{ 
        color: '#64748B',
        fontWeight: 500,
        mb: 1,
        fontSize: '0.85rem',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        {title}
      </Typography>
      
      {/* Value */}
      <Typography variant="h3" sx={{ 
        color: color,
        fontWeight: 800,
        mb: 1,
        fontSize: { xs: '1.75rem', sm: '2rem' },
        lineHeight: 1.2
      }}>
        {prefix}{value !== null && value !== undefined ? value.toLocaleString() : 0}{suffix}
      </Typography>

      {/* Today's value indicator (only in overview mode) */}
      {viewMode === 'overview' && todayValue !== undefined && (
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center',
          mt: 'auto',
          pt: 1,
          borderTop: '1px solid rgba(0,0,0,0.05)'
        }}>
          <Typography variant="caption" sx={{ color: '#94A3B8', mr: 1 }}>
            Today:
          </Typography>
          <Typography variant="body2" sx={{ color: color, fontWeight: 600 }}>
            {todayValue.toLocaleString()}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

const InsightItem = ({ title, value, change, positive }) => (
  <Box sx={{ 
    display: 'flex', 
    justifyContent: 'space-between',
    alignItems: 'center',
    p: 1.5,
    borderRadius: 2,
    background: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(10px)'
  }}>
    <Typography variant="body2" sx={{ fontWeight: 500 }}>
      {title}
    </Typography>
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <Typography variant="h6" sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      <Chip
        label={change}
        size="small"
        sx={{
          bgcolor: positive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(231, 76, 60, 0.2)',
          color: 'white',
          fontSize: '0.7rem',
          height: 20
        }}
      />
    </Box>
  </Box>
);

const LoadingSkeleton = ({ isMobile }) => (
  <Box sx={{ p: 3 }}>
    <Skeleton variant="rounded" width={300} height={40} sx={{ mb: 4, bgcolor: 'rgba(26, 82, 118, 0.1)' }} />
    <Grid container spacing={3}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Skeleton 
            variant="rounded" 
            height={180} 
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

const ErrorState = () => (
  <Box sx={{ 
    display: 'flex', 
    flexDirection: 'column', 
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '80vh',
    textAlign: 'center',
    p: 3,
    background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
  }}>
    <Box sx={{ 
      width: 120, 
      height: 120, 
      borderRadius: '50%', 
      bgcolor: 'rgba(26, 82, 118, 0.1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 3
    }}>
      <Typography variant="h1" sx={{ color: '#1A5276' }}>!</Typography>
    </Box>
    <Typography variant="h5" sx={{ color: "#1A5276", mb: 2, fontWeight: 700 }}>
      Unable to Load Dashboard
    </Typography>
    <Typography variant="body1" sx={{ color: 'text.secondary', mb: 4, maxWidth: 400 }}>
      There was an error loading your dashboard data. Please check your connection and try again.
    </Typography>
    <Button 
      variant="contained" 
      startIcon={<Refresh />}
      sx={{ 
        background: 'linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)',
        '&:hover': {
          background: 'linear-gradient(135deg, #154360 0%, #21618C 100%)',
        }
      }}
    >
      Retry
    </Button>
  </Box>
);

export default Dashboard;
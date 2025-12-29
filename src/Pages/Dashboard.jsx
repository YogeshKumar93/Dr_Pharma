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
  Avatar,
  Badge,
  alpha,
  LinearProgress
} from "@mui/material";
import { apiCall } from "../api/api";
import {
  People as UsersIcon,
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  LocalHospital as HealthIcon,
  Medication as MedicineIcon,
  Receipt as ReceiptIcon,
  AttachMoney as MoneyIcon,
  TrendingUp,
  TrendingDown,
  Refresh,
  CalendarToday,
  ViewWeek,
  Download,
  MoreVert,
  FilterList,
  ShowChart,
  PieChart as PieChartIcon,
  Assessment,
  Inventory,
  Notifications,
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

  const generatePharmacyChartData = () => {
    const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    return days.map((day) => ({
      name: day,
      prescriptions: Math.floor(Math.random() * 80) + 40,
      medicines: Math.floor(Math.random() * 150) + 50,
      revenue: Math.floor(Math.random() * 8000) + 3000,
      consultations: Math.floor(Math.random() * 30) + 10,
    }));
  };

  const generateMedicineDistribution = (stats) => {
    return [
      { name: 'Pain Relief', value: Math.floor((stats?.products || 100) * 0.35), color: '#88C0D0' },
      { name: 'Antibiotics', value: Math.floor((stats?.products || 100) * 0.25), color: '#81A1C1' },
      { name: 'Vitamins', value: Math.floor((stats?.products || 100) * 0.20), color: '#A3BE8C' },
      { name: 'First Aid', value: Math.floor((stats?.products || 100) * 0.15), color: '#EBCB8B' },
      { name: 'Others', value: Math.floor((stats?.products || 100) * 0.05), color: '#B48EAD' },
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
    return [
      { name: 'Analgesics', stock: 85, low: 20 },
      { name: 'Antibiotics', stock: 65, low: 15 },
      { name: 'Cardiac', stock: 45, low: 10 },
      { name: 'Diabetic', stock: 75, low: 25 },
      { name: 'Vitamins', stock: 95, low: 30 },
      { name: 'Pediatric', stock: 55, low: 12 },
    ];
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

  const cardData = [
    { 
      title: "Total Users", 
      value: stats.users, 
      icon: <UsersIcon sx={{ fontSize: '1.2rem' }} />, 
      color: "#5E81AC", 
      trend: 15.2,
      change: "positive",
      todayValue: todayData.consultations_today,
    },
    { 
      title: "Total Products", 
      value: stats.products, 
      icon: <MedicineIcon sx={{ fontSize: '1.2rem' }} />, 
      color: "#88C0D0", 
      trend: 8.3,
      change: "positive",
      todayValue: todayData.medicines_sold,
    },
    { 
      title: "Total Orders", 
      value: stats.orders, 
      icon: <ReceiptIcon sx={{ fontSize: '1.2rem' }} />, 
      color: "#81A1C1", 
      trend: 18.7,
      change: "positive",
      todayValue: todayData.prescriptions_today,
    },
    { 
      title: "Revenue", 
      value: stats.orders * 1800, 
      icon: <MoneyIcon sx={{ fontSize: '1.2rem' }} />, 
      color: "#A3BE8C", 
      trend: 22.1,
      change: "positive",
      todayValue: todayData.revenue_today,
      prefix: "₹",
    },
    { 
      title: "Pending Orders", 
      value: stats.pending_orders, 
      icon: <HealthIcon sx={{ fontSize: '1.2rem' }} />, 
      color: "#EBCB8B", 
      trend: -3.2,
      change: "negative",
      todayValue: todayData.emergency_orders,
    },
    { 
      title: "Paid Payments", 
      value: stats.paid_payments, 
      icon: <ReceiptIcon sx={{ fontSize: '1.2rem' }} />, 
      color: "#B48EAD", 
      trend: 12.5,
      change: "positive",
      todayValue: Math.floor(stats.paid_payments * 0.18),
    },
  ];

  const quickStats = [
    { label: "Avg. Order Value", value: `₹${stats.orders ? Math.round((stats.orders * 1800) / stats.orders) : 0}`, change: "+12.8%" },
    { label: "Conversion Rate", value: `${stats.users ? Math.round((stats.orders / stats.users) * 100) : 0}%`, change: "+5.2%" },
    { label: "Customer Satisfaction", value: "94.5%", change: "+3.1%" },
  ];

  const activities = [
    { time: "2 mins ago", title: "New Order Received", description: `Order #${Math.floor(Math.random() * 1000)} received` },
    { time: "15 mins ago", title: "Payment Processed", description: `₹${todayData.revenue_today.toLocaleString()} payment confirmed` },
    { time: "1 hour ago", title: "New User Registered", description: "New customer joined pharmacy" },
    { time: "2 hours ago", title: "Low Stock Alert", description: "Paracetamol 500mg running low" },
  ];

  return (
    <Box sx={{ 
      width: '100%',
      minHeight: '100vh',
      background: '#F8FAFC',
      overflowX: 'hidden',
      px: { xs: 2, sm: 3, md: 4 },
      py: 3
    }}>
      {/* Header */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4,
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box>
          <Typography variant="h5" sx={{ 
            fontWeight: 700, 
            color: '#2E3440',
            fontSize: { xs: '1.4rem', sm: '1.6rem', md: '1.8rem' },
            mb: 0.5
          }}>
            Pharmacy Dashboard
          </Typography>
          <Typography variant="body2" sx={{ 
            color: '#4C566A',
            fontSize: '0.85rem'
          }}>
            Real-time analytics and insights
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, alignItems: 'center' }}>
          <Chip
            label="Overview"
            onClick={() => setViewMode('overview')}
            variant={viewMode === 'overview' ? 'filled' : 'outlined'}
            sx={{
              bgcolor: viewMode === 'overview' ? '#5E81AC' : 'transparent',
              color: viewMode === 'overview' ? 'white' : '#5E81AC',
              fontSize: '0.75rem',
              height: 32
            }}
          />
          <Chip
            label="Today"
            onClick={() => setViewMode('today')}
            variant={viewMode === 'today' ? 'filled' : 'outlined'}
            sx={{
              bgcolor: viewMode === 'today' ? '#5E81AC' : 'transparent',
              color: viewMode === 'today' ? 'white' : '#5E81AC',
              fontSize: '0.75rem',
              height: 32
            }}
          />
          <IconButton 
            onClick={fetchData}
            size="small"
            sx={{ 
              bgcolor: 'white',
              border: '1px solid #E5E9F0',
              width: 36,
              height: 36
            }}
          >
            <Refresh sx={{ fontSize: 18, color: '#5E81AC' }} />
          </IconButton>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
            <Card sx={{ 
              borderRadius: 2,
              border: '1px solid #E5E9F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
              height: '100%',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)'
              }
            }}>
              <CardContent sx={{ p: 2.5 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography variant="caption" sx={{ 
                    color: '#4C566A',
                    fontWeight: 600,
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {card.title}
                  </Typography>
                  <Box sx={{
                    width: 32,
                    height: 32,
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    bgcolor: alpha(card.color, 0.1),
                    color: card.color
                  }}>
                    {card.icon}
                  </Box>
                </Box>

                <Typography variant="h4" sx={{ 
                  fontWeight: 700,
                  color: '#2E3440',
                  fontSize: { xs: '1.5rem', sm: '1.75rem' },
                  mb: 1
                }}>
                  {card.prefix || ''}{card.value.toLocaleString()}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  {card.change === 'positive' ? 
                    <TrendingUp sx={{ fontSize: 16, color: '#A3BE8C' }} /> : 
                    <TrendingDown sx={{ fontSize: 16, color: '#BF616A' }} />
                  }
                  <Typography variant="caption" sx={{ 
                    fontWeight: 600,
                    color: card.change === 'positive' ? '#A3BE8C' : '#BF616A',
                    fontSize: '0.75rem'
                  }}>
                    {card.trend}%
                  </Typography>
                  <Typography variant="caption" sx={{ 
                    color: '#4C566A',
                    fontSize: '0.75rem',
                    ml: 'auto'
                  }}>
                    Today: {card.prefix || ''}{card.todayValue}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Performance Chart */}
        <Grid item xs={12} lg={8}>
          <Card sx={{ 
            borderRadius: 2,
            border: '1px solid #E5E9F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
            height: '100%'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Box>
                  <Typography variant="h6" sx={{ 
                    fontWeight: 600, 
                    color: '#2E3440',
                    fontSize: '1.1rem',
                    mb: 0.5
                  }}>
                    Performance Overview
                  </Typography>
                  <Typography variant="body2" sx={{ 
                    color: '#4C566A',
                    fontSize: '0.85rem'
                  }}>
                    Weekly revenue and order trends
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 0.5 }}>
                  {['Day', 'Week', 'Month'].map((item) => (
                    <Chip
                      key={item}
                      label={item}
                      size="small"
                      variant={timeRange === item.toLowerCase() ? 'filled' : 'outlined'}
                      onClick={() => setTimeRange(item.toLowerCase())}
                      sx={{
                        bgcolor: timeRange === item.toLowerCase() ? '#5E81AC' : 'transparent',
                        color: timeRange === item.toLowerCase() ? 'white' : '#5E81AC',
                        fontSize: '0.75rem',
                        height: 28
                      }}
                    />
                  ))}
                </Box>
              </Box>
              
              <Box sx={{ height: 300, width: '100%' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#A3BE8C" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#A3BE8C" stopOpacity={0}/>
                      </linearGradient>
                      <linearGradient id="colorOrders" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#5E81AC" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#5E81AC" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#E5E9F0" />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#4C566A', fontSize: 12 }}
                    />
                    <YAxis 
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: '#4C566A', fontSize: 12 }}
                    />
                    <ChartTooltip 
                      contentStyle={{ 
                        borderRadius: 8,
                        background: 'white',
                        border: '1px solid #E5E9F0',
                        fontSize: '0.85rem'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      name="Revenue (₹)"
                      stroke="#A3BE8C" 
                      strokeWidth={2}
                      fill="url(#colorRevenue)" 
                      fillOpacity={0.8}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="prescriptions" 
                      name="Orders"
                      stroke="#5E81AC" 
                      strokeWidth={2}
                      fill="url(#colorOrders)" 
                      fillOpacity={0.8}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Distribution & Quick Stats */}
        <Grid item xs={12} lg={4}>
          <Stack spacing={3}>
            {/* Distribution Chart */}
            <Card sx={{ 
              borderRadius: 2,
              border: '1px solid #E5E9F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: '#2E3440',
                  fontSize: '1.1rem',
                  mb: 2
                }}>
                  Medicine Distribution
                </Typography>
                <Box sx={{ height: 200, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={70}
                        paddingAngle={1}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip 
                        contentStyle={{ 
                          borderRadius: 8,
                          background: 'white',
                          border: '1px solid #E5E9F0',
                          fontSize: '0.85rem'
                        }}
                      />
                    </RechartsPieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card sx={{ 
              borderRadius: 2,
              border: '1px solid #E5E9F0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: '#2E3440',
                  fontSize: '1.1rem',
                  mb: 2
                }}>
                  Quick Statistics
                </Typography>
                <Stack spacing={2}>
                  {quickStats.map((stat, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      p: 1.5,
                      borderRadius: 1.5,
                      bgcolor: '#F8FAFC',
                      border: '1px solid #E5E9F0'
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#4C566A',
                        fontSize: '0.85rem'
                      }}>
                        {stat.label}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" sx={{ 
                          fontWeight: 600, 
                          color: '#2E3440',
                          fontSize: '0.95rem'
                        }}>
                          {stat.value}
                        </Typography>
                        <Chip
                          label={stat.change}
                          size="small"
                          sx={{
                            bgcolor: alpha('#A3BE8C', 0.1),
                            color: '#A3BE8C',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: 20
                          }}
                        />
                      </Box>
                    </Box>
                  ))}
                </Stack>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={3}>
        {/* Stock Analysis */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 2,
            border: '1px solid #E5E9F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: '#2E3440',
                  fontSize: '1.1rem'
                }}>
                  Stock Levels
                </Typography>
                <Chip
                  icon={<Inventory sx={{ fontSize: 16 }} />}
                  label="Inventory"
                  size="small"
                  sx={{
                    bgcolor: alpha('#5E81AC', 0.1),
                    color: '#5E81AC',
                    fontSize: '0.75rem'
                  }}
                />
              </Box>

              <Stack spacing={2}>
                {stockData.map((item, index) => (
                  <Box key={index}>
                    <Box sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      mb: 1
                    }}>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 500, 
                        color: '#4C566A',
                        fontSize: '0.85rem'
                      }}>
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        fontWeight: 600, 
                        color: '#2E3440',
                        fontSize: '0.85rem'
                      }}>
                        {item.stock}%
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={item.stock} 
                      sx={{ 
                        height: 6,
                        borderRadius: 3,
                        bgcolor: '#E5E9F0',
                        '& .MuiLinearProgress-bar': {
                          bgcolor: item.stock < 50 ? '#EBCB8B' : '#88C0D0',
                          borderRadius: 3
                        }
                      }} 
                    />
                    <Typography variant="caption" sx={{ 
                      color: '#81A1C1',
                      fontSize: '0.75rem',
                      mt: 0.5,
                      display: 'block'
                    }}>
                      Low stock alert at {item.low}%
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card sx={{ 
            borderRadius: 2,
            border: '1px solid #E5E9F0',
            boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
          }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                mb: 3
              }}>
                <Typography variant="h6" sx={{ 
                  fontWeight: 600, 
                  color: '#2E3440',
                  fontSize: '1.1rem'
                }}>
                  Recent Activity
                </Typography>
                <IconButton size="small">
                  <MoreVert sx={{ fontSize: 20, color: '#4C566A' }} />
                </IconButton>
              </Box>

              <Stack spacing={2}>
                {activities.map((activity, index) => (
                  <Box key={index} sx={{ 
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 2,
                    p: 2,
                    borderRadius: 1.5,
                    bgcolor: index === 0 ? alpha('#5E81AC', 0.05) : 'transparent',
                    border: '1px solid',
                    borderColor: index === 0 ? alpha('#5E81AC', 0.2) : '#E5E9F0',
                    transition: 'all 0.2s',
                    '&:hover': {
                      bgcolor: alpha('#5E81AC', 0.03),
                      borderColor: alpha('#5E81AC', 0.3)
                    }
                  }}>
                    <Box sx={{
                      width: 32,
                      height: 32,
                      borderRadius: '8px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: alpha('#5E81AC', 0.1),
                      color: '#5E81AC',
                      fontSize: '0.9rem'
                    }}>
                      {index === 0 ? '📦' : index === 1 ? '💰' : index === 2 ? '👤' : '⚠️'}
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 0.5 }}>
                        <Typography variant="subtitle2" sx={{ 
                          fontWeight: 600, 
                          color: '#2E3440',
                          fontSize: '0.9rem'
                        }}>
                          {activity.title}
                        </Typography>
                        <Typography variant="caption" sx={{ 
                          color: '#81A1C1',
                          fontSize: '0.75rem'
                        }}>
                          {activity.time}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ 
                        color: '#4C566A',
                        fontSize: '0.85rem',
                        lineHeight: 1.4
                      }}>
                        {activity.description}
                      </Typography>
                    </Box>
                  </Box>
                ))}
              </Stack>

              <Button
                fullWidth
                variant="outlined"
                endIcon={<ArrowForward sx={{ fontSize: 16 }} />}
                sx={{
                  mt: 3,
                  color: '#5E81AC',
                  borderColor: '#5E81AC',
                  borderRadius: 1.5,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  py: 1,
                  '&:hover': {
                    borderColor: '#5E81AC',
                    bgcolor: alpha('#5E81AC', 0.05)
                  }
                }}
              >
                View All Activities
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

const LoadingSkeleton = ({ isMobile }) => (
  <Box sx={{ 
    p: { xs: 2, sm: 3, md: 4 },
    width: '100%',
    minHeight: '100vh',
    background: '#F8FAFC'
  }}>
    <Skeleton variant="text" width={200} height={40} sx={{ mb: 4, bgcolor: '#E5E9F0' }} />
    
    <Grid container spacing={2.5} sx={{ mb: 4 }}>
      {[...Array(6)].map((_, index) => (
        <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
          <Skeleton 
            variant="rounded" 
            height={140} 
            sx={{ 
              borderRadius: 2,
              bgcolor: '#E5E9F0'
            }} 
          />
        </Grid>
      ))}
    </Grid>

    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={12} lg={8}>
        <Skeleton variant="rounded" height={350} sx={{ borderRadius: 2, bgcolor: '#E5E9F0' }} />
      </Grid>
      <Grid item xs={12} lg={4}>
        <Stack spacing={3}>
          <Skeleton variant="rounded" height={250} sx={{ borderRadius: 2, bgcolor: '#E5E9F0' }} />
          <Skeleton variant="rounded" height={200} sx={{ borderRadius: 2, bgcolor: '#E5E9F0' }} />
        </Stack>
      </Grid>
    </Grid>

    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rounded" height={350} sx={{ borderRadius: 2, bgcolor: '#E5E9F0' }} />
      </Grid>
      <Grid item xs={12} md={6}>
        <Skeleton variant="rounded" height={350} sx={{ borderRadius: 2, bgcolor: '#E5E9F0' }} />
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
    background: '#F8FAFC'
  }}>
    <Box sx={{ 
      width: 120, 
      height: 120, 
      borderRadius: '50%', 
      bgcolor: '#E5E9F0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mb: 4
    }}>
      <MedicineIcon sx={{ fontSize: 60, color: '#5E81AC' }} />
    </Box>
    <Typography variant="h5" sx={{ 
      color: "#2E3440", 
      mb: 2, 
      fontWeight: 600,
      fontSize: '1.5rem'
    }}>
      Unable to Load Dashboard
    </Typography>
    <Typography variant="body1" sx={{ 
      color: '#4C566A', 
      mb: 4, 
      maxWidth: 400,
      fontSize: '0.95rem'
    }}>
      There was an error loading your dashboard data.
    </Typography>
    <Button 
      variant="contained"
      startIcon={<Refresh />}
      onClick={fetchData}
      sx={{ 
        bgcolor: '#5E81AC',
        borderRadius: 2,
        px: 4,
        py: 1,
        fontWeight: 500,
        fontSize: '0.95rem',
        '&:hover': {
          bgcolor: '#4C6A8C'
        }
      }}
    >
      Try Again
    </Button>
  </Box>
);

export default Dashboard;
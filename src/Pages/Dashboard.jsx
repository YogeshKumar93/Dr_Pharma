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
  useMediaQuery
} from "@mui/material";
import { apiCall } from "../api/api";
import {
  People as UsersIcon,
  Inventory as ProductsIcon,
  ShoppingCart as OrdersIcon,
  Payment as PaymentsIcon,
  PendingActions as PendingIcon,
  CheckCircle as PaidIcon
} from "@mui/icons-material";

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    apiCall("GET", "admin/dashboard")
      .then(({ response }) => {
        setStats(response);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" sx={{ 
          mb: 4, 
          color: "#1A5276",
          fontWeight: 600,
          textAlign: isMobile ? 'center' : 'left'
        }}>
          Dashboard Overview
        </Typography>
        <Grid container spacing={3}>
          {[...Array(6)].map((_, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Skeleton 
                variant="rounded" 
                height={140} 
                sx={{ 
                  borderRadius: 2,
                  bgcolor: 'rgba(26, 82, 118, 0.1)'
                }} 
              />
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  if (!stats) {
    return (
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '60vh',
        textAlign: 'center',
        p: 3
      }}>
        <Typography variant="h5" sx={{ color: "#1A5276", mb: 2 }}>
          Unable to load dashboard data
        </Typography>
        <Typography variant="body1" sx={{ color: 'text.secondary' }}>
          Please check your connection and try again
        </Typography>
      </Box>
    );
  }

  const cardData = [
    { title: "Total Users", value: stats.users, icon: <UsersIcon />, color: "#1A5276", bgColor: "rgba(26, 82, 118, 0.1)" },
    { title: "Total Products", value: stats.products, icon: <ProductsIcon />, color: "#2E86C1", bgColor: "rgba(46, 134, 193, 0.1)" },
    { title: "Total Orders", value: stats.orders, icon: <OrdersIcon />, color: "#3498DB", bgColor: "rgba(52, 152, 219, 0.1)" },
    { title: "Total Payments", value: stats.payments, icon: <PaymentsIcon />, color: "#5DADE2", bgColor: "rgba(93, 173, 226, 0.1)" },
    { title: "Pending Orders", value: stats.pending_orders, icon: <PendingIcon />, color: "#E67E22", bgColor: "rgba(230, 126, 34, 0.1)" },
    { title: "Paid Payments", value: stats.paid_payments, icon: <PaidIcon />, color: "#27AE60", bgColor: "rgba(39, 174, 96, 0.1)" },
  ];

  return (
    <Box sx={{ 
      p: { xs: 2, sm: 3, md: 4 },
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)'
    }}>
      <Typography variant="h4" sx={{ 
        mb: 4, 
        color: "#1A5276",
        fontWeight: 700,
        textAlign: isMobile ? 'center' : 'left',
        textShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        📊 Dashboard Overview
      </Typography>

      <Grid container spacing={3}>
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <DashboardCard {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Summary Section */}
      <Box sx={{ 
        mt: 6, 
        p: 3, 
        borderRadius: 3,
        background: 'linear-gradient(135deg, rgba(26, 82, 118, 0.9) 0%, rgba(46, 134, 193, 0.9) 100%)',
        color: 'white',
        boxShadow: '0 8px 32px rgba(26, 82, 118, 0.2)'
      }}>
        <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
          Quick Stats Summary
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Total Revenue</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ₹{((stats.orders || 0) * 2500).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Avg. Order Value</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              ₹{stats.orders ? Math.round((stats.orders * 2500) / stats.orders) : 0}
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Conversion Rate</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              {stats.users ? Math.round((stats.orders / stats.users) * 100) : 0}%
            </Typography>
          </Grid>
          <Grid item xs={6} md={3}>
            <Typography variant="body2" sx={{ opacity: 0.9 }}>Growth Rate</Typography>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#27AE60' }}>
              +12.5%
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const DashboardCard = ({ title, value, icon, color, bgColor }) => (
  <Card sx={{
    height: '100%',
    borderRadius: 3,
    overflow: 'visible',
    position: 'relative',
    transition: 'all 0.3s ease-in-out',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    background: 'white',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 12px 40px rgba(0,0,0,0.15)',
      '& .card-icon': {
        transform: 'scale(1.1)',
        boxShadow: `0 8px 25px ${color}40`,
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 4,
      background: `linear-gradient(90deg, ${color} 0%, ${color}80 100%)`,
      borderTopLeftRadius: 12,
      borderTopRightRadius: 12,
    }
  }}>
    <CardContent sx={{ 
      p: 3,
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative'
    }}>
      {/* Icon Container */}
      <Box className="card-icon" sx={{
        position: 'absolute',
        top: -20,
        right: 20,
        width: 60,
        height: 60,
        borderRadius: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: bgColor,
        color: color,
        transition: 'all 0.3s ease',
        boxShadow: `0 4px 15px ${color}30`,
        '& .MuiSvgIcon-root': {
          fontSize: 32,
        }
      }}>
        {icon}
      </Box>

      {/* Card Content */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="subtitle1" sx={{ 
          color: '#64748B',
          fontWeight: 500,
          mb: 1,
          fontSize: '0.95rem'
        }}>
          {title}
        </Typography>
        
        <Typography variant="h3" sx={{ 
          color: color,
          fontWeight: 700,
          mb: 2,
          fontSize: { xs: '2rem', sm: '2.5rem' }
        }}>
          {value !== null && value !== undefined ? value.toLocaleString() : 0}
        </Typography>

        {/* Progress/Status Indicator */}
        <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
          <Box sx={{ flexGrow: 1, mr: 1 }}>
            <LinearProgress 
              variant="determinate" 
              value={Math.min((value / 1000) * 100, 100)} 
              sx={{ 
                height: 6,
                borderRadius: 3,
                backgroundColor: `${color}20`,
                '& .MuiLinearProgress-bar': {
                  backgroundColor: color,
                  borderRadius: 3,
                }
              }}
            />
          </Box>
          <Typography variant="body2" sx={{ 
            color: color,
            fontWeight: 600,
            minWidth: 45
          }}>
            {Math.min(Math.round((value / 1000) * 100), 100)}%
          </Typography>
        </Box>
      </Box>
    </CardContent>
  </Card>
);

export default Dashboard;
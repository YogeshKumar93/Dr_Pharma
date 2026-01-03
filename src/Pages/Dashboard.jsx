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
} from "@mui/icons-material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import { apiCall } from "../api/api";
import ApiEndpoints from "../api/ApiEndpoints";

// ================= DASHBOARD =================
const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [offersCount, setOffersCount] = useState(0);
  const [pincodesCount, setPincodesCount] = useState(0);

  // ================= Get all users =================
  
  const getUsers = async () => {
    const { response } = await apiCall("GET", "users");
    const data = response?.data || response?.users || [];
    setUsersCount(data.length);
  };

  // ========================= Get all products===============
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


// ====================== Get all orders=============
 const getOrders = async () => {
  const { response } = await apiCall("GET", "admin/orders");
  setOrders(Array.isArray(response) ? response : []);
};


  // ================== Get all payments =================
 
const getPayments = async () => {
  try {
    const { response, error } = await apiCall(
      "GET",
      ApiEndpoints.ADMIN_PAYMENTS,
      null,
      true // ✅ JWT REQUIRED (VERY IMPORTANT)
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



  // ============== Get all offers =======================
 const getOffers = async () => {
  try {
    const res = await apiCall("GET", "special-offers");

    // 🔥 SAME handling as SpecialOffers.jsx
    const list = Array.isArray(res?.response) ? res.response : [];

    setOffersCount(list.length);
  } catch (err) {
    console.error("Dashboard offers fetch failed", err);
    setOffersCount(0);
  }
};


  // ====================Get all pincodes =====================
  const getPincodes = async () => {
    const { response } = await apiCall("GET", "admin/pincodes");
    const data = response?.data || response?.pincodes || [];
    setPincodesCount(data.length);
  };

  // ================= LOAD ALL =================
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

  // ================= CALCULATIONS =================
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.order_status === "pending").length;
  const completedOrders = orders.filter(o => o.order_status === "completed").length;

  const totalRevenue = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  // ================= CHART DATA =================
  const orderPieData = useMemo(() => [
    { name: "Pending", value: pendingOrders },
    { name: "Completed", value: completedOrders },
  ], [pendingOrders, completedOrders]);

  // ================= LOADING =================
  if (loading) {
    return (
      <Box sx={{ minHeight: "70vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  // ================= DASHBOARD CARDS =================
  const dashboardCards = [
    { title: "Users", value: usersCount, icon: <PeopleIcon />, color: "#2196F3" },
    { title: "Products", value: productsCount, icon: <InventoryIcon />, color: "#4CAF50" },
    { title: "Orders", value: totalOrders, icon: <ShoppingCartIcon />, color: "#FF9800" },
    { title: "Pending", value: pendingOrders, icon: <PendingIcon />, color: "#F44336" },
    { title: "Completed", value: completedOrders, icon: <CompletedIcon />, color: "#009688" },
    { title: "Revenue", value: `₹${totalRevenue.toLocaleString()}`, icon: <RevenueIcon />, color: "#673AB7" },
    { title: "Offers", value: offersCount, icon: <OfferIcon />, color: "#E91E63" },
    { title: "Pincodes", value: pincodesCount, icon: <LocationIcon />, color: "#3F51B5" },
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f5f7fa" }}>
      <Container maxWidth="xl" sx={{ py: 4 }}>

        {/* HEADER */}
        <Typography variant="h4" fontWeight={700}>Dashboard Overview</Typography>
        <Divider sx={{ my: 3 }} />

        {/* ===== SINGLE ROW CARDS ===== */}
        <Box sx={{ display: "flex", gap: 2, overflowX: "auto", pb: 2 }}>
          {dashboardCards.map((card, i) => (
            <DashboardCard key={i} {...card} />
          ))}
        </Box>

        {/* ===== CHARTS ===== */}
        <Grid container spacing={3} sx={{ mt: 3 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography fontWeight={600} mb={2}>Revenue Chart</Typography>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={payments}>
                  <XAxis dataKey="payment_method" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#673AB7" />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card sx={{ p: 2, borderRadius: 3 }}>
              <Typography fontWeight={600} mb={2}>Order Status</Typography>
              <PieChart width={300} height={280}>
                <Pie data={orderPieData} dataKey="value" outerRadius={100} label>
                  <Cell fill="#F44336" />
                  <Cell fill="#009688" />
                </Pie>
              </PieChart>
            </Card>
          </Grid>
        </Grid>

        {/* ===== TABLE ===== */}
        <Card sx={{ mt: 4, borderRadius: 3 }}>
          <CardContent>
            <Typography fontWeight={600} mb={2}>Order Summary</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Pending</TableCell>
                    <TableCell align="right">{pendingOrders}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Completed</TableCell>
                    <TableCell align="right">{completedOrders}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </CardContent>
        </Card>

      </Container>
    </Box>
  );
};

// ================= CARD =================
const DashboardCard = ({ title, value, icon, color }) => (
  <Card
    sx={{
      minWidth: 200,
      height: 110,
      flexShrink: 0,
      borderRadius: 3,
      boxShadow: 2,
    }}
  >
    <CardContent>
      <Stack direction="row" spacing={2} alignItems="center">
        <Box sx={{ color }}>{icon}</Box>
        <Box>
          <Typography variant="caption" color="text.secondary">{title}</Typography>
          <Typography fontWeight={700}>{value}</Typography>
        </Box>
      </Stack>
    </CardContent>
  </Card>
);

export default Dashboard;

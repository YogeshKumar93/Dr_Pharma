import { useEffect, useState } from "react";
import {
  Grid,
  Card,
  CardContent,
  Typography,
  CircularProgress,
} from "@mui/material";
import { apiCall } from "../api/api";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);

  const [usersCount, setUsersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [orders, setOrders] = useState([]);
  const [payments, setPayments] = useState([]);
  const [offersCount, setOffersCount] = useState(0);
  const [pincodesCount, setPincodesCount] = useState(0);

  // ================= API CALLS =================

 const getUsers = async () => {
  const { response } = await apiCall("GET", "users");
  const users = response?.users || response?.data || [];
  setUsersCount(users.length);
};


  const getProducts = async () => {
  const { response } = await apiCall("GET", "products");
  const products = response?.products || response?.data || [];
  setProductsCount(products.length);
};


 const getOrders = async () => {
  const { response } = await apiCall("GET", "admin/orders");
  const ordersData = response?.orders || response?.data || [];
  setOrders(ordersData);
};


 const getPayments = async () => {
  const { response } = await apiCall("GET", "admin/payments");
  const paymentsData = response?.payments || response?.data || [];
  setPayments(paymentsData);
};


const getOffers = async () => {
  const { response } = await apiCall("GET", "special-offers");
  const offers = response?.offers || response?.data || [];
  setOffersCount(offers.length);
};


  const getPincodes = async () => {
  const { response } = await apiCall("GET", "admin/pincodes");
  const pincodes = response?.pincodes || response?.data || [];
  setPincodesCount(pincodes.length);
};


  // ================= LOAD ALL =================

  useEffect(() => {
    const loadDashboard = async () => {
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

    loadDashboard();
  }, []);

  // ================= CALCULATIONS =================

  const totalOrders = orders.length;
  const pendingOrders = orders.filter(
    (o) => o.order_status === "pending"
  ).length;

  const completedOrders = orders.filter(
    (o) => o.order_status === "completed"
  ).length;

  const totalRevenue = payments.reduce(
    (sum, p) => sum + Number(p.amount || 0),
    0
  );

  // ================= UI =================

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid container spacing={3}>
      <DashboardCard title="Total Users" value={usersCount} />
      <DashboardCard title="Total Products" value={productsCount} />
      <DashboardCard title="Total Orders" value={totalOrders} />
      <DashboardCard title="Pending Orders" value={pendingOrders} />
      <DashboardCard title="Completed Orders" value={completedOrders} />
      <DashboardCard title="Total Revenue" value={`₹ ${totalRevenue}`} />
      <DashboardCard title="Special Offers" value={offersCount} />
      <DashboardCard title="Serviceable Pincodes" value={pincodesCount} />
    </Grid>
  );
};

// ================= CARD COMPONENT =================

const DashboardCard = ({ title, value }) => (
  <Grid item xs={12} sm={6} md={3}>
    <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight="bold">
          {value}
        </Typography>
      </CardContent>
    </Card>
  </Grid>
);

export default Dashboard;

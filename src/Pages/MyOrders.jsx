import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  CircularProgress,
  Box,
  Chip,
  Divider,
  Stack,
  Avatar,
  Paper,
  Button,
  IconButton,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  ShoppingBag as ShoppingBagIcon,
  CalendarToday as CalendarIcon,
  Payment as PaymentIcon,
  LocalShipping as ShippingIcon,
} from "@mui/icons-material";
import { apiCall } from "../api/api";
import { useAuth } from "../Contexts/AuthContext";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState(null);

  const { user, token } = useAuth();

  const toggleOrderDetails = (orderId) => {
    setExpandedOrder(expandedOrder === orderId ? null : orderId);
  };

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { response, error } = await apiCall("POST", "orders/myorders");

        if (error) {
          setOrders([]);
          return;
        }

        const ordersData =
          response?.data || response?.orders || response || [];
        setOrders(Array.isArray(ordersData) ? ordersData : []);
      } catch (err) {
        console.error(err);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMyOrders();
  }, []);

  const getStatusColor = (status) => {
    const statusColors = {
      completed: "success",
      pending: "warning",
      processing: "info",
      shipped: "primary",
      cancelled: "error",
      delivered: "success",
    };
    return statusColors[status] || "default";
  };

  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="60vh"
        flexDirection="column"
        gap={2}
      >
        <CircularProgress size={60} />
        <Typography variant="body1" color="text.secondary">
          Loading your orders...
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: -13, mb: 6,   }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
          bgcolor: "primary.main",
          color: "white",
          borderRadius: 2,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar
            sx={{
              bgcolor: "white",
              color: "primary.main",
              width: 56,
              height: 56,
            }}
          >
            <ShoppingBagIcon fontSize="large" />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              My Orders
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Track and manage all your orders in one place
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Orders Count and Summary */}
      <Box sx={{ mb: 4 }}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          sx={{ mb: 2 }}
        >
          <Typography variant="h6">
            Total Orders:{" "}
            <Typography
              component="span"
              variant="h6"
              color="primary"
              fontWeight="bold"
            >
              {orders.length}
            </Typography>
          </Typography>
          <Chip
            icon={<CalendarIcon />}
            label={`Last updated: ${new Date().toLocaleDateString("en-IN", {
              hour: "2-digit",
              minute: "2-digit",
            })}`}
            variant="outlined"
            size="small"
          />
        </Stack>
        <Divider />
      </Box>

      {orders.length === 0 ? (
        <Paper
          elevation={0}
          sx={{
            p: 8,
            textAlign: "center",
            bgcolor: "grey.50",
            borderRadius: 2,
          }}
        >
          <ShoppingBagIcon
            sx={{ fontSize: 80, color: "grey.400", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Orders Found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            You haven't placed any orders yet.
          </Typography>
          <Button variant="contained" href="/">
            Start Shopping
          </Button>
        </Paper>
      ) : (
        <Grid container spacing={3}>
          {orders.map((order) => (
            <Grid item xs={12} key={order.id}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 2,
                  overflow: "hidden",
                  "&:hover": {
                    boxShadow: 4,
                  },
                }}
              >
                {/* Order Header */}
                <CardContent
                  sx={{
                    bgcolor: "grey.50",
                    borderBottom: "1px solid",
                    borderColor: "divider",
                  }}
                >
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} md={6}>
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Avatar
                          sx={{
                            bgcolor: "primary.light",
                            color: "primary.contrastText",
                          }}
                        >
                          #{order.order_number?.slice(-4) || "0000"}
                        </Avatar>
                        <Box>
                          <Typography variant="subtitle1" fontWeight="bold">
                            Order #{order.order_number}
                          </Typography>
                          {order.created_at && (
                            <Typography
                              variant="caption"
                              color="text.secondary"
                              display="flex"
                              alignItems="center"
                              gap={0.5}
                            >
                              <CalendarIcon fontSize="inherit" />
                              {formatDate(order.created_at)}
                            </Typography>
                          )}
                        </Box>
                      </Stack>
                    </Grid>

                    <Grid item xs={12} md={6}>
                      <Stack
                        direction={{ xs: "column", sm: "row" }}
                        spacing={2}
                        justifyContent="space-between"
                        alignItems={{ xs: "flex-start", sm: "center" }}
                      >
                        <Chip
                          label={order.order_status?.toUpperCase()}
                          color={getStatusColor(order.order_status)}
                          size="medium"
                          sx={{ fontWeight: "bold" }}
                        />
                        <Typography variant="h6" color="primary.main">
                          ₹{order.total_amount?.toLocaleString("en-IN")}
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>
                </CardContent>

                {/* Order Summary */}
                <CardContent>
                  <Stack
                    direction={{ xs: "column", md: "row" }}
                    spacing={3}
                    justifyContent="space-between"
                  >
                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Payment Method
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <PaymentIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {order.payment_method || "Credit Card"}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Shipping Status
                      </Typography>
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <ShippingIcon fontSize="small" color="action" />
                        <Typography variant="body2">
                          {order.shipping_status || "Processing"}
                        </Typography>
                      </Stack>
                    </Stack>

                    <Stack spacing={1}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Items
                      </Typography>
                      <Typography variant="body2">
                        {order.items_count || order.items?.length || "N/A"}{" "}
                        items
                      </Typography>
                    </Stack>
                  </Stack>

                  {/* Expandable Details Section */}
                  <Box sx={{ mt: 3 }}>
                    <Button
                      fullWidth
                      variant="outlined"
                      endIcon={
                        expandedOrder === order.id ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        )
                      }
                      onClick={() => toggleOrderDetails(order.id)}
                      sx={{ justifyContent: "space-between" }}
                    >
                      View Details
                    </Button>

                    <Collapse in={expandedOrder === order.id} timeout="auto">
                      <Box sx={{ mt: 3 }}>
                        <Divider sx={{ mb: 2 }} />

                        {/* Order Items Table */}
                        {order.items && order.items.length > 0 ? (
                          <TableContainer component={Paper} variant="outlined">
                            <Table size="small">
                              <TableHead>
                                <TableRow>
                                  <TableCell>Product</TableCell>
                                  <TableCell align="center">Quantity</TableCell>
                                  <TableCell align="right">Price</TableCell>
                                  <TableCell align="right">Total</TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody>
                                {order.items.map((item, index) => (
                                  <TableRow key={index}>
                                    <TableCell>
                                      <Typography variant="body2">
                                        {item.name || `Item ${index + 1}`}
                                      </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                      {item.quantity || 1}
                                    </TableCell>
                                    <TableCell align="right">
                                      ₹{item.price || 0}
                                    </TableCell>
                                    <TableCell align="right">
                                      ₹
                                      {(
                                        (item.price || 0) *
                                        (item.quantity || 1)
                                      ).toLocaleString("en-IN")}
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </TableContainer>
                        ) : (
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            align="center"
                            sx={{ py: 2 }}
                          >
                            No item details available
                          </Typography>
                        )}

                        {/* Order Summary */}
                        <Paper
                          elevation={0}
                          sx={{
                            p: 2,
                            mt: 2,
                            bgcolor: "grey.50",
                            borderRadius: 1,
                          }}
                        >
                          <Grid container justifyContent="flex-end">
                            <Grid item xs={12} sm={6} md={4}>
                              <Stack spacing={1}>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="body2">
                                    Subtotal
                                  </Typography>
                                  <Typography variant="body2">
                                    ₹
                                    {order.subtotal?.toLocaleString("en-IN") ||
                                      "N/A"}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="body2">
                                    Shipping
                                  </Typography>
                                  <Typography variant="body2">
                                    ₹{order.shipping_cost || "Free"}
                                  </Typography>
                                </Stack>
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="body2">Tax</Typography>
                                  <Typography variant="body2">
                                    ₹{order.tax || "N/A"}
                                  </Typography>
                                </Stack>
                                <Divider />
                                <Stack
                                  direction="row"
                                  justifyContent="space-between"
                                >
                                  <Typography variant="subtitle1" fontWeight="bold">
                                    Total
                                  </Typography>
                                  <Typography
                                    variant="subtitle1"
                                    fontWeight="bold"
                                    color="primary"
                                  >
                                    ₹
                                    {order.total_amount?.toLocaleString(
                                      "en-IN"
                                    )}
                                  </Typography>
                                </Stack>
                              </Stack>
                            </Grid>
                          </Grid>
                        </Paper>

                        {/* Action Buttons */}
                        <Stack
                          direction="row"
                          spacing={2}
                          justifyContent="flex-end"
                          sx={{ mt: 3 }}
                        >
                          <Button
                            variant="outlined"
                            size="small"
                            disabled={order.order_status === "cancelled"}
                          >
                            Cancel Order
                          </Button>
                          <Button variant="contained" size="small">
                            Track Order
                          </Button>
                          <Button variant="outlined" size="small">
                            Download Invoice
                          </Button>
                        </Stack>
                      </Box>
                    </Collapse>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      
    </Container>
  );
};

export default MyOrders;
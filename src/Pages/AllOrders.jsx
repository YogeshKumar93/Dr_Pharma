import { useEffect, useState } from "react";
import { Box, Chip, TextField, MenuItem } from "@mui/material";
import { apiCall } from "../api/api";
import CommonTable from "../Common/CommonTable";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch all admin orders
  const fetchOrders = () => {
    setLoading(true);
    apiCall("GET", "admin/orders").then(({ response }) => {
      setOrders(response || []);
      setLoading(false);
    });
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // 🔹 Update order status
  const updateOrderStatus = (order_id, status) => {
    apiCall("POST", "admin/orders/update-status", {
      order_id,
      order_status: status,
    }).then(() => {
      fetchOrders(); // refresh table
    });
  };

  // 🔹 Table columns
  const columns = [
    {
      headerName: "Order No",
      field: "order_number",
    },
    {
      headerName: "User ID",
      field: "user_id",
    },
    {
      headerName: "Total Amount",
      field: "total_amount",
      render: (value) => `₹${value}`,
    },
    {
      headerName: "Payment Method",
      field: "payment_method",
      render: (value) => (
        <Chip label={value} size="small" color="info" />
      ),
    },
    {
      headerName: "Payment Status",
      field: "payment_status",
      render: (value) => (
        <Chip
          label={value}
          size="small"
          color={value === "paid" ? "success" : "warning"}
        />
      ),
    },
    {
      headerName: "Order Status",
      field: "order_status",
      render: (value, row) => (
        <TextField
          select
          size="small"
          value={value}
          onChange={(e) =>
            updateOrderStatus(row.id, e.target.value)
          }
          sx={{ minWidth: 140 }}
        >
          <MenuItem value="pending">Pending</MenuItem>
          <MenuItem value="confirmed">Confirmed</MenuItem>
          <MenuItem value="shipped">Shipped</MenuItem>
          <MenuItem value="delivered">Delivered</MenuItem>
          <MenuItem value="cancelled">Cancelled</MenuItem>
        </TextField>
      ),
    },
    {
      headerName: "Created At",
      field: "created_at",
      render: (value) =>
        new Date(value).toLocaleDateString(),
    },
  ];

  return (
    <Box p={2}>
      <CommonTable
        columns={columns}
        rows={orders}
        loading={loading}
      />
    </Box>
  );
};

export default AllOrders;

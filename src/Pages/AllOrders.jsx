import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Chip,
  TextField,
  MenuItem,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { apiCall } from "../api/api";
import CommonTable from "../Common/CommonTable";
import EditOrder from "./EditOrder";
import AddOrder from "./AddOrder";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addOpen, setAddOpen] = useState(false);
const [editOpen, setEditOpen] = useState(false);
const [selectedOrder, setSelectedOrder] = useState(null);

 // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

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
    }).then(fetchOrders);
  };

   /* -------------------- PAGINATED DATA -------------------- */
    const paginatedOrders = useMemo(() => {
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      return orders.slice(start, end);
    }, [orders, page, rowsPerPage]);

  /* -------------------- ACTION HANDLERS -------------------- */

 const handleEdit = (row) => {
  setSelectedOrder(row);
  setEditOpen(true);
};

  const handleDelete = (row) => {
    const confirmDelete = window.confirm(
      `Delete order ${row.order_number}?`
    );

    if (!confirmDelete) return;

    apiCall("POST", "admin/orders/delete", {
      order_id: row.id,
    }).then(fetchOrders);
  };

  /* -------------------- COLUMNS -------------------- */
  const columns = [
    { headerName: "Order No", field: "order_number" },
    { headerName: "User ID", field: "user_id" },
    {
      headerName: "Total",
      field: "total_amount",
      render: (v) => `₹${v}`,
    },
    {
      headerName: "Payment",
      field: "payment_method",
      render: (v) => <Chip label={v} size="small" color="info" />,
    },
    {
      headerName: "Pay Status",
      field: "payment_status",
      render: (v) => (
        <Chip
          label={v}
          size="small"
          color={v === "paid" ? "success" : "warning"}
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
      headerName: "Created",
      field: "created_at",
      render: (v) => new Date(v).toLocaleDateString(),
    },
  ];

  /* -------------------- ACTION COLUMN -------------------- */
  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={() => handleEdit(row)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton size="small" color="error" onClick={() => handleDelete(row)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  /* -------------------- Common Table -------------------- */
  return (
    <Box sx={{p:1, mb:4}}>
      

      <CommonTable
        columns={columns}
        rows={paginatedOrders}
        loading={loading}
        actions={actions}
        onRefresh={fetchOrders} 
        serverPagination
        page={page}
        rowsPerPage={rowsPerPage}
          totalCount={orders.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        topActions={
             <Button
          variant="contained"
          sx={{
            backgroundColor: "#1A5276",
            "&:hover": { backgroundColor: "#154360" },
          }}
         onClick={()=>setAddOpen(true)}
        >
          Add Order
        </Button>
        }
      />

      <AddOrder
  open={addOpen}
  handleClose={() => setAddOpen(false)}
  onFetchRef={fetchOrders}
/>

<EditOrder
  open={editOpen}
  handleClose={() => setEditOpen(false)}
  order={selectedOrder}
  onFetchRef={fetchOrders}
/>

    </Box>
  );
};

export default AllOrders;

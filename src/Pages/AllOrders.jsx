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
const [prescriptionOpen, setPrescriptionOpen] = useState(false);
const [orderItems, setOrderItems] = useState([]);
const [previewImage, setPreviewImage] = useState(null);


 // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // 🔹 FILTER STATE
const [filters, setFilters] = useState({
  order_number: "",
  payment_method: "",
  order_status: "",
});


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

  const handleViewPrescription = (orderId) => {
  apiCall("POST", "admin/order/detail", {
    order_id: orderId,
  }).then(({ response }) => {
    console.log("ORDER ITEMS 👉", response.items);
    setOrderItems(response.items || []);
    setPrescriptionOpen(true);
  });
};

/* -------------------- FILTERED DATA -------------------- */
const filteredOrders = useMemo(() => {
  return orders.filter((order) => {

    // Order No filter
    if (
      filters.order_number &&
      !order.order_number
        ?.toLowerCase()
        .includes(filters.order_number.toLowerCase())
    ) {
      return false;
    }

    // Payment Method filter
    if (
      filters.payment_method &&
      order.payment_method !== filters.payment_method
    ) {
      return false;
    }

    // Order Status filter
    if (
      filters.order_status &&
      order.order_status !== filters.order_status
    ) {
      return false;
    }

    return true;
  });
}, [orders, filters]);

   /* -------------------- PAGINATED DATA -------------------- */
    const paginatedOrders = useMemo(() => {
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredOrders.slice(start, end);
}, [filteredOrders, page, rowsPerPage]);


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

  /* -------------------- FILTER CONFIG -------------------- */
const filtersConfig = [
  {
    type: "text",
    name: "order_number",
    label: "Order No",
  },
  {
    type: "dropdown",
    name: "payment_method",
    label: "Payment Method",
    options: [
      { label: "COD", value: "cod" },
      { label: "Online", value: "online" },
    ],
  },
  {
    type: "dropdown",
    name: "order_status",
    label: "Order Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Confirmed", value: "confirmed" },
      { label: "Shipped", value: "shipped" },
      { label: "Delivered", value: "delivered" },
      { label: "Cancelled", value: "cancelled" },
    ],
  },
];


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
          sx={{ minWidth: 120 }}
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
   {
  headerName: "Prescription",
  render: (_, row) => {
    const hasPrescription = row.items?.some(
      (i) => i.prescription_file
    );

    return hasPrescription ? (
      <Button
        size="small"
        variant="outlined"
        onClick={() => handleViewPrescription(row.id)}
      >
        View
      </Button>
    ) : (
      <Chip label="N/A" size="small" />
    );
  },
}


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
         filtersConfig={filtersConfig}
  filters={filters}
  onFiltersChange={(newFilters) => {
    setFilters(newFilters);
    setPage(0); // filter change pe page reset
  }}
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

{prescriptionOpen && (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.4)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
    onClick={() => setPrescriptionOpen(false)}
  >
    <Box
      sx={{ background: "#fff", p: 2, borderRadius: 2, maxWidth: 500 }}
      onClick={(e) => e.stopPropagation()}
    >
      <h3>Prescription Images</h3>

      {orderItems.map(
        (item) =>
          item.prescription_file && (
           <img
  key={item.id}
  src={`http://localhost:8000/${item.prescription_file}`}
  alt="Prescription"
 onClick={(e) => {
  e.stopPropagation(); // ⭐ VERY IMPORTANT
  setPreviewImage(`http://localhost:8000/${item.prescription_file}`);
}}

  style={{
    width: 120,
    height: 120,
    objectFit: "cover",
    marginRight: 10,
    marginBottom: 10,
    border: "1px solid #ccc",
    cursor: "pointer",
  }}
/>

          )
      )}

      {orderItems.every((i) => !i.prescription_file) && (
        <p>No prescription uploaded</p>
      )}

      <Box sx={{ textAlign: "right" }}>
        <Button onClick={() => setPrescriptionOpen(false)}>Close</Button>
      </Box>
    </Box>
  </Box>
)}

{previewImage && (
  <Box
    sx={{
      position: "fixed",
      inset: 0,
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 10000,
    }}
    onClick={() => setPreviewImage(null)}
  >
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        maxWidth: "90%",
        maxHeight: "90%",
      }}
    >
      <img
        src={previewImage}
        alt="Full Prescription"
        style={{
          width: "100%",
          height: "auto",
          borderRadius: 8,
          boxShadow: "0 0 20px rgba(0,0,0,0.5)",
        }}
      />
    </Box>
  </Box>
)}


    </Box>
  );
};

export default AllOrders;

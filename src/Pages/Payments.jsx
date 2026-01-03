import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Select,
  MenuItem,
  Typography,
  Chip,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";

import CommonTable from "../Common/CommonTable";
import { apiCall } from "../api/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ApiEndpoints from "../api/apiendpoints";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [filters, setFilters] = useState({
  orderId: "",
  user: "",
  payment_status: "",
  payment_method: "",
});


  /* -------------------- FETCH PAYMENTS -------------------- */
 const fetchPayments = async () => {
  console.log("fetchPayments called");
  try {
    setLoading(true);

    const { response, error } = await apiCall(
      "GET",
      ApiEndpoints.ADMIN_PAYMENTS,
      null,
      true // ✅ JWT REQUIRED
    );

    if (error) {
      console.error(error);
      return;
    }

    setPayments(Array.isArray(response) ? response : []);
  } catch (err) {
    console.error("Fetch payments failed", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
     console.log("Payments page mounted");
    fetchPayments();
  }, []);

  /* -------------------- UPDATE STATUS -------------------- */
  const updateStatus = async (id, status) => {
    try {
      await apiCall("POST", "admin/payments/update-status", {
        payment_id: id,
        payment_status: status,
      });

      setPayments((prev) =>
        prev.map((p) =>
          p.id === id ? { ...p, payment_status: status } : p
        )
      );
    } catch (err) {
      console.error("Update status failed", err);
    }
  };

  /* -------------------- STATUS CHIP COLOR -------------------- */
  const statusColor = (status) => {
    if (status === "paid") return "success";
    if (status === "failed") return "error";
    return "warning";
  };

  const filtersConfig = [
  {
    type: "text",
    name: "orderId",
    label: "Order ID",
  },
  {
    type: "text",
    name: "user",
    label: "User Name / Email",
  },
  {
    type: "dropdown",
    name: "payment_status",
    label: "Payment Status",
    options: [
      { label: "Pending", value: "pending" },
      { label: "Paid", value: "paid" },
      { label: "Failed", value: "failed" },
    ],
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
];
// ================= filters=======================
const filteredPayments = useMemo(() => {
  return payments.filter((p) => {
    // Filter by Order ID
    if (filters.orderId && !p.order_id.toString().includes(filters.orderId)) {
      return false;
    }

    // Filter by User
    const userName = p?.order?.user?.name?.toLowerCase() || "";
    const userEmail = p?.order?.user?.email?.toLowerCase() || "";
    if (filters.user && !userName.includes(filters.user.toLowerCase()) && !userEmail.includes(filters.user.toLowerCase())) {
      return false;
    }

    // Filter by Payment Status
    if (filters.payment_status && p.payment_status !== filters.payment_status) {
      return false;
    }

    // Filter by Payment Method
    if (filters.payment_method && p.payment_method !== filters.payment_method) {
      return false;
    }

    return true;
  });
}, [payments, filters]);

  /* -------------------- PAGINATED DATA -------------------- */
 const paginatedPayments = useMemo(() => {
  const start = page * rowsPerPage;
  const end = start + rowsPerPage;
  return filteredPayments.slice(start, end);
}, [filteredPayments, page, rowsPerPage]);


  /* -------------------- COLUMNS -------------------- */
 const columns = useMemo(() => [
  { headerName: "ID", field: "id", width: "60px" },

  { headerName: "Order ID", field: "order_id" },

  {
    headerName: "User",
    render: (_, row) => (
      <Box>
        <Typography fontSize={13} fontWeight={600}>
          {row?.order?.user?.name}
        </Typography>
        <Typography fontSize={11} color="text.secondary">
          {row?.order?.user?.email}
        </Typography>
      </Box>
    ),
  },

  {
    headerName: "Amount",
    field: "amount",
    render: (v) => `₹ ${v}`,
  },

  {
    headerName: "Method",
    field: "payment_method",
    render: (v) => (
      <Chip
        label={v?.toUpperCase()}
        color={v === "cod" ? "warning" : "primary"}
        size="small"
      />
    ),
  },

  {
    headerName: "Txn ID",
    field: "transaction_id",
    render: (v, row) =>
      row.payment_method === "online" ? v || "-" : "COD",
  },

  {
    headerName: "Payment Status",
    field: "payment_status",
    render: (v, row) => (
      <Select
        size="small"
        value={v}
        onChange={(e) => updateStatus(row.id, e.target.value)}
      >
        <MenuItem value="pending">Pending</MenuItem>
        <MenuItem value="paid">Paid</MenuItem>
        <MenuItem value="failed">Failed</MenuItem>
      </Select>
    ),
  },

  {
    headerName: "Order Status",
    render: (_, row) => (
      <Chip
        label={row?.order?.status}
        color={row?.order?.status === "confirmed" ? "success" : "default"}
        size="small"
      />
    ),
  },

  {
    headerName: "Date",
    field: "created_at",
    render: (v) => new Date(v).toLocaleDateString("en-GB"),
  },
], []);


   /* -------------------- ACTIONS -------------------- */
  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={()=>handleEdit(row)} >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

    <Tooltip title="Delete">
  <IconButton
    size="small"
    color="error"
    onClick={() => handleDelete(row)}
  >
    <DeleteIcon fontSize="small" />
  </IconButton>
</Tooltip>

    </Box>
  );

  /* -------------------- UI -------------------- */
  return (
    <Box sx={{ p: 1, mb:4 }}>
      

      <CommonTable
        columns={columns}
        rows={paginatedPayments}
        loading={loading}
         actions={actions}
          filtersConfig={filtersConfig}
  filters={filters}
  onFiltersChange={(newFilters) => {
    setFilters(newFilters);
    setPage(0); // Reset page on filter change
  }}
        serverPagination
        page={page}
        rowsPerPage={rowsPerPage}
        onRefresh={fetchPayments}
        totalCount={filteredPayments.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        topActions={
           <Button 
        
        variant="contained"
        //  onClick={() => setAddOpen(true)}
           sx={{
              backgroundColor: "#1A5276",
      "&:hover": {
        backgroundColor: "#154360",
      },
           }} 
         >
          Payment
        </Button>
        }
      />
    </Box>
  );
};

export default Payments;

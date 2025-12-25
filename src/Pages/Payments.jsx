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

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------- FETCH PAYMENTS -------------------- */
  const fetchPayments = async () => {
    try {
      setLoading(true);
      const { response } = await apiCall("GET", "admin/payments");
      setPayments(Array.isArray(response) ? response : []);
    } catch (err) {
      console.error("Fetch payments failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
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

  /* -------------------- PAGINATED DATA -------------------- */
  const paginatedPayments = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return payments.slice(start, end);
  }, [payments, page, rowsPerPage]);

  /* -------------------- COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id", width: "60px" },

      { headerName: "Order ID", field: "order_id" },

      { headerName: "User ID", field: "user_id" },

      {
        headerName: "Amount",
        field: "amount",
        render: (value) => `₹ ${value}`,
      },

      {
        headerName: "Method",
        field: "payment_method",
        render: (value) => (
          <strong style={{ textTransform: "uppercase" }}>{value}</strong>
        ),
      },

      {
        headerName: "Transaction ID",
        field: "transaction_id",
        render: (value) => value || "-",
      },

      {
        headerName: "Status",
        field: "payment_status",
        render: (value, row) => (
          <Select
            size="small"
            value={value}
            onChange={(e) => updateStatus(row.id, e.target.value)}
          >
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="paid">Paid</MenuItem>
            <MenuItem value="failed">Failed</MenuItem>
          </Select>
        ),
      },

      {
        headerName: "Created",
        field: "created_at",
        render: (value) =>
          value ? new Date(value).toLocaleDateString("en-GB") : "-",
      },

      {
        headerName: "Updated",
        field: "updated_at",
        render: (value) =>
          value ? new Date(value).toLocaleDateString("en-GB") : "-",
      },
    ],
    []
  );

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
        serverPagination
        page={page}
        rowsPerPage={rowsPerPage}
        onRefresh={fetchPayments}
        totalCount={payments.length}
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

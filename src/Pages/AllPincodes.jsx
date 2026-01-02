import React, { useEffect, useState, useMemo } from "react";
import { Box, Button, IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import CommonTable from "../Common/CommonTable";
import AddPincode from "./AddPincode";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";


const AllPincodes = () => {
  const [pincodes, setPincodes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

   const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

  /* ---------------- FETCH PINCODES ---------------- */
  const fetchPincodes = async () => {   

  setLoading(true);

    const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found. Login first.");
    setLoading(false);
    return;
  }

  const { response, error } = await apiCall(
    "GET",
     "admin/pincodes"
  );
  console.log({ response, error });

  if (response) {
    setPincodes(response?.data?.data || response?.data || response || []);
  }

  setLoading(false);
};


  useEffect(() => {
    fetchPincodes();
  }, []);

/* -------------------- PAGINATED DATA -------------------- */
  const paginatedPincodes = useMemo(() => {
      const start = page * rowsPerPage;
      const end = start + rowsPerPage;
      return pincodes.slice(start, end);
    }, [pincodes, page, rowsPerPage]);
  /* ---------------- DELETE ---------------- */
  const handleDelete = async (row) => {
    if (!window.confirm(`Delete pincode ${row.pincode}?`)) return;

    const { error } = await apiCall(
      "POST",
      "admin/pincodes/delete",
      { id: row.id }
    );

    if (!error) fetchPincodes();
  };

  /* ---------------- TABLE COLUMNS ---------------- */
  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id", width: "60px" },
      { headerName: "Pincode", field: "pincode" },
      { headerName: "City", field: "city" },
      { headerName: "State", field: "state" },
      { headerName: "Is Active", field: "is_active" },
      {
        headerName: "Created",
        field: "created_at",
        render: (v) =>
          v ? new Date(v).toLocaleDateString("en-GB") : "-"
      },
      {
        headerName: "Updated",
        field: "updated_at",
        render: (v) =>
          v ? new Date(v).toLocaleDateString("en-GB") : "-"
      },
    ],
    []
  );

  /* ---------------- ACTIONS ---------------- */
  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary">
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

  /* ---------------- UI ---------------- */
  return (
    <Box sx={{ p: 1 }}>
      <CommonTable
        columns={columns}
        rows={paginatedPincodes}
        loading={loading}
        actions={actions}
        serverPagination
         page={page}
        rowsPerPage={rowsPerPage}
         onRefresh={fetchPincodes} 
        totalCount={pincodes.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        topActions={
          <Button
            variant="contained"
            onClick={() => setAddOpen(true)}
          >
            Add Pincode
          </Button>
        }
      />

      <AddPincode
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        onFetchRef={fetchPincodes}
      />
    </Box>
  );
};

export default AllPincodes;

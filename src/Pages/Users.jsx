import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
  Chip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { BASE_URL } from "../api/config";
import CommonTable from "../Common/CommonTable";
import EditUser from "./EditUsers";
import AddUser from "./AddUser";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
const [selectedUser, setSelectedUser] = useState(null);
const [addOpen, setAddOpen] = useState(false);



  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------- API CALL -------------------- */
  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}users`);
      const data = await res.json();

      const list = data?.data || data?.users || data || [];
      setUsers(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch users failed", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

// ------------------ ADD USER -------------------- */
  const handleAddClose = () => {
  setAddOpen(false);
};


// * -------------------- EDIT USER -------------------- */
  const handleEdit = (row) => {
  setSelectedUser(row);
  setEditOpen(true);
};

const handleModalClose = () => {
  setEditOpen(false);
  setSelectedUser(null);
};


  /* -------------------- DELETE USER -------------------- */
  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete "${row.name}"?`
    );

    if (!confirmDelete) return;

    try {
      await fetch(`${BASE_URL}users/delete`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: row.id,
        }),
      });

      fetchUsers();
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete user");
    }
  };

  /* -------------------- PAGINATED DATA -------------------- */
  const paginatedUsers = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return users.slice(start, end);
  }, [users, page, rowsPerPage]);

  /* -------------------- COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id", width: "60px" },

      {
        headerName: "Name",
        field: "name",
        render: (value) => <strong>{value}</strong>,
      },

      {
        headerName: "Email",
        field: "email",
        render: (value) => (
          <span style={{ color: "#1A5276" }}>{value}</span>
        ),
      },

      {
        headerName: "Status",
        field: "status",
        render: (value) =>
          value ? (
            <Chip label="Active" color="success" size="small" />
          ) : (
            <Chip label="Inactive" color="default" size="small" />
          ),
      },

      {
        headerName: "Address",
        field: "address",
        render: (value) => (
          <div
            style={{
              maxWidth: 220,
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value || "-"}
          </div>
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
  <IconButton
    size="small"
    color="primary"
    onClick={() => handleEdit(row)}
  >
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
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: "flex", justifyContent: "flex-end", mb: 2 }}>
        <Button
          variant="contained"
          onClick={()=> setAddOpen(true)}
          sx={{
            backgroundColor: "#1A5276",
            "&:hover": {
              backgroundColor: "#154360",
            },
          }}
        >
          Add User
        </Button>
      </Box>

      <CommonTable
        columns={columns}
        rows={paginatedUsers}
        loading={loading}
        actions={actions}
        serverPagination
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={users.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />

      <EditUser
        open={editOpen}
        onClose={handleModalClose}
        user={selectedUser}
        onFetchRef={fetchUsers}
      />

      <AddUser 
        open={addOpen}
  onClose={handleAddClose}
  // onFetchRef={fetchUsers}
      />
    </Box>
  );
};

export default Users;

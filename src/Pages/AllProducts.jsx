import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  IconButton,
  Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { BASE_URL } from "../api/config";
import CommonTable from "../Common/CommonTable";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // 🔹 Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------- API CALL -------------------- */
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}products`);
      const data = await res.json();

      const list = data?.data || data?.products || data || [];
      setProducts(Array.isArray(list) ? list : []);
    } catch (err) {
      console.error("Fetch products failed", err);
    } finally {
      setLoading(false);
    }
  };

  const deleteProduct = async (row) => {
    if (!window.confirm("Delete this product?")) return;

    try {
      await fetch(`${BASE_URL}products/${row.id}`, {
        method: "DELETE",
      });
      fetchProducts();
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  const editProduct = (row) => {
    setSelectedProduct(row);
    console.log("Edit product:", row);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /* -------------------- PAGINATED DATA -------------------- */
  const paginatedProducts = useMemo(() => {
    const start = page * rowsPerPage;
    const end = start + rowsPerPage;
    return products.slice(start, end);
  }, [products, page, rowsPerPage]);

  /* -------------------- COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id", width: "60px" },
      {
        headerName: "Title",
        field: "title",
        render: (value) => <strong>{value}</strong>,
      },
      {
        headerName: "Description",
        field: "description",
        render: (value) => (
          <div
            style={{
              maxWidth: "220px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </div>
        ),
      },
      {
        headerName: "Price",
        field: "price",
        render: (value) => `₹ ${value}`,
      },
      {
        headerName: "Image",
        field: "image",
        render: (value, row) =>
          value ? <img src={value} alt={row.title} width={50} /> : "N/A",
      },
      {
        headerName: "Created",
        field: "created_at",
        render: (value) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },
      {
        headerName: "Updated",
        field: "updated_at",
        render: (value) =>
          value ? new Date(value).toLocaleDateString() : "-",
      },
    ],
    []
  );

  /* -------------------- ACTIONS -------------------- */
  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Edit">
        <IconButton size="small" color="primary" onClick={() => editProduct(row)}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Delete">
        <IconButton size="small" color="error" onClick={() => deleteProduct(row)}>
          <DeleteIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </Box>
  );

  /* -------------------- UI -------------------- */
  return (
    <Box sx={{ p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <h2>All Products</h2>
        <Button variant="contained">Add Product</Button>
      </Box>

      <CommonTable
        columns={columns}
        rows={paginatedProducts}   // 🔹 paginated data
        loading={loading}
        actions={actions}
        serverPagination={true}
        page={page}
        rowsPerPage={rowsPerPage}
        totalCount={products.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
      />
    </Box>
  );
};

export default AllProducts;

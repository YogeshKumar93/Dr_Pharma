import React, { useEffect, useState } from "react";
import { Box, Button, Chip } from "@mui/material";
// import CommonTable from "../components/CommonTable"; // adjust path
import { BASE_URL } from "../api/config";
import CommonTable from "../Common/CommonTable";

const AllProducts = () => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}products`);
      const data = await res.json();

      const list = data?.data || data?.products || data || [];
      setRows(Array.isArray(list) ? list : []);
    } catch (error) {
      console.error("Fetch products failed", error);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete product
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await fetch(`${BASE_URL}products/${id}`, { method: "DELETE" });
      setRows((prev) => prev.filter((row) => row.id !== id));
    } catch (error) {
      console.error("Delete failed", error);
    }
  };

  // 🔹 Edit product
  const handleEdit = (row) => {
    console.log("Edit product:", row);
    // navigate(`/products/edit/${row.id}`)
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 🔹 Table columns
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: "5%",
    },
    {
      field: "title",
      headerName: "Title",
      width: "15%",
    },
    {
      field: "description",
      headerName: "Description",
      width: "20%",
      render: (value) => (
        <Box sx={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {value}
        </Box>
      ),
    },
    {
      field: "price",
      headerName: "Price",
      width: "8%",
      render: (value) => `₹${value}`,
    },
    {
      field: "image",
      headerName: "Image",
      width: "10%",
      render: (value, row) =>
        value ? (
          <img src={value} alt={row.title} width={50} />
        ) : (
          "N/A"
        ),
    },
    {
      field: "stock",
      headerName: "Stock",
      width: "8%",
    },
    {
      field: "status",
      headerName: "Status",
      width: "8%",
      render: (value) => (
        <Chip
          label={value ? "Active" : "Inactive"}
          color={value ? "success" : "error"}
          size="small"
        />
      ),
    },
    {
      field: "created_at",
      headerName: "Created",
      width: "10%",
      render: (value) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
    {
      field: "updated_at",
      headerName: "Updated",
      width: "10%",
      render: (value) =>
        value ? new Date(value).toLocaleDateString() : "-",
    },
  ];

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

        <Button variant="contained" color="primary">
          Add Product
        </Button>
      </Box>

      <CommonTable
        columns={columns}
        rows={rows}
        loading={loading}
        actions={(row) => (
          <>
            <Button
              size="small"
              variant="outlined"
              onClick={() => handleEdit(row)}
            >
              Edit
            </Button>
            &nbsp;
            <Button
              size="small"
              variant="outlined"
              color="error"
              onClick={() => handleDelete(row.id)}
            >
              Delete
            </Button>
          </>
        )}
      />
    </Box>
  );
};

export default AllProducts;

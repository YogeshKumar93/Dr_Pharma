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
import AddProduct from "./AddProduct"; // ✅ IMPORT
import EditProduct from "./EditProduct";

const AllProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // ✅ Add modal state
  const [addOpen, setAddOpen] = useState(false);

  // Pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [editOpen, setEditOpen] = useState(false);
// const [selectedProduct, setSelectedProduct] = useState(null);

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

  useEffect(() => {
    fetchProducts();
  }, []);


  const handleEdit = (row) => {
  setSelectedProduct(row);
  setEditOpen(true);
};

const handleDelete = async (row) => {
  const confirmDelete = window.confirm(
    `Are you sure you want to delete "${row.title}"?`
  );

  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem("token"); // ✅ token

    const res = await fetch(`${BASE_URL}products/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, // ✅ REQUIRED
      },
      body: JSON.stringify({
        id: row.id,
      }),
    });

    if (!res.ok) {
      throw new Error("Delete failed");
    }

    // ✅ refresh after delete
    fetchProducts();
  } catch (err) {
    console.error("Delete failed", err);
    alert("Failed to delete product");
  }
};



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
          <div style={{ maxWidth: 220, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {value}
          </div>
        ),
      },
      {
  headerName: "Category",
  field: "category",
  render: (value) => (
    <strong style={{ textTransform: "capitalize" }}>{value}</strong>
  ),
},

      {
        headerName: "Price",
        field: "price",
        render: (value) => `₹ ${value}`,
      },
    {
  headerName: "Stock",
  field: "stock",
  render: (value) => {
    if (value === 0) {
      return <span style={{ color: "red", fontWeight: 600, fontSize:12 }}>Out of stock</span>;
    }
    if (value <= 5) {
      return <span style={{ color: "orange" }}>{value} (Low)</span>;
    }
    return <span style={{ color: "green" }}>{value}</span>;
  },
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
        rows={paginatedProducts}
        loading={loading}
        actions={actions}
        serverPagination
        page={page}
        rowsPerPage={rowsPerPage}
         onRefresh={fetchProducts} 
        totalCount={products.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        topActions={
           <Button 
        
        variant="contained"
         onClick={() => setAddOpen(true)}
           sx={{
              backgroundColor: "#1A5276",
      "&:hover": {
        backgroundColor: "#154360",
      },
           }} 
         >
          Add Product
        </Button>
        }
      />

      {/* ✅ ADD PRODUCT MODAL */}
      <AddProduct
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        onFetchRef={fetchProducts}
      />

      <EditProduct
  open={editOpen}
   onClose={() => {
   setEditOpen(false);
  setSelectedProduct(null);
 }}
  product={selectedProduct}
  onFetchRef={fetchProducts}
/>

    </Box>
  );
};

export default AllProducts;

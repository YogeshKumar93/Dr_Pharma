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
import AddPrescription from "./AddPrescription";
import EditPrescription from "./EditPrescription";


const AllPrescripedMedicine = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${BASE_URL}products?prescribed=1`);
      const data = await res.json();
      setProducts(data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (row) => {
    if (!window.confirm("Delete prescribed medicine?")) return;

    await fetch(`${BASE_URL}products/delete`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ id: row.id }),
    });

    fetchProducts();
  };

  const columns = useMemo(() => [
    { headerName: "ID", field: "id", width: "60px" },
    { headerName: "Title", field: "title" },
    { headerName: "Category", field: "category" },
    { headerName: "Price", field: "price", render: (v) => `₹${v}` },
    { headerName: "Stock", field: "stock" },
    {
      headerName: "Image",
      field: "image",
      render: (v) => v ? <img src={v} width={50} /> : "-"
    }
  ], []);

  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton onClick={() => { setSelectedProduct(row); setEditOpen(true); }}>
        <EditIcon />
      </IconButton>
      <IconButton color="error" onClick={() => handleDelete(row)}>
        <DeleteIcon />
      </IconButton>
    </Box>
  );

  return (
    <Box p={1}>
      <CommonTable
        columns={columns}
        rows={products}
        loading={loading}
        actions={actions}
          serverPagination
        page={page}
        rowsPerPage={rowsPerPage}
         onRefresh={fetchProducts} 
        totalCount={products.length}
        onPageChange={(e, p) => setPage(p)}
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
            Add Prescribed Medicine
          </Button>
        }
      />

      <AddPrescription
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        onFetchRef={fetchProducts}
      />

      <EditPrescription
        open={editOpen}
        onClose={() => setEditOpen(false)}
        product={selectedProduct}
        onFetchRef={fetchProducts}
      />
    </Box>
  );
};

export default AllPrescripedMedicine;

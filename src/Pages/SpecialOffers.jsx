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
import { apiCall } from "../api/api";
import CommonTable from "../Common/CommonTable";
import AddSpecialOffers from "./AddSpecialOffers";


const SpecialOffers = () => {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOffer, setSelectedOffer] = useState(null);

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  /* -------------------- API CALL -------------------- */
 const fetchOffers = async () => {
  try {
    setLoading(true);

    const res = await apiCall("GET", "special-offers");

    console.log("API CALL RAW RES 👉", res);
    // 🔥 handle all possible response shapes
    const list =  res?.data || [];  
    //   res?.data || [];        
    //   res ||               
    //   [];

     setOffers(Array.isArray(res.response) ? res.response : []);
  } catch (err) {
    console.error("Fetch offers failed", err);
  } finally {
    setLoading(false);
  }
};


  useEffect(() => {
    fetchOffers();
  }, []);

 useEffect(() => {
  console.log("OFFERS ARRAY 👉", offers, Array.isArray(offers));
}, [offers]);



  /* -------------------- ACTIONS -------------------- */
  const handleEdit = (row) => {
    setSelectedOffer(row);
    setEditOpen(true);
  };

  const handleDelete = async (row) => {
    const confirmDelete = window.confirm(
      `Delete special offer "${row.title}"?`
    );
    if (!confirmDelete) return;

    const { error } = await apiCall(
      "POST",
      "special-offers/delete",
      { id: row.id },
      { "Content-Type": "application/json" }
    );

    if (!error) {
      fetchOffers();
    }
  };

  /* -------------------- PAGINATION -------------------- */
  const paginatedOffers = useMemo(() => {
    const start = page * rowsPerPage;
    return offers.slice(start, start + rowsPerPage);
  }, [offers, page, rowsPerPage]);

  /* -------------------- COLUMNS -------------------- */
  const columns = useMemo(
    () => [
      { headerName: "ID", field: "id", width: "60px" },
      {
        headerName: "Title",
        field: "title",
        render: (v) => <strong>{v}</strong>,
      },
      {
        headerName: "Category",
        field: "category",
        render: (v) => <strong style={{ textTransform: "capitalize" }}>{v}</strong>,
      },
      {
        headerName: "Original Price",
        field: "original_price",
        render: (v) => `₹ ${v}`,
      },
      {
        headerName: "Offer Price",
        field: "offer_price",
        render: (v) => (
          <span style={{ color: "green", fontWeight: 600 }}>
            ₹ {v}
          </span>
        ),
      },
      {
        headerName: "Discount",
        field: "discount_percent",
        render: (v) => `${v}%`,
      },
      {
        headerName: "Stock",
        field: "stock",
      },
      {
        headerName: "Status",
        field: "is_active",
        render: (v) =>
          v ? (
            <span style={{ color: "green" }}>Active</span>
          ) : (
            <span style={{ color: "red" }}>Inactive</span>
          ),
      },
     {
  headerName: "Image",
  field: "image",
  render: (v) =>
    v ? (
     <img
  src={`http://localhost:8000/${v}`}
  alt="offer"
  width={50}
/>

    ) : "N/A",
},

    ],
    []
  );

  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Tooltip title="Edit">
        <IconButton size="small" onClick={() => handleEdit(row)}>
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
    <Box sx={{ p: 1 }}>
      <CommonTable
        columns={columns}
        rows={paginatedOffers}
        loading={loading}
        actions={actions}
        page={page}
         serverPagination
        rowsPerPage={rowsPerPage}
        totalCount={offers.length}
        onRefresh={fetchOffers}
        onPageChange={(e, p) => setPage(p)}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(+e.target.value);
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
            Add Special Offer
          </Button>
        }
      />

      <AddSpecialOffers
        open={addOpen}
        handleClose={() => setAddOpen(false)}
        onFetchRef={fetchOffers}
      />

      {/* <EditSpecialOffer
        open={editOpen}
        offer={selectedOffer}
        onClose={() => {
          setEditOpen(false);
          setSelectedOffer(null);
        }}
        onFetchRef={fetchOffers}
      /> */}
    </Box>
  );
};

export default SpecialOffers;

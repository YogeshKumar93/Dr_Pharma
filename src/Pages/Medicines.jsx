import React, { useState, useEffect } from "react";
import CommonTable from "../Common/CommonTable";
import { Box, Button } from "@mui/material";

const Medicines = () => {
  // Table data state
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Example: fetch banks (replace with your API)
  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setBanks([
        { id: 1, name: "HDFC Bank", branch: "MG Road", ifsc: "HDFC0001234", mobile: "9876543210" },
        { id: 2, name: "ICICI Bank", branch: "Main Street", ifsc: "ICIC0005678", mobile: "9123456780" },
        { id: 3, name: "SBI", branch: "City Center", ifsc: "SBIN0004321", mobile: "9988776655" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  // Define columns for CommonTable
  const columns = [
    { headerName: "S.No", field: "sno", render: (_, row, index) => index + 1 },
    { headerName: "Bank Name", field: "name" },
    { headerName: "Branch", field: "branch" },
    { headerName: "IFSC Code", field: "ifsc" },
    { headerName: "Mobile", field: "mobile" },
       { headerName: "S.No", field: "sno", render: (_, row, index) => index + 1 },
    { headerName: "Bank Name", field: "name" },
    { headerName: "Branch", field: "branch" },
    { headerName: "IFSC Code", field: "ifsc" },
    { headerName: "Mobile", field: "mobile" },
  ];

  // Optional actions column
  const actions = (row) => (
    <Box sx={{ display: "flex", gap: 1 }}>
      <Button variant="outlined" size="small" color="primary">Edit</Button>
      <Button variant="outlined" size="small" color="error">Delete</Button>
    </Box>
  );

  return (
    <Box sx={{ p: 4 }}>
      <CommonTable
        columns={columns}
        rows={banks}
        loading={loading}
        actions={actions}
        width="100%"
      />
    </Box>
  );
};

export default Medicines;

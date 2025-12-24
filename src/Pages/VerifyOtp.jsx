import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { apiCall } from "../api/api";
import { useLocation, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const email = state?.email;

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");

  const verifyOtp = async () => {
    try {
      const res = await apiCall
      ("POST", 
        "verify-otp", 
        { email, otp },
        {},
        true
    );

      sessionStorage.setItem("reset_token", res.reset_token);
      navigate("/reset-password");
    } catch (e) {
      setError("Invalid or expired OTP");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        fullWidth
        label="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        margin="normal"
      />

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={verifyOtp}>
        Verify OTP
      </Button>
    </Box>
  );
};

export default VerifyOtp;

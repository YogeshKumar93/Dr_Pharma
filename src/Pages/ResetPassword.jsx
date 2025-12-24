import React, { useState } from "react";
import { Box, TextField, Button, Alert } from "@mui/material";
import { apiCall } from "../api/api";
import { useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const reset_token = sessionStorage.getItem("reset_token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [msg, setMsg] = useState("");

  const handleReset = async () => {
    if (password !== confirm) {
      setMsg("Passwords do not match");
      return;
    }

    try {
      await apiCall(
        "POST",
        "reset-password",
        {
          reset_token,
          password,
          password_confirmation: confirm
        },
        {},
        true
      );

      setMsg("Password reset successful");
      sessionStorage.removeItem("reset_token");

      setTimeout(() => navigate("/login"), 2000);
    } catch (e) {
      setMsg("Invalid or expired reset token");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 10 }}>
      {msg && <Alert severity="info">{msg}</Alert>}

      <TextField
        fullWidth
        label="New Password"
        type="password"
        margin="normal"
        onChange={(e) => setPassword(e.target.value)}
      />

      <TextField
        fullWidth
        label="Confirm Password"
        type="password"
        margin="normal"
        onChange={(e) => setConfirm(e.target.value)}
      />

      <Button fullWidth variant="contained" sx={{ mt: 2 }} onClick={handleReset}>
        Reset Password
      </Button>
    </Box>
  );
};

export default ResetPassword;

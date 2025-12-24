import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Alert
} from "@mui/material";
import { apiCall } from "../api/api";
import { useNavigate } from "react-router-dom";

const ForgotPassword = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    setLoading(true);
    setMsg("");

    try {
      await apiCall(
        "POST",
        "forgot-password",
        { email },
        {},
        true // skipAuth
      );

      onClose();
      navigate("/verify-otp", { state: { email } });
    } catch (e) {
      setMsg("Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Forgot Password</DialogTitle>

      <DialogContent>
        {msg && <Alert severity="error" sx={{ mb: 2 }}>{msg}</Alert>}

        <TextField
          fullWidth
          label="Registered Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          margin="normal"
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={sendOtp} disabled={loading}>
          {loading ? "Sending..." : "Send OTP"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ForgotPassword;

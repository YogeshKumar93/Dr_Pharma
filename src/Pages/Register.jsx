import { useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { apiCall } from "../api/api";
 

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");

const handleRegister = async () => {
  try {
    const data = await apiCall(
      "POST",
      "register",
      { name, email, password, phone }
    );

    setMessage("Registration successful!");
    console.log("User created:", data);
  } catch (err) {
    setMessage(err.message || "Registration failed");
  }
};


  return (
    <Box sx={{ maxWidth: 400, margin: "auto", mt: 5, p: 3, border: "1px solid #ccc", borderRadius: 2, textAlign: "center" }}>
      <Typography variant="h5" mb={2}>Register</Typography>
      <TextField label="Name" fullWidth margin="normal" value={name} onChange={e => setName(e.target.value)} />
      <TextField label="Email" fullWidth margin="normal" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField
  label="Phone"
  fullWidth
  margin="normal"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

      <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={e => setPassword(e.target.value)} />
      <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleRegister}>Register</Button>
      {message && <Typography mt={2}>{message}</Typography>}
    </Box>
  );
}

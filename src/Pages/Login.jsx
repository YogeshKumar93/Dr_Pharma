import React, { useContext, useState } from "react";
import { Box, TextField, Button, Typography, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom"; 
 
import ApiEndpoints from "../api/ApiEndpoints";
import { apiCall } from "../api/api";
import AuthContext from "../Contexts/AuthContext";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    setSubmitting(true);
    setError("");

    const payload = {
      email: username,
      password: password,
    };

    try {
      const { response, error } = await apiCall(
        "POST",
        ApiEndpoints.LOGIN,
        payload
      );

      if (response) {
        // ✅ Login success
        login(response.user); // store user in context
        navigate("/dashboard");
      } else {
        // ❌ Backend error
        if (typeof error?.message === "object") {
          Object.values(error.message).forEach((msgs) => {
            if (Array.isArray(msgs)) {
              setError(msgs[0]);
            }
          });
        } else {
          setError(error?.message || "Invalid credentials");
        }
      }
    } catch (err) {
      console.error("❌ Login error:", err);
      setError("Something went wrong while logging in");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box sx={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      <Box sx={{ display: "flex", height: "100%" }}>
        <Box
          sx={{
            width: { xs: "100%", md: "40%" },
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#f5f5f5",
            p: { xs: 2, md: 4 },
          }}
        >
          <Paper elevation={3} sx={{ padding: 4, width: "100%", maxWidth: 400 }}>
            <Typography variant="h4" fontWeight={600} mb={3}>
              Login
            </Typography>

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{ mb: 2 }}
            />

            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ mb: 1 }}
            />

            {error && (
              <Typography color="error" mb={1}>
                {error}
              </Typography>
            )}

            <Box textAlign="right" mb={2}>
              <Link underline="hover">Forgot Password?</Link>
            </Box>

            <Button
              variant="contained"
              fullWidth
              disabled={submitting}
              onClick={handleSubmit}
            >
              {submitting ? "Logging in..." : "Login"}
            </Button>
          </Paper>
        </Box>

        <Box
          sx={{
            width: { xs: 0, md: "60%" },
            display: { xs: "none", md: "block" },
            backgroundImage: "url('https://picsum.photos/1000/1000')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default Login;

import React, { useContext, useState } from "react";
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Link, 
  Paper, 
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { 
  Visibility, 
  VisibilityOff,
  Email,
  Lock,
  MedicalServices
} from "@mui/icons-material";

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
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
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
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={24}
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: 4,
            background: "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 245, 245, 0.98) 100%)",
            backdropFilter: "blur(10px)",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "linear-gradient(90deg, #1976d2, #2196f3, #21cbf3)",
            }
          }}
        >
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Box
              sx={{
                width: 60,
                height: 60,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #1976d2, #2196f3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                boxShadow: "0 4px 20px rgba(33, 150, 243, 0.3)",
              }}
            >
              <MedicalServices sx={{ fontSize: 30, color: "white" }} />
            </Box>
            <Typography 
              variant="h4" 
              sx={{ 
                fontWeight: 700,
                background: "linear-gradient(135deg, #1976d2 30%, #21cbf3 90%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                mb: 1
              }}
            >
              Welcome Back
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Access your pharmaceutical management dashboard
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="primary" />
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  }
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              margin="normal"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="primary" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                  transition: "all 0.3s",
                  "&:hover": {
                    transform: "translateY(-2px)",
                  }
                }
              }}
            />

            <Box sx={{ textAlign: "right", mb: 2, mt: 1 }}>
              <Link 
                underline="hover" 
                sx={{ 
                  cursor: "pointer",
                  fontWeight: 500,
                  "&:hover": {
                    color: "primary.main",
                  }
                }}
              >
                Forgot Password?
              </Link>
            </Box>

            {error && (
              <Alert 
                severity="error"
                sx={{ 
                  mb: 2,
                  borderRadius: 2,
                  animation: "fadeIn 0.5s ease-in",
                  "@keyframes fadeIn": {
                    "0%": { opacity: 0, transform: "translateY(-10px)" },
                    "100%": { opacity: 1, transform: "translateY(0)" }
                  }
                }}
              >
                {error}
              </Alert>
            )}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={submitting}
              sx={{
                mt: 1,
                mb: 2,
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
                background: "linear-gradient(135deg, #1976d2 0%, #2196f3 100%)",
                boxShadow: "0 4px 20px rgba(33, 150, 243, 0.4)",
                "&:hover": {
                  background: "linear-gradient(135deg, #1565c0 0%, #1976d2 100%)",
                  boxShadow: "0 6px 25px rgba(33, 150, 243, 0.6)",
                  transform: "translateY(-2px)",
                },
                "&:disabled": {
                  background: "#ccc",
                },
                transition: "all 0.3s ease",
              }}
            >
              {submitting ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Login"
              )}
            </Button>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{" "}
                <Link 
                  onClick={() => navigate("/register")}
                  sx={{ 
                    fontWeight: 600,
                    cursor: "pointer",
                    "&:hover": {
                      textDecoration: "underline"
                    }
                  }}
                >
                  Create Account
                </Link>
              </Typography>
            </Box>
          </Box>

          <Box 
            sx={{ 
              mt: 4,
              pt: 3,
              borderTop: "1px solid",
              borderColor: "divider",
              textAlign: "center"
            }}
          >
            <Typography variant="caption" color="text.secondary">
              Secure access to pharmaceutical management system
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.8)" }}>
            © 2024 PharmaCare. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Login;
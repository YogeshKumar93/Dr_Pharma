import { useState } from "react";
import { 
  TextField, 
  Button, 
  Box, 
  Typography,
  Paper,
  Container,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
  Snackbar
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff,
  Person,
  Email,
  Phone,
  Lock
} from "@mui/icons-material";
import { apiCall } from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

const [openSnackbar, setOpenSnackbar] = useState(false);
const [snackbarMessage, setSnackbarMessage] = useState("");
const [snackbarSeverity, setSnackbarSeverity] = useState("success");


  const handleRegister = async () => {
    setLoading(true);
    // setMessage("");
    try {
      const data = await apiCall(
        "POST",
        "register",
        { name, email, password, phone }
      );

     setSnackbarMessage("Registration successful! Redirecting to login...");
    setSnackbarSeverity("success");
    setOpenSnackbar(true);
      
      // Reset form on successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhone("");

        // ⏳ redirect after 2 seconds
    setTimeout(() => {
      navigate("/login");
    }, 2000);
      
    } catch (err) {
      setMessage(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister();
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: "linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')",
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
              <Lock sx={{ fontSize: 30, color: "white" }} />
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
              Create Account
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Join our community and start your journey
            </Typography>
          </Box>

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Full Name"
              margin="normal"
              value={name}
              onChange={e => setName(e.target.value)}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Person color="primary" />
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
              label="Email Address"
              type="email"
              margin="normal"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
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
              label="Phone Number"
              margin="normal"
              value={phone}
              onChange={e => setPhone(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone color="primary" />
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
              margin="normal"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
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

       <Snackbar
  open={openSnackbar}
  autoHideDuration={3000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
>
  <Alert
    onClose={() => setOpenSnackbar(false)}
    severity={snackbarSeverity}
    sx={{ width: "100", fontWeight: 600 }}
    variant="filled"
  >
    {snackbarMessage}
  </Alert>
</Snackbar>


            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                mt: 3,
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
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>

            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
                Already have an account?{" "}
                <Button 
                  color="primary" 
                    onClick={() => navigate("/login")}
                  sx={{ 
                    fontWeight: 600,
                    textTransform: "none",
                    "&:hover": {
                      background: "none",
                      textDecoration: "underline"
                    }
                  }}
                >
                  Sign In
                </Button>
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
              By registering, you agree to our Terms of Service and Privacy Policy
            </Typography>
          </Box>
        </Paper>

        <Box sx={{ textAlign: "center", mt: 4 }}>
          <Typography variant="body2" color="rgba(255, 255, 255, 0.8)">
            © 2024 Your Company. All rights reserved.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  Container,
  Badge,
  Modal,
  Box,
  Menu,
  MenuItem,
  Divider,
} from "@mui/material";
import React from "react";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

import { useCart } from "../../Contexts/CartContext";
import Cart from "../../Pages/Cart";

const Header = () => {
  const { cartItems, openCart, setOpenCart } = useCart();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItemStyle = {
    color: "#1A5276",
    "&:hover": {
      backgroundColor: "#F1C40F",
      color: "#1A5276",
    },
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    handleMenuClose();
    navigate("/", { replace: true });
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: "#1a5276",
          color: "#fff",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              py: 1,
            }}
          >
            {/* LEFT : LOGO */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
              <Typography
                variant="h6"
                component="div"
                sx={{
                  fontWeight: "bold",
                  color: "#fff",
                  fontSize: "1.5rem",
                }}
              >
                Dr.Pharma
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "#fff",
                  fontSize: "0.75rem",
                  borderLeft: "1px solid #ccc",
                  pl: 1,
                }}
              >
                ©
              </Typography>
            </Box>

            {/* CENTER : NAVIGATION */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 3,
                flexGrow: 1,
                justifyContent: "center",
              }}
            >
              <Box sx={{ display: "flex", gap: 2 }}>
                <Button component={Link} to="/" sx={navBtn}>
                  Home
                </Button>
                <Button component={Link} to="/categories" sx={navBtn}>
                  Categories
                </Button>
                <Button component={Link} to="/offers" sx={navBtn}>
                  Offers
                </Button>
                <Button component={Link} to="/aboutus" sx={navBtn}>
                  About
                </Button>
              </Box>
            </Box>

            {/* RIGHT : ACTIONS */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Button
                startIcon={<DownloadIcon />}
                sx={{
                  color: "#37ff41ff",
                  textTransform: "none",
                  fontSize: "0.9rem",
                }}
              >
                Download App
              </Button>

              <Button
                component={Link}
                to="/login"
                sx={{
                  color: "#fff",
                  border: "1px solid #a2b4a3ff",
                  borderRadius: "20px",
                  px: 2,
                  textTransform: "none",
                  fontSize: "0.9rem",
                  "&:hover": { backgroundColor: "#17ed17ff" },
                }}
              >
                Login / Signup
              </Button>

              {/* 🛒 CART ICON */}
              <IconButton
                onClick={() => navigate("/cart")}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: "#111" },
                }}
              >
                <Badge badgeContent={cartItems.length} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* MODIFIED PERSON ICON WITH NEW DESIGN */}
              <IconButton
                onClick={handleMenuOpen}
                sx={{
                  color: "#fff",
                  backgroundColor: open ? "rgba(255, 255, 255, 0.2)" : "transparent",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    backgroundColor: "rgba(255, 255, 255, 0.3)",
                    transform: "scale(1.05)",
                    boxShadow: "0 0 0 2px rgba(255, 255, 255, 0.5)",
                  },
                }}
              >
                <PersonIcon />
              </IconButton>

              {/* MODIFIED MENU DESIGN */}
              <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    backgroundColor: "#fff",
                    color: "#1A5276",
                    borderRadius: 3,
                    minWidth: 200,
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.15)",
                    border: "1px solid rgba(26, 82, 118, 0.1)",
                    overflow: "visible",
                    "&:before": {
                      content: '""',
                      display: "block",
                      position: "absolute",
                      top: -8,
                      right: 20,
                      width: 16,
                      height: 16,
                      backgroundColor: "#fff",
                      transform: "rotate(45deg)",
                      borderLeft: "1px solid rgba(26, 82, 118, 0.1)",
                      borderTop: "1px solid rgba(26, 82, 118, 0.1)",
                    },
                  },
                }}
                MenuListProps={{
                  sx: {
                    padding: "8px 0",
                  },
                }}
              >
                <Box
                  sx={{
                    px: 2,
                    py: 1.5,
                    backgroundColor: "rgba(241, 196, 15, 0.1)",
                    borderBottom: "1px solid rgba(241, 196, 15, 0.2)",
                    marginBottom: 1,
                  }}
                >
                  <Typography variant="subtitle2" fontWeight="bold">
                    My Account
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Manage your profile
                  </Typography>
                </Box>

                <MenuItem
                  sx={{
                    ...menuItemStyle,
                    py: 1.5,
                    px: 2,
                    marginX: 1,
                    borderRadius: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                    },
                  }}
                  onClick={() => {
                    handleMenuClose();
                    navigate("/myprofile");
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "rgba(26, 82, 118, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 16, color: "#1A5276" }} />
                    </Box>
                    My Profile
                  </Box>
                </MenuItem>

                <MenuItem
                  sx={{
                    ...menuItemStyle,
                    py: 1.5,
                    px: 2,
                    marginX: 1,
                    borderRadius: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      transform: "translateX(4px)",
                    },
                  }}
                  onClick={() => {
                    handleMenuClose();
                    navigate("/myorders");
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "rgba(26, 82, 118, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <ShoppingCartIcon sx={{ fontSize: 16, color: "#1A5276" }} />
                    </Box>
                    My Orders
                  </Box>
                </MenuItem>

                <Divider sx={{ my: 1, borderColor: "rgba(26, 82, 118, 0.1)" }} />

                <MenuItem
                  sx={{
                    color: "#d32f2f",
                    py: 1.5,
                    px: 2,
                    marginX: 1,
                    borderRadius: 1,
                    transition: "all 0.2s ease",
                    "&:hover": {
                      backgroundColor: "rgba(211, 47, 47, 0.1)",
                      transform: "translateX(4px)",
                      color: "#d32f2f",
                    },
                  }}
                  onClick={handleLogout}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: "50%",
                        backgroundColor: "rgba(211, 47, 47, 0.1)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Typography sx={{ fontSize: 16, color: "#d32f2f" }}>↪</Typography>
                    </Box>
                    Logout
                  </Box>
                </MenuItem>

                <Box
                  sx={{
                    px: 2,
                    py: 1,
                    mt: 1,
                    borderTop: "1px solid rgba(26, 82, 118, 0.1)",
                    backgroundColor: "rgba(26, 82, 118, 0.02)",
                  }}
                >
                  <Typography variant="caption" color="text.secondary">
                    © 2024 Dr.Pharma
                  </Typography>
                </Box>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* HEADER HEIGHT SPACER */}
      <Toolbar />
    </>
  );
};

const navBtn = {
  color: "#fff",
  fontSize: "0.9rem",
  textTransform: "none",
  fontWeight: 500,
};

export default Header;
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
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from "../../Contexts/CartContext";
import Cart from "../../Pages/Cart";

const Header = () => {
  const { cartItems, openCart, setOpenCart } = useCart();
  const navigate = useNavigate();

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
                <Button component={Link} to="/home" sx={navBtn}>
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

              {/* SEARCH (unchanged, commented) */}
              {/*
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <SearchIcon />
                <TextField />
              </Box>
              */}
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

              {/* 🛒 CART ICON (PAGE OPEN, NOT MODAL) */}
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

              <IconButton
                sx={{
                  color: "#f3eceaff",
                  "&:hover": { backgroundColor: "#111" },
                }}
              >
                <MenuIcon />
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* HEADER HEIGHT SPACER */}
      <Toolbar />

      {/* ❌ MODAL DISABLED (PAGE BASED CART) */}
      {/*
      <Modal open={openCart} onClose={() => setOpenCart(false)}>
        <Box>
          <Cart />
        </Box>
      </Modal>
      */}
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

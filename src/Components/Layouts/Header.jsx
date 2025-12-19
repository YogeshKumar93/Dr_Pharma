import { AppBar, Toolbar, Typography,  Button, IconButton, TextField, Container } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
import MenuIcon from '@mui/icons-material/Menu';
// import IconButton from '@mui/material/IconButton';
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import DownloadIcon from "@mui/icons-material/Download";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import { useCart } from "../../Contexts/CartContext";
import { Badge, Modal, Box } from "@mui/material";
import Cart from "../../Pages/Cart";
// import Cart from "./Cart";


const Header = () => {

const { cartItems, openCart, setOpenCart } = useCart();


  return (
    <>
    <AppBar 
      position="fixed" 
      sx={{ 
        backgroundColor: "#1a5276",
        color: "#fff",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
      }}
    >
      <Container maxWidth="lg">
        <Toolbar sx={{ 
          display: "flex", 
          justifyContent: "space-between", 
          alignItems: "center",
          flexWrap: "wrap",
          py: 1,
        }}>
          
          {/* Left: Logo */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography 
              variant="h6" 
              component="div" 
              sx={{ 
                fontWeight: "bold",
                color: "#fff",
                fontSize: "1.5rem"
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
                pl: 1
              }}
            >
              ©
            </Typography>
          </Box>

          {/* Center: Navigation & Search */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 3, 
            flexWrap: "wrap",
            flexGrow: 1,
            justifyContent: "center"
          }}>
            {/* Navigation Links */}
            <Box sx={{ display: "flex", gap: 2 }}>
              <Button 
                color="inherit" 
                component={Link} 
                to="/home"
                sx={{ 
                  color: "#fff",
                  fontSize: "0.9rem",
                  textTransform: "none",
                  fontWeight: 500
                }}
              >
                Home
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/categories"
                sx={{ 
                  color: "#fff",
                  fontSize: "0.9rem",
                  textTransform: "none",
                  fontWeight: 500
                }}
              >
                Categories
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/offers"
                sx={{ 
                  color: "#fff",
                  fontSize: "0.9rem",
                  textTransform: "none",
                  fontWeight: 500
                }}
              >
                Offers
              </Button>
              <Button 
                color="inherit" 
                component={Link} 
                to="/about"
                sx={{ 
                  color: "#fff",
                  fontSize: "0.9rem",
                  textTransform: "none",
                  fontWeight: 500
                }}
              >
                About
              </Button>
            </Box>

            {/* Search with Icon */}
            {/* <Box sx={{ 
              display: "flex", 
              alignItems: "center",
              backgroundColor: "#f5f5f5",
              borderRadius: "20px",
              px: 2,
              py: 0.5,
              minWidth: "300px"
            }}>
              <SearchIcon sx={{ color: "#666", fontSize: "1.2rem", mr: 1 }} />
              <TextField
                variant="standard"
                placeholder="Search for medicines..."
                InputProps={{
                  disableUnderline: true,
                  sx: {
                    fontSize: "0.9rem",
                  }
                }}
                sx={{
                  flexGrow: 1,
                  "& .MuiInputBase-input": {
                    padding: "4px 0",
                  },
                }}
              />
            </Box> */}
          </Box>

          {/* Right: Actions */}
          <Box sx={{ 
            display: "flex", 
            alignItems: "center", 
            gap: 2,
            flexWrap: "wrap"
          }}>
            {/* Download App */}
            <Button
              startIcon={<DownloadIcon />}
              sx={{
                color: "#37ff41ff",
                textTransform: "none",
                fontSize: "0.9rem",
                fontWeight: 500
              }}
            >
              Download App
            </Button>

            {/* Login/Signup */}
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
                fontWeight: 500,
                "&:hover": {
                  backgroundColor: "#17ed17ff",
                }
              }}
            >
              Login / Signup
            </Button>

            {/* Cart Icon */}
        <IconButton onClick={() => setOpenCart(true)}>
  <Badge badgeContent={cartItems.length} color="error">
    <ShoppingCartIcon />
  </Badge>
</IconButton>


<IconButton
  sx={{
    color: "#f3eceaff",
    "&:hover": {
      backgroundColor: "#111",
    },
  }}
>
  <MenuIcon />
</IconButton>




          
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

<Modal open={openCart} onClose={() => setOpenCart(false)}>
  <Box sx={{
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    p: 3,
    borderRadius: 2,
    width: 400
  }}>
    <Cart />
  </Box>
</Modal>

</>
  );
};

export default Header;
import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  Snackbar,
  Alert,
  Chip,
} from "@mui/material";
import { ArrowForward, LocalShipping } from "@mui/icons-material";
import { apiCall } from "../api/api";
import { useCart } from "../Contexts/CartContext";

const FeaturedProducts = ({ limit }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();

  const handleAddToCart = (product) => {
    const id = product._id || product.id;

    addToCart(product);
    setAddedItems((prev) => ({
      ...prev,
      [id]: true,
    }));
    setOpenSnack(true);
  };

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      setLoading(true);

      const { response, error } = await apiCall(
        "GET",
        limit ? `products/featured?limit=${limit}` : "products"
      );

      if (error) {
        setFeaturedProducts([]);
        return;
      }

      const products =
        response?.data || response?.products || response || [];

      setFeaturedProducts(Array.isArray(products) ? products : []);
    } catch (err) {
      console.error(err);
      setFeaturedProducts([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ py: 8, px: { xs: 2, md: 6 }, bgcolor: "#f8fafc" }}>
      {/* Header */}
      <Box sx={{ textAlign: "center", mb: 6 }}>
        <Typography variant="h4" fontWeight={700} color="#1a5276">
          Featured Healthcare Products
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" mt={2}>
          Trusted medicines and health essentials for your daily wellness
        </Typography>
      </Box>

      {/* Products */}
      <Grid container spacing={4} justifyContent="center">
        {Array.isArray(featuredProducts) &&
          featuredProducts.map((product) => {
            const id = product._id || product.id;

            return (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={id}
                sx={{ display: "flex" }}
              >
                <Card
                  sx={{
                    width: "100%",
                    maxWidth: 280,
                    minHeight: 300,
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "transform 0.2s, box-shadow 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* Discount Badge */}
                  <Box
                    sx={{
                      position: "absolute",
                      top: 10,
                      left: 10,
                      zIndex: 1,
                    }}
                  >
                    <Chip
                      label="20% OFF"
                      sx={{
                        bgcolor: "#ff6b6b",
                        color: "white",
                        fontWeight: 700,
                        fontSize: "0.75rem",
                        height: 20,
                        "& .MuiChip-label": { px: 1.5 },
                      }}
                    />
                  </Box>

                  {/* Product Image */}
                  <Box
                    sx={{
                      height: 150,
                      p: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      bgcolor: "#ffffff",
                      position: "relative",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={
                        product.image ||
                        "https://via.placeholder.com/150"
                      }
                      alt={product.title}
                      sx={{
                        objectFit: "contain",
                        height: "100%",
                        width: "100%",
                        maxHeight: 140,
                      }}
                    />
                  </Box>

                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 3,
                      pt: 2.5,
                    }}
                  >
                    {/* Brand */}
                    <Typography
                      variant="caption"
                      sx={{
                        color: "#666",
                        fontSize: "0.75rem",
                        fontWeight: 600,
                        letterSpacing: "0.5px",
                        textTransform: "uppercase",
                        mb: 0.5,
                      }}
                    >
                      {product.brand || "Healthcare"}
                    </Typography>

                    {/* Product Title */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        lineHeight: 1.3,
                        mb: 1.5,
                        color: "#333",
                        minHeight: "2.6em",
                      }}
                    >
                      {product.title}
                    </Typography>

                    {/* Weight & Delivery */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{ color: "#666", fontSize: "0.85rem" }}
                      >
                        {product.item ||
                          "1 item  (Approx. 6 - 8 pcs)"}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <LocalShipping
                          sx={{ fontSize: 16, color: "#4CAF50" }}
                        />
                        <Typography
                          variant="body2"
                          sx={{
                            color: "#4CAF50",
                            fontSize: "0.85rem",
                            fontWeight: 500,
                          }}
                        >
                          10 MINS
                        </Typography>
                      </Box>
                    </Box>

                    {/* Price */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        mb: 2,
                        mt: "auto",
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{
                          color: "#1a5276",
                          fontWeight: 700,
                          fontSize: "1.25rem",
                        }}
                      >
                        ₹{product.price || "55.2"}
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: "#999",
                          textDecoration: "line-through",
                          fontSize: "0.9rem",
                        }}
                      >
                        ₹{product.originalPrice || "69"}
                      </Typography>
                    </Box>

                    {/* Add to Cart Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        mt: "auto",
                        bgcolor: addedItems[id]
                          ? "#4CAF50"
                          : "#1a5276",
                        color: "white",
                        fontWeight: 600,
                        fontSize: "0.9rem",
                        py: 1.2,
                        borderRadius: 2,
                        textTransform: "none",
                        "&:hover": {
                          bgcolor: addedItems[id]
                            ? "#45a049"
                            : "#154360",
                        },
                      }}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedItems[id] ? "Added ✔" : "Add"}
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
      </Grid>

      {/* View All */}
      {limit && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button
            variant="outlined"
            endIcon={<ArrowForward />}
            sx={{
              borderColor: "#1a5276",
              color: "#1a5276",
              "&:hover": {
                borderColor: "#154360",
                bgcolor: "rgba(26, 82, 118, 0.04)",
              },
            }}
          >
            View All Products
          </Button>
        </Box>
      )}

      {/* Snackbar */}
      <Snackbar
        open={openSnack}
        autoHideDuration={2000}
        onClose={() => setOpenSnack(false)}
      >
        <Alert severity="success" variant="filled">
          Item added to cart
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FeaturedProducts;

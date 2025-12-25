import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  ListItemButton,
  ListItemText,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Button,
  IconButton,
  Fade,
  Alert,
  Snackbar,
} from "@mui/material";
import {
  LocalOffer,
  Whatshot,
  TrendingUp,
  Star,
  ShoppingCart,
  Timer,
  Inventory,
  ArrowForwardIos,
} from "@mui/icons-material";
import { apiCall } from "../api/api";

/**
 * CATEGORY LIST
 */
const CATEGORIES = [
  { label: "Medicines", value: "medicines", icon: "💊" },
  { label: "Medical Instruments", value: "medical instruments", icon: "🩺" },
  { label: "Syrups", value: "syrups", icon: "🍶" },
  { label: "Kits", value: "kits", icon: "🧰" },
  { label: "Supplements", value: "supplements", icon: "💊" },
];

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState("medicines");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    fetchAllProducts();
  }, []);

  /**
   * FETCH SPECIAL OFFERS
   */
  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const { response, error } = await apiCall("GET", "special-offers");

      if (error) {
        setAllProducts([]);
        setSnackbar({
          open: true,
          message: "Failed to load offers. Please try again.",
        });
        return;
      }

      // API RESPONSE NORMALIZATION
      const products = response?.data || response?.products || response || [];

      setAllProducts(Array.isArray(products) ? products : []);
    } catch (err) {
      console.error("Special Offers Error:", err);
      setAllProducts([]);
      setSnackbar({
        open: true,
        message: "Network error. Please check your connection.",
      });
    } finally {
      setLoading(false);
    }
  };

  /**
   * FILTER PRODUCTS CATEGORY WISE
   */
  const filteredProducts = allProducts.filter(
    (item) => item.category === activeCategory && item.is_active === 1
  );

  /**
   * Calculate savings amount
   */
  const calculateSavings = (original, offer) => {
    return original - offer;
  };

  /**
   * Get stock status color
   */
  const getStockStatus = (stock) => {
    if (stock > 20) return "success";
    if (stock > 10) return "warning";
    return "error";
  };

  /**
   * Handle add to cart
   */
  const handleAddToCart = (product) => {
    // Add your cart logic here
    setSnackbar({
      open: true,
      message: `${product.title} added to cart!`,
    });
  };

  /**
   * Handle quick view
   */
  const handleQuickView = (product) => {
    // Add quick view logic here
    console.log("Quick view:", product);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        background: "linear-gradient(135deg, #fff5f5 0%, #f5f7ff 100%)",
        minHeight: "100vh",
        mt:-13
      }}
    >
      {/* ================= HEADER SECTION ================= */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography
          variant="h4"
          fontWeight={800}
          sx={{
            background: "linear-gradient(45deg, #FF6B6B, #FF8E53)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 1,
          }}
        >
          <Whatshot sx={{ mr: 1, color: "#FF6B6B" }} />
          Special Offers & Discounts
          <Whatshot sx={{ ml: 1, color: "#FF6B6B" }} />
        </Typography>
        <Typography variant="subtitle1" color="text.secondary">
          Limited time offers on healthcare products. Don't miss out!
        </Typography>
        <Chip
          icon={<Timer />}
          label="Limited Time Only"
          color="error"
          size="small"
          sx={{ mt: 2 }}
        />
      </Box>

      {/* ================= CATEGORY BAR ================= */}
      <Paper
        elevation={2}
        sx={{
          display: "flex",
          mb: 4,
          borderRadius: 3,
          p: 1,
          overflowX: "auto",
          background: "white",
          "&::-webkit-scrollbar": {
            height: 6,
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
            borderRadius: 3,
          },
        }}
      >
        {CATEGORIES.map((cat) => (
          <ListItemButton
            key={cat.value}
            selected={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
            sx={{
              flexDirection: "column",
              minWidth: 100,
              mx: 0.5,
              borderRadius: 2,
              py: 1.5,
              "&.Mui-selected": {
                bgcolor: "#FF6B6B",
                color: "white",
                boxShadow: "0 4px 12px rgba(255, 107, 107, 0.3)",
                "&:hover": {
                  bgcolor: "#FF5252",
                },
              },
              "&:hover": {
                bgcolor: "rgba(255, 107, 107, 0.1)",
              },
            }}
          >
            <Typography variant="h5" sx={{ mb: 0.5 }}>
              {cat.icon}
            </Typography>
            <ListItemText
              primary={cat.label}
              primaryTypographyProps={{
                fontSize: "0.8rem",
                fontWeight: 600,
                textAlign: "center",
                noWrap: true,
              }}
            />
          </ListItemButton>
        ))}
      </Paper>

      {/* ================= CATEGORY HEADER ================= */}
      <Box sx={{ mb: 3 }}>
        <Typography variant="h5" fontWeight={700} color="#2D3748">
          {CATEGORIES.find((c) => c.value === activeCategory)?.label} Offers
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
          <TrendingUp sx={{ fontSize: 16, color: "#48BB78", mr: 1 }} />
          <Typography variant="body2" color="text.secondary">
            Showing {filteredProducts.length} special offers
          </Typography>
        </Box>
      </Box>

      {/* ================= LOADING ================= */}
      {loading && <LinearProgress sx={{ mb: 3 }} color="error" />}

      {/* ================= CONTENT ================= */}
      <Fade in={!loading}>
        <Box>
          {filteredProducts.length === 0 ? (
            <Box
              sx={{
                textAlign: "center",
                py: 10,
                borderRadius: 3,
                bgcolor: "white",
                boxShadow: 1,
              }}
            >
              <LocalOffer sx={{ fontSize: 60, color: "#CBD5E0", mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No offers found in this category
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Check back soon for new deals!
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => {
                const savings = calculateSavings(
                  product.original_price,
                  product.offer_price
                );

                return (
                  <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                    <Card
                      sx={{
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        borderRadius: 3,
                        overflow: "hidden",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        transition: "all 0.3s ease",
                        position: "relative",
                        "&:hover": {
                          transform: "translateY(-8px)",
                          boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                        },
                      }}
                    >
                      {/* DISCOUNT BADGE */}
                      <Box
                        sx={{
                          position: "absolute",
                          top: 12,
                          left: 12,
                          zIndex: 1,
                        }}
                      >
                        <Chip
                          icon={<LocalOffer />}
                          label={`${product.discount_percent}% OFF`}
                          color="error"
                          size="small"
                          sx={{
                            fontWeight: 700,
                            fontSize: "0.75rem",
                            boxShadow: "0 2px 8px rgba(229,62,62,0.3)",
                          }}
                        />
                      </Box>

                      {/* SAVINGS BADGE */}
                      {savings > 0 && (
                        <Box
                          sx={{
                            position: "absolute",
                            top: 12,
                            right: 12,
                            zIndex: 1,
                          }}
                        >
                          <Chip
                            label={`Save ₹${savings}`}
                            color="success"
                            size="small"
                            sx={{
                              fontWeight: 600,
                              fontSize: "0.7rem",
                              bgcolor: "#48BB78",
                            }}
                          />
                        </Box>
                      )}

                      {/* IMAGE CONTAINER */}
                      <Box
                        sx={{
                          position: "relative",
                          width: "100%",
                          pt: "75%", // 4:3 aspect ratio
                          bgcolor: "#F7FAFC",
                          overflow: "hidden",
                        }}
                      >
                        <CardMedia
                          component="img"
                          image={
                            product.image
                              ? `${BASE_URL}/${product.image}`
                              : "/no-image.png"
                          }
                          alt={product.title}
                          sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "contain",
                            p: 2,
                            transition: "transform 0.5s ease",
                            "&:hover": {
                              transform: "scale(1.05)",
                            },
                          }}
                        />
                      </Box>

                      {/* CONTENT */}
                      <CardContent
                        sx={{
                          flexGrow: 1,
                          display: "flex",
                          flexDirection: "column",
                          p: 2.5,
                          pb: "16px !important",
                        }}
                      >
                        {/* PRODUCT TITLE */}
                        <Typography
                          variant="body1"
                          fontWeight={600}
                          sx={{
                            mb: 1,
                            minHeight: "44px",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            lineHeight: 1.3,
                          }}
                        >
                          {product.title}
                        </Typography>

                        {/* PRICING */}
                        <Box sx={{ mb: 2 }}>
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "baseline",
                              mb: 0.5,
                            }}
                          >
                            <Typography
                              variant="h6"
                              fontWeight={800}
                              color="#2D3748"
                            >
                              ₹{product.offer_price}
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{
                                textDecoration: "line-through",
                                ml: 1,
                              }}
                            >
                              ₹{product.original_price}
                            </Typography>
                          </Box>
                          <Typography variant="caption" color="text.secondary">
                            Inclusive of all taxes
                          </Typography>
                        </Box>

                        {/* STOCK & RATING */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            mb: 2,
                          }}
                        >
                          <Chip
                            icon={<Inventory />}
                            label={`Stock: ${product.stock}`}
                            size="small"
                            color={getStockStatus(product.stock)}
                            variant="outlined"
                          />
                          {product.rating && (
                            <Chip
                              icon={<Star sx={{ fontSize: 14 }} />}
                              label={product.rating}
                              size="small"
                              sx={{
                                bgcolor: "#FFF8E1",
                                color: "#FF9800",
                              }}
                            />
                          )}
                        </Box>

                        {/* ACTION BUTTONS */}
                        <Box
                          sx={{
                            display: "flex",
                            gap: 1,
                            mt: "auto",
                          }}
                        >
                          <Button
                            fullWidth
                            variant="outlined"
                            size="small"
                            onClick={() => handleQuickView(product)}
                            endIcon={<ArrowForwardIos sx={{ fontSize: 12 }} />}
                            sx={{
                              textTransform: "none",
                              fontWeight: 600,
                              borderColor: "#E2E8F0",
                              color: "#4A5568",
                            }}
                          >
                            Details
                          </Button>
                          <Button
                            fullWidth
                            variant="contained"
                            size="small"
                            startIcon={<ShoppingCart />}
                            onClick={() => handleAddToCart(product)}
                            sx={{
                              textTransform: "none",
                              fontWeight: 700,
                              bgcolor: "#FF6B6B",
                              "&:hover": {
                                bgcolor: "#FF5252",
                              },
                            }}
                          >
                            Add to Cart
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Box>
      </Fade>

      {/* ================= FOOTER NOTE ================= */}
      {filteredProducts.length > 0 && (
        <Box
          sx={{
            mt: 4,
            p: 3,
            borderRadius: 3,
            bgcolor: "#FFF8E1",
            borderLeft: "4px solid #FFB74D",
          }}
        >
          <Typography variant="body2" color="#5D4037">
            ⚠️ <strong>Note:</strong> Offers are valid for limited time only.
            Prices may change without prior notice. Stock is limited, order
            soon!
          </Typography>
        </Box>
      )}

      {/* ================= SNACKBAR ================= */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity={snackbar.message.includes("Failed") ? "error" : "success"}
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Offers;
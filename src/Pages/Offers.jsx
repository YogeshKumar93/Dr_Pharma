import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Tabs,
  Tab,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  LinearProgress,
  Button,
  Fade,
  Alert,
  Snackbar,
  Container,
  Badge,
  Avatar,
  IconButton,
} from "@mui/material";
import {
  LocalOffer,
  Whatshot,
  TrendingUp,
  Star,
  ShoppingCart,
  Timer,
  Inventory,
  FlashOn,
  Percent,
  NewReleases,
  ArrowForward,
  Visibility,
  FavoriteBorder,
  CompareArrows,
  CheckCircle,
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
  { label: "Supplements", value: "supplements", icon: "💉" },
];

const Offers = () => {
  const [activeCategory, setActiveCategory] = useState("medicines");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "" });
  const [viewMode, setViewMode] = useState("grid"); // grid or list
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
   * Calculate savings percentage
   */
  const calculateSavingsPercentage = (original, offer) => {
    return Math.round(((original - offer) / original) * 100);
  };

  /**
   * Get stock status
   */
  const getStockStatus = (stock) => {
    if (stock > 20) return { color: "#2ECC71", label: "In Stock" };
    if (stock > 10) return { color: "#F39C12", label: "Low Stock" };
    return { color: "#E74C3C", label: "Limited" };
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

  /**
   * Handle wishlist
   */
  const handleWishlist = (product) => {
    // Add wishlist logic here
    setSnackbar({
      open: true,
      message: `${product.title} added to wishlist!`,
    });
  };

  /**
   * Handle compare
   */
  const handleCompare = (product) => {
    // Add compare logic here
    setSnackbar({
      open: true,
      message: `${product.title} added to compare!`,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#F8F9FA",
        mt: -13,
      }}
    >
      {/* ================= HERO BANNER ================= */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)",
          py: { xs: 6, md: 8 },
          px: 3,
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ position: "relative", zIndex: 1 }}>
            <Chip
              icon={<FlashOn />}
              label="LIMITED TIME OFFER"
              sx={{
                bgcolor: "#FF6B35",
                color: "white",
                fontWeight: 700,
                mb: 3,
                fontSize: "0.9rem",
              }}
            />
            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                color: "white",
                mb: 2,
                fontSize: { xs: "2rem", md: "3rem" },
              }}
            >
              Healthcare Deals
              <br />
              <Box component="span" sx={{ color: "#FFD700" }}>
                Up to 70% OFF
              </Box>
            </Typography>
            <Typography
              variant="h6"
              sx={{ color: "rgba(255,255,255,0.9)", mb: 4, maxWidth: "600px" }}
            >
              Exclusive discounts on medical supplies. Quality products at unbeatable prices.
            </Typography>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Button
                variant="contained"
                startIcon={<LocalOffer />}
                sx={{
                  bgcolor: "#FF6B35",
                  color: "white",
                  fontWeight: 700,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    bgcolor: "#FF5500",
                  },
                }}
              >
                Shop Now
              </Button>
              <Button
                variant="outlined"
                sx={{
                  borderColor: "white",
                  color: "white",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "white",
                    bgcolor: "rgba(255,255,255,0.1)",
                  },
                }}
              >
                View All Categories
              </Button>
            </Box>
          </Box>
        </Container>

        {/* Decorative elements */}
        <Box
          sx={{
            position: "absolute",
            top: 0,
            right: 0,
            width: "300px",
            height: "300px",
            background: "radial-gradient(circle, rgba(255,107,53,0.2) 0%, transparent 70%)",
            borderRadius: "50%",
          }}
        />
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Container maxWidth="xl" sx={{ py: 6 }}>
        {/* ================= CATEGORY FILTERS ================= */}
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 4,
            borderRadius: 3,
            bgcolor: "white",
            border: "1px solid #E8E8E8",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Typography variant="h5" fontWeight={700} color="#1A5276">
              Special Offers by Category
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Chip
                icon={<Timer />}
                label="Ends in 48:00:00"
                color="error"
                sx={{ fontWeight: 600 }}
              />
              <Chip
                icon={<TrendingUp />}
                label={`${filteredProducts.length} Deals`}
                sx={{ bgcolor: "#1A5276", color: "white", fontWeight: 600 }}
              />
            </Box>
          </Box>

          {/* Category Tabs */}
          <Tabs
            value={activeCategory}
            onChange={(e, newValue) => setActiveCategory(newValue)}
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1A5276",
                height: 3,
              },
              "& .MuiTab-root": {
                textTransform: "none",
                fontSize: "1rem",
                fontWeight: 600,
                minHeight: 60,
                "&.Mui-selected": {
                  color: "#1A5276",
                },
              },
            }}
          >
            {CATEGORIES.map((cat) => (
              <Tab
                key={cat.value}
                value={cat.value}
                label={
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        bgcolor: activeCategory === cat.value ? "#1A5276" : "#F0F0F0",
                        color: activeCategory === cat.value ? "white" : "#666",
                      }}
                    >
                      {cat.icon}
                    </Avatar>
                    <Box sx={{ textAlign: "left" }}>
                      <Typography variant="body2" fontWeight={600}>
                        {cat.label}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {allProducts.filter(p => p.category === cat.value && p.is_active === 1).length} offers
                      </Typography>
                    </Box>
                  </Box>
                }
              />
            ))}
          </Tabs>
        </Paper>

        {/* ================= PRODUCTS SECTION ================= */}
        {loading ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <LinearProgress sx={{ width: "100%", maxWidth: 400, mx: "auto", mb: 2 }} />
            <Typography color="text.secondary">Loading amazing deals...</Typography>
          </Box>
        ) : (
          <Box>
            {/* Section Header */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" fontWeight={700} color="#1A5276" gutterBottom>
                {CATEGORIES.find((c) => c.value === activeCategory)?.label} Deals
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Don't miss these exclusive offers. Limited quantities available!
              </Typography>
            </Box>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <Paper
                sx={{
                  p: 8,
                  textAlign: "center",
                  borderRadius: 3,
                  bgcolor: "white",
                }}
              >
                <LocalOffer sx={{ fontSize: 80, color: "#E0E0E0", mb: 3 }} />
                <Typography variant="h5" color="text.secondary" gutterBottom>
                  No Current Offers
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
                  Check back soon for new deals in this category!
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => setActiveCategory("medicines")}
                  sx={{
                    borderColor: "#1A5276",
                    color: "#1A5276",
                    fontWeight: 600,
                  }}
                >
                  View All Categories
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={3}>
                {filteredProducts.map((product) => {
                  const savings = calculateSavings(
                    product.original_price,
                    product.offer_price
                  );
                  const savingsPercentage = calculateSavingsPercentage(
                    product.original_price,
                    product.offer_price
                  );
                  const stockStatus = getStockStatus(product.stock);

                  return (
                    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                      <Card
                        sx={{
                          height: "100%",
                          borderRadius: 3,
                          overflow: "visible",
                          position: "relative",
                          transition: "all 0.3s ease",
                          border: "1px solid #E8E8E8",
                          "&:hover": {
                            transform: "translateY(-4px)",
                            boxShadow: "0 16px 40px rgba(0,0,0,0.12)",
                            borderColor: "#1A5276",
                          },
                        }}
                      >
                        {/* TOP RIBBON */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: -10,
                            left: 16,
                            right: 16,
                            zIndex: 2,
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Chip
                              label={`${product.discount_percent}% OFF`}
                              sx={{
                                bgcolor: "#FF6B35",
                                color: "white",
                                fontWeight: 800,
                                fontSize: "0.875rem",
                                height: 28,
                              }}
                              icon={<Percent sx={{ fontSize: 16 }} />}
                            />
                            <Chip
                              label={`Save ₹${savings}`}
                              sx={{
                                bgcolor: "#27AE60",
                                color: "white",
                                fontWeight: 600,
                                fontSize: "0.75rem",
                              }}
                            />
                          </Box>
                        </Box>

                        {/* QUICK ACTION BUTTONS */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 30,
                            right: 12,
                            zIndex: 2,
                            display: "flex",
                            flexDirection: "column",
                            gap: 1,
                            opacity: 0,
                            transition: "opacity 0.3s ease",
                            ".MuiCard-root:hover &": {
                              opacity: 1,
                            },
                          }}
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleWishlist(product)}
                            sx={{
                              bgcolor: "white",
                              boxShadow: 1,
                              "&:hover": { bgcolor: "#FFF0F0" },
                            }}
                          >
                            <FavoriteBorder sx={{ fontSize: 18, color: "#E74C3C" }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleCompare(product)}
                            sx={{
                              bgcolor: "white",
                              boxShadow: 1,
                              "&:hover": { bgcolor: "#F0F8FF" },
                            }}
                          >
                            <CompareArrows sx={{ fontSize: 18, color: "#1A5276" }} />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleQuickView(product)}
                            sx={{
                              bgcolor: "white",
                              boxShadow: 1,
                              "&:hover": { bgcolor: "#F0F0F0" },
                            }}
                          >
                            <Visibility sx={{ fontSize: 18, color: "#666" }} />
                          </IconButton>
                        </Box>

                        {/* PRODUCT IMAGE */}
                        <Box
                          sx={{
                            p: 3,
                            pt: 4,
                            bgcolor: "#F8FAFC",
                            borderBottom: "1px solid #E8E8E8",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: 180,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              position: "relative",
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
                                maxHeight: "100%",
                                maxWidth: "100%",
                                objectFit: "contain",
                              }}
                            />
                            {product.stock <= 10 && (
                              <Box
                                sx={{
                                  position: "absolute",
                                  bottom: 0,
                                  left: 0,
                                  right: 0,
                                  bgcolor: "rgba(231, 76, 60, 0.9)",
                                  color: "white",
                                  textAlign: "center",
                                  py: 0.5,
                                }}
                              >
                                <Typography variant="caption" fontWeight={600}>
                                  Almost Gone!
                                </Typography>
                              </Box>
                            )}
                          </Box>
                        </Box>

                        {/* PRODUCT INFO */}
                        <CardContent sx={{ p: 3 }}>
                          {/* CATEGORY */}
                          <Chip
                            label={product.category}
                            size="small"
                            sx={{
                              mb: 2,
                              bgcolor: "#E8F4FD",
                              color: "#1A5276",
                              fontWeight: 500,
                            }}
                          />

                          {/* TITLE */}
                          <Typography
                            variant="body1"
                            fontWeight={600}
                            sx={{
                              mb: 2,
                              minHeight: 44,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product.title}
                          </Typography>

                          {/* PRICING */}
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 1 }}>
                              <Typography
                                variant="h5"
                                fontWeight={800}
                                color="#1A5276"
                              >
                                ₹{product.offer_price}
                              </Typography>
                              <Typography
                                variant="body2"
                                color="text.secondary"
                                sx={{ textDecoration: "line-through" }}
                              >
                                ₹{product.original_price}
                              </Typography>
                            </Box>
                            <Typography variant="caption" color="text.secondary">
                              You save {savingsPercentage}%
                            </Typography>
                          </Box>

                          {/* STOCK AND RATING */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                              mb: 3,
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Inventory sx={{ fontSize: 16, color: stockStatus.color }} />
                              <Typography variant="body2" sx={{ color: stockStatus.color }}>
                                {stockStatus.label}
                              </Typography>
                            </Box>
                            {product.rating && (
                              <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                                <Star sx={{ fontSize: 16, color: "#FFD700" }} />
                                <Typography variant="body2" fontWeight={600}>
                                  {product.rating}
                                </Typography>
                              </Box>
                            )}
                          </Box>

                          {/* ACTION BUTTON */}
                          <Button
                            fullWidth
                            variant="contained"
                            startIcon={<ShoppingCart />}
                            onClick={() => handleAddToCart(product)}
                            sx={{
                              py: 1.5,
                              borderRadius: 2,
                              bgcolor: "#1A5276",
                              fontWeight: 700,
                              textTransform: "none",
                              fontSize: "1rem",
                              "&:hover": {
                                bgcolor: "#154360",
                              },
                            }}
                          >
                            Add to Cart
                          </Button>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/* BOTTOM BANNER */}
            {filteredProducts.length > 0 && (
              <Paper
                sx={{
                  mt: 6,
                  p: 4,
                  borderRadius: 3,
                  background: "linear-gradient(135deg, #1A5276 0%, #2E86C1 100%)",
                  color: "white",
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
                  <NewReleases sx={{ fontSize: 48 }} />
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      Limited Time Offer Ending Soon!
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      These exclusive deals are available for a limited time only. 
                      Prices will go back to normal in 48 hours. Don't miss out!
                    </Typography>
                  </Box>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "white",
                      color: "#1A5276",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "#F8F9FA",
                      },
                    }}
                  >
                    Shop All Deals
                  </Button>
                </Box>
              </Paper>
            )}
          </Box>
        )}
      </Container>

      {/* ================= SNACKBAR ================= */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          severity="success"
          variant="filled"
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          sx={{ bgcolor: "#1A5276" }}
        >
          <CheckCircle sx={{ mr: 1 }} />
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Offers;
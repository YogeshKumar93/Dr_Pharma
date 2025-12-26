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
  Alert,
  Snackbar,
  Container,
  Avatar,
  IconButton,
  Rating,
  Divider,
} from "@mui/material";
import {
  LocalOffer,
  Whatshot,
  TrendingUp,
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
  Euro,
  ArrowDropDown,
  Star,
  StarBorder,
  CardGiftcard,
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
  const [viewMode, setViewMode] = useState("grid");
  const BASE_URL = "http://localhost:8000";

  useEffect(() => {
    fetchAllProducts();
  }, []);

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

  const filteredProducts = allProducts.filter(
    (item) => item.category === activeCategory && item.is_active === 1
  );

  const calculateSavings = (original, offer) => {
    return original - offer;
  };

  const calculateSavingsPercentage = (original, offer) => {
    return Math.round(((original - offer) / original) * 100);
  };

  const getStockStatus = (stock) => {
    if (stock > 20) return { color: "#10B981", label: "In Stock" };
    if (stock > 10) return { color: "#F59E0B", label: "Low Stock" };
    return { color: "#EF4444", label: "Limited" };
  };

  const handleAddToCart = (product) => {
    setSnackbar({
      open: true,
      message: `${product.title} added to cart!`,
    });
  };

  const handleQuickView = (product) => {
    console.log("Quick view:", product);
  };

  const handleWishlist = (product) => {
    setSnackbar({
      open: true,
      message: `${product.title} added to wishlist!`,
    });
  };

  const handleCompare = (product) => {
    setSnackbar({
      open: true,
      message: `${product.title} added to compare!`,
    });
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#FDFCFA",
        mt: -13,
        backgroundImage: "radial-gradient(#E5E7EB 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      {/* ================= HERO BANNER ================= */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #059669 0%, #10B981 100%)",
          py: { xs: 8, md: 10 },
          px: 3,
          position: "relative",
          overflow: "hidden",
          clipPath: "polygon(0 0, 100% 0, 100% 90%, 0 100%)",
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Box sx={{ position: "relative", zIndex: 1 }}>
                <Chip
                  icon={<FlashOn />}
                  label="EXCLUSIVE DEALS"
                  sx={{
                    bgcolor: "#FFFFFF",
                    color: "#059669",
                    fontWeight: 700,
                    mb: 3,
                    fontSize: "0.9rem",
                    height: 32,
                  }}
                />
                <Typography
                  variant="h1"
                  fontWeight={800}
                  sx={{
                    color: "white",
                    mb: 2,
                    fontSize: { xs: "2.5rem", md: "3.75rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Healthcare
                  <br />
                  <Box component="span" sx={{ color: "#FFD700" }}>
                    Mega Sale
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{ color: "rgba(255,255,255,0.95)", mb: 4, maxWidth: "600px" }}
                >
                  Premium medical products at unbeatable prices. Quality healthcare made affordable.
                </Typography>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                  <Button
                    variant="contained"
                    startIcon={<LocalOffer />}
                    sx={{
                      bgcolor: "#FFFFFF",
                      color: "#059669",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: "12px",
                      fontSize: "1rem",
                      "&:hover": {
                        bgcolor: "#F0FDF4",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Explore Offers
                  </Button>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Timer sx={{ color: "#FFD700" }} />
                    <Typography variant="body2" sx={{ color: "white", fontWeight: 600 }}>
                      Ends in 48:00:00
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={5}>
              <Box
                sx={{
                  position: "relative",
                  textAlign: "center",
                }}
              >
                <Box
                  sx={{
                    width: 300,
                    height: 300,
                    mx: "auto",
                    background: "radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Box
                    sx={{
                      width: 240,
                      height: 240,
                      background: "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 100%)",
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Typography
                      variant="h1"
                      fontWeight={900}
                      sx={{
                        color: "white",
                        fontSize: "4rem",
                        textShadow: "0 4px 20px rgba(0,0,0,0.2)",
                      }}
                    >
                      70% OFF
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>

        {/* Decorative waves */}
        <Box
          sx={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "100px",
            background: "url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDBweCIgdmlld0JveD0iMCAwIDEyODAgMTQwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPjxwYXRoIGQ9Ik0xMjgwIDE0MEwwIDE0MFYwYzMyMCA0MCA2NDAgODAgMTI4MCA4MHYxNDB6IiBmaWxsPSIjRkRGQ0ZBIi8+PC9zdmc+')",
            backgroundSize: "cover",
          }}
        />
      </Box>

      {/* ================= MAIN CONTENT ================= */}
      <Container maxWidth="xl" sx={{ py: 6, mt: -8 }}>
        {/* ================= CATEGORY SELECTOR ================= */}
        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            borderRadius: 4,
            bgcolor: "white",
            border: "2px solid #F3F4F6",
            boxShadow: "0 4px 24px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            variant="h4"
            fontWeight={800}
            color="#1F2937"
            gutterBottom
            sx={{ mb: 4 }}
          >
            Browse by Category
          </Typography>
          
          <Grid container spacing={2}>
            {CATEGORIES.map((cat) => (
              <Grid item xs={6} sm={4} md={2.4} key={cat.value}>
                <Card
                  elevation={0}
                  onClick={() => setActiveCategory(cat.value)}
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    cursor: "pointer",
                    textAlign: "center",
                    bgcolor: activeCategory === cat.value ? "#F0FDF4" : "#F9FAFB",
                    border: activeCategory === cat.value 
                      ? "2px solid #10B981" 
                      : "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 12px 24px rgba(16, 185, 129, 0.1)",
                    },
                  }}
                >
                  <Avatar
                    sx={{
                      width: 56,
                      height: 56,
                      mx: "auto",
                      mb: 2,
                      bgcolor: activeCategory === cat.value ? "#10B981" : "#E5E7EB",
                      color: activeCategory === cat.value ? "white" : "#6B7280",
                      fontSize: "1.5rem",
                    }}
                  >
                    {cat.icon}
                  </Avatar>
                  <Typography
                    variant="body1"
                    fontWeight={600}
                    color={activeCategory === cat.value ? "#059669" : "#374151"}
                  >
                    {cat.label}
                  </Typography>
                  <Typography variant="caption" color="#6B7280">
                    {allProducts.filter(p => p.category === cat.value && p.is_active === 1).length} offers
                  </Typography>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Paper>

        {/* ================= PRODUCTS SECTION ================= */}
        {loading ? (
          <Box sx={{ textAlign: "center", py: 12 }}>
            <LinearProgress 
              sx={{ 
                width: "100%", 
                maxWidth: 400, 
                mx: "auto", 
                mb: 2,
                height: 8,
                borderRadius: 4,
                bgcolor: "#F3F4F6",
                "& .MuiLinearProgress-bar": {
                  bgcolor: "#10B981",
                  borderRadius: 4,
                }
              }} 
            />
            <Typography variant="h6" color="text.secondary">
              Loading exclusive deals...
            </Typography>
          </Box>
        ) : (
          <Box>
            {/* Section Header */}
            <Box sx={{ mb: 6, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Box>
                <Typography variant="h3" fontWeight={800} color="#1F2937" gutterBottom>
                  {CATEGORIES.find((c) => c.value === activeCategory)?.label} Deals
                </Typography>
                <Typography variant="body1" color="#6B7280">
                  Exclusive discounts on quality healthcare products
                </Typography>
              </Box>
              <Chip
                icon={<TrendingUp />}
                label={`${filteredProducts.length} Products`}
                sx={{ 
                  bgcolor: "#10B981", 
                  color: "white", 
                  fontWeight: 700,
                  fontSize: "0.875rem",
                  height: 40,
                }}
              />
            </Box>

            {/* Products Grid */}
            {filteredProducts.length === 0 ? (
              <Paper
                sx={{
                  p: 12,
                  textAlign: "center",
                  borderRadius: 4,
                  bgcolor: "white",
                  border: "2px dashed #E5E7EB",
                }}
              >
                <LocalOffer sx={{ fontSize: 80, color: "#D1D5DB", mb: 3 }} />
                <Typography variant="h5" color="#6B7280" gutterBottom>
                  No Deals Available
                </Typography>
                <Typography variant="body1" color="#6B7280" sx={{ mb: 4 }}>
                  Check back soon for new offers in this category!
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => setActiveCategory("medicines")}
                  sx={{
                    bgcolor: "#10B981",
                    color: "white",
                    fontWeight: 600,
                    px: 4,
                    py: 1.5,
                    borderRadius: 3,
                  }}
                >
                  View All Categories
                </Button>
              </Paper>
            ) : (
              <Grid container spacing={4}>
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
                          borderRadius: 4,
                          overflow: "hidden",
                          position: "relative",
                          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                          bgcolor: "white",
                          border: "2px solid #F3F4F6",
                          "&:hover": {
                            transform: "translateY(-8px)",
                            boxShadow: "0 24px 48px rgba(0,0,0,0.12)",
                            borderColor: "#10B981",
                          },
                        }}
                      >
                        {/* SALE BADGE */}
                        <Box
                          sx={{
                            position: "absolute",
                            top: 16,
                            left: 16,
                            zIndex: 2,
                          }}
                        >
                          <Box
                            sx={{
                              bgcolor: "#EF4444",
                              color: "white",
                              px: 2,
                              py: 0.5,
                              borderRadius: 2,
                              fontWeight: 900,
                              fontSize: "0.875rem",
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                            }}
                          >
                            <ArrowDropDown />
                            {savingsPercentage}%
                          </Box>
                        </Box>

                        {/* WISHLIST BUTTON */}
                        <IconButton
                          onClick={() => handleWishlist(product)}
                          sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            zIndex: 2,
                            bgcolor: "white",
                            boxShadow: 2,
                            "&:hover": { bgcolor: "#FEF2F2" },
                          }}
                        >
                          <FavoriteBorder sx={{ color: "#DC2626" }} />
                        </IconButton>

                        {/* PRODUCT IMAGE */}
                        <Box
                          sx={{
                            p: 3,
                            bgcolor: "#F9FAFB",
                            borderBottom: "2px solid #F3F4F6",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: 200,
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
                                transition: "transform 0.3s ease",
                                "&:hover": {
                                  transform: "scale(1.05)",
                                },
                              }}
                            />
                          </Box>
                        </Box>

                        {/* PRODUCT INFO */}
                        <CardContent sx={{ p: 3 }}>
                          {/* CATEGORY */}
                          <Typography
                            variant="caption"
                            sx={{
                              color: "#6B7280",
                              fontWeight: 500,
                              letterSpacing: "0.05em",
                              display: "block",
                              mb: 1,
                            }}
                          >
                            {product.category.toUpperCase()}
                          </Typography>

                          {/* TITLE */}
                          <Typography
                            variant="h6"
                            fontWeight={600}
                            sx={{
                              mb: 2,
                              minHeight: 48,
                              color: "#1F2937",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                              display: "-webkit-box",
                              WebkitLineClamp: 2,
                              WebkitBoxOrient: "vertical",
                            }}
                          >
                            {product.title}
                          </Typography>

                          {/* RATING */}
                          {product.rating && (
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
                              <Rating
                                value={product.rating}
                                precision={0.5}
                                size="small"
                                readOnly
                                emptyIcon={<StarBorder sx={{ color: "#D1D5DB" }} />}
                                icon={<Star sx={{ color: "#FBBF24" }} />}
                              />
                              <Typography variant="caption" color="#6B7280">
                                ({product.rating})
                              </Typography>
                            </Box>
                          )}

                          {/* PRICING */}
                          <Box sx={{ mb: 3 }}>
                            <Box sx={{ display: "flex", alignItems: "baseline", gap: 2, mb: 1 }}>
                              <Typography
                                variant="h4"
                                fontWeight={800}
                                color="#059669"
                              >
                                ₹{product.offer_price}
                              </Typography>
                              <Typography
                                variant="body1"
                                color="#9CA3AF"
                                sx={{ textDecoration: "line-through" }}
                              >
                                ₹{product.original_price}
                              </Typography>
                            </Box>
                            <Typography variant="body2" color="#059669" fontWeight={600}>
                              Save ₹{savings} ({savingsPercentage}% OFF)
                            </Typography>
                          </Box>

                          <Divider sx={{ my: 2 }} />

                          {/* STOCK AND ACTIONS */}
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                              alignItems: "center",
                            }}
                          >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                              <Box
                                sx={{
                                  width: 8,
                                  height: 8,
                                  borderRadius: "50%",
                                  bgcolor: stockStatus.color,
                                }}
                              />
                              <Typography variant="body2" color={stockStatus.color}>
                                {stockStatus.label}
                              </Typography>
                            </Box>
                            
                            <Box sx={{ display: "flex", gap: 1 }}>
                              <IconButton
                                size="small"
                                onClick={() => handleQuickView(product)}
                                sx={{
                                  border: "1px solid #E5E7EB",
                                  color: "#6B7280",
                                }}
                              >
                                <Visibility />
                              </IconButton>
                              <Button
                                variant="contained"
                                startIcon={<ShoppingCart />}
                                onClick={() => handleAddToCart(product)}
                                sx={{
                                  bgcolor: "#10B981",
                                  color: "white",
                                  fontWeight: 700,
                                  borderRadius: 3,
                                  px: 2,
                                  "&:hover": {
                                    bgcolor: "#059669",
                                  },
                                }}
                              >
                                Add
                              </Button>
                            </Box>
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            )}

            {/* BOTTOM CTA */}
            {filteredProducts.length > 0 && (
              <Paper
                sx={{
                  mt: 8,
                  p: 5,
                  borderRadius: 4,
                  background: "linear-gradient(135deg, #1F2937 0%, #374151 100%)",
                  color: "white",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Grid container alignItems="center" spacing={4}>
                  <Grid item xs={12} md={8}>
                    <Typography variant="h4" fontWeight={800} gutterBottom>
                      Don't Miss Out!
                    </Typography>
                    <Typography variant="body1" sx={{ color: "#D1D5DB", mb: 3 }}>
                      These exclusive healthcare deals are available for a limited time only. 
                      Stock up on quality products while prices are at their lowest.
                    </Typography>
                    <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                      <Button
                        variant="contained"
                        endIcon={<ArrowForward />}
                        sx={{
                          bgcolor: "#10B981",
                          color: "white",
                          fontWeight: 700,
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          "&:hover": {
                            bgcolor: "#059669",
                          },
                        }}
                      >
                        View All Offers
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<CardGiftcard />}
                        sx={{
                          borderColor: "white",
                          color: "white",
                          fontWeight: 600,
                          px: 4,
                          py: 1.5,
                          borderRadius: 3,
                          "&:hover": {
                            borderColor: "white",
                            bgcolor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        Gift Cards
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <Box
                      sx={{
                        textAlign: "center",
                        p: 3,
                        bgcolor: "rgba(255,255,255,0.1)",
                        borderRadius: 3,
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Timer sx={{ fontSize: 48, mb: 2, color: "#10B981" }} />
                      <Typography variant="h6" fontWeight={700}>
                        Limited Time
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#D1D5DB" }}>
                        Offer ends in
                      </Typography>
                      <Typography variant="h5" fontWeight={900} sx={{ color: "#10B981", mt: 1 }}>
                        48:00:00
                      </Typography>
                    </Box>
                  </Grid>
                </Grid>
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
          sx={{
            bgcolor: "#10B981",
            borderRadius: 2,
            fontWeight: 600,
          }}
        >
          <CheckCircle sx={{ mr: 1 }} />
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Offers;
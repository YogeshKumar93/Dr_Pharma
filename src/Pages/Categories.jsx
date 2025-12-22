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
  Button,
  LinearProgress,
  Fade,
} from "@mui/material";
import {
  MedicalInformation,
  LocalPharmacy,
  Science,
  MedicalServices,
  Vaccines,
  FavoriteBorder,
  AddShoppingCart,
  Star,
} from "@mui/icons-material";
import { apiCall } from "../api/api";

const CATEGORIES = [
  { label: "Medicines", value: "medicines", icon: <LocalPharmacy /> },
  { label: "Medical Instruments", value: "medical instruments", icon: <MedicalServices /> },
  { label: "Syrups", value: "syrups", icon: <Science /> },
  { label: "Kits", value: "kits", icon: <MedicalInformation /> },
  { label: "Supplements", value: "supplements", icon: <Vaccines /> },
];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("medicines");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      setLoading(true);
      const { response, error } = await apiCall("GET", "products");

      if (error) {
        setAllProducts([]);
        return;
      }

      const products =
        response?.data || response?.products || response || [];

      setAllProducts(Array.isArray(products) ? products : []);
    } catch (err) {
      console.error(err);
      setAllProducts([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ FILTER PRODUCTS CATEGORY WISE
  const filteredProducts = allProducts.filter(
    (item) => item.category === activeCategory
  );

  // Generate random rating for demo (you can remove this if you have actual ratings)
  const getRandomRating = () => (Math.random() * 2 + 3).toFixed(1);

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
      minHeight: "100vh"
    }}>
      {/* HEADER SECTION */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700,
            color: "#1a237e",
            mb: 1,
            fontSize: { xs: "1.75rem", md: "2.5rem" }
          }}
        >
          Healthcare Products
        </Typography>
        <Typography 
          variant="subtitle1" 
          sx={{ color: "#5c6bc0", maxWidth: "600px", mx: "auto" }}
        >
          Discover high-quality medical products categorized for your convenience
        </Typography>
      </Box>

      {/* CATEGORY BAR - Enhanced Design */}
      <Paper 
        elevation={3}
        sx={{ 
          display: "flex", 
          mb: 4,
          borderRadius: "16px",
          overflow: "hidden",
          background: "white",
          border: "1px solid #e0e7ff",
          p: 1
        }}
      >
        {CATEGORIES.map((cat) => (
          <ListItemButton
            key={cat.value}
            selected={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
            sx={{
              px: 3,
              py: 2,
              borderRadius: "12px",
              mx: 0.5,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minWidth: "120px",
              transition: "all 0.3s ease",
              "&:hover": {
                backgroundColor: "#f0f4ff",
                transform: "translateY(-2px)",
              },
              "&.Mui-selected": {
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                boxShadow: "0 6px 20px rgba(102, 126, 234, 0.3)",
                "& .MuiListItemText-primary": {
                  color: "white",
                  fontWeight: 600,
                },
                "& .MuiSvgIcon-root": {
                  color: "white",
                },
              },
            }}
          >
            <Box sx={{ mb: 1, fontSize: "24px" }}>
              {cat.icon}
            </Box>
            <ListItemText 
              primary={cat.label} 
              primaryTypographyProps={{
                fontSize: "0.9rem",
                fontWeight: 500,
                textAlign: "center"
              }}
            />
          </ListItemButton>
        ))}
      </Paper>

      {/* CATEGORY TITLE */}
      <Box sx={{ mb: 3, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a237e" }}>
            {CATEGORIES.find((c) => c.value === activeCategory)?.label}
          </Typography>
          <Typography variant="body2" sx={{ color: "#78909c", mt: 0.5 }}>
            {filteredProducts.length} products available
          </Typography>
        </Box>
        <Chip 
          label="Prescription Required" 
          size="small" 
          sx={{ 
            bgcolor: "#fff3e0", 
            color: "#ef6c00",
            fontWeight: 500
          }} 
        />
      </Box>

      {/* LOADING INDICATOR */}
      {loading && (
        <Box sx={{ width: "100%", mb: 3 }}>
          <LinearProgress 
            sx={{ 
              height: 8, 
              borderRadius: 4,
              backgroundColor: "#e3f2fd",
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #667eea 0%, #764ba2 100%)",
              }
            }} 
          />
        </Box>
      )}

      {/* PRODUCTS SECTION */}
      <Fade in={!loading} timeout={500}>
        <Box>
          {loading ? (
            <Box sx={{ textAlign: "center", py: 8 }}>
              <Typography variant="h6" sx={{ color: "#5c6bc0" }}>
                Loading products...
              </Typography>
            </Box>
          ) : filteredProducts.length === 0 ? (
            <Paper 
              elevation={0}
              sx={{ 
                textAlign: "center", 
                py: 8, 
                borderRadius: "16px",
                bgcolor: "#f8fdff",
                border: "2px dashed #bbdefb"
              }}
            >
              <LocalPharmacy sx={{ fontSize: 60, color: "#90a4ae", mb: 2 }} />
              <Typography variant="h6" sx={{ color: "#546e7a", mb: 1 }}>
                No products found
              </Typography>
              <Typography variant="body2" sx={{ color: "#78909c", maxWidth: "400px", mx: "auto" }}>
                We couldn't find any products in this category. Please check back later or browse other categories.
              </Typography>
            </Paper>
          ) : (
            <Grid container spacing={3}>
              {filteredProducts.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
                  <Card 
                    sx={{ 
                      height: "100%",
                      borderRadius: "16px",
                      overflow: "hidden",
                      transition: "all 0.3s ease",
                      border: "1px solid #e8eaf6",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 20px 40px rgba(102, 126, 234, 0.15)",
                        borderColor: "#667eea",
                      }
                    }}
                  >
                    {/* PRODUCT IMAGE WITH OVERLAY */}
                    <Box sx={{ position: "relative" }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={product.image || "/no-image.png"}
                        alt={product.name}
                        sx={{ 
                          objectFit: "cover",
                          bgcolor: "#f5f7ff"
                        }}
                      />
                      <Box 
                        sx={{ 
                          position: "absolute", 
                          top: 12, 
                          right: 12,
                          display: "flex",
                          gap: 1
                        }}
                      >
                        <Button 
                          size="small" 
                          sx={{ 
                            minWidth: "auto", 
                            p: 0.5,
                            bgcolor: "white",
                            borderRadius: "50%",
                            "&:hover": { bgcolor: "#fff" }
                          }}
                        >
                          <FavoriteBorder sx={{ fontSize: 20, color: "#f44336" }} />
                        </Button>
                      </Box>
                      {product.discount && (
                        <Chip 
                          label={`${product.discount}% OFF`}
                          size="small"
                          sx={{ 
                            position: "absolute",
                            top: 12,
                            left: 12,
                            bgcolor: "#ff4081",
                            color: "white",
                            fontWeight: "bold",
                            fontSize: "0.75rem"
                          }}
                        />
                      )}
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      {/* CATEGORY TAG */}
                      <Chip 
                        label={product.category || activeCategory}
                        size="small"
                        sx={{ 
                          mb: 2,
                          bgcolor: "#e8eaf6",
                          color: "#3f51b5",
                          fontSize: "0.7rem",
                          fontWeight: 500
                        }}
                      />

                      {/* PRODUCT NAME */}
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          fontWeight: 600,
                          color: "#1a237e",
                          mb: 1,
                          fontSize: "1rem",
                          lineHeight: 1.4,
                          height: "2.8rem",
                          overflow: "hidden",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical"
                        }}
                      >
                        {product.name}
                      </Typography>

                      {/* RATING */}
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Star sx={{ fontSize: 16, color: "#ffb300" }} />
                        <Typography variant="body2" sx={{ ml: 0.5, color: "#5c6bc0", fontWeight: 500 }}>
                          {getRandomRating()}
                        </Typography>
                        <Typography variant="caption" sx={{ ml: 1, color: "#90a4ae" }}>
                          ({(Math.floor(Math.random() * 100) + 50)} reviews)
                        </Typography>
                      </Box>

                      {/* PRICE AND ACTIONS */}
                      <Box sx={{ 
                        display: "flex", 
                        alignItems: "center", 
                        justifyContent: "space-between",
                        mt: "auto"
                      }}>
                        <Box>
                          <Typography 
                            variant="h6" 
                            sx={{ 
                              fontWeight: 700,
                              color: "#1a237e",
                              fontSize: "1.25rem"
                            }}
                          >
                            ₹{product.price}
                          </Typography>
                          {product.originalPrice && (
                            <Typography 
                              variant="caption" 
                              sx={{ 
                                textDecoration: "line-through",
                                color: "#90a4ae",
                                ml: 1
                              }}
                            >
                              ₹{product.originalPrice}
                            </Typography>
                          )}
                        </Box>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={<AddShoppingCart />}
                          sx={{
                            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                            borderRadius: "10px",
                            px: 2,
                            py: 0.75,
                            textTransform: "none",
                            fontWeight: 600,
                            "&:hover": {
                              background: "linear-gradient(135deg, #5a6fd8 0%, #6a4090 100%)",
                              boxShadow: "0 8px 16px rgba(102, 126, 234, 0.3)"
                            }
                          }}
                        >
                          Add to Cart
                        </Button>
                      </Box>

                      {/* STOCK STATUS */}
                      <Typography 
                        variant="caption" 
                        sx={{ 
                          display: "block",
                          mt: 2,
                          p: 1,
                          borderRadius: "6px",
                          bgcolor: product.inStock ? "#e8f5e9" : "#ffebee",
                          color: product.inStock ? "#2e7d32" : "#d32f2f",
                          textAlign: "center",
                          fontWeight: 500
                        }}
                      >
                        {product.inStock ? "✓ In Stock" : "✗ Out of Stock"}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Box>
      </Fade>

   
    </Box>
  );
};

export default Categories;
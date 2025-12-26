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
  Button,
  LinearProgress,
  Fade,
  Snackbar,
  Alert,
  IconButton,
  Modal,
  Chip,
} from "@mui/material";
import {
  MedicalInformation,
  LocalPharmacy,
  Science,
  MedicalServices,
  Vaccines,
  ArrowForward,
  Close,
  MedicalInformationOutlined,
} from "@mui/icons-material";
import { apiCall } from "../api/api";
import { useCart } from "../Contexts/CartContext";

const CATEGORIES = [
  { label: "Medicines", value: "medicines", icon: <LocalPharmacy /> },
  { label: "Medical Instruments", value: "medical instruments", icon: <MedicalServices /> },
  { label: "Syrups", value: "syrups", icon: <Science /> },
  { label: "Kits", value: "kits", icon: <MedicalInformation /> },
  { label: "Supplements", value: "supplements", icon: <Vaccines /> },
  {
  label: "Prescribed Medicines",
  value: "prescribed",
  icon: <MedicalInformationOutlined />,
}

];

const Categories = () => {
  const [activeCategory, setActiveCategory] = useState("medicines");
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const { addToCart } = useCart();
  const [addedItems, setAddedItems] = useState({});
  const [openSnack, setOpenSnack] = useState(false);

 useEffect(() => {
  fetchAllProducts(activeCategory);
}, []);


 const fetchAllProducts = async (categoryValue) => {
  try {
    setLoading(true);

    let endpoint = "products";

    // 🔥 prescribed tab
    if (categoryValue === "prescribed") {
      endpoint = "products?prescribed=1";
    }

    const { response, error } = await apiCall("GET", endpoint);

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


 const filteredProducts =
  activeCategory === "prescribed"
    ? allProducts // already filtered by backend
    : allProducts.filter(
        (item) => item.category === activeCategory
      );


  const handleAddToCart = (product) => {
    const id = product._id || product.id;

    addToCart({
      id: id,
      title: product.title,
      price: product.price,
      image: product.image,
      quantity: 1,
    });

    setAddedItems((prev) => ({
      ...prev,
      [id]: true,
    }));

    setOpenSnack(true);
  };

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Box
      sx={{
        p: { xs: 2, md: 4 },
        mt: -13,
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
        minHeight: "100vh",
      }}
    >
      {/* HEADER */}
      <Box sx={{ mb: 4, textAlign: "center" }}>
        <Typography variant="h4" fontWeight={700} color="#1a237e">
          Healthcare Products
        </Typography>
        <Typography variant="subtitle1" color="#5c6bc0">
          Discover high-quality medical products
        </Typography>
      </Box>

      {/* CATEGORY BAR */}
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          mb: 4,
          borderRadius: 3,
          p: 1,
          overflowX: "auto",
        }}
      >
        {CATEGORIES.map((cat) => (
          <ListItemButton
            key={cat.value}
            selected={activeCategory === cat.value}
           onClick={() => {
  setActiveCategory(cat.value);
  fetchAllProducts(cat.value);
}}

            sx={{
              flexDirection: "column",
              minWidth: 120,
              mx: 0.5,
              borderRadius: 2,
              "&.Mui-selected": {
                bgcolor: "#1a237e",
                color: "#fff",
              },
            }}
          >
            {cat.icon}
            <ListItemText
              primary={cat.label}
              primaryTypographyProps={{
                fontSize: "0.85rem",
                fontWeight: 600,
                textAlign: "center",
              }}
            />
          </ListItemButton>
        ))}
      </Paper>

      {loading && <LinearProgress sx={{ mb: 3 }} />}

      {/* PRODUCTS */}
      <Fade in={!loading}>
        <Grid container spacing={3}>
          {filteredProducts.map((product) => {
            const id = product._id || product.id;

            return (
              <Grid item xs={12} sm={6} md={4} lg={3} key={id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                    transition: "0.3s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                      boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                    },
                  }}
                >
                  {/* IMAGE CONTAINER - Fixed aspect ratio */}
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      pt: "75%", // 4:3 aspect ratio
                      bgcolor: "#f9fafb",
                      borderBottom: "1px solid #e0e0e0",
                    }}
                  >
                    <Box
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        p: 2,
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={product.image || "/no-image.png"}
                        alt={product.title}
                        sx={{
                          maxWidth: "80%",
                          maxHeight: "80%",
                          objectFit: "contain",
                        }}
                      />
                    </Box>
                  </Box>

                  {/* CONTENT AREA - Consistent height */}
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                      pb: "16px !important",
                    }}
                  >
                    {/* PRODUCT TITLE - Fixed height with ellipsis */}
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
                        lineHeight: 1.2,
                      }}
                    >
                      {product.title}
                    </Typography>

                    {/* CATEGORY TAG */}
                    {product.category && (
                      <Chip
                        label={product.category}
                        size="small"
                        sx={{
                          mb: 1.5,
                          alignSelf: "flex-start",
                          fontSize: "0.7rem",
                          height: "20px",
                        }}
                      />
                    )}

                    {/* PRICE AND ACTIONS */}
                    <Box
                      sx={{
                        mt: "auto",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography
                        fontWeight={700}
                        color="#1a237e"
                        sx={{
                          fontSize: "1.1rem",
                        }}
                      >
                        ₹{product.price}
                      </Typography>

                      <Box sx={{ display: "flex", gap: 1 }}>
                        {/* VIEW DETAILS ARROW */}
                        <IconButton
                          size="small"
                          onClick={() => handleViewDetails(product)}
                          sx={{
                            color: "#1a237e",
                            bgcolor: "rgba(26, 35, 126, 0.1)",
                            "&:hover": {
                              bgcolor: "rgba(26, 35, 126, 0.2)",
                            },
                          }}
                        >
                          <ArrowForward fontSize="small" />
                        </IconButton>

                        {/* ADD TO CART BUTTON */}
                        <Button
                          size="small"
                          onClick={() => handleAddToCart(product)}
                          sx={{
                            minWidth: "80px",
                            bgcolor: addedItems[id] ? "#4CAF50" : "#1a237e",
                            color: "#fff",
                            fontWeight: 600,
                            textTransform: "none",
                            borderRadius: 2,
                            "&:hover": {
                              bgcolor: addedItems[id] ? "#43a047" : "#0d133d",
                            },
                          }}
                        >
                          {addedItems[id] ? "Added" : "Add"}
                        </Button>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Fade>

      {/* PRODUCT DETAILS MODAL */}
      <Modal
        open={modalOpen}
        onClose={handleCloseModal}
        aria-labelledby="product-details-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: { xs: "90%", sm: "70%", md: "500px" },
            maxHeight: "90vh",
            bgcolor: "background.paper",
            borderRadius: 3,
            boxShadow: 24,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* MODAL HEADER */}
          <Box
            sx={{
              p: 3,
              borderBottom: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography variant="h6" fontWeight={600}>
              Product Details
            </Typography>
            <IconButton onClick={handleCloseModal} size="small">
              <Close />
            </IconButton>
          </Box>

          {/* MODAL CONTENT */}
          <Box sx={{ overflow: "auto", flex: 1 }}>
            {selectedProduct && (
              <Box sx={{ p: 3 }}>
                {/* PRODUCT IMAGE */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    mb: 3,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={selectedProduct.image || "/no-image.png"}
                    alt={selectedProduct.title}
                    sx={{
                      maxHeight: "200px",
                      maxWidth: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>

                {/* PRODUCT TITLE */}
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  {selectedProduct.title}
                </Typography>

                {/* PRODUCT CATEGORY */}
                {selectedProduct.category && (
                  <Chip
                    label={selectedProduct.category}
                    sx={{ mb: 2 }}
                    color="primary"
                    size="small"
                  />
                )}

                {/* PRODUCT PRICE */}
                <Typography
                  variant="h5"
                  fontWeight={700}
                  color="#1a237e"
                  gutterBottom
                >
                  ₹{selectedProduct.price}
                </Typography>

                {/* PRODUCT DESCRIPTION */}
                <Typography
                  variant="body1"
                  sx={{
                    mt: 2,
                    color: "text.secondary",
                    lineHeight: 1.6,
                  }}
                >
                  {selectedProduct.description || 
                    "No detailed description available for this product. This is a high-quality healthcare product that meets all safety standards and regulations."}
                </Typography>

                {/* ADDITIONAL INFO */}
                <Box sx={{ mt: 3, pt: 2, borderTop: "1px solid #e0e0e0" }}>
                  <Typography variant="body2" color="text.secondary">
                    • Certified healthcare product
                    <br />
                    • Quality assured
                    <br />
                    • Safe for use
                  </Typography>
                </Box>
              </Box>
            )}
          </Box>

          {/* MODAL FOOTER */}
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              display: "flex",
              justifyContent: "flex-end",
              gap: 2,
            }}
          >
            <Button
              variant="outlined"
              onClick={handleCloseModal}
              sx={{ textTransform: "none" }}
            >
              Close
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                handleAddToCart(selectedProduct);
                handleCloseModal();
              }}
              sx={{
                bgcolor: "#1a237e",
                textTransform: "none",
                "&:hover": { bgcolor: "#0d133d" },
              }}
            >
              Add to Cart
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* SNACKBAR */}
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

export default Categories;
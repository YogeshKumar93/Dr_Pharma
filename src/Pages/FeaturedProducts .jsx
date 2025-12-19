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
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { apiCall } from "../api/api";
import { useCart } from "../Contexts/CartContext";

const FeaturedProducts = ({ limit }) => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [addedItems, setAddedItems] = useState({});
  const [openSnack, setOpenSnack] = useState(false);
  const [loading, setLoading] = useState(false);

  const { addToCart } = useCart();

const handleAddToCart = (product) => {
  addToCart(product);
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
      <Grid container spacing={4}>
        {Array.isArray(featuredProducts) &&
          featuredProducts.map((product, index) => (
            <Grid item xs={12} sm={6} md={3} key={product._id}>
              <Card sx={{ height: "100%", borderRadius: 3 }}>
                <Box sx={{ height: 180, p: 2 }}>
                  <CardMedia
                    component="img"
                    image={product.image}
                    alt={product.title}
                    sx={{ objectFit: "contain", height: "100%" }}
                  />
                </Box>

                <CardContent>
                  <Typography variant="caption">
                    {product.brand || "Healthcare"}
                  </Typography>

                  <Typography variant="h6">{product.title}</Typography>

                  <Typography variant="h6" color="#1a5276" mt={1}>
                    {product.price}
                  </Typography>

                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={() => handleAddToCart(product)}
                  >
                    {addedItems[index] ? "Added ✔" : "Add to Cart"}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
      </Grid>

      {/* View All */}
      {limit && (
        <Box sx={{ textAlign: "center", mt: 6 }}>
          <Button variant="outlined" endIcon={<ArrowForward />}>
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

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
} from "@mui/material";
import { apiCall } from "../api/api";
 

const CATEGORIES = [
  { label: "Medicines", value: "medicines" },
  { label: "Medical Instruments", value: "medical instruments" },
  { label: "Syrups", value: "syrups" },
  { label: "Kits", value: "kits" },
  { label: "Supplements", value: "supplements" },
];

const Offers = () => {
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

  return (
    <Box sx={{ p: 3 }}>
      {/* CATEGORY BAR */}
      <Paper sx={{ display: "flex", mb: 3 }}>
        {CATEGORIES.map((cat) => (
          <ListItemButton
            key={cat.value}
            selected={activeCategory === cat.value}
            onClick={() => setActiveCategory(cat.value)}
            sx={{
              px: 3,
              "&.Mui-selected": {
                bgcolor: "#f1f5ff",
                color: "#1a73e8",
                borderBottom: "3px solid #1a73e8",
              },
            }}
          >
            <ListItemText primary={cat.label} />
          </ListItemButton>
        ))}
      </Paper>

      {/* PRODUCTS SECTION */}
      <Typography variant="h6" sx={{ mb: 2 }}>
        {CATEGORIES.find((c) => c.value === activeCategory)?.label}
      </Typography>

      {loading ? (
        <Typography>Loading products...</Typography>
      ) : filteredProducts.length === 0 ? (
        <Typography color="text.secondary">
          No products found in this category
        </Typography>
      ) : (
        <Grid container spacing={2}>
          {filteredProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
              <Card sx={{ height: "100%" }}>
                <CardMedia
                  component="img"
                  height="160"
                  image={product.image || "/no-image.png"}
                  alt={product.name}
                />
                <CardContent>
                  <Typography fontSize={14} fontWeight={600}>
                    {product.name}
                  </Typography>
                  <Typography fontSize={13} color="text.secondary">
                    ₹{product.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default Offers;

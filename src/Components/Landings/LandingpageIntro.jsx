import { ArrowForward, CheckCircle, FavoriteBorder, Share, ShoppingCart } from "@mui/icons-material";
import { Box, Typography, Button, Grid, TextField, Card, CardContent, CardMedia, Chip, IconButton, Stack } from "@mui/material";
 import {
  LocalShipping,
  Verified,
  SupportAgent,
  Security,
  MedicalServices,
  Phone,
  Chat,
  Lock,
  MonetizationOn,
  AccessTime,
  LocalHospital,
  People,
  AutoGraph
} from '@mui/icons-material';
import React, { useState } from "react";

import FeaturedProducts from "../../Pages/FeaturedProducts ";


import { useCart } from "../../Contexts/CartContext";
import { Snackbar, Alert } from "@mui/material";
 
import { apiCall } from "../../api/api";
 



const categories = [
  { title: "Medicines", image: "/images/medicines.jpg" },
  { title: "Vitamins", image: "/images/vitamins.jpg" },
  { title: "Supplements", image: "/images/supplements.jpg" },
  { title: "Personal Care", image: "/images/personal-care.jpg" },
]; 

const featuredProducts = [
  {
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
    title: 'Vitamin C 500mg Tablets',
    brand: 'HealthPlus',
    price: '$12.99',
    originalPrice: '$15.99',
    discount: '20% OFF',
    savings: '$3.00',
    type: 'Tablet',
    description: 'Immune system support',
    rating: 4.5,
    reviews: 124,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=300&fit=crop',
    title: 'Cough Syrup 100ml',
    brand: 'MediCare',
    price: '$8.49',
    type: 'Syrup',
    description: 'Fast relief from cough',
    rating: 4.2,
    reviews: 89,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=300&fit=crop',
    title: 'Omega-3 Fish Oil Capsules',
    brand: 'NutraLife',
    price: '$24.99',
    originalPrice: '$29.99',
    discount: '15% OFF',
    savings: '$5.00',
    type: 'Capsule',
    description: 'Heart health supplement',
    rating: 4.7,
    reviews: 256,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1590439471364-0ea6e5c61d0a?w=400&h=300&fit=crop',
    title: 'Pain Relief Spray 75g',
    brand: 'ReliefFast',
    price: '$6.99',
    type: 'Spray',
    description: 'Muscle and joint pain relief',
    rating: 4.0,
    reviews: 67,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1584017911766-d451b3d0e843?w=400&h=300&fit=crop',
    title: 'Antibiotic Tablets 10s',
    brand: 'PharmaCare',
    price: '$18.50',
    type: 'Tablet',
    description: 'Broad spectrum antibiotic',
    rating: 4.3,
    reviews: 142,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
    title: 'Blood Pressure Monitor',
    brand: 'HealthGuard',
    price: '$45.99',
    originalPrice: '$59.99',
    discount: '25% OFF',
    savings: '$14.00',
    type: 'Device',
    description: 'Digital BP monitor',
    rating: 4.6,
    reviews: 312,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=300&fit=crop',
    title: 'Antiseptic Cream 30g',
    brand: 'FirstAid',
    price: '$5.25',
    type: 'Cream',
    description: 'Wound healing cream',
    rating: 4.1,
    reviews: 78,
    inStock: true
  },
  {
    image: 'https://images.unsplash.com/photo-1594620302200-9a762b4e2bcc?w=400&h=300&fit=crop',
    title: 'Multivitamin Gummies',
    brand: 'Wellness',
    price: '$14.75',
    type: 'Gummies',
    description: 'Daily vitamin supplement',
    rating: 4.4,
    reviews: 189,
    inStock: true
  }
];

const LandingPageIntro = () => {

  const { addToCart } = useCart();
const [addedItems, setAddedItems] = useState({});
const [openSnack, setOpenSnack] = useState(false);

const [searchText, setSearchText] = useState("");
const [searchResults, setSearchResults] = useState([]);
const [searchLoading, setSearchLoading] = useState(false);
const [suggestions, setSuggestions] = useState([]);
const [showDropdown, setShowDropdown] = useState(false);
const [searched, setSearched] = useState(false);

 

const fetchSearchResults = async (text) => {
  if (!text.trim()) {
    setSuggestions([]);
    setShowDropdown(false);
    setSearched(true);
    return;
  }

  setSearchLoading(true);

  try {
    const { response } = await apiCall("GET", "products");

    const filtered = (response || []).filter((product) =>
      product.title?.toLowerCase().includes(text.toLowerCase())
    );

    setSuggestions(filtered.slice(0, 5)); // 👈 max 5 dropdown items
    setShowDropdown(true);
  } catch (error) {
    console.error("Search failed", error);
  } finally {
    setSearchLoading(false);
  }
};

// debounce helper
const debounce = (func, delay) => {
  let timeout;
  return (...args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), delay);
  };
};

// debounced function
const debouncedSearch = React.useMemo(
  () => debounce(fetchSearchResults, 500),
  []
);


const handleAddToCart = (product, index) => {
  addToCart(product);            // 1️⃣ GLOBAL CART
 setAddedItems(prev => ({ ...prev, [index]: true }));
 
  setOpenSnack(true);            // 3️⃣ BOTTOM MESSAGE

  setTimeout(() => {
    setAddedItems({ ...addedItems, [index]: false });
  }, 2000);
};




  return (
    
    <Box
  sx={{
    width: "100%",
    maxWidth: "1550px",
    mx: "auto",
    overflowX: "hidden",
    mt:-13
  }}
>

         
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: "#d9e5f5ff",
          color: "#363131ff",
          py: { xs: 4, md: 8 },
          px: { xs: 2, md: 2 },
          textAlign: "center",

           backgroundImage: "url('src/assets/ChristmasBanner4.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    position: "relative",
          
        }}
      >
        <Typography variant="h3" gutterBottom sx={{color:"#b54b1bff", fontWeight:"bold"}}>
          Welcome to Pharma Guru
        </Typography>
        
        <Typography variant="h6" gutterBottom sx={{color:"white"}}>
          Say GoodBye to high medicine prices! save up to 75% on medicines with Pharma Guru.
        </Typography>
        <Typography  gutterBottom sx={{color:"white"}}>
          Your trusted online pharmacy for all healthcare needs
        </Typography>

        {/* Search Bar */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 2, position: "relative" }}>
          <TextField
            placeholder="Search for medicines..."
            size="small"
              value={searchText}
            onChange={(e) => {
  const value = e.target.value;
  setSearchText(value);
  debouncedSearch(value); // 👈 typing pe API call
  if (!value.trim()) {
  setSearchResults([]);
}

}}

            sx={{
              bgcolor: "#fff",
              borderRadius: 2,
              // minWidth: { xs: 200, sm: 300, md: 400 },
             width: { xs: "100%", sm: "400px", md: "600px" }

            }}
          />
          {showDropdown && suggestions.length > 0 && (
  <Box
    sx={{
      position: "absolute",
      mt: 1,
      width: { xs: "100%", sm: "400px", md: "600px" },
      bgcolor: "#fff",
      boxShadow: 3,
      borderRadius: 1,
      zIndex: 10,
    }}
  >
    {suggestions.map((item) => (
      <Box
        key={item.id}
        sx={{
          px: 2,
          py: 1.5,
          cursor: "pointer",
          "&:hover": { bgcolor: "#f1f1f1" },
        }}
        onClick={() => {
          setSearchText(item.title);     // input fill
          setSearchResults([item]);      // upar result
          setShowDropdown(false);        // dropdown hide
          setSearched(true);

        }}
      >
        <Typography>{item.title}</Typography>
      </Box>
    ))}
  </Box>
)}

         <Button
  variant="contained"
  color="secondary"
   onClick={async () => {
  if (!searchText.trim()) return;

  const { response } = await apiCall("GET", "products");

  const filtered = (response || []).filter((product) =>
    product.title?.toLowerCase().includes(searchText.toLowerCase())
  );

  setSearchResults(filtered);
  setShowDropdown(false);
  setSearched(true);

}}

  disabled={searchLoading}
>
  {searchLoading ? "Searching..." : "Search"}
</Button>

        </Box>

      </Box>

      {searchResults.length > 0 && (
  <Box sx={{ px: { xs: 2, md: 6 }, py: 4 }}>
    <Typography variant="h5" sx={{ mb: 3, color: "#1a5276", fontWeight: 600 }}>
      Search Results
    </Typography>

    <Grid container spacing={3}>
      {searchResults.map((product, index) => (
        <Grid item xs={12} sm={6} md={4} key={product.id}>
          <Card sx={{ height: "100%", borderRadius: 3 }}>
            <CardMedia
              component="img"
              height="180"
              image={product.image || "/images/default-product.png"}
              alt={product.title}
            />

            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: 600 }}>
                {product.title}
              </Typography>

              <Typography sx={{ color: "#666", fontSize: "0.9rem", my: 1 }}>
                ₹{product.price}
              </Typography>

              <Button
                variant="contained"
                fullWidth
                startIcon={<ShoppingCart />}
                onClick={() => handleAddToCart(product, index)}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Box>
)}

{searched && searchResults.length === 0 && (
  <Box sx={{ py: 6, textAlign: "center" }}>
    <Typography variant="h6" sx={{ color: "#7f8c8d" }}>
      No data found
    </Typography>
  </Box>
)}


      {/* Categories Section */}
 <Box 
 sx={{
   py: 6,
    px: { xs: 2, md: 6 } ,
    width: "100%",
    maxWidth: "1550px",
    mx: "auto",
    overflowX: "hidden",
    }}>
  <Typography 
    variant="h4" 
    gutterBottom 
    sx={{ 
      color: '#1a5276',
      fontWeight: 600,
      textAlign: { xs: 'center', md: 'left' },
      mb: 4
    }}
  >
    Browse Health Categories
  </Typography>
  
  {/* Horizontal Scroll Container */}
  <Box 
    sx={{ 
      position: 'relative',
      '&::before, &::after': {
        content: '""',
        position: 'absolute',
        top: 0,
        bottom: 0,
        width: '80px',
        zIndex: 2,
        pointerEvents: 'none'
      },
      '&::before': {
        left: 0,
        background: 'linear-gradient(to right, rgba(255,255,255,1), rgba(255,255,255,0))',
      },
      '&::after': {
        right: 0,
        background: 'linear-gradient(to left, rgba(255,255,255,1), rgba(255,255,255,0))',
      }
    }}
  >
    <Box 
      className="scroll-container"
      sx={{ 
        display: 'flex',
        gap: 4,
        pb: 3,
        overflowX: 'auto',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
          height: 8,
        },
        '&::-webkit-scrollbar-track': {
          backgroundColor: '#f1f1f1',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb': {
          backgroundColor: '#1a5276',
          borderRadius: 4,
        },
        '&::-webkit-scrollbar-thumb:hover': {
          backgroundColor: '#154360',
        }
      }}
    >
      {/* Card 1 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=200&fit=crop"
              alt="Protein Supplements"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>P</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Protein Supplements</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>High-quality protein powders, shakes, and bars for muscle recovery</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="24 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 2 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=200&fit=crop"
              alt="Vitamins & Minerals"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>V</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Vitamins & Minerals</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Essential vitamins and minerals for daily health support</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="36 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 3 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1590439471364-0ea6e5c61d0a?w-400&h=200&fit=crop"
              alt="Weight Management"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>W</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Weight Management</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Supplements to support healthy weight loss and management</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="18 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 4 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop"
              alt="Digestive Health"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>D</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Digestive Health</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Probiotics and digestive enzymes for gut health</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="22 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 5 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=200&fit=crop"
              alt="Heart Health"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>H</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Heart Health</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Omega-3s and supplements for cardiovascular support</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="15 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 6 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=200&fit=crop"
              alt="Joint & Bone"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>J</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Joint & Bone Health</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Glucosamine, calcium, and supplements for mobility</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="20 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 7 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1594620302200-9a762b4e2bcc?w=400&h=200&fit=crop"
              alt="Energy & Focus"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>E</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Energy & Focus</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Natural supplements for sustained energy and mental clarity</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="28 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>

      {/* Card 8 */}
      <Box sx={{ minWidth: 320, flexShrink: 0, cursor: 'pointer' }}>
        <Card sx={{ 
          borderRadius: 3,
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          boxShadow: '0 4px 12px rgba(0, 0, 150, 0.08)',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 12px 24px rgba(26, 82, 118, 0.15)',
            '& .category-image': { transform: 'scale(1.05)' },
            '& .category-overlay': { backgroundColor: 'rgba(26, 82, 118, 0.85)' }
          }
        }}>
          <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
            <CardMedia
              component="img"
              className="category-image"
              image="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&h=200&fit=crop"
              alt="Immunity Boosters"
              sx={{ height: '100%', width: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
            />
            <Box className="category-overlay" sx={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.3)', transition: 'background-color 0.3s ease' }}/>
            <Box sx={{ position: 'absolute', top: 16, left: 16, backgroundColor: 'white', borderRadius: '50%', width: 45, height: 45, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
              <Box sx={{ color: '#1a5276', fontSize: 22, fontWeight: 'bold' }}>I</Box>
            </Box>
          </Box>
          <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', textAlign: 'center', p: 3.5, backgroundColor: '#f8f9fa' }}>
            <Typography variant="h6" sx={{ color: '#1a5276', fontWeight: 700, mb: 1.5 }}>Immunity Boosters</Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.9rem', mb: 2.5 }}>Vitamin C, zinc, and herbal supplements for immune support</Typography>
            <Box sx={{ mt: 'auto' }}><Chip label="32 Products" size="small" sx={{ backgroundColor: '#e8f4fc', color: '#1a5276', fontWeight: 600, fontSize: '0.8rem', padding: '4px 12px' }}/></Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  </Box>
  
  {/* Navigation Buttons */}
  <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
    <Button
      variant="outlined"
      sx={{
        color: '#1a5276',
        borderColor: '#1a5276',
        minWidth: 50,
        height: 50,
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: '#1a5276',
          color: 'white',
          borderColor: '#1a5276'
        }
      }}
      onClick={() => {
        const container = document.querySelector('.scroll-container');
        if (container) container.scrollBy({ left: -350, behavior: 'smooth' });
      }}
    >
      ←
    </Button>
    
    <Button
      variant="outlined"
      sx={{
        color: '#1a5276',
        borderColor: '#1a5276',
        px: 4,
        py: 1.5,
        fontSize: '1rem',
        fontWeight: 600,
        '&:hover': {
          backgroundColor: '#1a5276',
          color: 'white',
          borderColor: '#1a5276'
        }
      }}
    >
      View All Categories
    </Button>
    
    <Button
      variant="outlined"
      sx={{
        color: '#1a5276',
        borderColor: '#1a5276',
        minWidth: 50,
        height: 50,
        borderRadius: '50%',
        '&:hover': {
          backgroundColor: '#1a5276',
          color: 'white',
          borderColor: '#1a5276'
        }
      }}
      onClick={() => {
        const container = document.querySelector('.scroll-container');
        if (container) container.scrollBy({ left: 350, behavior: 'smooth' });
      }}
    >
      →
    </Button>
  </Box>
</Box>



      {/* Featured Products / Offers */}

<Box sx={{mt:-5, mb:-5, py:8, px:3}}>
  <FeaturedProducts />
</Box>


      {/* Why Choose Us / Info Section */}
<Box sx={{ py: 8, px: 3, backgroundColor: "#e7ecf0ff" }}>
  {/* Header */}
  <Box sx={{ textAlign: "center", mb: 6 }}>
    <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a5276", mb: 1 }}>
      Why Choose Dr. Pharma?
    </Typography>
    <Typography sx={{ color: "#5d6d7e", maxWidth: 600, mx: "auto" }}>
      Trusted healthcare partner delivering quality, speed, and expert support
    </Typography>
  </Box>

  {/* Features */}
  <Grid container spacing={4} justifyContent="center">
    {[
      {
        icon: <LocalShipping fontSize="large" />,
        title: "Fast Delivery",
        text: "Medicines delivered within hours",
        color: "#3498db",
      },
      {
        icon: <Verified fontSize="large" />,
        title: "Trusted Quality",
        text: "100% genuine & certified medicines",
        color: "#2ecc71",
      },
      {
        icon: <SupportAgent fontSize="large" />,
        title: "24/7 Support",
        text: "Talk to licensed pharmacists anytime",
        color: "#9b59b6",
      },
    ].map((item, i) => (
      <Grid item xs={12} sm={6} md={4} key={i}>
        <Card
          sx={{
            height: "100%",
            textAlign: "center",
            p: 4,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: "auto",
              mb: 2,
              borderRadius: "50%",
              backgroundColor: item.color,
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {item.icon}
          </Box>

          <Typography
            variant="h6"
            sx={{ fontWeight: 600, color: "#1a5276", mb: 1 }}
          >
            {item.title}
          </Typography>

          <Typography sx={{ color: "#5d6d7e", fontSize: "0.95rem" }}>
            {item.text}
          </Typography>
        </Card>
      </Grid>
    ))}
  </Grid>
</Box>

    </Box>
  );
};

export default LandingPageIntro;

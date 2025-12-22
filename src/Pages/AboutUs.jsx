import React, { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  Fade,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  TextField,
  IconButton,
  Stack,
  Divider,
  Avatar,
  AvatarGroup,
  LinearProgress,
} from "@mui/material";
import {
  MedicalInformation,
  LocalPharmacy,
  Science,
  MedicalServices,
  Vaccines,
  ExpandMore,
  LocationOn,
  Phone,
  Email,
  AccessTime,
  Facebook,
  Twitter,
  Instagram,
  LinkedIn,
  Send,
  CheckCircle,
  Group,
  Security,
  VerifiedUser,
  Star,
  Favorite,
  TrendingUp,
} from "@mui/icons-material";

const AboutUs = () => {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Team members data
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      experience: "15+ years",
      specialization: "Pharmaceutical Research",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      experience: "12+ years",
      specialization: "Supply Chain Management",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      role: "Quality Assurance Director",
      image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w-400&h=400&fit=crop",
      experience: "18+ years",
      specialization: "Quality Control",
    },
    {
      id: 4,
      name: "Robert Kim",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop",
      experience: "10+ years",
      specialization: "Patient Support",
    },
  ];

  // Statistics data
  const statistics = [
    { label: "Products Available", value: "10,000+", icon: <LocalPharmacy />, color: "#667eea" },
    { label: "Happy Customers", value: "500K+", icon: <Favorite />, color: "#ff4081" },
    { label: "Years of Trust", value: "25+", icon: <VerifiedUser />, color: "#4caf50" },
    { label: "Cities Served", value: "150+", icon: <LocationOn />, color: "#ff9800" },
  ];

  // FAQ data
  const faqs = [
    {
      question: "Are your medicines genuine and certified?",
      answer: "Yes, all our products are sourced directly from certified manufacturers and undergo rigorous quality checks. We are licensed by all relevant regulatory authorities.",
    },
    {
      question: "Do you require a prescription for medicines?",
      answer: "For prescription drugs, we require a valid prescription from a registered medical practitioner. For OTC products, no prescription is needed.",
    },
    {
      question: "What is your delivery policy?",
      answer: "We offer same-day delivery in metro cities and 2-3 day delivery across India. All deliveries are handled with proper temperature control for sensitive products.",
    },
    {
      question: "How do you ensure product quality?",
      answer: "We have a 7-step quality verification process including batch testing, expiry checks, and proper storage conditions. All products are stored in temperature-controlled warehouses.",
    },
  ];

  // Certifications
  const certifications = [
    { name: "ISO 9001:2015", description: "Quality Management System" },
    { name: "GMP Certified", description: "Good Manufacturing Practices" },
    { name: "FDA Approved", description: "US Food & Drug Administration" },
    { name: "WHO Compliant", description: "World Health Organization Standards" },
  ];

  const handleAccordionChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFormSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
      
      // Reset success message after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 5000);
    }, 1500);
  };

  return (
    <Box sx={{ 
      p: { xs: 2, md: 4 },
      background: "linear-gradient(135deg, #f5f7fa 0%, #e4edf5 100%)",
      minHeight: "100vh"
    }}>
      {/* HERO SECTION */}
      <Paper 
        elevation={3}
        sx={{ 
          borderRadius: "20px",
          overflow: "hidden",
          mb: 4,
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          position: "relative",
          color: "white",
          width: "1630px",
        }}
      >
        <Box sx={{ p: { xs: 3, md: 6 }, position: "relative", zIndex: 2 }}>
          <Typography 
            variant="h2" 
            sx={{ 
              fontWeight: 800,
              mb: 2,
              fontSize: { xs: "2rem", md: "3rem" }
            }}
          >
            Trusted Healthcare Partner Since 1998
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              opacity: 0.9,
              maxWidth: "800px",
              mb: 4,
              fontWeight: 400
            }}
          >
            Delivering quality healthcare products with integrity, innovation, and care.
            Serving millions of customers with 99.7% satisfaction rate.
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button 
              variant="contained" 
              sx={{ 
                bgcolor: "white", 
                color: "#667eea",
                fontWeight: 600,
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  bgcolor: "#f0f0f0",
                }
              }}
            >
              Our Services
            </Button>
            <Button 
              variant="outlined" 
              sx={{ 
                borderColor: "white", 
                color: "white",
                fontWeight: 600,
                borderRadius: "10px",
                px: 4,
                py: 1.5,
                "&:hover": {
                  borderColor: "#f0f0f0",
                  bgcolor: "rgba(255,255,255,0.1)",
                }
              }}
            >
              Contact Us
            </Button>
          </Stack>
        </Box>
      </Paper>

      {/* STATISTICS SECTION */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e", mb: 4, textAlign: "center" }}>
        Our Impact in Numbers
      </Typography>
     <Grid container spacing={3} sx={{ mb: 8 }} alignItems="stretch">

        {statistics.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Fade in timeout={800 + index * 200}>
             <Card
  sx={{
    textAlign: "center",
    p: 3,
    borderRadius: "16px",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "translateY(-8px)",
      boxShadow: 6,
    },
  }}
>

                <Box sx={{ 
                  display: "inline-flex",
                  p: 2,
                  borderRadius: "50%",
                  bgcolor: `${stat.color}15`,
                  mb: 2
                }}>
                  {React.cloneElement(stat.icon, { 
                    sx: { fontSize: 40, color: stat.color } 
                  })}
                </Box>
                <Typography variant="h3" sx={{ fontWeight: 800, color: "#1a237e", mb: 1 }}>
                  {stat.value}
                </Typography>
                <Typography variant="body1" sx={{ color: "#5c6bc0" }}>
                  {stat.label}
                </Typography>
              </Card>
            </Fade>
          </Grid>
        ))}
      </Grid>

     

      {/* OUR TEAM SECTION */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e", mb: 4 }}>
        Meet Our Leadership Team
      </Typography>
      <Grid container spacing={3} sx={{ mb: 8 }}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.id}>
            <Card 
              sx={{ 
                borderRadius: "16px",
                overflow: "hidden",
                transition: "all 0.3s ease",
                border: "1px solid #e8eaf6",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 20px 40px rgba(102, 126, 234, 0.15)",
                }
              }}
            >
              <CardMedia
                component="img"
                height="250"
                image={member.image}
                alt={member.name}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, color: "#1a237e", mb: 1 }}>
                  {member.name}
                </Typography>
                <Chip 
                  label={member.role}
                  size="small"
                  sx={{ 
                    mb: 2,
                    bgcolor: "#f0f4ff",
                    color: "#667eea",
                    fontWeight: 500
                  }}
                />
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <VerifiedUser sx={{ fontSize: 16, color: "#4caf50", mr: 1 }} />
                  <Typography variant="body2" sx={{ color: "#5c6bc0" }}>
                    {member.experience} experience
                  </Typography>
                </Box>
                <Typography variant="body2" sx={{ color: "#78909c" }}>
                  Specialization: {member.specialization}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* FAQ SECTION */}
      <Typography variant="h4" sx={{ fontWeight: 700, color: "#1a237e", mb: 4 }}>
        Frequently Asked Questions
      </Typography>
      <Box sx={{ mb: 8 }}>
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            expanded={expanded === `panel${index}`}
            onChange={handleAccordionChange(`panel${index}`)}
            sx={{ 
              mb: 2,
              borderRadius: "12px !important",
              overflow: "hidden",
              "&:before": { display: "none" }
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              sx={{ 
                bgcolor: expanded === `panel${index}` ? "#f0f4ff" : "white",
                fontWeight: 600,
                color: "#1a237e",
              }}
            >
              {faq.question}
            </AccordionSummary>
            <AccordionDetails sx={{ bgcolor: "#fafbff", color: "#455a64" }}>
              {faq.answer}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {/* CONTACT FORM SECTION */}
      <Grid container spacing={6} sx={{ mb: 8 }}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: "16px", height: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a237e", mb: 3 }}>
              Get In Touch
            </Typography>
            
            {formSubmitted ? (
              <Fade in>
                <Box sx={{ textAlign: "center", py: 4 }}>
                  <CheckCircle sx={{ fontSize: 60, color: "#4caf50", mb: 2 }} />
                  <Typography variant="h6" sx={{ color: "#1a237e", mb: 1 }}>
                    Thank You!
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#5c6bc0" }}>
                    Your message has been received. We'll get back to you within 24 hours.
                  </Typography>
                </Box>
              </Fade>
            ) : (
              <form onSubmit={handleSubmit}>
                <Stack spacing={3}>
                  <TextField
                    label="Full Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      }
                    }}
                  />
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      }
                    }}
                  />
                  <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    multiline
                    rows={4}
                    fullWidth
                    variant="outlined"
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: "10px",
                      }
                    }}
                  />
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<Send />}
                    sx={{
                      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                      borderRadius: "10px",
                      py: 1.5,
                      fontWeight: 600,
                      "&:hover": {
                        background: "linear-gradient(135deg, #5a6fd8 0%, #6a4090 100%)",
                      }
                    }}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </Button>
                </Stack>
              </form>
            )}
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: "16px", height: "100%" }}>
            <Typography variant="h5" sx={{ fontWeight: 700, color: "#1a237e", mb: 3 }}>
              Contact Information
            </Typography>
            
            <Stack spacing={3}>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <LocationOn sx={{ color: "#667eea", mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a237e" }}>
                    Headquarters
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5c6bc0" }}>
                    123 Healthcare Street, Medical District<br />
                    Mumbai, Maharashtra 400001
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Phone sx={{ color: "#4caf50", mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a237e" }}>
                    24/7 Support Line
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5c6bc0" }}>
                    +91 1800-123-4567
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Email sx={{ color: "#ff9800", mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a237e" }}>
                    Email Support
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5c6bc0" }}>
                    support@healthcaremeds.com<br />
                    orders@healthcaremeds.com
                  </Typography>
                </Box>
              </Box>

              <Divider />

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <AccessTime sx={{ color: "#ff4081", mr: 2, fontSize: 24 }} />
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a237e" }}>
                    Business Hours
                  </Typography>
                  <Typography variant="body2" sx={{ color: "#5c6bc0" }}>
                    Monday - Saturday: 8:00 AM - 10:00 PM<br />
                    Sunday: 9:00 AM - 8:00 PM
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 4 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600, color: "#1a237e", mb: 2 }}>
                  Follow Us
                </Typography>
                <Stack direction="row" spacing={2}>
                  <IconButton sx={{ bgcolor: "#1877f2", color: "white" }}>
                    <Facebook />
                  </IconButton>
                  <IconButton sx={{ bgcolor: "#1da1f2", color: "white" }}>
                    <Twitter />
                  </IconButton>
                  <IconButton sx={{ bgcolor: "#e4405f", color: "white" }}>
                    <Instagram />
                  </IconButton>
                  <IconButton sx={{ bgcolor: "#0a66c2", color: "white" }}>
                    <LinkedIn />
                  </IconButton>
                </Stack>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

    
    </Box>
  );
};

export default AboutUs;
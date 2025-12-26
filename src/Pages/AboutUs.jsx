import React, { useState } from "react";
import {
  Box,
  Container,
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
  Paper,
  Tabs,
  Tab,
  LinearProgress,
  CardActionArea,
  CardActions,
  Rating,
 
} from "@mui/material";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
  TimelineOppositeContent,
} from "@mui/lab";

import {
  MedicalServices,
  LocalPharmacy,
  HealthAndSafety,
  DeliveryDining,
  SupportAgent,
  Verified,
  Group,
  WorkspacePremium,
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
  TrendingUp,
  Favorite,
  Star,
  LocalHospital,
  Science,
  Vaccines,
  ArrowForward,
  Storefront,
  Inventory,
  Security,
  Timeline as TimelineIcon,
  ArrowOutward,
  ThumbUp,
  Diversity3,
} from "@mui/icons-material";
import { motion } from "framer-motion";

const AboutUs = () => {
  const [expanded, setExpanded] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  // Core values
  const coreValues = [
    {
      icon: <HealthAndSafety />,
      title: "Trust & Safety",
      description: "100% verified medicines with proper storage and handling",
      color: "#0C9A6B",
      gradient: "linear-gradient(135deg, #0C9A6B 0%, #2ECC71 100%)",
    },
    {
      icon: <DeliveryDining />,
      title: "Fast Delivery",
      description: "Same-day delivery in major cities, 24/7 emergency service",
      color: "#3498DB",
      gradient: "linear-gradient(135deg, #3498DB 0%, #2ECC71 50%)",
    },
    {
      icon: <SupportAgent />,
      title: "24/7 Support",
      description: "Medical experts available round the clock for consultations",
      color: "#9B59B6",
      gradient: "linear-gradient(135deg, #9B59B6 0%, #3498DB 100%)",
    },
    {
      icon: <Verified />,
      title: "Quality Assured",
      description: "ISO certified, FDA approved products only",
      color: "#E74C3C",
      gradient: "linear-gradient(135deg, #E74C3C 0%, #F39C12 100%)",
    },
  ];

  // Milestones timeline
  const milestones = [
    { year: "1998", title: "Founded as a local pharmacy", description: "Started with single store in Mumbai" },
    { year: "2005", title: "First Online Store", description: "Launched India's first online pharmacy" },
    { year: "2012", title: "National Expansion", description: "Expanded to 50+ cities across India" },
    { year: "2018", title: "ISO Certification", description: "Achieved ISO 9001:2015 certification" },
    { year: "2023", title: "5 Million Customers", description: "Served over 5 million happy customers" },
  ];

  // Team members
  const teamMembers = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      role: "Chief Medical Officer",
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop",
      experience: "15+ years",
      specialty: "Pharmacology",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
      experience: "12+ years",
      specialty: "Supply Chain",
    },
    {
      id: 3,
      name: "Dr. Priya Sharma",
      role: "Quality Director",
      image: "https://images.unsplash.com/photo-1594824434340-7e7dfc37cabb?w=400&h=400&fit=crop",
      experience: "18+ years",
      specialty: "Quality Control",
    },
    {
      id: 4,
      name: "Robert Kim",
      role: "Customer Relations",
      image: "https://images.unsplash.com/photo-1507591064344-4c6ce005-128?w=400&h=400&fit=crop",
      experience: "10+ years",
      specialty: "Patient Support",
    },
  ];

  // Statistics
  const statistics = [
    { value: "10,000+", label: "Products", icon: <Inventory />, trend: "+15%" },
    { value: "500K+", label: "Happy Customers", icon: <Group />, trend: "+25%" },
    { value: "98.7%", label: "Satisfaction Rate", icon: <ThumbUp />, trend: "+2%" },
    { value: "150+", label: "Cities Served", icon: <LocationOn />, trend: "+10%" },
  ];

  // FAQ data
  const faqs = [
    {
      question: "Are your medicines genuine and certified?",
      answer: "Yes, all medicines are sourced directly from licensed manufacturers and stored in temperature-controlled warehouses.",
    },
    {
      question: "Do you require prescription for medicines?",
      answer: "For prescription drugs, we require a valid prescription. For OTC products, no prescription is needed.",
    },
    {
      question: "What is your delivery timeline?",
      answer: "Same-day delivery in metro cities, 2-3 days for other locations. Emergency delivery available 24/7.",
    },
    {
      question: "How do you ensure quality?",
      answer: "7-step quality check process, including batch testing, expiry verification, and proper storage.",
    },
  ];

  // Certifications
  const certifications = [
    { name: "ISO 9001:2015", icon: <WorkspacePremium />, color: "#3498DB" },
    { name: "FDA Approved", icon: <Verified />, color: "#0C9A6B" },
    { name: "GMP Certified", icon: <MedicalServices />, color: "#9B59B6" },
    { name: "Narcotics License", icon: <Security />, color: "#E74C3C" },
  ];

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
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
    setTimeout(() => {
      setFormSubmitted(true);
      setLoading(false);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#F8FAFC" }}>
      {/* HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #1A5F7A 0%, #0C9A6B 100%)",
          color: "white",
          py: { xs: 8, md: 12 },
          position: "relative",
          overflow: "hidden",
          mt:-13
        }}
      >
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <Chip
                  label="Trusted Since 1998"
                  icon={<LocalPharmacy />}
                  sx={{
                    bgcolor: "rgba(255,255,255,0.15)",
                    color: "white",
                    mb: 3,
                    fontWeight: 600,
                    backdropFilter: "blur(10px)",
                  }}
                />
                <Typography
                  variant="h1"
                  sx={{
                    fontWeight: 800,
                    mb: 3,
                    fontSize: { xs: "2.5rem", md: "3.5rem" },
                    lineHeight: 1.2,
                  }}
                >
                  Your Trusted
                  <Box component="span" sx={{ color: "#FFD700", ml: 1 }}>
                    Healthcare Partner
                  </Box>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    opacity: 0.9,
                    mb: 4,
                    fontWeight: 400,
                    maxWidth: "600px",
                  }}
                >
                  India's leading online pharmacy delivering genuine medicines,
                  24/7 medical support, and comprehensive healthcare solutions
                  to millions of homes.
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    sx={{
                      bgcolor: "white",
                      color: "#1A5F7A",
                      fontWeight: 700,
                      px: 4,
                      py: 1.5,
                      borderRadius: "10px",
                      "&:hover": {
                        bgcolor: "#F0F0F0",
                        transform: "translateY(-2px)",
                      },
                    }}
                  >
                    Shop Medicines
                  </Button>
                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      fontWeight: 600,
                      px: 4,
                      py: 1.5,
                      borderRadius: "10px",
                      "&:hover": {
                        borderColor: "#FFD700",
                        color: "#FFD700",
                      },
                    }}
                  >
                    Contact Experts
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Box
                  sx={{
                    position: "relative",
                    bgcolor: "rgba(255,255,255,0.1)",
                    borderRadius: "20px",
                    p: 3,
                    backdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.2)",
                  }}
                >
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          borderRadius: "12px",
                          bgcolor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <MedicalServices sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight={700}>
                          10K+
                        </Typography>
                        <Typography variant="body2">Medicines</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          borderRadius: "12px",
                          bgcolor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <Group sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight={700}>
                          500K+
                        </Typography>
                        <Typography variant="body2">Customers</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          borderRadius: "12px",
                          bgcolor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <DeliveryDining sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight={700}>
                          24/7
                        </Typography>
                        <Typography variant="body2">Delivery</Typography>
                      </Paper>
                    </Grid>
                    <Grid item xs={6}>
                      <Paper
                        sx={{
                          p: 3,
                          textAlign: "center",
                          borderRadius: "12px",
                          bgcolor: "rgba(255,255,255,0.15)",
                        }}
                      >
                        <Verified sx={{ fontSize: 40, mb: 1 }} />
                        <Typography variant="h6" fontWeight={700}>
                          99.7%
                        </Typography>
                        <Typography variant="body2">Satisfaction</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                </Box>
              </motion.div>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CORE VALUES */}
      <Container maxWidth="xl" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            textAlign: "center",
            mb: 6,
            color: "#1A5F7A",
          }}
        >
          Why Choose MedPharma?
        </Typography>
        <Grid container spacing={3}>
          {coreValues.map((value, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    borderRadius: "16px",
                    background: value.gradient,
                    color: "white",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4, textAlign: "center" }}>
                    <Box
                      sx={{
                        display: "inline-flex",
                        p: 2,
                        borderRadius: "50%",
                        bgcolor: "rgba(255,255,255,0.2)",
                        mb: 3,
                      }}
                    >
                      {React.cloneElement(value.icon, {
                        sx: { fontSize: 40 },
                      })}
                    </Box>
                    <Typography variant="h5" fontWeight={700} gutterBottom>
                      {value.title}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9 }}>
                      {value.description}
                    </Typography>
                  </CardContent>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* STATISTICS */}
      <Box sx={{ py: 8, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h3"
                sx={{ fontWeight: 800, color: "#1A5F7A", mb: 3 }}
              >
                Our Impact in Healthcare
              </Typography>
              <Typography variant="h6" sx={{ color: "#5D6D7E", mb: 4 }}>
                Revolutionizing healthcare delivery with technology and trust
              </Typography>
              <Button
                variant="outlined"
                endIcon={<ArrowOutward />}
                sx={{
                  borderColor: "#1A5F7A",
                  color: "#1A5F7A",
                  fontWeight: 600,
                  px: 4,
                  py: 1.5,
                  borderRadius: "8px",
                }}
              >
                View Annual Report
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Grid container spacing={3}>
                {statistics.map((stat, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper
                      elevation={0}
                      sx={{
                        p: 3,
                        borderRadius: "12px",
                        border: "1px solid #E8E8E8",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: "#1A5F7A",
                          boxShadow: "0 8px 24px rgba(26, 95, 122, 0.1)",
                        },
                      }}
                    >
                      <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                        <Box
                          sx={{
                            p: 1,
                            borderRadius: "8px",
                            bgcolor: "#E8F4FD",
                            mr: 2,
                          }}
                        >
                          {React.cloneElement(stat.icon, {
                            sx: { color: "#1A5F7A", fontSize: 24 },
                          })}
                        </Box>
                        <Chip
                          label={stat.trend}
                          size="small"
                          sx={{
                            bgcolor: "#D5F4E6",
                            color: "#0C9A6B",
                            fontWeight: 600,
                          }}
                        />
                      </Box>
                      <Typography variant="h3" fontWeight={800} color="#1A5F7A">
                        {stat.value}
                      </Typography>
                      <Typography variant="body2" color="#5D6D7E">
                        {stat.label}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* JOURNEY TIMELINE */}
      <Box sx={{ py: 8, bgcolor: "#F8FAFC" }}>
        <Container maxWidth="xl">
          <Typography
            variant="h3"
            sx={{ fontWeight: 800, textAlign: "center", mb: 6, color: "#1A5F7A" }}
          >
            Our Journey
          </Typography>
          <Timeline position="alternate">
            {milestones.map((milestone, index) => (
              <TimelineItem key={index}>
                <TimelineOppositeContent sx={{ py: 3 }}>
                  <Typography
                    variant="h6"
                    fontWeight={700}
                    color="#1A5F7A"
                    sx={{ opacity: 0.7 }}
                  >
                    {milestone.year}
                  </Typography>
                </TimelineOppositeContent>
                <TimelineSeparator>
                  <TimelineDot
                    sx={{
                      bgcolor: "#1A5F7A",
                      width: 16,
                      height: 16,
                    }}
                  />
                  {index < milestones.length - 1 && (
                    <TimelineConnector sx={{ bgcolor: "#1A5F7A" }} />
                  )}
                </TimelineSeparator>
                <TimelineContent sx={{ py: 3 }}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      borderRadius: "12px",
                      maxWidth: 400,
                    }}
                  >
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {milestone.title}
                    </Typography>
                    <Typography variant="body2" color="#5D6D7E">
                      {milestone.description}
                    </Typography>
                  </Paper>
                </TimelineContent>
              </TimelineItem>
            ))}
          </Timeline>
        </Container>
      </Box>

      {/* LEADERSHIP TEAM */}
      <Box sx={{ py: 8, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: "center", mb: 6 }}>
            <Chip
              label="Expert Leadership"
              icon={<Diversity3 />}
              sx={{
                bgcolor: "#E8F4FD",
                color: "#1A5F7A",
                mb: 3,
                fontWeight: 600,
              }}
            />
            <Typography variant="h3" sx={{ fontWeight: 800, color: "#1A5F7A" }}>
              Meet Our Healthcare Experts
            </Typography>
            <Typography variant="h6" sx={{ color: "#5D6D7E", mt: 2 }}>
              Led by experienced medical professionals and industry veterans
            </Typography>
          </Box>

          <Grid container spacing={4}>
            {teamMembers.map((member) => (
              <Grid item xs={12} sm={6} md={3} key={member.id}>
                <Card
                  sx={{
                    borderRadius: "16px",
                    overflow: "hidden",
                    border: "1px solid #E8E8E8",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(26, 95, 122, 0.15)",
                    },
                  }}
                >
                  <CardActionArea>
                    <Box
                      sx={{
                        height: 200,
                        overflow: "hidden",
                        position: "relative",
                      }}
                    >
                      <CardMedia
                        component="img"
                        image={member.image}
                        alt={member.name}
                        sx={{
                          height: "100%",
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                          "&:hover": { transform: "scale(1.1)" },
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: 0,
                          left: 0,
                          right: 0,
                          bgcolor: "rgba(26, 95, 122, 0.9)",
                          color: "white",
                          p: 2,
                          textAlign: "center",
                        }}
                      >
                        <Typography variant="body2" fontWeight={600}>
                          {member.experience} Experience
                        </Typography>
                      </Box>
                    </Box>
                    <CardContent sx={{ p: 3 }}>
                      <Typography variant="h6" fontWeight={700} gutterBottom>
                        {member.name}
                      </Typography>
                      <Chip
                        label={member.role}
                        size="small"
                        sx={{
                          bgcolor: "#E8F4FD",
                          color: "#1A5F7A",
                          mb: 2,
                        }}
                      />
                      <Typography variant="body2" color="#5D6D7E">
                        Specialization: {member.specialty}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions sx={{ p: 2, pt: 0 }}>
                    <Button
                      size="small"
                      startIcon={<LinkedIn />}
                      sx={{
                        color: "#1A5F7A",
                        textTransform: "none",
                        fontWeight: 600,
                      }}
                    >
                      Connect
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CERTIFICATIONS & FAQ */}
      <Box sx={{ py: 8, bgcolor: "#F8FAFC" }}>
        <Container maxWidth="xl">
          <Grid container spacing={6}>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} color="#1A5F7A" gutterBottom>
                Our Certifications
              </Typography>
              <Typography variant="body1" color="#5D6D7E" sx={{ mb: 4 }}>
                Quality and safety certifications that ensure trust
              </Typography>
              <Grid container spacing={2}>
                {certifications.map((cert, index) => (
                  <Grid item xs={6} key={index}>
                    <Paper
                      sx={{
                        p: 3,
                        borderRadius: "12px",
                        border: "1px solid #E8E8E8",
                        textAlign: "center",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          borderColor: cert.color,
                          boxShadow: `0 8px 24px rgba(${parseInt(cert.color.slice(1, 3), 16)}, ${parseInt(cert.color.slice(3, 5), 16)}, ${parseInt(cert.color.slice(5, 7), 16)}, 0.1)`,
                        },
                      }}
                    >
                      {React.cloneElement(cert.icon, {
                        sx: { fontSize: 40, color: cert.color, mb: 2 },
                      })}
                      <Typography variant="h6" fontWeight={600}>
                        {cert.name}
                      </Typography>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h4" fontWeight={700} color="#1A5F7A" gutterBottom>
                Frequently Asked Questions
              </Typography>
              <Box>
                {faqs.map((faq, index) => (
                  <Accordion
                    key={index}
                    elevation={0}
                    sx={{
                      mb: 2,
                      borderRadius: "8px !important",
                      border: "1px solid #E8E8E8",
                      "&:before": { display: "none" },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                      sx={{
                        fontWeight: 600,
                        color: "#1A5F7A",
                      }}
                    >
                      {faq.question}
                    </AccordionSummary>
                    <AccordionDetails sx={{ color: "#5D6D7E" }}>
                      {faq.answer}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* CONTACT CTA */}
      <Box sx={{ py: 8, bgcolor: "white" }}>
        <Container maxWidth="xl">
          <Paper
            sx={{
              p: { xs: 4, md: 8 },
              borderRadius: "20px",
              background: "linear-gradient(135deg, #1A5F7A 0%, #0C9A6B 100%)",
              color: "white",
              textAlign: "center",
            }}
          >
            <Typography variant="h3" fontWeight={800} gutterBottom>
              Need Medical Assistance?
            </Typography>
            <Typography variant="h6" sx={{ opacity: 0.9, mb: 4, maxWidth: 600, mx: "auto" }}>
              Our team of pharmacists and doctors are available 24/7 to help you with prescriptions and medical advice
            </Typography>
            <Button
              variant="contained"
              size="large"
              startIcon={<Phone />}
              sx={{
                bgcolor: "white",
                color: "#1A5F7A",
                fontWeight: 700,
                px: 6,
                py: 1.5,
                borderRadius: "10px",
                "&:hover": {
                  bgcolor: "#F0F0F0",
                  transform: "translateY(-2px)",
                },
              }}
            >
              Call: 1800-123-4567
            </Button>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default AboutUs;
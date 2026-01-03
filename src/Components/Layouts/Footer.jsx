import { Box, Typography, IconButton, Container, Grid, Link as MuiLink } from "@mui/material";
import { Link } from "react-router-dom";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import ChatIcon from "@mui/icons-material/Chat";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PolicyIcon from "@mui/icons-material/Policy";
import DescriptionIcon from "@mui/icons-material/Description";

const Footer = () => {
  return (
    <Box
      component="footer"
       
      sx={{
       bgcolor: "#1a5276",
    color: "#fff",
    py: 4,
    mt: "auto",          // 🔥 IMPORTANT
    width: "100%",
    overflowX: "hidden",
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} justifyContent="space-between">
          {/* Company Info - Left */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>
            Pharma Guru
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
              <LocationOnIcon sx={{ fontSize: '1rem', mr: 1, mt: 0.3, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                123 Medical Street, Health City, HC 12345
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <PhoneIcon sx={{ fontSize: '1rem', mr: 1, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                09240250346
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <EmailIcon sx={{ fontSize: '1rem', mr: 1, flexShrink: 0 }} />
              <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                support@pharmaguru.com
              </Typography>
            </Box>
          </Grid>

          {/* Quick Links - Center */}
          <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'left', md: 'center' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to="/about"
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  fontSize: "0.85rem",
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                About Us
              </MuiLink>
              <MuiLink
                component={Link}
                to="/contact"
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  fontSize: "0.85rem",
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                Contact Us
              </MuiLink>
              <MuiLink
                component={Link}
                to="/faq"
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  fontSize: "0.85rem",
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                FAQ
              </MuiLink>
              <MuiLink
                component={Link}
                to="/privacy-policy"
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  fontSize: "0.85rem",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'flex-start', md: 'center' },
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                <PolicyIcon sx={{ fontSize: '1rem', mr: 1 }} />
                Privacy Policy
              </MuiLink>
              <MuiLink
                component={Link}
                to="/terms"
                color="inherit"
                sx={{ 
                  textDecoration: 'none',
                  fontSize: "0.85rem",
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: { xs: 'flex-start', md: 'center' },
                  '&:hover': { textDecoration: 'underline' }
                }}
              >
                <DescriptionIcon sx={{ fontSize: '1rem', mr: 1 }} />
                Terms & Conditions
              </MuiLink>
            </Box>
          </Grid>

          {/* Social & Chat - Right */}
          <Grid item xs={12} md={3} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold', fontSize: '1.1rem' }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: "0.85rem" }}>
                  Follow us on social media:
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, justifyContent: { xs: 'flex-start', md: 'flex-end' } }}>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.15)",
                      "&:hover": { bgcolor: "#1877F2" },
                    }}
                    component="a"
                    href="https://facebook.com"
                    target="_blank"
                  >
                    <FacebookIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.15)",
                      "&:hover": { bgcolor: "#E4405F" },
                    }}
                    component="a"
                    href="https://instagram.com"
                    target="_blank"
                  >
                    <InstagramIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.15)",
                      "&:hover": { bgcolor: "#25D366" },
                    }}
                    component="a"
                    href="https://wa.me/09240250346"
                    target="_blank"
                  >
                    <WhatsAppIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    size="small"
                    sx={{
                      color: "#fff",
                      bgcolor: "rgba(255,255,255,0.15)",
                      "&:hover": { bgcolor: "#10A37F" },
                    }}
                    component="a"
                    href="https://chat.openai.com"
                    target="_blank"
                  >
                    <ChatIcon fontSize="small" />
                  </IconButton>
                </Box>
              </Box>
              
              <Box>
                <Typography variant="body2" sx={{ mb: 1, fontSize: "0.85rem" }}>
                  Need help? Chat with us:
                </Typography>
                <Box sx={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: 1,
                  justifyContent: { xs: 'flex-start', md: 'flex-end' }
                }}>
                  <ChatIcon fontSize="small" />
                  <Typography variant="body2" sx={{ fontSize: "0.85rem" }}>
                    24/7 Customer Support Available
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Copyright & Bottom Bar */}
        <Box
          sx={{
            mt: 4,
            pt: 2,
            borderTop: '1px solid rgba(255,255,255,0.1)',
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            © {new Date().getFullYear()}  Pharma Guru. All rights reserved.
          </Typography>

          <Typography variant="body2" sx={{ fontSize: "0.8rem" }}>
            support@pharmaguru.com | 09240250346
          </Typography>

          <Box>
            <MuiLink
              component={Link}
              to="/privacy-policy"
              color="inherit"
              sx={{ 
                textDecoration: 'none',
                fontSize: "0.8rem",
                mr: 2,
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Privacy Policy
            </MuiLink>
            <MuiLink
              component={Link}
              to="/terms"
              color="inherit"
              sx={{ 
                textDecoration: 'none',
                fontSize: "0.8rem",
                '&:hover': { textDecoration: 'underline' }
              }}
            >
              Terms & Conditions
            </MuiLink>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
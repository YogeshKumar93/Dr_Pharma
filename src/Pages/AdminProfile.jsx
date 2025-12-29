import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  TextField,
  Button,
  Chip,
  Grid,
  Divider,
  CircularProgress,
  Alert,
  Stack,
  InputAdornment,
  IconButton,
} from "@mui/material";
import {
  Edit as EditIcon,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Person as PersonIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationOnIcon,
  LocalPharmacy as PharmacyIcon,
  Badge as BadgeIcon,
  Medication as MedicationIcon,
  Storefront as StorefrontIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from "@mui/icons-material";

// Pharmacy theme colors
const COLORS = {
  primary: "#0D47A1",
  secondary: "#1976D2",
  accent: "#4CAF50",
  background: "#F5F9FF",
  surface: "#FFFFFF",
  textPrimary: "#1A237E",
  textSecondary: "#546E7A",
};

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    pharmacyName: "MediCare Pharmacy",
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@medicarepharmacy.com",
    role: "Pharmacy Administrator",
    licenseNumber: "PH123456789",
    phone: "+1 (555) 123-4567",
    address: "123 Medical Plaza, Suite 100\nHealth City, HC 10001",
    status: "Active",
    pharmacyType: "Retail Chain",
    yearsOfService: "5",
    totalOrders: "2,847",
    monthlyRevenue: "$45,820",
    lastLogin: "Today, 10:30 AM",
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [originalData] = useState({ ...admin });

  useEffect(() => {
    // Simulate API call
    setLoading(true);
    setTimeout(() => setLoading(false), 500);
  }, []);

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleUpdate = () => {
    setLoading(true);
    setTimeout(() => {
      setEditMode(false);
      setSuccess("Profile updated successfully!");
      setLoading(false);
      setTimeout(() => setSuccess(null), 3000);
    }, 800);
  };

  const handleCancel = () => {
    setAdmin(originalData);
    setEditMode(false);
  };

  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, maxWidth: 1400, margin: '0 auto' }}>
      {/* Header */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" fontWeight="700" color={COLORS.textPrimary}>
          
        </Typography>
        <Button
          variant="contained"
          startIcon={editMode ? <SaveIcon /> : <EditIcon />}
          onClick={editMode ? handleUpdate : () => setEditMode(true)}
          disabled={loading}
          sx={{
            bgcolor: COLORS.primary,
            borderRadius: 2,
            px: 3,
            fontWeight: 600,
          }}
        >
          {editMode ? "Save Changes" : "Edit Profile"}
        </Button>
      </Box>

      {success && (
        <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
          {error}
        </Alert>
      )}

    <Box
  sx={{
    display: "flex",
    gap: 3,
    width: "100%",
    alignItems: "stretch",
  }}
>
  {/* ================= LEFT COLUMN ================= */}
  <Box sx={{ flex: "0 0 42%" }}>
    <Card sx={{ borderRadius: 3, boxShadow: 2, height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        {/* Avatar & Basic Info */}
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <Avatar
            sx={{
              width: 100,
              height: 100,
              bgcolor: COLORS.primary,
              fontSize: 32,
              mr: 3,
            }}
          >
            {getInitials(admin.name)}
          </Avatar>

          <Box>
            <Typography variant="h6" fontWeight="700" color={COLORS.textPrimary}>
              {admin.name}
            </Typography>

            <Chip
              icon={<BadgeIcon />}
              label={admin.role}
              size="small"
              sx={{
                bgcolor: `${COLORS.primary}10`,
                color: COLORS.primary,
                mt: 1,
              }}
            />

            <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
              <PharmacyIcon
                sx={{ fontSize: 16, mr: 0.5, color: COLORS.textSecondary }}
              />
              <Typography variant="body2" color="textSecondary">
                {admin.pharmacyName}
              </Typography>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Pharmacy Stats */}
        <Typography variant="subtitle1" fontWeight="600" mb={2}>
          Pharmacy Statistics
        </Typography>

        <Box sx={{ display: "flex", gap: 2 }}>
          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              p: 2,
              bgcolor: `${COLORS.accent}10`,
              borderRadius: 2,
            }}
          >
            <MedicationIcon sx={{ color: COLORS.accent, fontSize: 32, mb: 1 }} />
            <Typography variant="h6" fontWeight="700">
              {admin.totalOrders}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Total Orders
            </Typography>
          </Box>

          <Box
            sx={{
              flex: 1,
              textAlign: "center",
              p: 2,
              bgcolor: `${COLORS.secondary}10`,
              borderRadius: 2,
            }}
          >
            <StorefrontIcon
              sx={{ color: COLORS.secondary, fontSize: 32, mb: 1 }}
            />
            <Typography variant="h6" fontWeight="700">
              {admin.monthlyRevenue}
            </Typography>
            <Typography variant="caption" color="textSecondary">
              Monthly Revenue
            </Typography>
          </Box>
        </Box>

        {/* Status & Info */}
        <Stack spacing={1.5} mt={3}>
          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Status
            </Typography>
            <Chip
              label={admin.status}
              size="small"
              color="success"
              icon={<CheckCircleIcon />}
            />
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Last Login
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {admin.lastLogin}
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Years of Service
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {admin.yearsOfService} years
            </Typography>
          </Box>

          <Box display="flex" justifyContent="space-between">
            <Typography variant="body2" color="textSecondary">
              Pharmacy Type
            </Typography>
            <Typography variant="body2" fontWeight="600">
              {admin.pharmacyType}
            </Typography>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  </Box>

  {/* ================= RIGHT COLUMN ================= */}
  <Box sx={{ flex: "0 0 58%" }}>
    <Card sx={{ borderRadius: 3, boxShadow: 2, height: "100%" }}>
      <CardContent sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="700" mb={3}>
          Profile Details
        </Typography>

        {/* Pharmacy Name */}
        <TextField
          label="Pharmacy Name"
          fullWidth
          name="pharmacyName"
          value={admin.pharmacyName}
          onChange={handleChange}
          disabled={!editMode}
          sx={{ mb: 2 }}
        />

        {/* Admin Name & Email */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="Full Name"
            fullWidth
            name="name"
            value={admin.name}
            onChange={handleChange}
            disabled={!editMode}
          />
          <TextField
            label="Email"
            fullWidth
            value={admin.email}
            disabled
          />
        </Box>

        {/* License & Phone */}
        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            label="License Number"
            fullWidth
            name="licenseNumber"
            value={admin.licenseNumber}
            onChange={handleChange}
            disabled={!editMode}
          />
          <TextField
            label="Phone Number"
            fullWidth
            name="phone"
            value={admin.phone}
            onChange={handleChange}
            disabled={!editMode}
          />
        </Box>

        {/* Address */}
        <TextField
          label="Pharmacy Address"
          fullWidth
          multiline
          rows={2}
          name="address"
          value={admin.address}
          onChange={handleChange}
          disabled={!editMode}
          sx={{ mb: 3 }}
        />

        {/* Role & Type */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <TextField label="Role" fullWidth value={admin.role} disabled />
          <TextField
            label="Pharmacy Type"
            fullWidth
            value={admin.pharmacyType}
            disabled
          />
        </Box>

        {/* Action Buttons */}
        {editMode && (
          <Box sx={{ mt: 3, display: "flex", gap: 2, justifyContent: "flex-end" }}>
            <Button
              variant="outlined"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={handleUpdate}
              sx={{ bgcolor: COLORS.primary }}
            >
              Save Changes
            </Button>
          </Box>
        )}
      </CardContent>
    </Card>
  </Box>
</Box>


    </Box>
  );
};

export default AdminProfile;
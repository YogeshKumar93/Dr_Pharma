import React from "react";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const CommonFormModal = ({
  open,
  onClose,
  title = "Form",
  fields = [],
  formData = {},
  onChange = () => {},
  onSubmit = () => {},
  submitLabel = "Submit",
}) => {

const handleChange = (field, value) => {
  onChange((prev) => ({
    ...prev,
    [field]: value,
  }));
};


  const renderField = (field) => {
    if (field.type === "select") {
      return (
      <TextField
  select
  label={field.label}
  value={formData[field.name] ?? ""}
  fullWidth
  size="small"
  required={field.required}
  disabled={field.disabled || false}   // ✅
  onChange={(e) => handleChange(field.name, e.target.value)}
>

          {field.options?.map((opt) => (
            <MenuItem key={opt} value={opt}>
              {opt}
            </MenuItem>
          ))}
        </TextField>
      );
    }

    if (field.type === "date") {
      return (
      <TextField
  type="date"
  fullWidth
  size="small"
  label={field.label}
  InputLabelProps={{ shrink: true }}
  value={formData[field.name] ?? ""}
  required={field.required}
  disabled={field.disabled || false}   // ✅
  onChange={(e) => handleChange(field.name, e.target.value)}
/>

      );
    }

    if (field.type === "file") {
      const file = formData[field.name];

      return (
        <Box sx={{ width: "100%" }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{ height: 40 }}
          >
            {field.label}
            <input
              type="file"
              hidden
              onChange={(e) =>
                handleChange(field.name, e.target.files[0])
              }
            />
          </Button>

          {file && (
            <Typography
              variant="caption"
              sx={{ mt: 0.5, display: "block", color: "text.secondary" }}
            >
              ✔ {file.name}
            </Typography>
          )}
        </Box>
      );
    }

    return (
    <TextField
  label={field.label}
  type={field.type || "text"}
  fullWidth
  size="small"
  required={field.required}
  disabled={field.disabled || false}   // ✅ ADD THIS
  value={formData[field.name] ?? ""}   // ✅ safer than ||
  onChange={(e) => handleChange(field.name, e.target.value)}
/>

    );
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle
        sx={{
          backgroundColor: "#1A5276",
          color: "white",
          py: 2,
          fontSize: "1.2rem",
          fontWeight: 600,
          textAlign: "center",
          position: "relative",
        }}
      >
        {title}

        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 12,
            top: 12,
            color: "white",
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Grid container spacing={2}>
          {fields.map((field, index) => (
            <Grid item xs={12} sm={6} key={index}>
              {renderField(field)}
            </Grid>
          ))}
        </Grid>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
 type="button"
  onClick={onClose}
  variant="outlined"
>
  Cancel
</Button>

        <Button variant="contained" onClick={onSubmit}>
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonFormModal;

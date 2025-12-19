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
} from "@mui/material";

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
    onChange({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Dialog open={open} fullWidth maxWidth="sm">
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {fields.map((field, index) => {
            if (field.type === "select") {
              return (
                <TextField
                  key={index}
                  select
                  label={field.label}
                  value={formData[field.name] || ""}
                  fullWidth
                  size="small"
                  required={field.required}
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
                  key={index}
                  type="date"
                  fullWidth
                  size="small"
                  label={field.label}
                  InputLabelProps={{ shrink: true }}
                  value={formData[field.name] || ""}
                  required={field.required}
                  onChange={(e) => handleChange(field.name, e.target.value)}
                />
              );
            }

            if (field.type === "file") {
              return (
                <Button
                  key={index}
                  variant="outlined"
                  component="label"
                  fullWidth
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
              );
            }

            return (
              <TextField
                key={index}
                label={field.label}
                type={field.type || "text"}
                fullWidth
                size="small"
                required={field.required}
                value={formData[field.name] || ""}
                onChange={(e) => handleChange(field.name, e.target.value)}
              />
            );
          })}
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="error">
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

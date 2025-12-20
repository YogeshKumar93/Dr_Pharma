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

  // Group fields into pairs for two-column layout
  const renderFieldGroup = (fieldGroup, groupIndex) => (
    <Grid container spacing={2} key={`group-${groupIndex}`}>
      {fieldGroup.map((field, index) => (
        <Grid item xs={12} sm={6} key={`${groupIndex}-${index}`}>
          {renderField(field)}
        </Grid>
      ))}
    </Grid>
  );

  const renderField = (field) => {
    if (field.type === "select") {
      return (
        <TextField
          select
          label={field.label}
          value={formData[field.name] || ""}
          fullWidth
          size="small"
          required={field.required}
          onChange={(e) => handleChange(field.name, e.target.value)}
          variant="outlined"
          sx={{ mt: 1 }}
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
          value={formData[field.name] || ""}
          required={field.required}
          onChange={(e) => handleChange(field.name, e.target.value)}
          variant="outlined"
          sx={{ mt: 1 }}
        />
      );
    }

    if (field.type === "file") {
      return (
        <Box sx={{ mt: 1 }}>
          <Button
            variant="outlined"
            component="label"
            fullWidth
            sx={{
              py: 1,
              borderColor: "grey.400",
              color: "text.primary",
              "&:hover": {
                borderColor: "primary.main",
              },
            }}
          >
            {field.label}
            <input
              type="file"
              hidden
              onChange={(e) => handleChange(field.name, e.target.files[0])}
            />
          </Button>
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
        value={formData[field.name] || ""}
        onChange={(e) => handleChange(field.name, e.target.value)}
        variant="outlined"
        sx={{ mt: 1 }}
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
        }}
      >
        {title}
      </DialogTitle>

      <DialogContent dividers sx={{ py: 3 }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {(() => {
            const groupedFields = [];
            for (let i = 0; i < fields.length; i += 2) {
              groupedFields.push(fields.slice(i, i + 2));
            }
            return groupedFields.map((fieldGroup, index) =>
              renderFieldGroup(fieldGroup, index)
            );
          })()}
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2, backgroundColor: "grey.50" }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{
            borderColor: "grey.400",
            color: "text.secondary",
            "&:hover": {
              borderColor: "grey.600",
              backgroundColor: "grey.100",
            },
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onSubmit}
          sx={{
            backgroundColor: "#1A5276",
            "&:hover": {
              backgroundColor: "#154360",
            },
            px: 3,
            py: 0.75,
            fontWeight: 600,
          }}
        >
          {submitLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CommonFormModal;
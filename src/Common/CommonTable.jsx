import React from "react";
import {
  Box,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  TablePagination,
  CircularProgress,
  TextField,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";

const CommonTable = ({
  columns = [],
  rows = [],
  loading = false,

  // Filters
  filtersConfig = [],
  filters = {},
  onFiltersChange = () => {},

  // Pagination
  serverPagination = false,
  page = 0,
  rowsPerPage = 10,
  totalCount = 0,
  onPageChange = () => {},
  onRowsPerPageChange = () => {},

  // Actions
  actions,

  // Table width
  width = "100%",
}) => {
  const handleFilterChange = (key, value) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const renderFilterField = (filter) => {
    switch (filter.type) {
      case "text":
        return (
          <TextField
            key={filter.name}
            label={filter.label}
            size="small"
            value={filters[filter.name] || ""}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            sx={{ minWidth: 150 }}
          />
        );
      case "dropdown":
        return (
          <TextField
            key={filter.name}
            select
            label={filter.label}
            size="small"
            value={filters[filter.name] || ""}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            sx={{ minWidth: 180 }}
          >
            <MenuItem value="">All</MenuItem>
            {filter.options?.map((opt) => (
              <MenuItem key={opt.value} value={opt.value}>
                {opt.label}
              </MenuItem>
            ))}
          </TextField>
        );
      case "checkbox":
        return (
          <FormControlLabel
            key={filter.name}
            control={
              <Checkbox
                checked={!!filters[filter.name]}
                onChange={(e) => handleFilterChange(filter.name, e.target.checked)}
              />
            }
            label={filter.label}
          />
        );
      case "date":
        return (
          <TextField
            key={filter.name}
            type="date"
            label={filter.label}
            size="small"
            InputLabelProps={{ shrink: true }}
            value={filters[filter.name] || ""}
            onChange={(e) => handleFilterChange(filter.name, e.target.value)}
            sx={{ minWidth: 160 }}
          />
        );
      case "button":
        return (
          <Button
            key={filter.name}
            variant={filter.variant || "outlined"}
            color={filter.color || "primary"}
            onClick={() => filter.onClick(filters)}
            sx={{ height: 36 }}
          >
            {filter.label}
          </Button>
        );
      default:
        return null;
    }
  };

  return (
    <Box sx={{ width, m: 0, p: 0 }}>
      {/* -------------------- Filters -------------------- */}
      {filtersConfig.length > 0 && (
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            alignItems: "center",
            mb: 2,
            p: 2,
            borderRadius: 2,
            background: "#fafafa",
            border: "1px solid #ddd",
          }}
        >
          {filtersConfig.map((filter) => renderFilterField(filter))}

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => onFiltersChange({})}
            sx={{ height: 36 }}
          >
            Reset
          </Button>
        </Box>
      )}

      {/* -------------------- Table -------------------- */}
      <Paper elevation={3} sx={{ overflow: "hidden", m: 0, p: 0 }}>
        <TableContainer sx={{ width: "100%", m: 0, p: 0 }}>
          <Table sx={{ width: "100%", m: 0, p: 0, tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                {columns.map((col, idx) => (
                  <TableCell
                    key={idx}
                    sx={{
                      fontWeight: 600,
                      width: col.width || `${100 / columns.length}%`,
                      px: 1,
                      py: 1,
                    }}
                  >
                    {col.headerName}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell sx={{ fontWeight: 600, width: "15%", px: 1, py: 1 }}>
                    Actions
                  </TableCell>
                )}
              </TableRow>
            </TableHead>

            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center" sx={{ p: 1 }}>
                    <CircularProgress size={28} />
                  </TableCell>
                </TableRow>
              ) : rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={columns.length + (actions ? 1 : 0)} align="center" sx={{ p: 1 }}>
                    No Data Found
                  </TableCell>
                </TableRow>
              ) : (
                rows.map((row, idx) => (
                  <TableRow hover key={idx}>
                    {columns.map((col, i) => (
                      <TableCell key={i} sx={{ px: 1, py: 1 }}>
                        {col.render ? col.render(row[col.field], row) : row[col.field]}
                      </TableCell>
                    ))}
                    {actions && <TableCell sx={{ px: 1, py: 1 }}>{actions(row)}</TableCell>}
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>

        {serverPagination && (
          <TablePagination
            component="div"
            page={page}
            rowsPerPage={rowsPerPage}
            count={totalCount}
            onPageChange={onPageChange}
            onRowsPerPageChange={onRowsPerPageChange}
          />
        )}
      </Paper>
    </Box>
  );
};

export default CommonTable;

import React, { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

export default function MuiPharmaAdminDashboard() {
  const [stats, setStats] = useState({ products: 0, orders: 0, users: 0 });
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const statsRes = await fetch("/api/admin/stats");
      const productsRes = await fetch("/api/admin/products");

      setStats(await statsRes.json());
      setProducts(await productsRes.json());
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ minHeight: "90vh", bgcolor: "#dfe8f1ff", width: "1300px", mt: 50,mb:10, ml: 20 }}>
      {/* Header */}
      <Box
        sx={{
          bgcolor: "white",
          px: 4,
          py: 2,
          borderBottom: "1px solid #e0e0e0",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight={600}>
          Pharma Admin Dashboard
        </Typography>
        <Button variant="contained" onClick={fetchData}>
          Refresh
        </Button>
      </Box>

      {/* Content */}
      <Box sx={{ p: 4 }}>
        {/* Stats */}
        <Grid container spacing={3} mb={4}>
          <Grid item xs={12} md={4}>
            <StatCard title="Products" value={stats.products} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Orders" value={stats.orders} />
          </Grid>
          <Grid item xs={12} md={4}>
            <StatCard title="Users" value={stats.users} />
          </Grid>
        </Grid>

        {/* Products Table */}
        <Card>
          <CardContent>
            <Typography variant="h6" mb={2}>
              Products
            </Typography>

            {loading ? (
              <Typography>Loading...</Typography>
            ) : (
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#fafafa" }}>
                      <TableCell>Name</TableCell>
                      <TableCell>Category</TableCell>
                      <TableCell>Price</TableCell>
                      <TableCell>Stock</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {products.map((p) => (
                      <TableRow key={p.id} hover>
                        <TableCell>{p.name}</TableCell>
                        <TableCell>{p.category}</TableCell>
                        <TableCell>₹{p.price}</TableCell>
                        <TableCell>{p.stock}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

function StatCard({ title, value }) {
  return (
    <Card>
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {title}
        </Typography>
        <Typography variant="h4" fontWeight={600} mt={1}>
          {value}
        </Typography>
      </CardContent>
    </Card>
  );
}

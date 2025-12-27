import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";
import { useState } from "react";

import {
  Typography,
  Divider,
  Button,
  Chip,
  Box,
} from "@mui/material";

const Checkout = ({ user }) => {
  const { cartItems, clearCart } = useCart();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [loading, setLoading] = useState(false);
  const [prescriptionFile, setPrescriptionFile] = useState(null);

  const navigate = useNavigate();

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      alert("Only JPG, PNG or PDF files allowed");
      return;
    }

    setPrescriptionFile(file);
  };

  const placeOrder = async () => {
    if (!address || !city || !pincode) {
      alert("Please fill complete address");
      return;
    }

    if (!cartItems.length) {
      alert("Cart is empty");
      return;
    }

    if (!prescriptionFile) {
      alert("Please upload prescription");
      return;
    }

    const formData = new FormData();
    formData.append("payment_method", paymentMethod);
    formData.append("address", `${address}, ${city} - ${pincode}`);
    formData.append("prescription", prescriptionFile);

    cartItems.forEach((item, index) => {
      formData.append(`cart[${index}][product_id]`, item.id);
      formData.append(`cart[${index}][qty]`, item.qty);
    });

    try {
      setLoading(true);
      const { response, error } = await apiCall(
        "POST",
        ApiEndpoints.PLACE_ORDER,
        formData,
        true
      );

      if (error || !response?.status) {
        alert(response?.message || "Order failed");
        return;
      }

      alert(`Order placed successfully\nOrder No: ${response.order_number}`);
      clearCart();
      navigate("/myorders");
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`@keyframes spin { to { transform: rotate(360deg); } }`}
      </style>

      <div style={styles.page}>
        <Typography variant="h4" align="center" sx={{ color: "#1A5276", mb: 4 }}>
          Checkout
        </Typography>

        <div style={styles.grid}>
          {/* ORDER SUMMARY */}
          <div style={styles.card}>
            <Typography variant="h6" sx={styles.cardTitle}>
              🛒 Order Summary
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {cartItems.map((item) => (
              <Box key={item.id} style={styles.cartRow}>
                <div>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography fontSize="13px" color="text.secondary">
                    Qty: {item.qty}
                  </Typography>
                </div>
                <Typography fontWeight={600}>
                  ₹{(item.price * item.qty).toFixed(2)}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box style={styles.totalRow}>
              <Typography fontWeight={700}>Total</Typography>
              <Typography fontWeight={700}>
                ₹{cartTotal.toFixed(2)}
              </Typography>
            </Box>
          </div>

          {/* ADDRESS */}
          <div style={styles.card}>
            <Typography variant="h6" sx={styles.cardTitle}>
              📍 Delivery Details
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Typography fontWeight={600}>Shipping Address</Typography>
            <textarea
              rows="3"
              style={styles.textarea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />

            <div style={styles.row}>
              <input
                style={styles.input}
                placeholder="City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              <input
                style={styles.input}
                placeholder="Pincode"
                maxLength="6"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
              />
            </div>

            <Divider sx={{ my: 2 }} />

            <Typography fontWeight={600}>
              Upload Prescription <span style={{ color: "red" }}>*</span>
            </Typography>

            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
            />

            {prescriptionFile ? (
              <Chip
                label={prescriptionFile.name}
                color="success"
                size="small"
                sx={{ mt: 1 }}
              />
            ) : (
              <Typography color="error" fontSize="13px" mt={1}>
                Prescription required
              </Typography>
            )}
          </div>

          {/* PAYMENT */}
          <div style={{ ...styles.card, ...styles.sticky }}>
            <Typography variant="h6" sx={styles.cardTitle}>
              💳 Payment
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <div
              style={
                paymentMethod === "cod"
                  ? styles.paymentActive
                  : styles.payment
              }
              onClick={() => setPaymentMethod("cod")}
            >
              Cash on Delivery
            </div>

            <div
              style={
                paymentMethod === "online"
                  ? styles.paymentActive
                  : styles.payment
              }
              onClick={() => setPaymentMethod("online")}
            >
              Online Payment
            </div>

            <Button
              fullWidth
              variant="contained"
              disabled={loading || !cartItems.length || !prescriptionFile}
              onClick={placeOrder}
              sx={{
                mt: 2,
                backgroundColor: "yellow",
                color: "#000",
                fontWeight: 700,
                "&:hover": { backgroundColor: "#f1c40f" },
              }}
            >
              {loading ? "Placing Order..." : `Place Order – ₹${cartTotal}`}
            </Button>

            <Typography
              fontSize="12px"
              align="center"
              color="text.secondary"
              mt={1}
            >
              🔒 Secure & encrypted checkout
            </Typography>
          </div>
        </div>
      </div>
    </>
  );
};

/* ================= STYLES ================= */
const styles = {
  page: {
    background: "#f4f6f8",
    minHeight: "100vh",
    padding: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1fr",
    gap: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "14px",
    padding: "20px",
    boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
  },
  sticky: {
    position: "sticky",
    top: "20px",
  },
  cardTitle: {
    color: "#1A5276",
    fontWeight: 700,
  },
  cartRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "18px",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginTop: "6px",
  },
  row: {
    display: "flex",
    gap: "10px",
    marginTop: "10px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  payment: {
    border: "2px solid #ddd",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
  },
  paymentActive: {
    border: "2px solid #1A5276",
    background: "#eaf4fb",
    padding: "14px",
    borderRadius: "8px",
    cursor: "pointer",
    marginBottom: "10px",
    fontWeight: 600,
  },
};

export default Checkout;

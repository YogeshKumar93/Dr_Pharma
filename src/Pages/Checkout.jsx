import { useNavigate } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";
import { useState } from "react";

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

  /* ================= Prescription Handler ================= */
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

  /* ================= Place Order ================= */
  const placeOrder = async () => {
    if (!address || !city || !pincode) {
      alert("Please fill complete address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    if (!prescriptionFile) {
      alert("Please upload prescription before placing order");
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
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>
        {`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.page}>
        <h1 style={styles.pageTitle}>Checkout</h1>

        <div style={styles.grid}>
          {/* ================= ORDER SUMMARY ================= */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>🛒 Order Summary</h2>

            {cartItems.length ? (
              <>
                {cartItems.map((item) => (
                  <div key={item.id} style={styles.cartRow}>
                    <div>
                      <div style={styles.itemName}>{item.name}</div>
                      <div style={styles.itemQty}>Qty: {item.qty}</div>
                    </div>
                    <div style={styles.price}>
                      ₹{(item.price * item.qty).toFixed(2)}
                    </div>
                  </div>
                ))}

                <div style={styles.totalRow}>
                  <span>Total</span>
                  <span>₹{cartTotal.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p>Your cart is empty</p>
            )}
          </div>

          {/* ================= ADDRESS + PRESCRIPTION ================= */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>📍 Delivery Details</h2>

            <label style={styles.label}>Shipping Address</label>
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

            <hr style={styles.divider} />

            <label style={styles.label}>
              Upload Prescription <span style={{ color: "red" }}>*</span>
            </label>
            <input
              type="file"
              accept=".jpg,.jpeg,.png,.pdf"
              onChange={handleFileChange}
            />

            {prescriptionFile ? (
              <p style={styles.success}>✅ {prescriptionFile.name}</p>
            ) : (
              <p style={styles.error}>❌ Prescription required</p>
            )}
          </div>

          {/* ================= PAYMENT ================= */}
          <div style={{ ...styles.card, ...styles.sticky }}>
            <h2 style={styles.cardTitle}>💳 Payment</h2>

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

            <button
              onClick={placeOrder}
              disabled={
                loading || !cartItems.length || !prescriptionFile
              }
              style={
                loading || !cartItems.length || !prescriptionFile
                  ? styles.buttonDisabled
                  : styles.button
              }
            >
              {loading ? (
                <span style={styles.loading}>
                  <span style={styles.spinner} /> Placing Order...
                </span>
              ) : (
                `Place Order – ₹${cartTotal.toFixed(2)}`
              )}
            </button>

            <p style={styles.secure}>🔒 Secure & encrypted checkout</p>
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
  pageTitle: {
    textAlign: "center",
    color: "#1A5276",
    marginBottom: "30px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.2fr 1fr",
    gap: "24px",
  },
  card: {
    background: "#fff",
    borderRadius: "12px",
    padding: "20px",
    boxShadow: "0 4px 18px rgba(0,0,0,0.08)",
  },
  sticky: {
    position: "sticky",
    top: "20px",
    height: "fit-content",
  },
  cardTitle: {
    color: "#1A5276",
    marginBottom: "16px",
  },
  cartRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 0",
    borderBottom: "1px solid #eee",
  },
  itemName: { fontWeight: "600" },
  itemQty: { fontSize: "13px", color: "#777" },
  price: { fontWeight: "600" },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontWeight: "700",
    fontSize: "18px",
    marginTop: "12px",
  },
  label: { fontWeight: "600", marginTop: "10px" },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  row: { display: "flex", gap: "10px", marginTop: "10px" },
  divider: { margin: "20px 0" },
  success: { color: "green", marginTop: "8px" },
  error: { color: "red", marginTop: "8px" },
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
  },
  button: {
    width: "100%",
    padding: "16px",
    background: "yellow",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    marginTop: "15px",
  },
  buttonDisabled: {
    width: "100%",
    padding: "16px",
    background: "#ccc",
    border: "none",
    borderRadius: "10px",
    marginTop: "15px",
  },
  loading: { display: "flex", justifyContent: "center", gap: "10px" },
  spinner: {
    width: "18px",
    height: "18px",
    border: "2px solid #fff",
    borderTopColor: "#1A5276",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  secure: {
    fontSize: "13px",
    marginTop: "10px",
    textAlign: "center",
  },
};

export default Checkout;

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
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>

      <div style={styles.container}>
        <div style={styles.checkoutContainer}>
          <h1 style={styles.title}>Checkout</h1>

          {/* ================= Order Summary ================= */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Order Summary</h2>
            <div style={styles.orderSummary}>
              {cartItems.length > 0 ? (
                <>
                  {cartItems.map((item) => (
                    <div key={item.id} style={styles.cartItem}>
                      <div style={styles.itemDetails}>
                        <span style={styles.itemName}>{item.name}</span>
                        <span style={styles.itemQty}>Qty: {item.qty}</span>
                      </div>
                      <div style={styles.itemPrice}>
                        ₹{(item.price * item.qty).toFixed(2)}
                      </div>
                    </div>
                  ))}
                  <div style={styles.totalRow}>
                    <span style={styles.totalLabel}>Total Amount:</span>
                    <span style={styles.totalAmount}>
                      ₹{cartTotal.toFixed(2)}
                    </span>
                  </div>
                </>
              ) : (
                <p style={styles.emptyCart}>Your cart is empty</p>
              )}
            </div>
          </div>

          {/* ================= Prescription Upload ================= */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Prescription Upload</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>
                Upload Doctor Prescription{" "}
                <span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.pdf"
                onChange={handleFileChange}
                style={styles.input}
              />
              {prescriptionFile ? (
                <p style={{ color: "green", marginTop: "8px" }}>
                  ✅ {prescriptionFile.name}
                </p>
              ) : (
                <p style={{ color: "red", marginTop: "8px" }}>
                  ❌ Prescription required
                </p>
              )}
            </div>
          </div>

          {/* ================= Shipping Address ================= */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Shipping Address</h2>
            <div style={styles.formGroup}>
              <label style={styles.label}>Address</label>
              <textarea
                style={styles.textarea}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                rows="3"
              />
            </div>

            <div style={styles.row}>
              <div style={styles.formGroupHalf}>
                <label style={styles.label}>City</label>
                <input
                  style={styles.input}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>

              <div style={styles.formGroupHalf}>
                <label style={styles.label}>Pincode</label>
                <input
                  style={styles.input}
                  value={pincode}
                  maxLength="6"
                  onChange={(e) => setPincode(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ================= Payment Method ================= */}
          <div style={styles.section}>
            <h2 style={styles.sectionTitle}>Payment Method</h2>

            <div style={styles.paymentOptions}>
              <div
                style={
                  paymentMethod === "cod"
                    ? styles.paymentOptionActive
                    : styles.paymentOption
                }
                onClick={() => setPaymentMethod("cod")}
              >
                <div style={styles.radioContainer}>
                  <div
                    style={
                      paymentMethod === "cod"
                        ? styles.radioActive
                        : styles.radio
                    }
                  />
                  <span style={styles.paymentLabel}>
                    Cash on Delivery
                  </span>
                </div>
                <p style={styles.paymentDescription}>
                  Pay when you receive your order
                </p>
              </div>

              <div
                style={
                  paymentMethod === "online"
                    ? styles.paymentOptionActive
                    : styles.paymentOption
                }
                onClick={() => setPaymentMethod("online")}
              >
                <div style={styles.radioContainer}>
                  <div
                    style={
                      paymentMethod === "online"
                        ? styles.radioActive
                        : styles.radio
                    }
                  />
                  <span style={styles.paymentLabel}>
                    Online Payment
                  </span>
                </div>
                <p style={styles.paymentDescription}>
                  Pay using card, UPI, or wallet
                </p>
              </div>
            </div>
          </div>

          {/* ================= Place Order ================= */}
          <div style={styles.buttonContainer}>
            <button
              onClick={placeOrder}
              disabled={
                loading || cartItems.length === 0 || !prescriptionFile
              }
              style={
                loading || cartItems.length === 0 || !prescriptionFile
                  ? styles.buttonDisabled
                  : styles.button
              }
            >
              {loading ? (
                <span style={styles.buttonContent}>
                  <span style={styles.spinner} /> Placing Order...
                </span>
              ) : (
                `Place Order - ₹${cartTotal.toFixed(2)}`
              )}
            </button>

            <p style={styles.secureNote}>
              🔒 Your payment information is secure and encrypted
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

/* ================= STYLES (UNCHANGED FROM YOUR CODE) ================= */
const styles = {
  container: {
    backgroundColor: "#f8f9fa",
    minHeight: "70vh",
    padding: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
  },
  checkoutContainer: {
    maxWidth: "600px",
    width: "100%",
    backgroundColor: "white",
    borderRadius: "12px",
    boxShadow: "0 2px 20px rgba(0,0,0,0.08)",
    padding: "28px",
    margin: "20px 0",
  },
  title: {
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "3px",
    borderBottom: "2px solid #edf2f7",
  },
  section: {
    marginBottom: "10px",
    padding: "15px",
    backgroundColor: "#d6d0d0ff",
    borderRadius: "10px",
    border: "1px solid #e2e8f0",
  },
  sectionTitle: {
    color: "#052966ff",
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "20px",
  },
  orderSummary: {
    backgroundColor: "white",
    borderRadius: "8px",
    padding: "16px",
    border: "1px solid #e2e8f0",
  },
  cartItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "12px 0",
    borderBottom: "1px solid #f1f1f1",
  },
  itemDetails: { display: "flex", flexDirection: "column" },
  itemName: { fontWeight: "500" },
  itemQty: { fontSize: "14px", color: "#718096" },
  itemPrice: { fontWeight: "600" },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "2px solid #e2e8f0",
  },
  totalAmount: { fontSize: "24px", fontWeight: "700" },
  emptyCart: { textAlign: "center", padding: "20px" },
  formGroup: { marginBottom: "20px" },
  row: { display: "flex", gap: "20px" },
  formGroupHalf: { flex: 1 },
  label: { fontSize: "14px", fontWeight: "500" },
  input: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #e2e8f0",
  },
  paymentOptions: { display: "flex", flexDirection: "column", gap: "12px" },
  paymentOption: {
    padding: "20px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    cursor: "pointer",
  },
  paymentOptionActive: {
    padding: "20px",
    border: "2px solid #3182ce",
    backgroundColor: "#ebf8ff",
    borderRadius: "8px",
  },
  radioContainer: { display: "flex", gap: "12px" },
  radio: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #cbd5e0",
  },
  radioActive: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "6px solid #3182ce",
  },
  buttonContainer: { marginTop: "32px", textAlign: "center" },
  button: {
    width: "100%",
    padding: "18px",
    backgroundColor: "#f1c40f",
    borderRadius: "10px",
    fontWeight: "600",
  },
  buttonDisabled: {
    width: "100%",
    padding: "18px",
    backgroundColor: "#cbd5e0",
    borderRadius: "10px",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  secureNote: { fontSize: "14px", marginTop: "12px" },
};

export default Checkout;

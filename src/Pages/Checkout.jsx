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

  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!address || !city || !pincode) {
      alert("Please fill complete address");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty");
      return;
    }

    const payload = {
      payment_method: paymentMethod,
      address: `${address}, ${city} - ${pincode}`,
      cart: cartItems.map((item) => ({
        product_id: item.id,
        qty: item.qty,
      })),
    };

    try {
      setLoading(true);
      const { response, error } = await apiCall(
        "POST",
        ApiEndpoints.PLACE_ORDER,
        payload
      );

      if (error || !response?.status) {
        alert(response?.message || "Order failed");
        return;
      }

      alert(`Order placed successfully\nOrder No: ${response.order_number}`);
      clearCart();
      window.location.href = "/";

    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <> <style>
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
        
        {/* Order Summary Section */}
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
                  <span style={styles.totalAmount}>₹{cartTotal.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <p style={styles.emptyCart}>Your cart is empty</p>
            )}
          </div>
        </div>

        {/* Shipping Address Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Shipping Address</h2>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              style={styles.textarea}
              placeholder="House number, street, area"
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
                placeholder="Enter your city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </div>
            
            <div style={styles.formGroupHalf}>
              <label style={styles.label}>Pincode</label>
              <input
                style={styles.input}
                placeholder="Enter pincode"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                maxLength="6"
              />
            </div>
          </div>
        </div>

        {/* Payment Method Section */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Payment Method</h2>
          <div style={styles.paymentOptions}>
            <div 
              style={paymentMethod === "cod" ? styles.paymentOptionActive : styles.paymentOption}
              onClick={() => setPaymentMethod("cod")}
            >
              <div style={styles.radioContainer}>
                <div style={paymentMethod === "cod" ? styles.radioActive : styles.radio} />
                <span style={styles.paymentLabel}>Cash on Delivery</span>
              </div>
              <p style={styles.paymentDescription}>Pay when you receive your order</p>
            </div>
            
            <div 
              style={paymentMethod === "online" ? styles.paymentOptionActive : styles.paymentOption}
              onClick={() => setPaymentMethod("online")}
            >
              <div style={styles.radioContainer}>
                <div style={paymentMethod === "online" ? styles.radioActive : styles.radio} />
                <span style={styles.paymentLabel}>Online Payment</span>
              </div>
              <p style={styles.paymentDescription}>Pay using card, UPI, or wallet</p>
            </div>
          </div>
        </div>

        {/* Place Order Button */}
        <div style={styles.buttonContainer}>
          <button 
            onClick={placeOrder} 
            disabled={loading || cartItems.length === 0}
            style={cartItems.length === 0 ? styles.buttonDisabled : styles.button}
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
    color: "#2d3748",
    fontSize: "28px",
    fontWeight: "600",
    marginBottom: "3px",
    paddingBottom: "6px",
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
    display: "flex",
    alignItems: "center",
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
    alignItems: "center",
    padding: "12px 0",
    borderBottom: "1px solid #f1f1f1",
  },
  itemDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
  },
  itemName: {
    color: "#2d3748",
    fontWeight: "500",
  },
  itemQty: {
    color: "#718096",
    fontSize: "14px",
  },
  itemPrice: {
    color: "#2d3748",
    fontWeight: "600",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: "16px",
    marginTop: "16px",
    borderTop: "2px solid #e2e8f0",
  },
  totalLabel: {
    color: "#4a5568",
    fontSize: "16px",
    fontWeight: "500",
  },
  totalAmount: {
    color: "#2d3748",
    fontSize: "24px",
    fontWeight: "700",
  },
  emptyCart: {
    textAlign: "center",
    color: "#718096",
    padding: "20px",
  },
  formGroup: {
    marginBottom: "20px",
  },
  row: {
    display: "flex",
    gap: "20px",
    '@media (max-width: 768px)': {
      flexDirection: "column",
      gap: "0",
    },
  },
  formGroupHalf: {
    flex: "1",
    marginBottom: "20px",
  },
  label: {
    display: "block",
    color: "#4a5568",
    fontSize: "14px",
    fontWeight: "500",
    marginBottom: "8px",
  },
  input: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#2d3748",
    backgroundColor: "white",
    transition: "border-color 0.2s",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "16px",
    color: "#2d3748",
    backgroundColor: "white",
    transition: "border-color 0.2s",
    resize: "vertical",
    minHeight: "80px",
    boxSizing: "border-box",
    fontFamily: "inherit",
  },
  paymentOptions: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  paymentOption: {
    padding: "20px",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: "white",
  },
  paymentOptionActive: {
    padding: "20px",
    border: "2px solid #3182ce",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "all 0.2s",
    backgroundColor: "#ebf8ff",
  },
  radioContainer: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "8px",
  },
  radio: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "2px solid #cbd5e0",
    backgroundColor: "white",
  },
  radioActive: {
    width: "20px",
    height: "20px",
    borderRadius: "50%",
    border: "6px solid #3182ce",
    backgroundColor: "white",
  },
  paymentLabel: {
    fontSize: "16px",
    fontWeight: "600",
    color: "#2d3748",
  },
  paymentDescription: {
    fontSize: "14px",
    color: "#718096",
    margin: "0",
    paddingLeft: "32px",
  },
  buttonContainer: {
    marginTop: "32px",
    textAlign: "center",
  },
  button: {
    width: "100%",
    padding: "18px",
     backgroundColor: "#f1c40f",
    color: "black",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s",
    boxShadow: "0 4px 12px rgba(49, 130, 206, 0.3)",
  },
  buttonDisabled: {
    width: "100%",
    padding: "18px",
    backgroundColor: "#cbd5e0",
    color: "#718096",
    border: "none",
    borderRadius: "10px",
    fontSize: "18px",
    fontWeight: "600",
    cursor: "not-allowed",
  },
  buttonContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
  },
  spinner: {
    width: "20px",
    height: "20px",
    border: "2px solid rgba(255,255,255,0.3)",
    borderTopColor: "white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  secureNote: {
    color: "#718096",
    fontSize: "14px",
    marginTop: "12px",
    textAlign: "center",
  },
};

 

export default Checkout;
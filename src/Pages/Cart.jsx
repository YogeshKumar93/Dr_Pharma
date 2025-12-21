// Cart.jsx
import { useState } from "react";
import { useCart } from "../Contexts/CartContext";
import RegisterModal from "./RegisterModal";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const [showRegister, setShowRegister] = useState(false);
  const isLoggedIn = false; // future me auth se aayega

  const calculateItemTotal = (price, qty) => (price * qty).toFixed(2);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const styles = {
    pageOuter: {
      width: "100%",
      minHeight: "100vh",
      background: "#faf7f0",
      padding: "30px 0",
    },

    pageWrapper: {
      display: "flex",
      gap: "32px",
      alignItems: "stretch",
      width: "95%",
      maxWidth: "1400px",
      margin: "0 auto",
    },

    cartContainer: {
      flex: showRegister && !isLoggedIn ? 2 : 1,
      transition: "all 0.3s ease",
      background: "#fff",
      padding: "24px",
      borderRadius: "14px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },

    registerWrapper: {
      flex: 1,
      background: "#fff",
      padding: "24px",
      borderRadius: "14px",
      boxShadow: "0 6px 20px rgba(0,0,0,0.08)",
      position: "sticky",
      top: "30px",
      height: "fit-content",
    },

    header: {
      color: "#2c3e50",
      borderBottom: "2px solid #f1c40f",
      paddingBottom: "6px",
      marginBottom: "16px",
      fontSize: "22px",
    },

    emptyCart: {
      textAlign: "center",
      padding: "40px",
      color: "#7f8c8d",
    },

    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "16px",
    },

    tableHeader: {
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "10px",
      textAlign: "left",
      fontSize: "14px",
    },

    tableRow: {
      borderBottom: "1px solid #ecf0f1",
    },

    tableCell: {
      padding: "10px",
      color: "#2c3e50",
      fontSize: "14px",
      verticalAlign: "middle",
    },

    quantityCell: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
    },

    quantityButton: {
      backgroundColor: "#f1c40f",
      border: "none",
      borderRadius: "4px",
      width: "24px",
      height: "24px",
      cursor: "pointer",
      fontWeight: "bold",
    },

    priceCell: {
      color: "#27ae60",
      fontWeight: "600",
    },

    summaryBox: {
      padding: "12px",
      background: "#f8f9fa",
      borderRadius: "8px",
      marginBottom: "16px",
    },

    proceedButton: {
      width: "100%",
      backgroundColor: "#f1c40f",
      color: "#2c3e50",
      border: "none",
      borderRadius: "8px",
      padding: "12px",
      fontSize: "16px",
      fontWeight: "bold",
      cursor: "pointer",
    },
  };

  return (
    <div style={styles.pageOuter}>
      <div style={styles.pageWrapper}>

        {/* LEFT - CART */}
        <div style={styles.cartContainer}>
          <h1 style={styles.header}>🛒 Your Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div style={styles.emptyCart}>
              <p>Your cart is empty</p>
            </div>
          ) : (
            <>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Item</th>
                    <th style={styles.tableHeader}>Qty</th>
                    <th style={styles.tableHeader}>Price</th>
                    <th style={styles.tableHeader}>Total</th>
                    <th style={styles.tableHeader}>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{item.title}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.quantityCell}>
                          <button style={styles.quantityButton} onClick={() => decreaseQty(item.id)}>-</button>
                          {item.qty}
                          <button style={styles.quantityButton} onClick={() => increaseQty(item.id)}>+</button>
                        </div>
                      </td>
                      <td style={{ ...styles.tableCell, ...styles.priceCell }}>₹{item.price}</td>
                      <td style={{ ...styles.tableCell, ...styles.priceCell }}>
                        ₹{calculateItemTotal(item.price, item.qty)}
                      </td>
                      <td style={styles.tableCell}>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "6px 10px", borderRadius: "6px" }}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div style={styles.summaryBox}>
                <div>Subtotal: ₹{cartTotal.toFixed(2)}</div>
                <div>Shipping: ₹5.99</div>
                <strong>Total: ₹{(cartTotal + 5.99).toFixed(2)}</strong>
              </div>

              <button
                style={styles.proceedButton}
                onClick={() => {
                  // if (!isLoggedIn) setShowRegister(true);
                  // else window.location.href = "/checkout";
                  window.location.href = "/checkout";

                }}
              >
                🛒 PROCEED TO PAY
              </button>
            </>
          )}
        </div>

        {/* RIGHT - REGISTER */}
        {!isLoggedIn && showRegister && (
          <div style={styles.registerWrapper}>
            <RegisterModal
              onSubmit={(data) => {
                console.log("User Registered:", data);
                alert("Registration successful!");
                setShowRegister(false);
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

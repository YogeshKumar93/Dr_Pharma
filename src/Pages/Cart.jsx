// Cart.jsx
import { useState } from "react";
import { useCart } from "../Contexts/CartContext";
import RegisterModal from "./RegisterModal";

const Cart = () => {
  const { cartItems, increaseQty, decreaseQty, removeFromCart } = useCart();
  const [showRegister, setShowRegister] = useState(false);

  const calculateItemTotal = (price, qty) => (price * qty).toFixed(2);

  const cartTotal = cartItems.reduce(
    (total, item) => total + item.price * item.qty,
    0
  );

  const styles = {
    pageWrapper: {
      display: "flex",
  alignItems: "flex-start",
  width: "100%",
  maxWidth: "1200px",
  margin: "0 auto",
  padding: "10px",
    },
    cartContainer: {
      width: showRegister ? "50%" : "100%",
  transition: "width 0.3s ease",
    },
    container: {
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    },
    header: {
      color: "#2c3e50",
      borderBottom: "2px solid #f1c40f",
      paddingBottom: "6px",
      marginBottom: "16px",
      fontSize: "20px",
    },
    emptyCart: {
      textAlign: "center",
      padding: "25px",
      color: "#7f8c8d",
      fontSize: "14px",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      marginBottom: "16px",
      boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
      borderRadius: "6px",
      overflow: "hidden",
    },
    tableHeader: {
      backgroundColor: "#2c3e50",
      color: "white",
      padding: "8px",
      textAlign: "left",
      fontWeight: "600",
      fontSize: "13px",
    },
    tableRow: { borderBottom: "1px solid #ecf0f1" },
    tableCell: {
      padding: "8px",
      color: "#2c3e50",
      fontSize: "13px",
      verticalAlign: "middle",
    },
    quantityCell: { display: "flex", alignItems: "center" },
    quantityButton: {
      backgroundColor: "#f1c40f",
      border: "none",
      borderRadius: "4px",
      width: "22px",
      height: "22px",
      cursor: "pointer",
      fontSize: "13px",
      fontWeight: "bold",
      color: "#2c3e50",
    },
    quantityValue: { margin: "0 6px", minWidth: "18px", textAlign: "center" },
    priceCell: { color: "#27ae60", fontWeight: "600" },
    proceedButton: {
      backgroundColor: "#f1c40f",
      color: "#2c3e50",
      border: "none",
      borderRadius: "6px",
      padding: "10px",
      fontSize: "15px",
      fontWeight: "bold",
      cursor: "pointer",
      width: "100%",
    },
    cartWrapper: {
      maxHeight: "280px",
      overflowY: "auto",
      marginBottom: "16px",
      borderRadius: "6px",
    },
  };

  return (
    <div style={styles.pageWrapper}>
        
      <div style={{ ...styles.container, ...styles.cartContainer }}>
        <h1 style={styles.header}>🛒 Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <p style={{ fontSize: "16px" }}>Your cart is empty</p>
            <p>Add some items to get started!</p>
          </div>
        ) : (
          <>
            <div style={styles.cartWrapper}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.tableHeader}>Item</th>
                    <th style={styles.tableHeader}>Qty</th>
                    <th style={styles.tableHeader}>Price</th>
                    <th style={styles.tableHeader}>Total</th>
                    <th style={styles.tableHeader}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id} style={styles.tableRow}>
                      <td style={styles.tableCell}>{item.title}</td>
                      <td style={styles.tableCell}>
                        <div style={styles.quantityCell}>
                          <button style={styles.quantityButton} onClick={() => decreaseQty(item.id)}>-</button>
                          <span style={styles.quantityValue}>{item.qty}</span>
                          <button style={styles.quantityButton} onClick={() => increaseQty(item.id)}>+</button>
                        </div>
                      </td>
                      <td style={{ ...styles.tableCell, ...styles.priceCell }}>₹{item.price}</td>
                      <td style={{ ...styles.tableCell, ...styles.priceCell }}>₹{calculateItemTotal(item.price, item.qty)}</td>
                      <td style={styles.tableCell}>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: "#e74c3c", color: "#fff", border: "none", padding: "5px 8px", borderRadius: "4px" }}>Remove</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: "10px", background: "#f8f9fa", borderRadius: "6px", marginBottom: "16px" }}>
              <div>Subtotal: ₹{cartTotal.toFixed(2)}</div>
              <div>Shipping: ₹5.99</div>
              <strong>Total: ₹{(cartTotal + 5.99).toFixed(2)}</strong>
            </div>

            <button style={styles.proceedButton} onClick={() => setShowRegister(true)}>
              🛒 PROCEED TO PAY
            </button>
          </>
        )}
      </div>

      {showRegister && (
        <RegisterModal
          onClose={() => setShowRegister(false)}
          onSubmit={(data) => {
            console.log("User Registered:", data);
            setShowRegister(false);
            alert("Registration successful! Confirmation email sent.");
          }}
        />
      )}
    </div>
  );
};

export default Cart;



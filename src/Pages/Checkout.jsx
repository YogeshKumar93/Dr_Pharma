import { useCart } from "../Contexts/CartContext";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";
import { useState } from "react";

const Checkout = ({ user }) => {
  const { cartItems } = useCart();

  // 🔹 Address fields
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");

  // 🔹 Payment
  const [paymentMethod, setPaymentMethod] = useState("cod");

  // 🔹 Loader
  const [loading, setLoading] = useState(false);

  // 🔹 Total calculation
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const placeOrder = async () => {
    if (!address || !city || !pincode) {
      alert("Please fill complete address");
      return;
    }

    const payload = {
      user_id: user.id,
      payment_method: paymentMethod,
      total_amount: cartTotal, // 🔥 IMPORTANT
      address: `${address}, ${city} - ${pincode}`,

      cart: cartItems.map((item) => ({
        product_id: item.id,   // backend expects product_id
        price: item.price,
        qty: item.qty,
      })),
    };

    setLoading(true);

    const { response, error } = await apiCall(
      "POST",
      ApiEndpoints.PLACE_ORDER,
      payload
    );

    setLoading(false);

    if (error) {
      alert("Order failed");
      return;
    }

    // ✅ SUCCESS
    alert("Order placed successfully");
    localStorage.removeItem("cartItems");
    window.location.href = "/my-orders";
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto" }}>
      <h2>Checkout</h2>

      {/* ADDRESS */}
      <textarea
        placeholder="House / Street"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />

      <input
        placeholder="City"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />

      <input
        placeholder="Pincode"
        value={pincode}
        onChange={(e) => setPincode(e.target.value)}
      />

      {/* PAYMENT */}
      <select
        value={paymentMethod}
        onChange={(e) => setPaymentMethod(e.target.value)}
      >
        <option value="cod">Cash on Delivery</option>
        <option value="online">Online Payment</option>
      </select>

      {/* SUMMARY */}
      <p><strong>Total:</strong> ₹{cartTotal}</p>

      <button onClick={placeOrder} disabled={loading}>
        {loading ? "Placing Order..." : "Confirm Order"}
      </button>
    </div>
  );
};

export default Checkout;

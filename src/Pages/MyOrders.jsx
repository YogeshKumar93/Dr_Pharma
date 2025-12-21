import { useEffect, useState } from "react";
import { apiCall } from "../api/api";

const MyOrders = ({ user }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiCall("POST", "orders/my", { user_id: user.id })
      .then(({ response }) => setOrders(response));
  }, []);

  return (
    <div>
      <h2>My Orders</h2>

      {orders.map((o) => (
        <div key={o.id}>
          <p>Order #{o.order_number}</p>
          <p>Status: {o.order_status}</p>
          <p>Total: ₹{o.total_amount}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;

import { useEffect, useState } from "react";
import { apiCall } from "../api/api";
// import { apiCall } from "../../api/api";

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    apiCall("GET", "admin/orders")
      .then(({ response }) => setOrders(response));
  }, []);

  const updateStatus = (order_id, status) => {
    apiCall("POST", "admin/orders/update-status", {
      order_id,
      order_status: status,
    });
  };

  return (
    <div>
      <h2>All Orders</h2>

      {orders.map((o) => (
        <div key={o.id}>
          <p>{o.order_number}</p>

          <select
            value={o.order_status}
            onChange={(e) =>
              updateStatus(o.id, e.target.value)
            }
          >
            <option>pending</option>
            <option>confirmed</option>
            <option>shipped</option>
            <option>delivered</option>
            <option>cancelled</option>
          </select>
        </div>
      ))}
    </div>
  );
};

export default AdminOrders;

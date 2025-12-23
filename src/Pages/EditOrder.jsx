import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";

const EditOrder = ({ open, handleClose, order, onFetchRef }) => {
  const [formData, setFormData] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (order) {
      setFormData({
        user_id: order.user_id,
        total_amount: order.total_amount,
        payment_method: order.payment_method,
        payment_status: order.payment_status,
        order_status: order.order_status,
        address: order.address,
      });
    }
  }, [order]);

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      const { error } = await apiCall(
        "POST",
        "admin/orders/update",
        {
          order_id: order.id,
          ...formData,
        }
      );

      if (error) {
        alert("Failed to update order");
        return;
      }

      onFetchRef?.();
      handleClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (!order) return null;

  const fields = [
    { name: "user_id", label: "User ID", type: "number", disabled: true },
    { name: "total_amount", label: "Total Amount", type: "number" },
    {
      name: "payment_method",
      label: "Payment Method",
      type: "select",
      options: [
        { label: "COD", value: "cod" },
        { label: "Online", value: "online" },
      ],
    },
    {
      name: "payment_status",
      label: "Payment Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Paid", value: "paid" },
      ],
    },
    {
      name: "order_status",
      label: "Order Status",
      type: "select",
      options: [
        { label: "Pending", value: "pending" },
        { label: "Confirmed", value: "confirmed" },
        { label: "Shipped", value: "shipped" },
        { label: "Delivered", value: "delivered" },
        { label: "Cancelled", value: "cancelled" },
      ],
    },
    { name: "address", label: "Delivery Address", type: "textarea" },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleClose}
      title="Edit Order"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Updating..." : "Update"}
    />
  );
};

export default EditOrder;

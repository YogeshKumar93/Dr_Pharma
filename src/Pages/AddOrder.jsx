import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";

const AddOrder = ({ open, handleClose, onFetchRef }) => {
  const initialFormData = {
    user_id: "",
    total_amount: "",
    payment_method: "",
    payment_status: "pending",
    order_status: "pending",
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => setFormData(initialFormData);

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  const handleSubmit = async () => {
    if (!formData.user_id || !formData.total_amount) {
      alert("User ID & Total Amount are required");
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await apiCall(
        "POST",
        "admin/orders/create",
        formData
      );

      if (error) {
        alert("Failed to create order");
        return;
      }

      onFetchRef?.();
      handleModalClose();
    } catch (err) {
      console.error(err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) resetForm();
  }, [open]);

  const fields = [
    { name: "user_id", label: "User ID", type: "number", required: true },
    { name: "total_amount", label: "Total Amount", type: "number", required: true },
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
      onClose={handleModalClose}
      title="Add Order"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Saving..." : "Save"}
    />
  );
};

export default AddOrder;

import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { BASE_URL } from "../api/config";

const EditPrescription = ({ open, onClose, onFetchRef, product }) => {
  const initialFormData = {
    id: null,
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    image: null,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => setFormData(initialFormData);

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  // ✅ SUBMIT UPDATE
  const handleSubmit = async () => {
    if (!formData.id) return;

    setSubmitting(true);

    try {
      const token = localStorage.getItem("token");

      const payload = new FormData();
      payload.append("id", formData.id);
      payload.append("title", formData.title);
      payload.append("description", formData.description);
      payload.append("category", formData.category);
      payload.append("price", formData.price);
      payload.append("stock", formData.stock);

      // 🔥 FORCE PRESCRIBED
      payload.append("is_prescribed", 1);

      if (formData.image) {
        payload.append("image", formData.image);
      }

      const res = await fetch(`${BASE_URL}products/update`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: payload,
      });

      if (!res.ok) {
        throw new Error("Update failed");
      }

      // ✅ AUTO REFRESH TABLE
      onFetchRef?.();
      handleModalClose();
    } catch (e) {
      console.error("Edit prescription failed", e);
      alert("Prescription update failed");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ PREFILL DATA
  useEffect(() => {
    if (open && product) {
      setFormData({
        id: product.id,
        title: product.title || "",
        description: product.description || "",
        category: product.category || "",
        price: product.price || "",
        stock: product.stock || "",
        image: null,
      });
    }
  }, [open, product]);

  const fields = [
    { name: "title", label: "Medicine Name", required: true },
    { name: "description", label: "Description" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: [
        { label: "Prescribed", value: "prescribed" },
        // { label: "Medicines", value: "medicines" },
        // { label: "Medical Instruments", value: "medical instruments" },
        // { label: "Syrups", value: "syrups" },
        // { label: "Kits", value: "kits" },
        // { label: "Supplements", value: "supplements" },
      ],
    },
    { name: "stock", label: "Stock" },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "image", label: "Image", type: "file" },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleModalClose}
      title="Edit Prescribed Medicine"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Updating..." : "Update"}
    />
  );
};

export default EditPrescription;

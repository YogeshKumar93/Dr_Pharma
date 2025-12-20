import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { BASE_URL } from "../api/config";

const AddProduct = ({ open, handleClose, onFetchRef }) => {
  const initialFormData = {
    title: "",
    description: "",
    price: "",
    image: null,
    created_at: "",
    updated_at: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => setFormData(initialFormData);

  const handleModalClose = () => {
    resetForm();
    handleClose();
  };

  const formatDate = (date) => {
    if (!date) return "";
    const [y, m, d] = date.split("-");
    return `${d}/${m}/${y}`;
  };

  const handleSubmit = async () => {
    if (!formData.title || !formData.price) {
      alert("Title & Price required");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();
      Object.entries({
        ...formData,
        created_at: formatDate(formData.created_at),
        updated_at: formatDate(formData.updated_at),
      }).forEach(([k, v]) => payload.append(k, v));

      await fetch(`${BASE_URL}products`, {
        method: "POST",
        body: payload,
      });

      onFetchRef?.();
      handleModalClose();
    } catch (e) {
      console.error(e);
      alert("Failed to add product");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) resetForm();
  }, [open]);

  const fields = [
    { name: "title", label: "Title", required: true },
    { name: "description", label: "Description" },
    { name: "price", label: "Price", type: "number", required: true },
    { name: "image", label: "Image", type: "file" },
    { name: "created_at", label: "Created Date", type: "date" },
    { name: "updated_at", label: "Updated Date", type: "date" },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleModalClose}
      title="Add Product"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Saving..." : "Save"}
    />
  );
};

export default AddProduct;

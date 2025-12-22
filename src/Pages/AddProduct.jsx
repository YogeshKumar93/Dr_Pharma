import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";


const AddProduct = ({ open, handleClose, onFetchRef }) => {
  const initialFormData = {
    title: "",
    description: "",
    category: "",
    price: "",
    image: null,
    created_at: "",
    updated_at: "",
  };

  const categoryOptions = [
    { label: "Medicines", value: "medicines" },
    { label: "Medical Instruments", value: "medical instruments" },
    { label: "Syrups", value: "syrups" },
    { label: "Kits", value: "kits" },
    { label: "Supplements", value: "supplements" },
  ];

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
    if (!formData.title || !formData.price || !formData.category) {
      alert("Title, Category & Price are required");
      return;
    }

    setSubmitting(true);

    try {
      const payload = new FormData();

      Object.entries({
        ...formData,
        created_at: formatDate(formData.created_at),
        updated_at: formatDate(formData.updated_at),
      }).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          payload.append(key, value);
        }
      });

      // ✅ USING apiCall (TOKEN WILL BE ATTACHED)
      const { response, error } = await apiCall(
        "POST",
        "products/create",
        payload
      );

      if (error) {
        alert("Failed to add product");
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
    { name: "title", label: "Title", required: true },
    { name: "description", label: "Description" },
    {
      name: "category",
      label: "Category",
      type: "select",
      options: categoryOptions,
      required: true,
    },
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

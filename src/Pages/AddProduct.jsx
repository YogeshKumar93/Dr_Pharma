import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";


const AddProduct = ({ open, handleClose, onFetchRef }) => {
  const initialFormData = {
    title: "",
    description: "",
    category: "",
    price: "",
    stock:"",
    image: null,
    
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
    alert("Title, Category & Price required");
    return;
  }

  const payload = new FormData();
  payload.append("title", formData.title);
  payload.append("description", formData.description);
  payload.append("category", formData.category);
  payload.append("price", formData.price);
  payload.append("stock", formData.stock);
  
  if (formData.image) {
    payload.append("image", formData.image);
  }

  const { error } = await apiCall("POST", "products/create", payload);

  if (!error) {
    onFetchRef();
    handleModalClose();
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
    { name: "stock", label: "Stock" },
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

import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { BASE_URL } from "../api/config";

const EditProduct = ({ open, handleClose, onFetchRef, product }) => {
  const initialFormData = {
    id: null,
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
  if (!formData.id) return;

  setSubmitting(true);

  try {
    const payload = new FormData();

    // 👇 IMPORTANT: id goes in BODY
    payload.append("id", formData.id);
    payload.append("title", formData.title);
    payload.append("description", formData.description);
    payload.append("price", formData.price);

    if (formData.image) {
      payload.append("image", formData.image);
    }

    await fetch(`${BASE_URL}products/update`, {
      method: "POST",
      body: payload,
    });

    onFetchRef?.();
    handleModalClose();
  } catch (e) {
    console.error("Edit product failed", e);
  } finally {
    setSubmitting(false);
  }
};




  // 🔹 Prefill data when edit modal opens
  useEffect(() => {
    if (open && product) {
      setFormData({
         id: product.id,
        title: product.title || "",
        description: product.description || "",
        price: product.price || "",
        image: null, // file cannot be prefilled
        created_at: product.created_at
          ? product.created_at.split("/").reverse().join("-")
          : "",
        updated_at: product.updated_at
          ? product.updated_at.split("/").reverse().join("-")
          : "",
      });
    }
  }, [open, product]);

  const fields = [
//       {
//     name: "id",
//     label: "Product ID",
//     disabled: true, //  read-only
//   },
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
      title="Edit Product"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Updating..." : "Update"}
    />
  );
};

export default EditProduct;

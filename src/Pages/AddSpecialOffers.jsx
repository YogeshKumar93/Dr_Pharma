import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";

const AddSpecialOffers = ({ open, handleClose, onFetchRef }) => {
  const initialFormData = {
    title: "",
    description: "",
    category: "",
    original_price: "",
    offer_price: "",
    discount_percent: "",
    stock: "",
    // offer_start_date: "",
    // offer_end_date: "",
    image: null,
    is_active: true,
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

  const handleSubmit = async () => {
    if (
      !formData.title ||
      !formData.category ||
      !formData.original_price ||
      !formData.offer_price
    ) {
      alert("Title, Category, Original Price & Offer Price required");
      return;
    }

    setSubmitting(true);

    const payload = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key] !== null) {
        payload.append(key, formData[key]);
      }
    });

    const { error } = await apiCall(
      "POST",
      "special-offers/create",
      payload
    );

    setSubmitting(false);

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
    {
      name: "original_price",
      label: "Original Price",
      type: "number",
      required: true,
    },
    {
      name: "offer_price",
      label: "Offer Price",
      type: "number",
      required: true,
    },
    {
      name: "discount_percent",
      label: "Discount %",
      type: "number",
    },
    { name: "stock", label: "Stock", type: "number" },
    // {
    //   name: "offer_start_date",
    //   label: "Offer Start Date",
    //   type: "date",
    // },
    // {
    //   name: "offer_end_date",
    //   label: "Offer End Date",
    //   type: "date",
    // },
    { name: "image", label: "Offer Image", type: "file" },
    {
      name: "is_active",
      label: "Active",
      type: "select",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
    },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleModalClose}
      title="Add Special Offer"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Saving..." : "Save Offer"}
    />
  );
};

export default AddSpecialOffers;

import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";

const AddUser = ({ open, onClose, onFetchRef }) => {
  const initialFormData = {
    name: "",
    email: "",
    phone: "",
    password:"",
    role: "",
    status: 1,
    address: "",
  };

  const [formData, setFormData] = useState(initialFormData);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => setFormData(initialFormData);

  const handleModalClose = () => {
    resetForm();
    onClose();
  };

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
    if (!formData.name || !formData.email) {
      alert("Name & Email are required");
      return;
    }

    setSubmitting(true);

    try {
      // ✅ SAME apiCall METHOD AS AddProduct
      const { response, error } = await apiCall(
        "POST",
        "users/create",
        formData
      );

      if (error) {
        alert("Failed to add user");
        return;
      }

      onFetchRef?.();
      handleModalClose();
    } catch (err) {
      console.error("Add user failed", err);
      alert("Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (open) resetForm();
  }, [open]);

  /* -------------------- FIELDS -------------------- */
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Phone" },
    { name: "password", label: "Password" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Customer", value: "customer" },
      ],
      required: true,
    },
    {
      name: "status",
      label: "Status",
      type: "select",
      options: [
        { label: "Active", value: 1 },
        { label: "Inactive", value: 0 },
      ],
    },
    { name: "address", label: "Address" },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleModalClose}
      title="Add User"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Saving..." : "Save"}
    />
  );
};

export default AddUser;

import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { BASE_URL } from "../api/config";

const EditUser = ({ open, handleClose, onFetchRef, user }) => {
  const initialFormData = {
    id: null,
    name: "",
    email: "",
    phone: "",
    role: "",
    status: "",
    address: "",
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

  /* -------------------- SUBMIT -------------------- */
  const handleSubmit = async () => {
    if (!formData.id) return;

    setSubmitting(true);

    try {
      await fetch(`${BASE_URL}users/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: formData.id,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          role: formData.role,
          status: formData.status,
          address: formData.address,
        }),
      });

      onFetchRef?.();
      handleModalClose();
    } catch (err) {
      console.error("Edit user failed", err);
    } finally {
      setSubmitting(false);
    }
  };

  /* -------------------- PREFILL DATA -------------------- */
  useEffect(() => {
    if (open && user) {
      setFormData({
        id: user.id,
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        role: user.role || "",
        status: user.status ?? "",
        address: user.address || "",
        created_at: user.created_at
          ? user.created_at.split("/").reverse().join("-")
          : "",
        updated_at: user.updated_at
          ? user.updated_at.split("/").reverse().join("-")
          : "",
      });
    }
  }, [open, user]);

  /* -------------------- FIELDS -------------------- */
  const fields = [
    { name: "name", label: "Name", required: true },
    { name: "email", label: "Email", required: true },
    { name: "phone", label: "Phone" },
    {
      name: "role",
      label: "Role",
      type: "select",
      options: [
        { label: "Admin", value: "admin" },
        { label: "Customer", value: "customer" },
      ],
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
    { name: "created_at", label: "Created Date", type: "date", disabled: true },
    { name: "updated_at", label: "Updated Date", type: "date", disabled: true },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleModalClose}
      title="Edit User"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Updating..." : "Update"}
    />
  );
};

export default EditUser;

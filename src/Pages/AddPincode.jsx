import React, { useState, useEffect } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";
import ApiEndpoints from "../api/apiendpoints";

const AddPincode = ({ open, handleClose, onFetchRef }) => {
  const initialState = { pincode: "", city: "", state: "" };
  const [formData, setFormData] = useState(initialState);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!formData.pincode) {
      alert("Pincode is required");
      return;
    }

    setSubmitting(true);
    const { error } = await apiCall(
      "POST",
      "admin/pincodes/create",
      formData
    );

    if (!error) {
      onFetchRef();
      handleClose();
      setFormData(initialState);
    }
    setSubmitting(false);
  };

  useEffect(() => {
    if (open) setFormData(initialState);
  }, [open]);

  const fields = [
    { name: "pincode", label: "Pincode", required: true },
    { name: "city", label: "City" },
    { name: "state", label: "State" },
  ];

  return (
    <CommonFormModal
      open={open}
      onClose={handleClose}
      title="Add Pincode"
      fields={fields}
      formData={formData}
      onChange={setFormData}
      onSubmit={handleSubmit}
      submitLabel={submitting ? "Saving..." : "Save"}
    />
  );
};

export default AddPincode;

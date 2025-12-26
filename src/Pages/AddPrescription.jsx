import React, { useEffect, useState } from "react";
import CommonFormModal from "../Common/CommonFormModal";
import { apiCall } from "../api/api";

const AddPrescription = ({ open, handleClose, onFetchRef }) => {
    const initialFormData = {
        title: "",
        description: "",
        category: "",
        price: "",
        stock: "",
        image: null,
    };

    const categoryOptions = [
        { label: "Prescribed", value: "prescribed" },
        // { label: "Medicines", value: "medicines" },
        // { label: "Medical Instruments", value: "medical instruments" },
        // { label: "Syrups", value: "syrups" },
        // { label: "Kits", value: "kits" },
        // { label: "Supplements", value: "supplements" },
    ];

    const [formData, setFormData] = useState(initialFormData);

    const handleSubmit = async () => {
        const payload = new FormData();

        Object.keys(formData).forEach((k) => {
            if (formData[k]) payload.append(k, formData[k]);
        });

        payload.append("is_prescribed", 1);

        const { error } = await apiCall(
            "POST",
            "products/create",
            payload,
            true
        );

        if (!error) {
            onFetchRef();
            handleClose();
        }
    };

    useEffect(() => {
        if (open) setFormData(initialFormData);
    }, [open]);

    return (
        <CommonFormModal
            open={open}
            onClose={handleClose}
            title="Add Prescribed Medicine"
            fields={[
                { name: "title", label: "Title", required: true },
                { name: "description", label: "Description" },
                {
                    name: "category",
                    label: "Category",
                    type: "select",
                    options: categoryOptions,
                    required: true,
                },
                { name: "price", label: "Price", type: "number" },
                { name: "stock", label: "Stock" },
                { name: "image", label: "Image", type: "file" },
            ]}
            formData={formData}
            onChange={setFormData}
            onSubmit={handleSubmit}
            submitLabel="Save"
        />
    );
};

export default AddPrescription;

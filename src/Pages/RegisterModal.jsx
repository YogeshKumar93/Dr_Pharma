// RegisterModal.jsx
import { useState } from "react";

const RegisterModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "" });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleSubmit = (e) => { e.preventDefault(); onSubmit(formData); };

  return (
    <div style={modalStyle}>
      <button onClick={onClose} style={closeBtn}>✖</button>
      <h3>Register to Continue</h3>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" required onChange={handleChange} style={inputStyle} />
        <input name="phone" placeholder="Phone Number" required onChange={handleChange} style={inputStyle} />
        <input name="email" placeholder="Email Address" required onChange={handleChange} style={inputStyle} />
        <textarea name="address" placeholder="Address" required onChange={handleChange} style={inputStyle} />
        <button type="submit" style={submitBtn}>Register & Continue</button>
      </form>
    </div>
  );
};

const modalStyle = {
  width: "50%",
  marginLeft: "20px",
  background: "#fff",
  padding: "28px",
  borderRadius: "10px",
  boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
  position: "relative", // ❗ NOT sticky, NOT fixed
};


const inputStyle = { width: "100%", padding: "8px", marginBottom: "10px" };
const submitBtn = { width: "100%", padding: "10px", background: "#f1c40f", border: "none", fontWeight: "bold" };
const closeBtn = { position: "absolute", top: "10px", right: "10px", background: "transparent", border: "none", cursor: "pointer" };

export default RegisterModal;

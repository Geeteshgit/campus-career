"use client";

import React, { useState } from "react";
import InputField from "@/components/FormComponents/InputField"; 
import PrimaryButton from "../ui/PrimaryButton";
import CloseButton from "../ui/CloseButton";
import SuccessButton from "../ui/SuccessButton";

interface AddAdminModalProps {
  onClose: () => void;
  onAdminAdded: (admin: any) => void;
}

const AddAdminModal = ({ onClose, onAdminAdded }: AddAdminModalProps): React.JSX.Element => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    alert("Admin added");
  };

  const handleExcelUpload = () => {
    alert("Excel upload clicked");
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-lg flex flex-col gap-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <CloseButton onClick={onClose} />

        <h2 className="text-xl font-bold text-neutral-900">Add Admin</h2>

        {/* FORM */}
        <div className="flex flex-col gap-3">

          <InputField
            name="name"
            placeholder="Admin Name"
            value={form.name}
            onChange={handleChange}
            required={true}
          />

          <InputField
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required={true}
          />

          <InputField
            name="phone"
            placeholder="Phone Number"
            value={form.phone}
            onChange={handleChange}
            required={true}
          />
        </div>

        {/* BUTTON ROW */}
        <div className="flex flex-col sm:flex-row gap-2 w-full">
          <SuccessButton onClick={handleExcelUpload} className="w-full">Upload Excel</SuccessButton>
          <PrimaryButton onClick={handleSubmit} className="w-full">Save Admin</PrimaryButton>
        </div>

      </div>
    </div>
  );
};

export default AddAdminModal;

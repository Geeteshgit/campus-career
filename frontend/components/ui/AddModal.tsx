"use client";

import React, { useState } from "react";
import InputField from "@/components/FormComponents/InputField";
import SelectField from "@/components/FormComponents/SelectField";
import TextAreaField from "@/components/FormComponents/TextareaField";
import PrimaryButton from "@/components/ui/PrimaryButton";
import CloseButton from "@/components/ui/CloseButton";

export interface FieldConfig {
  name: string;
  placeholder: string;
  type?: "text" | "email" | "number" | "textarea" | "select";
  options?: string[];
}

interface AddModalProps {
  title: string;
  fields: FieldConfig[];
  onClose: () => void;
  onSave: (data: any) => void;
}

const AddModal = ({
  title,
  fields,
  onClose,
  onSave,
}: AddModalProps): React.JSX.Element => {

  const initialData: Record<string, any> = {};
  fields.forEach((f) => (initialData[f.name] = ""));

  const [formData, setFormData] = useState(initialData);

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    onSave(formData);
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
        <CloseButton onClick={onClose} />
        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>

        {/* FORM FIELDS */}
        <div className="flex flex-col gap-3">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <TextAreaField
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ) : field.type === "select" ? (
                <SelectField
                  name={field.name}
                  value={formData[field.name]}
                  options={field.options ?? []}
                  onChange={handleChange}
                />
              ) : (
                <InputField
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <PrimaryButton onClick={handleSave}>
          Save
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddModal;

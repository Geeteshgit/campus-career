"use client";

import React, { useState } from "react";
import InputField from "./InputField";
import SelectField from "./SelectField";
import TextAreaField from "./TextareaField";
import PrimaryButton from "./PrimaryButton";
import CloseButton from "./CloseButton";
import { FieldConfig } from "../types/modal";

interface AddModalProps {
  title: string;
  fields: FieldConfig[];
  onClose: () => void;
  onSave: (data: any) => void;
  isPending?: boolean;
}

const AddModal = ({
  title,
  fields,
  onClose,
  onSave,
  isPending = false,
}: AddModalProps): React.JSX.Element => {
  const initialData: Record<string, any> = {};
  fields.forEach((f) => {
    if (f.type === "select" && f.options?.length) {
      initialData[f.name] = f.options[0];
    } else {
      initialData[f.name] = "";
    }
  });

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
        className="bg-white max-w-xl max-h-[90vh] overflow-y-auto p-6 rounded-xl shadow-lg w-full flex flex-col gap-5 relative"
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
                  type={field.type || "text"}
                />
              )}
            </div>
          ))}
        </div>

        {/* SAVE BUTTON */}
        <PrimaryButton onClick={handleSave} disabled={isPending}>
          Save
        </PrimaryButton>
      </div>
    </div>
  );
};

export default AddModal;

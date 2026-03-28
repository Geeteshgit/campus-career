"use client";

// React
import React, { useState } from "react";

// Local Imports
import { FieldConfig } from "../types/modal.types";
import Button from "./Button";
import CloseButton from "./CloseButton";
import Input from "./Input";
import Select from "./Select";
import TextArea from "./TextArea";

type FormModalProps = {
  title: string;
  fields: FieldConfig[];
  initialValues?: Record<string, any>;
  onClose: () => void;
  onSave: (data: Record<string, any>) => void;
  isPending?: boolean;
};

const FormModal = ({
  title,
  fields,
  initialValues,
  onClose,
  onSave,
  isPending = false,
}: FormModalProps) => {
  const buildInitialState = () => {
    if (initialValues) return initialValues;

    const data: Record<string, any> = {};
    fields.forEach((f) => {
      if (f.type === "select" && f.options?.length) {
        data[f.name] = f.options[0];
      } else {
        data[f.name] = "";
      }
    });

    return data;
  };

  const [formData, setFormData] = useState(buildInitialState);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
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

        <div className="flex flex-col gap-3">
          {fields.map((field) => (
            <div key={field.name}>
              {field.type === "textarea" ? (
                <TextArea
                  name={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name]}
                  onChange={handleChange}
                />
              ) : field.type === "select" ? (
                <Select
                  name={field.name}
                  value={formData[field.name]}
                  options={field.options ?? []}
                  onChange={handleChange}
                />
              ) : (
                <Input
                  name={field.name}
                  placeholder={field.placeholder}
                  value={ formData[field.name]}
                  onChange={handleChange}
                  type={field.type || "text"}
                />
              )}
            </div>
          ))}
        </div>

        <Button variant="primary" onClick={handleSave} disabled={isPending}>
          Save
        </Button>
      </div>
    </div>
  );
};

export default FormModal;

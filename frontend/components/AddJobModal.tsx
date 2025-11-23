"use client";

import React, { useState } from "react";
import axios from "axios";
import InputField from "./FormComponents/InputField";
import TextAreaField from "./FormComponents/TextAreaField";
import SelectField from "./FormComponents/SelectField"; 
import PrimaryButton from "./ui/PrimaryButton";
import CloseButton from "./ui/CloseButton";

interface AddJobModalProps {
  onClose: () => void;
  onJobAdded: () => void;
}

const AddJobModal = ({ onClose, onJobAdded }: AddJobModalProps) => {
  const [form, setForm] = useState({
    company: "",
    role: "",
    location: "",
    salary: "",
    deadline: "",
    description: "",
    requirements: "",
    eligibility: "",
    package: "",
    positions: "",
    type: "Full-Time",
    status: "Active",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    // const jobData = {
    //   ...form,
    //   postedOn: new Date().toLocaleDateString(),
    //   requirements: form.requirements.split("\n"),
    //   positions: Number(form.positions),
    // };

    // await axios.post("http://localhost:5003/api/jobs", jobData);

    onJobAdded();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto flex flex-col gap-5 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CLOSE BUTTON */}
        <CloseButton onClick={onClose} />

        <h2 className="text-xl font-bold text-neutral-900">Add Job Posting</h2>

        {/* FORM FIELDS */}
        <div className="flex flex-col gap-3">
          <InputField name="company" placeholder="Company" onChange={handleChange} />
          <InputField name="role" placeholder="Job Role" onChange={handleChange} />
          <InputField name="location" placeholder="Location" onChange={handleChange} />
          <InputField name="salary" placeholder="Salary" onChange={handleChange} />
          <InputField name="deadline" placeholder="Deadline" onChange={handleChange} />
          <InputField name="package" placeholder="Package" onChange={handleChange} />
          <InputField name="positions" placeholder="Positions" onChange={handleChange} />

          <SelectField
            name="type"
            value={form.type}
            onChange={handleChange}
            options={["Full-Time", "Internship"]}
          />

          <TextAreaField
            name="description"
            placeholder="Job Description"
            onChange={handleChange}
            rows={4}
          />

          <TextAreaField
            name="requirements"
            placeholder="Requirements (one per line)"
            onChange={handleChange}
            rows={4}
          />

          <TextAreaField
            name="eligibility"
            placeholder="Eligibility"
            onChange={handleChange}
            rows={3}
          />
        </div>

        {/* BUTTON */}
        <PrimaryButton onClick={handleSubmit}>Add Job Posting</PrimaryButton>
      </div>
    </div>
  );
};

export default AddJobModal;

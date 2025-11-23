"use client";

import React, { useState } from "react";
import axios from "axios";
import { FaTimes } from "react-icons/fa";

interface AddJobModalProps {
  onClose: () => void;
  onJobAdded: () => void;
}

const AddJobModal = ({ onClose, onJobAdded }: AddJobModalProps): React.JSX.Element => {
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const jobData = {
      ...form,
      postedOn: new Date().toLocaleDateString(),
      requirements: form.requirements.split("\n"),
      positions: Number(form.positions),
    };

    await axios.post("http://localhost:5003/api/jobs", jobData);

    onJobAdded();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-lg w-full max-w-2xl max-h-[90vh] p-6 relative overflow-y-auto"
      >
        {/* Close */}
        <button
          className="absolute top-4 right-4 text-neutral-600 hover:text-neutral-800"
          onClick={onClose}
        >
          <FaTimes className="w-5 h-5" />
        </button>

        <h2 className="text-xl font-bold mb-4">Add Job Posting</h2>

        {/* Form */}
        <div className="grid grid-cols-2 gap-4">
          <input name="company" onChange={handleChange} placeholder="Company" className="input" />
          <input name="role" onChange={handleChange} placeholder="Job Role" className="input" />
          <input name="location" onChange={handleChange} placeholder="Location" className="input" />
          <input name="salary" onChange={handleChange} placeholder="Salary" className="input" />
          <input name="deadline" onChange={handleChange} placeholder="Deadline" className="input" />
          <input name="package" onChange={handleChange} placeholder="Package" className="input" />
          <input name="positions" onChange={handleChange} placeholder="Positions" className="input" />

          <select name="type" onChange={handleChange} className="input">
            <option>Full-Time</option>
            <option>Internship</option>
            <option>Part-Time</option>
          </select>

          <select name="status" onChange={handleChange} className="input">
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>

        <textarea
          name="description"
          onChange={handleChange}
          placeholder="Job Description"
          className="input h-24 mt-4"
        />

        <textarea
          name="requirements"
          onChange={handleChange}
          placeholder="Requirements (one per line)"
          className="input h-24 mt-4"
        />

        <textarea
          name="eligibility"
          onChange={handleChange}
          placeholder="Eligibility"
          className="input h-20 mt-4"
        />

        {/* Submit */}
        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-blue-500 text-white font-semibold py-3 rounded-lg hover:bg-blue-600"
        >
          Add Posting
        </button>
      </div>
    </div>
  );
};

export default AddJobModal;

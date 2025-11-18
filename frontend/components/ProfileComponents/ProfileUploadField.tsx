import React from "react";
import { FaUpload } from "react-icons/fa";

interface ProfileResumeUploadProps {
  resume: File | null;
  onChange: (file: File | null) => void;
}

const ProfileResumeUpload = ({ resume, onChange }: ProfileResumeUploadProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-neutral-700 flex gap-2 items-center">
        <FaUpload className="text-blue-500" />
        Upload Resume (PDF)
      </label>

      <input
        type="file"
        accept="application/pdf"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.files?.[0] || null)
        }
        className="px-4 py-2 border border-neutral-300 rounded-lg bg-white text-neutral-800 cursor-pointer"
      />

      {resume && (
        <p className="text-neutral-600 font-medium">Selected: {resume.name}</p>
      )}
    </div>
  );
};

export default ProfileResumeUpload;

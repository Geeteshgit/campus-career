import React from "react";

interface ProfileTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ProfileTextarea = ({ label, value, onChange }: ProfileTextareaProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-1">
      <label className="font-semibold text-neutral-700">{label}</label>
      <textarea
        rows={4}
        value={value}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
          onChange(e.target.value)
        }
        className="p-3 border border-neutral-300 rounded-lg text-neutral-800 
                   focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default ProfileTextarea;

import React from "react";

interface ProfileEditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}

const ProfileEditableField = ({ label, value, onChange, type = "text" }: ProfileEditableFieldProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="font-semibold text-neutral-700">{label}</label>
      <input
        value={value}
        type={type}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          onChange(e.target.value)
        }
        className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 
                   focus:ring-2 focus:ring-blue-500 outline-none"
      />
    </div>
  );
};

export default ProfileEditableField;

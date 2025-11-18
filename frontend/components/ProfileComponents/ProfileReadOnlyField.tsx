import React from "react";

interface ProfileReadOnlyFieldProps {
  label: string;
  value: string;
}

const ProfileReadOnlyField = ({ label, value }: ProfileReadOnlyFieldProps): React.JSX.Element => {
  return (
    <div className="flex flex-col gap-1 flex-1">
      <label className="font-semibold text-neutral-700">{label}</label>
      <input
        value={value}
        readOnly
        className="px-4 py-2 border border-neutral-300 rounded-lg bg-neutral-100 text-neutral-600 cursor-not-allowed"
      />
    </div>
  );
};

export default ProfileReadOnlyField;

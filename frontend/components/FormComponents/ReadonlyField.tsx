import React from "react";

interface ReadOnlyFieldProps {
  value: string;
  placeholder?: string;
}

const ReadOnlyField = ({ value, placeholder }: ReadOnlyFieldProps): React.JSX.Element => {
  return (
    <input
      value={value}
      placeholder={placeholder}
      readOnly
      className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-600 
                 bg-neutral-100 cursor-not-allowed select-none
                 focus:ring-0 outline-none w-full"
    />
  );
};

export default ReadOnlyField;

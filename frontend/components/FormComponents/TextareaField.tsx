import React from "react";

interface TextAreaFieldProps {
  name: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
}

const TextAreaField = ({
  name,
  placeholder,
  value,
  onChange,
  rows = 4,
}: TextAreaFieldProps) => {
  return (
    <textarea
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      rows={rows}
      className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 
                 focus:ring-2 focus:ring-blue-500 outline-none w-full"
    />
  );
};

export default TextAreaField;

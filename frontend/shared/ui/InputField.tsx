import React from "react";

interface InputFieldProps {
  name: string;
  type?: string;
  placeholder?: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const InputField = ({
  name,
  type = "text",
  placeholder,
  value,
  onChange,
  required = false,
}: InputFieldProps): React.JSX.Element => {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      className="
        px-4 py-2 
        border border-neutral-300 
        rounded-lg 
        text-neutral-800 
        focus:ring-2 focus:ring-blue-500 
        outline-none
        w-full
      "
    />
  );
};

export default InputField;

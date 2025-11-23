import React from "react";

interface SelectFieldProps {
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
  required?: boolean;
}

const SelectField = ({ name, value, onChange, options, required }: SelectFieldProps) => {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 
                 focus:ring-2 focus:ring-blue-500 outline-none w-full"
    >
      {options.map((opt, index) => (
        <option key={index} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  );
};

export default SelectField;

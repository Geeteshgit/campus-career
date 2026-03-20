// React
import clsx from "clsx";
import React, { SelectHTMLAttributes } from "react";

type SelectProps = {
  options: string[];
} & SelectHTMLAttributes<HTMLSelectElement>;

const Select = ({
  options,
  className,
  ...props
}: SelectProps): React.JSX.Element => {
  return (
    <select
      className={clsx(
        "px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none w-full",
        className
      )}
      {...props}
    >
      {options.map((option, index) => (
        <option key={index} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

export default Select;

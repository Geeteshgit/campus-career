import React from "react";

type FormLabelProps = {
  htmlFor?: string;
  children: React.ReactNode;
}

const FormLabel = ({ htmlFor, children }: FormLabelProps) => {
  return (
    <label
      htmlFor={htmlFor}
      className="text-xs sm:text-sm text-neutral-600 font-medium block mb-1"
    >
      {children}
    </label>
  );
};

export default FormLabel;

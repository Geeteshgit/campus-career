// React
import React, { ButtonHTMLAttributes } from "react";

// External Libraries
import clsx from "clsx";

type Variant = "primary" | "danger" | "success";

const variantStyles: Record<Variant, { base: string; hover: string }> = {
  primary: { base: "bg-blue-500", hover: "hover:bg-blue-600" },
  danger: { base: "bg-red-500", hover: "hover:bg-red-600" },
  success: { base: "bg-green-500", hover: "hover:bg-green-600" },
};

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "primary",
  className = "",
  disabled = false,
  type = "button",
  ...props
}: ButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "text-sm sm:text-base px-4 py-2 font-semibold rounded-lg transition duration-300 text-white",
        variantStyles[variant].base,
        !disabled && variantStyles[variant].hover,
        disabled
          ? "cursor-not-allowed opacity-60"
          : "hover:scale-[1.01] cursor-pointer",
        className,
      )}
      {...props}
    />
  );
};

export default Button;

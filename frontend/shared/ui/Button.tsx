// React
import { ButtonHTMLAttributes } from "react";

// External Libraries
import clsx from "clsx";

type Variant = "primary" | "secondary" | "danger" | "success" | "link";

const variantStyles: Record<Variant, { base: string; hover: string }> = {
  primary: { base: "bg-blue-500", hover: "hover:bg-blue-600" },
  secondary: {
    base: "bg-white text-neutral-700 border border-neutral-300",
    hover: "hover:bg-neutral-100",
  },
  danger: { base: "bg-red-500", hover: "hover:bg-red-600" },
  success: { base: "bg-green-500", hover: "hover:bg-green-600" },
  link: { base: "bg-transparent text-blue-500", hover: "hover:underline" },
};

type ButtonProps = {
  variant?: Variant;
} & ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({
  variant = "primary",
  className,
  disabled = false,
  type = "button",
  ...props
}: ButtonProps) => {
  const isSolidVariant =
    variant === "primary" || variant === "danger" || variant === "success";

  return (
    <button
      type={type}
      disabled={disabled}
      className={clsx(
        "text-sm sm:text-base px-4 py-2 font-semibold rounded-lg transition duration-200",
        isSolidVariant && "text-white",
        variant === "link" && "p-0",
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

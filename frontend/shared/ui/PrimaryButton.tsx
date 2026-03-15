import React from "react";

type PrimaryButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: PrimaryButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm sm:text-base bg-blue-500 px-4 py-2 font-semibold rounded-lg transition duration-300 ${
        disabled
          ? "cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 hover:scale-[1.01] cursor-pointer"
      } text-white ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

import React from "react";

type DangerButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const DangerButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: DangerButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm sm:text-base px-4 py-2 font-semibold rounded-lg transition duration-300 ${
        disabled
          ? "cursor-not-allowed"
          : "bg-red-500 hover:bg-red-600 hover:scale-[1.01] cursor-pointer"
      } text-white  ${className}`}
    >
      {children}
    </button>
  );
};

export default DangerButton;

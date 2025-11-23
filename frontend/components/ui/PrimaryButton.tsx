import React from "react";

interface PrimaryButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const PrimaryButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: PrimaryButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm sm:text-base px-4 py-2 bg-blue-500 text-white font-semibold 
                  rounded-lg hover:bg-blue-600 hover:scale-[1.01] duration-300 
                  transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default PrimaryButton;

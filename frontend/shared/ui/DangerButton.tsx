import React from "react";

interface DangerButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const DangerButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: DangerButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm sm:text-base px-4 py-2 bg-red-500 text-white font-semibold 
                  rounded-lg hover:bg-red-600 hover:scale-[1.01] duration-300 
                  transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default DangerButton;

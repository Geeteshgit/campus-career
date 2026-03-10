import React from "react";

interface SuccessButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
}

const SuccessButton = ({
  children,
  onClick,
  type = "button",
  className = "",
}: SuccessButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`text-sm sm:text-base px-4 py-2 bg-green-500 text-white font-semibold 
                  rounded-lg hover:bg-green-600 hover:scale-[1.01] duration-300 
                  transition cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
};

export default SuccessButton;

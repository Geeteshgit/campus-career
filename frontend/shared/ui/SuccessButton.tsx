import React from "react";

interface SuccessButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  disabled?: boolean;
}

const SuccessButton = ({
  children,
  onClick,
  type = "button",
  className = "",
  disabled = false,
}: SuccessButtonProps): React.JSX.Element => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`text-sm sm:text-base  px-4 py-2  text-white font-semibold 
                  rounded-lg hover:bg-green-600 hover:scale-[1.01] duration-300 ${
                    disabled
                      ? "cursor-not-allowed"
                      : "bg-green-500 hover:bg-green-600 hover:scale-[1.01] cursor-pointer"
                  } text-white ${className}`}
    >
      {children}
    </button>
  );
};

export default SuccessButton;

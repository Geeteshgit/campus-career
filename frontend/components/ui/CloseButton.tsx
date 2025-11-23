import React from "react";
import { FaTimes } from "react-icons/fa";

interface CloseButtonProps {
  onClick: () => void;
  className?: string;
}

const CloseButton = ({ onClick, className = "" }: CloseButtonProps): React.JSX.Element => {
  return (
    <button
      onClick={onClick}
      className={`absolute top-4 right-4 text-neutral-600 hover:text-neutral-900 
                  transition cursor-pointer ${className}`}
    >
      <FaTimes className="w-5 h-5" />
    </button>
  );
};

export default CloseButton;

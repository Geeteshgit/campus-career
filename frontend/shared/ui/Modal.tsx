// React
import React from "react";

// External Libraries
import clsx from "clsx";

// Local Imports
import CloseButton from "./CloseButton";

type ModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ open, onOpenChange, children, className }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={() => onOpenChange(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={clsx(
          "bg-white rounded-xl shadow-lg w-full max-w-xl max-h-[90vh] overflow-y-auto p-6 relative",
          className,
        )}
      >
        <CloseButton onClick={() => onOpenChange(false)} />
        {children}
      </div>
    </div>
  );
};

export default Modal;

// External Libraries
import clsx from "clsx";
import { FaTimes } from "react-icons/fa";

type CloseButtonProps = {
  onClick: () => void;
  className?: string;
};

const CloseButton = ({
  onClick,
  className = "",
}: CloseButtonProps) => {
  return (
    <button
      onClick={onClick}
      aria-label="Close"
      className={clsx(
        "absolute top-4 right-4 text-neutral-600 hover:text-neutral-900 transition cursor-pointer",
        className,
      )}
    >
      <FaTimes className="w-5 h-5" />
    </button>
  );
};

export default CloseButton;

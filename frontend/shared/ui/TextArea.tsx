// React
import { TextareaHTMLAttributes } from "react";

// External Libraries
import clsx from "clsx";

type TextAreaProps = {
  rows?: number;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = ({ rows = 4, className, ...props }: TextAreaProps) => {
  return (
    <textarea
      rows={rows}
      className={clsx(
        "px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 focus:ring-2 focus:ring-blue-500 outline-none w-full",
        className,
      )}
      {...props}
    />
  );
};

export default TextArea;

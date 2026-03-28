// React
import { InputHTMLAttributes } from "react";

//External Libraries
import clsx from "clsx";

type InputProps = {
  readOnly?: boolean;
} & InputHTMLAttributes<HTMLInputElement>;

const Input = ({
  readOnly = false,
  className,
  ...props
}: InputProps) => {
  return (
    <input
      readOnly={readOnly}
      className={clsx(
        "px-4 py-2 border border-neutral-300 rounded-lg text-neutral-800 outline-none w-full focus:ring-2 focus:ring-blue-500",
        readOnly &&
          "bg-neutral-100 text-neutral-600 cursor-not-allowed select-none focus:ring-0",
        className,
      )}
      {...props}
    />
  );
};

export default Input;

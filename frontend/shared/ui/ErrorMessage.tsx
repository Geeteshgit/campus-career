// External Libraries
import clsx from "clsx";

type ErrorMessageProps = {
  message?: string;
  className?: string;
};

const ErrorMessage = ({ message, className }: ErrorMessageProps) => {
  if (!message) return null;

  return (
    <p className={clsx("text-sm font-medium text-red-500 mt-1", className)}>
      {message}
    </p>
  );
};

export default ErrorMessage;

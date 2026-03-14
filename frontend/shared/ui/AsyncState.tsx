import React from "react";

interface AsyncStateProps {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty?: boolean;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  children: React.ReactNode;
}

const AsyncState = ({
  isLoading,
  isError,
  error,
  isEmpty = false,
  loadingText = "Loading...",
  errorText = "Failed to load data",
  emptyText = "No data found",
  children,
}: AsyncStateProps): React.JSX.Element => {

  if(isError) {
    console.error(error);
  }

  return isLoading ? (
    <p className="text-center py-10 text-neutral-500">
      {loadingText}
    </p>
  ) : isError ? (
    <p className="text-center py-10 text-red-500">
      {errorText}
    </p>
  ) : isEmpty ? (
    <p className="text-center py-10 text-neutral-500">
      {emptyText}
    </p>
  ) : (
    <>{children}</>
  );
};

export default AsyncState;

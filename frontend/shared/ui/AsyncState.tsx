// React
import React from "react";

type AsyncStateProps = {
  isLoading: boolean;
  isError: boolean;
  error?: unknown;
  isEmpty?: boolean;
  loadingText?: string;
  errorText?: string;
  emptyText?: string;
  children: React.ReactNode;
};

const AsyncState = ({
  isLoading,
  isError,
  error,
  isEmpty = false,
  loadingText = "Loading...",
  errorText = "Failed to load data",
  emptyText = "No data found",
  children,
}: AsyncStateProps) => {
  if (isError && error) {
    console.error(error);
  }

  if (isLoading) {
    return <p className="text-center py-10 text-neutral-500">{loadingText}</p>;
  }

  if (isError) {
    return <p className="text-center py-10 text-red-500">{errorText}</p>;
  }

  if (isEmpty) {
    return <p className="text-center py-10 text-neutral-500">{emptyText}</p>;
  }

  return <>{children}</>;
};

export default AsyncState;

// React
import React from "react";
import AsyncLoader from "./AsyncLoader";

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
  errorText = "Failed to load data",
  emptyText = "No data found",
  children,
}: AsyncStateProps) => {
  if (isError && error) {
    console.error(error);
  }

  if (isLoading) {
    return <AsyncLoader />
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

"use client";

// React
import React from "react";

// External Libraries
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/query-client";

const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;

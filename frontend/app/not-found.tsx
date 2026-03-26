"use client";

// React
import React from "react";
import { useRouter } from "next/navigation";

// Shared UI Components
import Button from "@/shared/ui/Button";

const NotFound = (): React.JSX.Element => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 justify-center min-h-screen bg-white px-6">
      <h1 className="text-7xl sm:text-8xl font-bold text-blue-500">404</h1>
      <p className="text-neutral-600 text-lg sm:text-xl text-center">
        {"Oops! The page you're looking for doesn't exist."}
      </p>
      <Button variant="primary" onClick={() => router.push("/")}>
        Go Back
      </Button>
    </div>
  );
};

export default NotFound;

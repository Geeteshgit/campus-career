"use client";

import React from "react";
import PrimaryButton from "@/components/ui/PrimaryButton";
import { useRouter } from "next/navigation";

const NotFound = (): React.JSX.Element => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center gap-4 justify-center min-h-screen bg-white px-6">
      <h1 className="text-7xl sm:text-8xl font-bold text-blue-500">404</h1>
      <p className="text-neutral-600 text-lg sm:text-xl text-center">
        Oops! The page you're looking for doesn't exist.
      </p>
      <PrimaryButton onClick={() => router.push("/")}>Go Back</PrimaryButton>
    </div>
  );
}

export default NotFound;
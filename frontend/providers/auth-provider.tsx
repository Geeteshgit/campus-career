"use client";
// React
import React from "react";

// Features
import { useAuthInit } from "@/features/auth";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useAuthInit();
  return <>{children}</>;
};

export default AuthProvider;

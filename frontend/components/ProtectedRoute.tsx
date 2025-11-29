"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      if (user.role === "student") {
        router.replace("/student/home");
      } else {
        router.replace("/admin/dashboard");
      }
    }
  }, [user, allowedRoles, router]);

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default ProtectedRoute;

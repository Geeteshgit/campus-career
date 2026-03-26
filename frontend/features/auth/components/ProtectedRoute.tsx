"use client";

// React
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Shared UI Components
import Loader from "@/shared/ui/Loader";

// Local Imports
import { useAuthStore } from "../auth.store";

type ProtectedRouteProps = {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const authLoading = useAuthStore((state) => state.authLoading);

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      router.replace("/login");
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      if (user.role === "student") {
        router.replace("/student/postings");
      } else {
        router.replace("/admin/dashboard");
      }
    }
  }, [user, authLoading, allowedRoles, router]);

  if (authLoading) {
    return <Loader />;
  }

  if (!user) return null;

  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default ProtectedRoute;

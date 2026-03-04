"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import Loader from "@/components/ui/Loader";

interface ProtectedRouteProps {
  allowedRoles: string[];
  children: React.ReactNode;
}

const ProtectedRoute = ({ allowedRoles, children }: ProtectedRouteProps) => {
  const router = useRouter();
  const { user, authLoading } = useAppSelector((state) => state.user);

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

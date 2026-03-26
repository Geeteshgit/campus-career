"use client";

// React
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Features
import { useAuthStore } from "@/features/auth";

const Homepage = () => {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }

    if(role === "student") {
      router.replace("/student/postings");
    }
    else if(role === "admin" || role === "super_admin") {
      router.replace("/admin/dashboard");
    }
  }, [user, role, router]);

  return null; 
};

export default Homepage;

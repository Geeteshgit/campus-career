"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";

const Homepage = () => {
  const user = useAppSelector((state) => state.user.user);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.replace("/login");
    }

    if(user?.role === "student") {
      router.replace("/student/home");
    }
    else if(user?.role === "admin" || user?.role === "super_admin") {
      router.replace("/admin/dashboard");
    }
  }, [user]);

  return null; 
};

export default Homepage;

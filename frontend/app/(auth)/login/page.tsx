"use client";

// React
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Features
import { LoginForm, ForgotPasswordModal, useAuthStore } from "@/features/auth";

const Login = () => {
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);

  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const role = user?.role;

  useEffect(() => {
    if (!role) return;
    if (role === "student") router.replace("/student/postings");
    else router.replace("/admin/dashboard");
  }, [user, role, router]);

  return (
    <>
      <LoginForm onForgotPasswordClick={() => setShowForgotModal(true)} />
      <ForgotPasswordModal
        isOpen={showForgotModal}
        onClose={() => setShowForgotModal(false)}
      />
    </>
  );
};

export default Login;

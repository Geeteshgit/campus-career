"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector } from "@/redux/hooks";
import { LoginForm, ForgotPasswordModal } from "@/features/auth";

const Login = (): React.JSX.Element => {
  const router = useRouter();
  const user = useAppSelector((state) => state.user.user);
  const [showForgotModal, setShowForgotModal] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      if (user.role === "student") router.replace("/student/postings");
      else router.replace("/admin/dashboard");
    }
  }, [user, router]);

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

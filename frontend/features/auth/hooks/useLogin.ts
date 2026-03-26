"use client";

import { useLoginMutation } from "../api/auth.queries";
import { connectSocket, initSocket } from "@/lib/socket";
import { useRouter } from "next/navigation";
import { LoginPayload } from "../types/auth.types";
import { useAuthStore } from "../auth.store";

export const useLogin = () => {
  const router = useRouter();
  const loginStore = useAuthStore((state) => state.login);

  const { login, isPending: loginPending } = useLoginMutation();

  const handleLogin = async (payload: LoginPayload) => {
    try {
      const response = await login(payload);
      const user = response.user;

      loginStore({
        id: user._id,
        name: user.name,
        role: user.role,
      });

      initSocket();
      connectSocket();

      if (user.role === "student") {
        router.push("/student/home");
      } else if (user.role === "admin" || user.role === "super_admin") {
        router.push("/admin/dashboard");
      } else {
        router.push("/login");
      }
    } catch (err) {
      console.error("Login Error:", err);
    }
  };
  return { handleLogin, loginPending };
};

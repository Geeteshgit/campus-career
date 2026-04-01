import { usersApi } from "@/lib/axios";
import type { LoginFormData } from "../schemas/login.schema";
import type {
  ChangePasswordPayload,
  ForgotPasswordPayload,
  ResetPasswordPayload,
  VerifyResetOtpPayload,
} from "../types/auth.types";

export const loginUser = async (payload: LoginFormData) => {
  const { data } = await usersApi.post("/auth/login", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await usersApi.post("/auth/logout");
  return data;
};

export const forgotPassword = async (payload: ForgotPasswordPayload) => {
  const { data } = await usersApi.post("/auth/forgot-password", payload);
  return data;
};

export const verifyResetOtp = async (payload: VerifyResetOtpPayload) => {
  const { data } = await usersApi.post("/auth/verify-reset-otp", payload);
  return data;
};

export const resetPassword = async (payload: ResetPasswordPayload) => {
  const { data } = await usersApi.post("/auth/reset-password", payload);
  return data;
};

export const changePassword = async (payload: ChangePasswordPayload) => {
  const { data } = await usersApi.put("/auth/change-password", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await usersApi.get("/auth/me");
  return data;
};

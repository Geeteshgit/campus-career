import { usersApi } from "@/lib/axios";

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await usersApi.post("/api/auth/login", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await usersApi.post("/api/auth/logout");
  return data;
};

export const forgotPassword = async (payload: { email: string }) => {
  const { data } = await usersApi.post("/api/auth/forgot-password", payload);
  return data;
};

export const verifyResetOtp = async (payload: {
  email: string;
  otp: string;
}) => {
  const { data } = await usersApi.post("/api/auth/verify-reset-otp", payload);
  return data;
};

export const resetPassword = async (payload: {
  email: string;
  password: string;
  confirmNewPassword: string;
}) => {
  const { data } = await usersApi.post("/api/auth/reset-password", payload);
  return data;
};

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const { data } = await usersApi.put("/api/auth/change-password", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await usersApi.get("/api/auth/me");
  return data;
};

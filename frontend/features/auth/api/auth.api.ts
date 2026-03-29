import { usersApi } from "@/lib/axios";

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  const { data } = await usersApi.post("/auth/login", payload);
  return data;
};

export const logoutUser = async () => {
  const { data } = await usersApi.post("/auth/logout");
  return data;
};

export const forgotPassword = async (payload: { email: string }) => {
  const { data } = await usersApi.post("/auth/forgot-password", payload);
  return data;
};

export const verifyResetOtp = async (payload: {
  email: string;
  otp: string;
}) => {
  const { data } = await usersApi.post("/auth/verify-reset-otp", payload);
  return data;
};

export const resetPassword = async (payload: {
  email: string;
  newPassword: string;
  confirmNewPassword: string;
}) => {
  const { data } = await usersApi.post("/auth/reset-password", payload);
  return data;
};

export const changePassword = async (payload: {
  oldPassword: string;
  newPassword: string;
}) => {
  const { data } = await usersApi.put("/auth/change-password", payload);
  return data;
};

export const getMe = async () => {
  const { data } = await usersApi.get("/auth/me");
  return data;
};

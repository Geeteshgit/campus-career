import type { ChangePasswordFormData } from "../schemas/change-password.schema";
import type { ForgotPasswordFormData } from "../schemas/forgot-password.schema";

export type Role = "admin" | "super_admin" | "student";

export type ForgotPasswordPayload = Pick<ForgotPasswordFormData, "email">;
export type VerifyResetOtpPayload = Pick<
  ForgotPasswordFormData,
  "email" | "otp"
>;
export type ResetPasswordPayload = Pick<
  ForgotPasswordFormData,
  "email" | "newPassword" | "confirmNewPassword"
>;

export type ChangePasswordPayload = Pick<
  ChangePasswordFormData,
  "oldPassword" | "newPassword"
>;

import { z } from "zod";

export const forgotPasswordSchema = z
  .object({
    email: z.email("Invalid email address"),
    otp: z.string().min(1, "OTP is required"),
    newPassword: z
      .string()
      .min(1, "New password is required")
      .min(8, "Password must be at least 8 characters long"),
    confirmNewPassword: z.string().min(1, "Confirm password is required"),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    message: "Passwords do not match",
    path: ["confirmNewPassword"],
  });

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

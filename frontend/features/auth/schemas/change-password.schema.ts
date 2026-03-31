import { z } from "zod";

export const changePasswordSchema = z
  .object({
    oldPassword: z.string().min(1, "Current Password is required"),
    newPassword: z
      .string()
      .min(1, "New Password is required")
      .min(8, "New Password must be at least 8 characters long"),
    confirmPassword: z.string().min(1, "Confirm New Password is required"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type ChangePasswordFormData = z.infer<typeof changePasswordSchema>;

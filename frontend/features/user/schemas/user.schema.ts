import { z } from "zod";

export const updateUserSchema = z.object({
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]+$/, "Only numbers allowed")
    .length(10, "Phone number must be exactly 10 digits"),
});

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

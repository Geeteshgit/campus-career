import { z } from "zod";

export const adminFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.email("Invalid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[0-9]+$/, "Only numbers allowed")
    .length(10, "Phone number must be exactly 10 digits"),
  role: z.enum(["super_admin", "admin"]),
});

export type AdminFormData = z.infer<typeof adminFormSchema>;
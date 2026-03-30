import { z } from "zod";

export const studentSelfUpdateSchema = z.object({
  cgpa: z
    .number({
      error: "CGPA must be a number",
    })
    .min(0, "CGPA cannot be negative")
    .max(10, "CGPA cannot exceed 10"),
  skills: z.string().optional(),
});

export const studentFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  enrollmentNumber: z.string().min(1, "Enrollment Number is required"),
  email: z.email("Invalid email address"),
  program: z.string().min(1, "Program is required"),
  year: z.string().min(1, "Year is required"),
  batch: z.string().min(1, "Batch is required"),
  specialization: z.string().min(1, "Specialization is required"),
  phone: z.string().min(1, "Phone number is required").length(10, "Phone number must be 10 digits"),
  cgpa: z
    .number({
      error: "CGPA must be a number",
    })
    .min(0, "CGPA cannot be negative")
    .max(10, "CGPA cannot exceed 10"),
});

export type StudentSelfUpdateFormData = z.infer<typeof studentSelfUpdateSchema>;
export type StudentFormData = z.infer<typeof studentFormSchema>;
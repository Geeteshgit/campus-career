import { z } from "zod";

export const updateStudentSchema = z.object({
  cgpa: z
    .number({
      error: "CGPA must be a number",
    })
    .min(0, "CGPA cannot be negative")
    .max(10, "CGPA cannot exceed 10"),
  skills: z.string().optional(),
});

export type UpdateStudentFormData = z.infer<typeof updateStudentSchema>;

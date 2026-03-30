import { z } from "zod";

export const jobFormSchema = z.object({
  company: z.string().min(1, "Company name is required"),
  role: z.string().min(1, "Role is required"),
  location: z.string().min(1, "Location is required"),
  package: z.string().min(1, "Package / Salary is required"),
  deadline: z
    .string()
    .min(1, "Application deadline is required")
    .refine(
      (value) => {
        const [year, month, day] = value.split("-").map(Number);
        const date = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return date >= today;
      },
      {
        message: "Deadline must be today or a future date",
      },
    ),
  positions: z
    .number({ error: "Positions must be a number" })
    .int()
    .min(1, "At least one position is required"),
  type: z.enum(["Full-Time", "Internship"]),
  description: z
    .string()
    .min(1, "Job description is required")
    .min(10, "Description must be at least 10 characters"),
  requirements: z.string().min(1, "At least one requirement is required"),
  eligibility: z.string().min(1, "Eligibility criteria is required"),
  status: z.enum(["Active", "Inactive"]),
});

export type JobFormData = z.infer<typeof jobFormSchema>;

export type JobPayload = Omit<JobFormData, "requirements"> & {
  requirements: string[];
};

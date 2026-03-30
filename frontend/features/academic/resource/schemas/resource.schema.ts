import { z } from "zod";

export const resourceFormSchema = z.object({
    title: z.string().min(1, "Title is required"),
    url: z.url("Invalid URL format"),
    program: z.string().min(1, "Program is required"),
});

export type ResourceFormData = z.infer<typeof resourceFormSchema>;
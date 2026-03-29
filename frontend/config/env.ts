import { z } from "zod";

const envSchema = z.object({
  USER_SERVICE: z.url(),
  JOB_SERVICE: z.url(),
  MESSAGE_SERVICE: z.url(),
  ACADEMIC_CONFIG_SERVICE: z.url(),
  ANALYTICS_SERVICE: z.url(),
});

export const env = envSchema.parse({
  USER_SERVICE: process.env.NEXT_PUBLIC_USER_SERVICE_URL,
  JOB_SERVICE: process.env.NEXT_PUBLIC_JOB_SERVICE_URL,
  MESSAGE_SERVICE: process.env.NEXT_PUBLIC_MESSAGE_SERVICE_URL,
  ACADEMIC_CONFIG_SERVICE: process.env.NEXT_PUBLIC_ACADEMIC_CONFIG_SERVICE_URL,
  ANALYTICS_SERVICE: process.env.NEXT_PUBLIC_ANALYTICS_SERVICE_URL,
});

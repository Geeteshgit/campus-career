export type Role = "admin" | "super_admin" | "student";

export type LoginPayload = {
  email: string;
  password: string;
};
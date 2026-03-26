import { Role } from "@/features/auth";

export interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    role: Role
    createdAt: string;
    updatedAt: string;
}

export type CreateUserPayload = Omit<User, "_id" | "createdAt" | "updatedAt">;

export type UpdateUserPayload = {
    phone?: string;
};
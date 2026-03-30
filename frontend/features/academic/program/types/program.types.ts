export interface Program { 
    _id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateProgramPayload = Omit<Program, "_id" | "createdAt" | "updatedAt">;
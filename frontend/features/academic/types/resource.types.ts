export interface Resource {
    _id: string;
    title: string;
    url: string;
    program: string;
    createdAt: string;
    updatedAt: string;
}

export type CreateResourcePayload = Omit<Resource, "_id" | "createdAt" | "updatedAt">;

export type UpdateResourcePayload = Partial<CreateResourcePayload>;
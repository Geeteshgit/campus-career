import dotenv from "dotenv";
dotenv.config();

type ENV = {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    MONGO_URI: string;
    JWT_SECRET: string;
}

export const env: ENV = {
    NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") ?? "development",
    PORT: Number(process.env.PORT) || 3000,
    MONGO_URI: process.env.MONGO_URI ?? (() => { throw new Error("Missing Mongo URI environment variables") })(),
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
};


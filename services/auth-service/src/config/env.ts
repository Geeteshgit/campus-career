import dotenv from "dotenv";
dotenv.config();

type ENV = {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_DB_NAME: string;
    JWT_SECRET: string;
    USER_SERVICE_URL: string;
}

export const env: ENV = {
    NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") ?? "development",
    PORT: Number(process.env.PORT) || 3000,
    MONGO_USERNAME: process.env.MONGO_URI || "admin",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || "CampusCareer_Auth",
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
    USER_SERVICE_URL: process.env.USER_SERVICE_URL ?? (() => { throw new Error("Missing User Service URL environment variable") })(),
};


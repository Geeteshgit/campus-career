import dotenv from "dotenv";
dotenv.config();

type ENV = {
    NODE_ENV: "development" | "production" | "test";
    PORT: number;
    MONGO_USERNAME: string;
    MONGO_PASSWORD: string;
    MONGO_DB_NAME: string;
    JWT_SECRET: string;
    USER_SERVICE: string;
    JOB_SERVICE: string;
    ACADEMIC_CONFIG_SERVICE: string;
}

export const env: ENV = {
    NODE_ENV: (process.env.NODE_ENV as "development" | "production" | "test") ?? "development",
    PORT: Number(process.env.PORT) || 3000,
    MONGO_USERNAME: process.env.MONGO_URI || "admin",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || "CampusCareer_AnalyticsDB",
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
    USER_SERVICE: process.env.USER_SERVICE ?? (() => { throw new Error("Missing USER SERVICE environment variable") })(),
    JOB_SERVICE: process.env.JOB_SERVICE ?? (() => { throw new Error("Missing JOB SERVICE environment variable") })(),
    ACADEMIC_CONFIG_SERVICE: process.env.ACADEMIC_CONFIG_SERVICE ?? (() => { throw new Error("Missing ACADEMIC CONFIG SERVICE environment variable") })(),
};


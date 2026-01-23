import dotenv from "dotenv";
dotenv.config();

export const env = {
    NODE_ENV: process.env.NODE_ENV ?? "development",
    PORT: Number(process.env.PORT) || 3000,
    MONGO_USERNAME: process.env.MONGO_URI || "admin",
    MONGO_PASSWORD: process.env.MONGO_PASSWORD || "admin",
    MONGO_DB_NAME: process.env.MONGO_DB_NAME || "CampusCareer_UserDB",
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? (() => { throw new Error("Missing GEMINI API KEY environment variable") })(),
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "superadmin@campuscareer.com",
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "BUCC@#superadmin",
    BREVO_API_KEY: process.env.BREVO_API_KEY ?? (() => { throw new Error("Missing BREVO API KEY environment variable") })(),
};


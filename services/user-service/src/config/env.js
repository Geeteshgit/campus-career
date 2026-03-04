import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 5001,
    MONGO_URI: process.env.MONGO_URI ?? (() => { throw new Error("Missing MONGO URI environment variable") })(),
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
    GEMINI_API_KEY: process.env.GEMINI_API_KEY ?? (() => { throw new Error("Missing GEMINI API KEY environment variable") })(),
    SUPER_ADMIN_EMAIL: process.env.SUPER_ADMIN_EMAIL || "superadmin@campuscareer.com",
    SUPER_ADMIN_PASSWORD: process.env.SUPER_ADMIN_PASSWORD || "BUCC@#superadmin",
    BREVO_API_KEY: process.env.BREVO_API_KEY ?? (() => { throw new Error("Missing BREVO API KEY environment variable") })(),
};


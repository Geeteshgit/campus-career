import dotenv from "dotenv";
dotenv.config();

export const env= {
    PORT: Number(process.env.PORT) || 5003,
    MONGO_URI: process.env.MONGO_URI ?? (() => { throw new Error("Missing MONGO URI environment variable") })(),
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
};


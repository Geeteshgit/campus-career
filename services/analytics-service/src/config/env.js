import dotenv from "dotenv";
dotenv.config();

export const env = {
    PORT: Number(process.env.PORT) || 5005,
    JWT_SECRET: process.env.JWT_SECRET ?? (() => { throw new Error("Missing JWT SECRET environment variable") })(),
    USER_SERVICE: process.env.USER_SERVICE ?? (() => { throw new Error("Missing USER SERVICE environment variable") })(),
    JOB_SERVICE: process.env.JOB_SERVICE ?? (() => { throw new Error("Missing JOB SERVICE environment variable") })(),
    ACADEMIC_CONFIG_SERVICE: process.env.ACADEMIC_CONFIG_SERVICE ?? (() => { throw new Error("Missing ACADEMIC CONFIG SERVICE environment variable") })(),
};


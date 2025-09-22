import mongoose from "mongoose";
import { env } from "./env.js";

const MONGO_URI: string = `mongodb://${env.MONGO_USERNAME}:${env.MONGO_PASSWORD}@mongo:27017/${env.MONGO_DB_NAME}?authSource=admin`

export const connectToDB = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log("Connected to Database for Institution Service");
    } catch (err) {
        console.error("Error Connecting to Database for Institution Service: ", err);
    }
}
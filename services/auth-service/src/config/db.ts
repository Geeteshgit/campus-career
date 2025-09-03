import mongoose from "mongoose";
import { env } from "./env.js";

export const connectToDB = async() => {
    try {
        await mongoose.connect(env.MONGO_URI);
        console.log("Connected to Database");
    } catch (err) {
        console.error("Error Connecting to Database: ", err);
    }
}
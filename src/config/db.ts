import { exit } from "node:process";
import mongoose from "mongoose";

export const connectDB = async () => {
    // Database connection logic here
    try {
        const { connection } = await mongoose.connect(process.env.MONGODB_URI || '');
        const url = `${connection.host}:${connection.port}`;
        console.log("Database connected", url);
    } catch (error) {
        console.error("Database connection failed", error);
        exit(1);
    }
}
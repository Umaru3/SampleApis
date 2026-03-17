import mongoose from "mongoose";

export const connectDB  = async () => {

    try{
        console.log("Connecting to MongoDB...");
        const conn = await mongoose.connect(process.env.MONGO_URI!);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (err) {
        console.error("Failed to connect to MongoDB", err);
    }
}
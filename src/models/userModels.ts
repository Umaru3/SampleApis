import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    deleteFlag: { type: Number, default: 0 }
});

export const User = mongoose.model("User", userSchema, "simpleCollection");
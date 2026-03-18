import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
    password: { type: String, required: true },
    deleteFlag: { type: Number, default: 0 }
});

export const User = mongoose.model("User", userSchema, "simpleCollection");
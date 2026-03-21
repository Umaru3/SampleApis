import { User } from "../models/userModels";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET as string;

//fetch all users
export const getUsers = async () => {

    try{

        const users = await User.find({ deleteFlag: 0 });
        if (!users || users.length == 0) {
            console.log("No users found");
            return ["No users found"];
        }
        return users;
    } catch (error) {

        console.error("Error fetching users:", error);
        throw error;
    }
}

//create/register user
export const createUser = async (data: { username: string; email: string; password: string }) => {
    
  try {
    
    const emailRegex = /.+\@.+\..+/;
    const existingUser = await User.findOne({ username: data.username });
    const existingEmail = await User.findOne({ email: data.email });

    //basic checks
    if (!data) {
      return "Missing data";
    } else if (!data.username) {
      return "Missing required fields: username is required.";
    } else if (!data.email) {
      return "Missing required fields: email is required.";
    } else if (!data.password) {
      return "Missing required fields: password is required.";
    }

    //check for existing username and email
    if(existingUser && existingEmail) {
      return "Both Username and email already exist.";
    }

    //email format validation
    if (!emailRegex.test(data.email)) {
      return "Invalid email format.";
    }

    //username already exists checker
    if (existingUser) {
      return "Username already exists.";
    }

    //email already exists checker
    if (existingEmail) {
      return "Email already exists.";
    }

    return await User.create(data);

  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

//update user by username
export const updateUser = async (username: string, data: any) => {

    try {

        return await User.findOneAndUpdate({ username }, data, { new: true });
    } catch (error) {

        console.error("Error updating user:", error);
        throw error;
    }
};

//delete user by deleteFlag
export const deleteFlagUser = async (username: string) => {

    try {

        return await User.findOneAndUpdate({ username }, { deleteFlag: 1 }, { new: true });
    } catch (error) {

        console.error("Error updating user:", error);
        throw error;
    }
};

//delete actual user from db
export const deleteUser = async (username: string) => {
  try{
    
    return await User.findOneAndDelete({ username });
  } catch (error) {

    console.error("Error deleting user:", error);
    throw error;
  }
};

//login user
export const loginUser = async (identifier: string, password: string) => {

  try {

    if(!identifier || !password) {
      return "Missing required fields required.";
    }
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }], deleteFlag: 0 });
    if (!user) { return "User not found."; }

    const isMatch = await comparePassword(password, user?.password || "");
    if(!isMatch) {return "Invalid password.";}

    const token = jwt.sign(
      {id: user._id, email: user.email, username: user.username}, 
      JWT_SECRET, 
      { expiresIn: "1h" });
    return { message: "Successfully logged in.", username: user.username, token };
  } catch (error) {
    console.error("Error logging in user:", error);
    throw error;
  }
}

const comparePassword = async (candidatePassword: string, hashedPassword: string) => {

  try {

    return await bcrypt.compare(candidatePassword, hashedPassword);
  } catch (error) {

    console.error("Error comparing password:", error);
    throw error;
  }
}
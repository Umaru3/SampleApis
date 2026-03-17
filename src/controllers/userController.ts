import { Request, RequestHandler, Response } from "express";
import { getUser, getAllUsers } from "../services/userService";

export const fetchUser = (req : Request, res : Response) => {
    const { id }= req.body as { id: number };
    const user = getUser(id);
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
};

export const fetchAllUsers = (req : Request, res : Response) => {
    res.json(getAllUsers());
};
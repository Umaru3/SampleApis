import { Request, Response } from "express";
import { getUsers, createUser } from "../services/mongoService";

export const fetchAllUsers = async (req : Request, res : Response) => {
    try {
        const users = await getUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const createAUser = async (req: Request, res: Response) => {

    try{
        const user = await createUser(req.body);
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: "Failed to create user" });
    }
};

// export const update = async (req: Request, res: Response) => {
//   const user = await updateUser(req.params.id, req.body);
//   res.json(user);
// };

// export const remove = async (req: Request, res: Response) => {
//   await deleteUser(req.params.id);
//   res.json({ message: "Deleted" });
// };
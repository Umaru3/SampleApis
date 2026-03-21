import { Request, Response } from "express";
import { getUsers, createUser, updateUser, deleteFlagUser, deleteUser, loginUser } from "../services/mongoService";

export const fetchAllUsers = async (req : Request, res : Response) => {

    try {

        const users = await getUsers();
        res.json(users);
        console.log("Successfully fetched users: ", users);
    } catch (error) {

        res.status(500).json({ error: "Failed to fetch users" });
    }
};

export const createAUser = async (req: Request, res: Response) => {

    try{

        const user = await createUser(req.body);
        const username = req.body.username;
        res.json("successfully created user: " + username);
        console.log("Successfully created user: ", user);
    } catch (error) {

        res.status(500).json({ error: "Failed to create user" });
    }
};

export const updateAUser = async (req: Request, res: Response) => {

    try {

        const { username } = req.body as { username: string };
        const user = await updateUser(username, req.body);
        res.json(user);
        console.log("Successfully updated user: ", user);
    } catch (error) {
        
        res.status(500).json({ error: "Failed to update user" });
    }
};

export const removeAUser = async (req: Request, res: Response) => {

    try {

        const { username } = req.body as { username: string };
        const user = await deleteFlagUser(username);
        res.json(user);
        console.log("Successfully deleted user: ", user);
    } catch (error) {
        
        res.status(500).json({ error: "Failed to delete user" });
    }
};

export const deleteAUser = async (req: Request, res: Response) => {

    try {

        const { username } = req.body as { username: string };
        await deleteUser(username);
        res.json({ message: "Deleted: ", username });
    } catch (error) {

        res.status(500).json({ error: "Failed to delete user" });
    }
};

export const loginAUser = async (req: Request, res: Response) => {

  try {

    const { email, password, username } = req.body as { email: string; password: string; username: string };
    const identifier = email || username;
    const result = await loginUser(identifier, password);
    res.json(result);
  }  catch (error) {
    
    res.status(500).json({ error: "Failed to login user" });
  }
}
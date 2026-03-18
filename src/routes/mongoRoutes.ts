import { Router } from "express";
import { fetchAllUsers, createAUser } from "../controllers/mongoController";
const router = Router();

router.get('/fetch-users', fetchAllUsers);
router.post("/create-users", createAUser);
// router.put("/users/:id", update);
// router.delete("/users/:id", remove);


export default router;
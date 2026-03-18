import { Router } from "express";
import { fetchAllUsers, createAUser, updateAUser } from "../controllers/mongoController";
const router = Router();

router.get('/fetch-users', fetchAllUsers);
router.post("/create-user", createAUser);
router.post("/update-user", updateAUser);
// router.delete("/users/:id", remove);


export default router;
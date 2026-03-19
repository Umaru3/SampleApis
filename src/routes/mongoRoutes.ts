import { Router } from "express";
import { fetchAllUsers, createAUser, updateAUser, deleteAUser, removeAUser, loginAUser } from "../controllers/mongoController";
const router = Router();

router.get('/fetch-users', fetchAllUsers);
router.post("/create-user", createAUser);
router.post("/update-user", updateAUser);
router.post("/remove-user", removeAUser);
router.delete("/delete-user", deleteAUser);
router.post("/login-user", loginAUser);


export default router;
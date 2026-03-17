import { Router } from "express";
import { fetchAllUsers } from "../controllers/mongoController";
const router = Router();

router.get('/mongo-users', fetchAllUsers);
// router.post("/users", create);
// router.put("/users/:id", update);
// router.delete("/users/:id", remove);


export default router;
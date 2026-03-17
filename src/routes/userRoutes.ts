import { Router } from 'express';
import { fetchUser, fetchAllUsers } from '../controllers/userController';

const router = Router();

router.get('/users', fetchAllUsers);
router.post('/user', fetchUser);

export default router;
import express from 'express';
import { getUser, addRemoveFollower, getAllUsers } from '../controllers/users.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

/* READ */
router.get('/:id', verifyToken, getUser);

router.get('/', getAllUsers);

/* UPDATE */
router.patch('/:id/:followerId', verifyToken, addRemoveFollower);

export default router;

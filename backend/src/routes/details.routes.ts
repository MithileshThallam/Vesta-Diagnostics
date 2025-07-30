import { verifyToken } from '../middlewares/authMiddleware.js';

import express from 'express';
import { getUserProfile } from '../controllers/user.controller.js';

const router = express.Router();

router.get('/profile',verifyToken, getUserProfile);

export default router;

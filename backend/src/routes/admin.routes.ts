// src/routes/admin.routes.ts
import express from 'express';
import { adminLogin, createSubAdmin } from '../controllers/admin.controller.js';
import { validateLogin, validateAdminCreation } from '../middlewares/validateInput.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/login', validateLogin, adminLogin);

// Only main admin can create sub-admins
router.post('/create', verifyToken, isAdmin, validateAdminCreation, createSubAdmin);

export default router;

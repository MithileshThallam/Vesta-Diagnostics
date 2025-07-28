import express from 'express';
import { adminLogin, createSubAdmin } from '../controllers/admin.controller.js';
import { verifyToken, isAdmin } from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateInput.js';
import { loginSchema, createAdminSchema } from '../utils/validationSchema.js';

const router = express.Router();

// 🔐 POST /api/admin/login — Admin & Sub-admin login
router.post('/login', validateBody(loginSchema), adminLogin);

// 👤 POST /api/admin/create — Create sub-admin (only super admin)
router.post('/create', verifyToken, isAdmin, validateBody(createAdminSchema), createSubAdmin);

export default router;

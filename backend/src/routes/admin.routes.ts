import express from 'express';
import {
  createSubAdmin,
  getAdminOverview,
  getSystemStatus,
} from '../controllers/admin.controller.js';
import { verifyToken, isAdmin , isAdminOrSubAdmin} from '../middlewares/authMiddleware.js';
import { validateBody } from '../middlewares/validateInput.js';
import { loginSchema, createAdminSchema } from '../utils/validationSchema.js';

const router = express.Router();

// 👤 POST /api/admin/create — Create sub-admin (only super admin)
router.post('/create', verifyToken, isAdmin, validateBody(createAdminSchema), createSubAdmin);

// 📊 GET /api/admin/overview — Dashboard metrics
router.get('/overview', verifyToken, isAdmin, getAdminOverview);

// ⚙️ GET /api/admin/system-status — System health info
router.get('/system-status', verifyToken, isAdmin, getSystemStatus);




export default router;

import express from 'express';
import {
  createSubAdmin,
  getAdminOverview,
  getSystemStatus,
} from '../controllers/admin.controller';
import { verifyToken, requireAdmin, requireAdminOrSubAdmin, requireSubAdmin } from '../middlewares/authMiddleware';
import { validateBody } from '../middlewares/validateInput';
import { createAdminSchema } from '../utils/validationSchema';

const router = express.Router();

// 🔐 Check authentication status
router.get('/auth-check', verifyToken, requireAdminOrSubAdmin, (req, res) => {
  res.json({ 
    authenticated: true, 
    role: req.user?.role,
    message: 'Access granted' 
  });
});

// 👤 Create sub-admin (admin only)
router.post('/create', verifyToken, requireAdmin, validateBody(createAdminSchema), createSubAdmin);

// 📊 Dashboard metrics (admin only)
router.get('/overview', verifyToken, requireAdmin, getAdminOverview);

// ⚙️ System health info (admin only)
router.get('/system-status', verifyToken, requireAdmin, getSystemStatus);

// 📋 Sub-admin dashboard (sub-admin only)
router.get('/sub-admin-dashboard', verifyToken, requireSubAdmin, (req, res) => {
  res.json({
    message: 'Sub-admin dashboard',
    role: req.user?.role,
    data: {
      // Add sub-admin specific data here
    }
  });
});

export default router;

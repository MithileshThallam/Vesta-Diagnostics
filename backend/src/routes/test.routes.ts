import express from 'express';
import { createTest, getAllTests, updateTest, deleteTest } from '../controllers/test.controller.js';

import { verifyToken, requireAdminOrSubAdmin } from '../middlewares/authMiddleware.js';

const router = express.Router();

// ✅ Admin/Sub-Admin: Add a new test
router.post(
  '/create',
  verifyToken,
  requireAdminOrSubAdmin,
  createTest
);

// ✅ Admin/Sub-Admin: Update a test
router.put(
  '/:id',
  verifyToken,
  requireAdminOrSubAdmin,
  updateTest
);

// ✅ Admin/Sub-Admin: Delete a test
router.delete(
  '/:id',
  verifyToken,
  requireAdminOrSubAdmin,
  deleteTest
);

// ✅ Frontend: Get all tests
router.get('/all', getAllTests);

export default router;

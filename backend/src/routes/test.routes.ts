import express from 'express';
import { createTest, getAllTests } from '../controllers/test.controller.js';

import { verifyToken, isAdminOrSubAdmin } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// ✅ Admin/Sub-Admin: Add a new test
router.post(
  '/create',
  verifyToken,
  isAdminOrSubAdmin,
  createTest
);

// ✅ Frontend: Get all tests
router.get('/all', getAllTests);

export default router;

import express from 'express';
import {
  createTest,
  getTestsByCategory,
  getTestBySlug,
} from '../controllers/test.controller.js';

import { verifyToken, isAdminOrSubAdmin } from '../middlewares/authMiddleware.js';
import {upload} from '../middlewares/multer.js'; // 📦 single image upload middleware

const router = express.Router();

// ✅ POST /api/tests — Create new test (admin/sub-admin only)
router.post(
  '/',
  verifyToken,
  isAdminOrSubAdmin,
  upload.single('image'), // field name from frontend must be "image"
  createTest
);

// ✅ GET /api/tests?category=radiology
router.get('/', getTestsByCategory);

// ✅ GET /api/tests/:category/:slug
router.get('/:category/:slug', getTestBySlug);

export default router;

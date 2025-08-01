import express from 'express';
import { createTest, getAllTests,getSpecificTest } from '../controllers/test.controller.js';

import { verifyToken, isAdminOrSubAdmin } from '../middlewares/authMiddleware.js';
import { upload } from '../middlewares/multer.js';

const router = express.Router();

// ✅ Admin/Sub-Admin: Add a new test
router.post(
  '/create',
  verifyToken,
  isAdminOrSubAdmin,
  upload.single('image'), // frontend must send field name = "image"
  createTest
);

// ✅ Frontend: Get all tests
router.get('/all', getAllTests);
router.get('/:id',getSpecificTest)

export default router;

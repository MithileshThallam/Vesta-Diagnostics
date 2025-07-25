import express from 'express';
import {
  createTest,
  getTestsByCategory,
  getTestBySlug,
} from '../controllers/test.controller.js';

const router = express.Router();

// POST /api/tests — (optional for admin test upload)
router.post('/', createTest);

// GET /api/tests?category=radiology
router.get('/', getTestsByCategory);

// GET /api/tests/:category/:slug
router.get('/:category/:slug', getTestBySlug);

export default router;

import express from 'express';
import { verifyToken } from '../middlewares/authMiddleware.js';

const router = express.Router();

// 🔐 Check authentication status
router.get('/auth-check', verifyToken, (req, res) => {
  res.json({ 
    authenticated: true, 
    role: req.user?.role,
    message: 'Authenticated' 
  });
});

// 📋 Get user profile
router.get('/profile', verifyToken, (req, res) => {
  res.json({
    success: true,
    data: {
      id: req.user?.id,
      role: req.user?.role,
      // Add other user data as needed
    }
  });
});

export default router;

import express from 'express';
import {
  createBooking,
  getBookingsForAdmin,
} from '../controllers/booking.controller.js';

import {
  verifyToken,
  isUser,
  isAdminOrSubAdmin,
} from '../middlewares/authMiddleware.js';

import { validateBody } from '../middlewares/validateInput.js';
import { createBookingSchema } from '../utils/validationSchema.js';

const router = express.Router();

// 🧑‍⚕️ USER ROUTES
// Create a new booking (user only)
router.post('/', verifyToken, isUser, validateBody(createBookingSchema), createBooking);

// 🛡️ ADMIN / SUB-ADMIN ROUTES
// Get bookings for admin/sub-admin (filtered by location for sub-admin)
router.get('/', verifyToken, isAdminOrSubAdmin, getBookingsForAdmin);

export default router;

import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingsForAdmin,
  updateBookingStatus,
} from '../controllers/booking.controller.js';

import {
  verifyToken,
  isUser,
  isAdmin,
  isAdminOrSubAdmin,
} from '../middlewares/authMiddleware.js';

import { validateBody } from '../middlewares/validateInput.js';
import { createBookingSchema } from '../utils/validationSchema.js';

const router = express.Router();

// 🧑‍⚕️ USER ROUTES

// Create a new booking (user only)
router.post('/', verifyToken, isUser, validateBody(createBookingSchema), createBooking);

// Get bookings for the logged-in user
router.get('/me', verifyToken, isUser, getMyBookings);

// 🛡️ ADMIN / SUB-ADMIN ROUTES

// Get bookings for admin/sub-admin (filtered by location for sub-admin)
router.get('/location', verifyToken, isAdminOrSubAdmin, getBookingsForAdmin);

// Update booking status (admin/sub-admin)
router.patch('/:bookingId/status', verifyToken, isAdminOrSubAdmin, updateBookingStatus);

// 🧑‍💼 SUPER ADMIN ROUTE

// Get all bookings (main admin only)
router.get('/', verifyToken, isAdmin, getBookingsForAdmin);

export default router;

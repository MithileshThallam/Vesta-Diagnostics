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

const router = express.Router();

// 👤 USER ROUTES
router.post('/', verifyToken, isUser, createBooking);              // POST /api/bookings
router.get('/me', verifyToken, isUser, getMyBookings);             // GET  /api/bookings/me

// 🧑‍💼 ADMIN / SUB-ADMIN ROUTES
router.get('/location', verifyToken, isAdminOrSubAdmin, getBookingsForAdmin);        // GET /api/bookings/location
router.patch('/:bookingId/status', verifyToken, isAdminOrSubAdmin, updateBookingStatus); // PATCH /api/bookings/:bookingId/status

// 🧑‍💼 SUPER ADMIN ROUTE (same as admin)
router.get('/', verifyToken, isAdmin, getBookingsForAdmin);        // GET /api/bookings

export default router;

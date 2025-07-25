import express from 'express';
import {
  createBooking,
  getMyBookings,
  getBookingsForAdmin,
  updateBookingStatus,
} from '../controllers/booking.controller.js';
import { verifyToken, isUser, isAdmin, isSubAdmin } from '../middlewares/authMiddleware';

const router = express.Router();

// 🧑 User
router.post('/create', verifyToken, isUser, createBooking);
router.get('/my-bookings', verifyToken, isUser, getMyBookings);

// 🛠 Admin / Sub-admin
router.get('/admin-bookings', verifyToken, getBookingsForAdmin); // internal role check
router.patch('/:bookingId/status', verifyToken, updateBookingStatus); // internal check in controller

export default router;

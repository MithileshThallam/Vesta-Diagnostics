// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';

// ✅ Create Booking (User Only)
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      tests, // array of string test ids (e.g. ["cbc", "lft"])
      selectedLocation,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;

    const booking = await Booking.create({
      user: req.user!.id,
      tests,
      selectedLocation,
      paymentMethod,
      paymentStatus,
      transactionId,
    });

    return res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to create booking',
      error: (err as Error).message,
    });
  }
};

// ✅ Get My Bookings (User Only)
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user!.id }).sort({ createdAt: -1 });
    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: (err as Error).message,
    });
  }
};

// ✅ Get Bookings (Admin / Sub-Admin)
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter: any = {};

    if (req.user!.role === 'sub-admin') {
      filter.selectedLocation = req.user!.location;
    }

    const bookings = await Booking.find(filter)
      .populate('user')
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: (err as Error).message,
    });
  }
};

// ✅ Update Booking Status (Admin / Sub-Admin)
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // sub-admin can only update within their location
    if (
      req.user!.role === 'sub-admin' &&
      booking.selectedLocation !== req.user!.location
    ) {
      return res.status(403).json({ message: 'Unauthorized for this booking' });
    }

    booking.status = status;
    await booking.save();

    return res.status(200).json({ message: 'Booking status updated', booking });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to update booking',
      error: (err as Error).message,
    });
  }
};

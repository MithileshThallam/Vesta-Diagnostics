import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';
import { Types } from 'mongoose';

// Create Booking — User only
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      test,
      selectedLocation,
      paymentMethod,
      paymentStatus,
      transactionId,
    } = req.body;

    const booking = await Booking.create({
      user: req.user!.id,
      test,
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

// Get My Bookings — User only
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user!.id }).populate('test');

    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: (err as Error).message,
    });
  }
};

// Get Bookings — Admin or Sub-Admin
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter = {};

    if (req.user!.role === 'sub-admin') {
      filter = { selectedLocation: req.user!.location };
    }

    const bookings = await Booking.find(filter)
      .populate('user')
      .populate('test');

    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch admin bookings',
      error: (err as Error).message,
    });
  }
};

// Update Booking Status — Admin / Sub-Admin
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    // Validate status
    if (!['pending', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid booking status' });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Sub-admin can only update their own location’s bookings
    if (
      req.user!.role === 'sub-admin' &&
      booking.selectedLocation !== req.user!.location
    ) {
      return res.status(403).json({ message: 'Unauthorized to update this booking' });
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

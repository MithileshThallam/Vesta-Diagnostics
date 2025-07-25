import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';
import { Types } from 'mongoose';

// @desc User creates booking
export const createBooking = async (req: Request, res: Response) => {
  try {
    const { test, selectedLocation, paymentMethod, paymentStatus, transactionId } = req.body;

    const newBooking = await Booking.create({
      user: req.user!.id,
      test,
      selectedLocation,
      paymentMethod,
      paymentStatus,
      transactionId,
    });

    res.status(201).json({ message: 'Booking created', booking: newBooking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to create booking', error: err });
  }
};

// @desc User gets their bookings
export const getMyBookings = async (req: Request, res: Response) => {
  try {
    const bookings = await Booking.find({ user: req.user!.id }).populate('test');
    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch bookings', error: err });
  }
};

// @desc Admin/Sub-Admin gets bookings (admin = all, sub-admin = location-specific)
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter = {};

    if (req.user!.role === 'sub-admin') {
      filter = { selectedLocation: req.user!.location };
    }

    const bookings = await Booking.find(filter).populate('user').populate('test');

    res.status(200).json({ bookings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch admin bookings', error: err });
  }
};

// @desc Admin/Sub-Admin updates status
export const updateBookingStatus = async (req: Request, res: Response) => {
  try {
    const { bookingId } = req.params;
    const { status } = req.body;

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: 'Booking not found' });

    // If sub-admin, enforce location check
    if (
      req.user!.role === 'sub-admin' &&
      booking.selectedLocation !== req.user!.location
    ) {
      return res.status(403).json({ message: 'Unauthorized to update this booking' });
    }

    booking.status = status;
    await booking.save();

    res.status(200).json({ message: 'Booking status updated', booking });
  } catch (err) {
    res.status(500).json({ message: 'Failed to update booking', error: err });
  }
};

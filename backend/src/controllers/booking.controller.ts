// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';

// ✅ Create Booking (User Only)
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      test, // single test id (e.g. "cbc")
      selectedLocation,
      date // booking date
    } = req.body;

    if (!test || typeof test !== 'string') {
      return res.status(400).json({ message: 'Test is required' });
    }
    if (!selectedLocation) {
      return res.status(400).json({ message: 'Selected location is required' });
    }
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const booking = await Booking.create({
      user: req.user!.id,
      test,
      selectedLocation,
      date
    });

    return res.status(201).json({ message: 'Booking created', booking });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to create booking',
      error: (err as Error).message,
    });
  }
};

// ✅ Get Bookings (Admin / Sub-Admin)
// ✅ Get Bookings (Admin / Sub-Admin)
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter: any = {};

    if (req.user!.role === 'sub-admin') {
      filter.selectedLocation = req.user!.location;
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name phone') // fetch only name & phone from User
      .sort({ createdAt: -1 })
      .select('test date selectedLocation user'); // only these fields from Booking

    const formattedBookings = bookings.map(b => {
      const user = b.user as { name?: string; phone?: string };
      return {
        name: user?.name || '',
        phone: user?.phone || '',
        test: b.test,
        date: b.date,
        location: b.selectedLocation
      };
    });

    return res.status(200).json({ bookings: formattedBookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: (err as Error).message,
    });
  }
};

// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';
import SubAdmin from '../models/SubAdmin.js';

// ✅ Create Booking (User Only)
export const createBooking = async (req: Request, res: Response) => {
  try {
    // Destructure all validated fields from req.body
    const {
      test,
      location,
      date
    } = req.body;

    // Create booking with all validated data
    await Booking.create({
      user: req.user!.id,
      test,
      date: new Date(date),
      location
    });

    return res.status(201).json({
      message: 'Booking created successfully'
    });

  } catch (err) {
    console.error('Booking creation error:', err);
    return res.status(500).json({
      message: 'Failed to create booking',
      error: process.env.NODE_ENV === 'development'
        ? (err as Error).message
        : 'Internal server error'
    });
  }
};

// ✅ Get Bookings (Admin / Sub-Admin)
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter: any = {};

    // For sub-admin, filter by their location
    if (req.user?.role === 'sub-admin') {
      let subAdmin = await SubAdmin.findById(req.user.id);
      filter.location = subAdmin?.branch;
    }
    // For admin, no filter is applied (gets all bookings)

    const bookings = await Booking.find(filter)
      .populate('user', 'name phone')
      .sort({ createdAt: -1 })
      .select('test date location user');

    const formattedBookings = bookings.map(b => {
      const user = b.user as { name?: string; phone?: string };
      return {
        name: user?.name || '',
        phone: user?.phone || '',
        test: b.test,
        date: b.date,
        location: b.location
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

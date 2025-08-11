// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';

// ✅ Create Booking (User Only)
export const createBooking = async (req: Request, res: Response) => {
  try {
    // Destructure all validated fields from req.body
    const { 
      name,        // Patient name
      phone,       // Patient phone
      test,        // Test ID (e.g. "cbc")
      location,    // Location (e.g. "Medanta Gurgaon")
      date         // Booking date (ISO string)
    } = req.body;

    // Create booking with all validated data
    const booking = await Booking.create({
      user: req.user!.id,  // From auth middleware
      test,                // Store test ID
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
// ✅ Get Bookings (Admin / Sub-Admin)
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter: any = {};

    if (req.user!.role === 'sub-admin') {
      filter.location = req.user!.location;
    }

    const bookings = await Booking.find(filter)
      .populate('user', 'name phone') // fetch only name & phone from User
      .sort({ createdAt: -1 })
      .select('test date location user'); // only these fields from Booking

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

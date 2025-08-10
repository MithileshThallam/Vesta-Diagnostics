// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import Booking from '../models/Booking.model.js';

// ✅ Create Booking (User Only)
export const createBooking = async (req: Request, res: Response) => {
  try {
    const {
      tests, // array of string test ids (e.g. ["cbc", "lft"])
      selectedLocation,
      date // booking date
    } = req.body;

    if (!tests || !Array.isArray(tests) || tests.length === 0) {
      return res.status(400).json({ message: 'Tests are required' });
    }
    if (!selectedLocation) {
      return res.status(400).json({ message: 'Selected location is required' });
    }
    if (!date) {
      return res.status(400).json({ message: 'Date is required' });
    }

    const booking = await Booking.create({
      user: req.user!.id,
      tests,
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
export const getBookingsForAdmin = async (req: Request, res: Response) => {
  try {
    let filter: any = {};

    if (req.user!.role === 'sub-admin') {
      filter.selectedLocation = req.user!.location;
    }

    const bookings = await Booking.find(filter)
      .populate('user', '-password') // populate user details except password
      .sort({ createdAt: -1 });

    return res.status(200).json({ bookings });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch bookings',
      error: (err as Error).message,
    });
  }
};

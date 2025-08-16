// src/models/Booking.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: string;
  test: string; // e.g. 'cbc'
  date: Date; // Booking date chosen by the user
  location: string;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: String, required: true },
    test: { type: String, required: true }, // Single test ID from frontend
    date: { type: Date, required: true }, // Date of booking/test
    location: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);

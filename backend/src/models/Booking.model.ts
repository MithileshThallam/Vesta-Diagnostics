// src/models/Booking.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  tests: string[]; // e.g. ['cbc', 'lft']
  date: Date; // Booking date chosen by the user
  selectedLocation: string;
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tests: [{ type: String, required: true }], // Frontend test IDs
    date: { type: Date, required: true }, // Date of booking/test
    selectedLocation: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);

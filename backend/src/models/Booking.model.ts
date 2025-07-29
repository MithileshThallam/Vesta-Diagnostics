// src/models/Booking.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  tests: string[]; // List of test IDs (same as frontend 'id')
  selectedLocation: string;
  paymentMethod: string;
  paymentStatus: string;
  transactionId?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    tests: [{ type: String, required: true }], // e.g. ['cbc', 'lft']
    selectedLocation: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    paymentStatus: { type: String, required: true },
    transactionId: { type: String },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);

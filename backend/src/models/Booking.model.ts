import mongoose, { Schema, Document } from 'mongoose';

export interface IBooking extends Document {
  user: mongoose.Types.ObjectId;
  test: mongoose.Types.ObjectId;
  selectedLocation: string;
  paymentMethod: 'online' | 'offline';
  paymentStatus: 'paid' | 'unpaid';
  transactionId?: string;
  reportUrl?: string;
  status: 'pending' | 'accepted' | 'rejected';
}

const BookingSchema = new Schema<IBooking>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    test: { type: Schema.Types.ObjectId, ref: 'Test', required: true },
    selectedLocation: { type: String, required: true }, // selected by user at time of booking

    paymentMethod: {
      type: String,
      enum: ['online', 'offline'],
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ['paid', 'unpaid'],
      default: 'unpaid',
    },
    transactionId: { type: String },
    reportUrl: { type: String },

    status: {
      type: String,
      enum: ['pending', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBooking>('Booking', BookingSchema);

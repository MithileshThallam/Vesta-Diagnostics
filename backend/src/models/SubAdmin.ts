import mongoose, { Schema, Document } from 'mongoose';

export interface ISubAdmin extends Document {
  phone: string;
  password: string;
  role: string;  // Changed from fixed 'sub-admin' to allow multiple roles
  branch: string; // Added branch field
  createdAt?: Date;
  updatedAt?: Date;
}

const SubAdminSchema = new Schema<ISubAdmin>(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'],
    },
    password: { type: String, required: true },
    role: { 
      type: String, 
      required: true,
      enum: ['sub-admin', 'branch-admin', 'supervisor'], // Example roles - adjust as needed
      default: 'sub-admin' 
    },
    branch: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Indexes
SubAdminSchema.index({ phone: 1 });
SubAdminSchema.index({ branch: 1 }); // Added index for branch field

export default mongoose.model<ISubAdmin>('SubAdmin', SubAdminSchema);
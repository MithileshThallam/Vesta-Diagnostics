import mongoose, { Schema, Document } from 'mongoose';

export interface ISubAdmin extends Document {
  name: string;  // Added name field
  phone: string;
  password: string;
  role: string;
  branch: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SubAdminSchema = new Schema<ISubAdmin>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, 'Name must be at least 2 characters long'],
      maxlength: [50, 'Name cannot exceed 50 characters']
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'],
    },
    password: { 
      type: String, 
      required: true,
      minlength: [6, 'Password must be at least 6 characters long']
    },
    role: { 
      type: String, 
      required: true,
      enum: ['sub-admin', 'branch-admin', 'supervisor'],
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
SubAdminSchema.index({ branch: 1 });
SubAdminSchema.index({ name: 1 }); // Added index for name field

export default mongoose.model<ISubAdmin>('SubAdmin', SubAdminSchema);
import mongoose, { Schema, Document } from 'mongoose';

export interface ISubAdmin extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'sub-admin';
  location?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SubAdminSchema = new Schema<ISubAdmin>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'],
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['sub-admin'], default: 'sub-admin' },
    location: { type: String },
  },
  { timestamps: true }
);

SubAdminSchema.index({ phone: 1 });

export default mongoose.model<ISubAdmin>('SubAdmin', SubAdminSchema);

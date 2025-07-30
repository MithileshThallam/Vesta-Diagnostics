import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  phone: string;
  password: string;
  role: 'user' | 'admin' | 'sub-admin';
  location?: string; // for sub-admins only
  hasWhatsapp?: boolean; // for users only
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+\@.+\..+/, 'Please enter a valid email']
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number']
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin', 'sub-admin'],
      default: 'user',
    },
    location: { type: String }, // only for sub-admins
    hasWhatsapp: { type: Boolean, default: false } // only for users
  },
  { timestamps: true }
);

UserSchema.index({ phone: 1 });

export default mongoose.model<IUser>('User', UserSchema);
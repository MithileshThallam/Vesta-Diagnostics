import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: 'user' | 'admin' | 'sub-admin';
  location?: string; // for sub-admins only
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['user', 'admin', 'sub-admin'],
      default: 'user',
    },
    location: { type: String }, // only for sub-admins
  },
  { timestamps: true }
);

export default mongoose.model<IUser>('User', UserSchema);

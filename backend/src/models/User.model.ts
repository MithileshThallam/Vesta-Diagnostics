import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email?: string;
  phone: string;
  password: string;
  role: 'user';
  hasWhatsapp?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      match: [/.+\@.+\..+/, 'Please enter a valid email'],
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'],
    },
    password: { type: String, required: true },
    role: { type: String, enum: ['user'], default: 'user' },
    hasWhatsapp: { type: Boolean, default: false },
  },
  { timestamps: true }
);


export default mongoose.model<IUser>('User', UserSchema);

// import mongoose, { Schema, Document } from 'mongoose';

// export interface IAdmin extends Document {
//   name: string;
//   email: string;
//   phone: string;
//   password: string;
//   role: 'admin';
//   createdAt?: Date;
//   updatedAt?: Date;
// }

// const AdminSchema = new Schema<IAdmin>(
//   {
//     name: { type: String, required: true },
//     email: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/.+\@.+\..+/, 'Please enter a valid email'],
//     },
//     phone: {
//       type: String,
//       required: true,
//       unique: true,
//       match: [/^[0-9]{10,15}$/, 'Please enter a valid phone number'],
//     },
//     password: { type: String, required: true },
//     role: { type: String, enum: ['admin'], default: 'admin' },
//   },
//   { timestamps: true }
// );

// AdminSchema.index({ phone: 1 });

// export default mongoose.model<IAdmin>('Admin', AdminSchema);

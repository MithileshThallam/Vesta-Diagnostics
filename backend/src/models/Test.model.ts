import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  name: string;
  description: string;
  price: number;
}

const TestSchema = new Schema<ITest>(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ITest>('Test', TestSchema);

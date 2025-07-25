import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  name: string;
  slug: string;
  category: 'radiology' | 'lab-test';
  description?: string;
  price?: number;
  preparation?: string;
}

const TestSchema = new Schema<ITest>(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    category: {
      type: String,
      enum: ['radiology', 'lab-test'],
      required: true,
    },
    description: { type: String },
    price: { type: Number },
    preparation: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model<ITest>('Test', TestSchema);

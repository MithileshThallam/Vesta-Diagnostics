// src/models/Test.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  id: string; // slug/identifier used in frontend
  name: string;
  category: string;
  description: string;
  price: number;
  priceDisplay: string;
  duration: string;
  locations: string[];
  locationNames: string[];
  image: string;
  popular: boolean;
  keywords: string[];
}

const TestSchema = new Schema<ITest>(
  {
    id: { type: String, required: true, unique: true }, // used in route like /api/tests/:id
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    priceDisplay: { type: String, required: true },
    duration: { type: String, required: true },
    locations: [{ type: String, required: true }],
    locationNames: [{ type: String, required: true }],
    image: { type: String, required: true },
    popular: { type: Boolean, default: false },
    keywords: [{ type: String }],
  },
  { timestamps: true }
);

// ✅ Explicit unique index on `id` field for better performance and clarity
TestSchema.index({ id: 1 }, { unique: true });

export default mongoose.model<ITest>('Test', TestSchema);

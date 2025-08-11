// src/models/Test.model.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ITest extends Document {
  id: string;
  name: string;
  category: string;
  description: string;
 
  duration: string;
  locations: string[];
  popular: boolean;
  keywords: string[];

  parts: string[];
  parameterCount: number; 
  parameters: string[]
  reportIn: number; 
  about: string; 
}

const TestSchema = new Schema<ITest>(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    duration: { type: String, required: true },
    locations: [{ type: String, required: true }],
    popular: { type: Boolean, default: false },
    keywords: [{ type: String, required: true }],

    parts: [{ type: String, required: true }],
    parameterCount: { type: Number, required: true },
    parameters: [{ type: String, required: true }],
    reportIn: { type: Number, required: true },
    about: { type: String, required: true },
  },
  { timestamps: true }
);

TestSchema.index({ id: 1 }, { unique: true });

export default mongoose.model<ITest>('Test', TestSchema);

import { Request, Response } from 'express';
import Test from '../models/Test.model.js';
import slugify from 'slugify';
import cloudinary from '../config/cloudinary.js';

// ✅ Create Test (Admin/Sub-admin)
export const createTest = async (req: Request, res: Response) => {
  try {
    const { name, category, description, price, preparation } = req.body;

 if (!req.file) {
  return res.status(400).json({ message: 'Image file is required' });
}

const file = req.file as Express.Multer.File; // TypeScript safe now

const result = await new Promise<{ secure_url: string }>((resolve, reject) => {
  const stream = cloudinary.uploader.upload_stream(
    { folder: 'vesta-tests', resource_type: 'image' },
    (error, result) => {
      if (error || !result) return reject(error);
      resolve(result);
    }
  );
  stream.end(file.buffer);
});

    const slug = slugify(name, { lower: true });

    const test = await Test.create({
      name,
      slug,
      category,
      description,
      price,
      preparation,
      imageUrl: result.secure_url,
    });

    res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create test',
      error: (err as Error).message,
    });
  }
};

// ✅ Get Tests by Category (optional filter)
export const getTestsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;

    const query: any = {};
    if (category) query.category = category;

    const tests = await Test.find(query).sort({ createdAt: -1 });

    res.status(200).json({ tests });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to fetch tests',
      error: (err as Error).message,
    });
  }
};

// ✅ Get Single Test by Category + Slug
export const getTestBySlug = async (req: Request, res: Response) => {
  try {
    const { category, slug } = req.params;

    const test = await Test.findOne({ category, slug });
    if (!test) {
      return res.status(404).json({ message: 'Test not found' });
    }

    res.status(200).json({ test });
  } catch (err) {
    res.status(500).json({
      message: 'Error retrieving test',
      error: (err as Error).message,
    });
  }
};

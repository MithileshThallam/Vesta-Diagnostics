// src/controllers/test.controller.ts
import { Request, Response } from 'express';
import Test from '../models/Test.model.js';
import slugify from 'slugify';
import cloudinary from '../config/cloudinary.js';

// ✅ CREATE Test (admin or sub-admin)
export const createTest = async (req: Request, res: Response) => {
  try {
    const {
      name,
      category,
      description,
      price,
      priceDisplay,
      duration,
      locations,
      locationNames,
      popular,
      keywords,
    } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    const file = req.file as Express.Multer.File;

    // Upload to Cloudinary
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
      id: slug,
      name,
      category,
      description,
      price,
      priceDisplay,
      duration,
      locations,
      locationNames,
      image: result.secure_url,
      popular,
      keywords,
    });

    return res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to create test',
      error: (err as Error).message,
    });
  }
};



export const getAllTests = async (req: Request, res: Response) => {
  try {
    const { skip = "0", limit = "0" } = req.query;

    const tests = await Test.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .select("id name category description priceDisplay duration locationNames image popular");

    return res.status(200).json({ tests });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch tests",
      error: (err as Error).message,
    });
  }
};

export const getSpecificTest = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const test = await Test.findOne({ id });

    if (!test) {
      return res.status(404).json({ message: "Test not found" });
    }

    return res.status(200).json({ test });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch test",
      error: (err as Error).message,
    });
  }
};


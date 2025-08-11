import { Request, Response } from 'express';
import Test from '../models/Test.model.js';
import slugify from 'slugify';

// ✅ CREATE Test (without image)
export const createTest = async (req: Request, res: Response) => {
  try {
    console.log("New Test received on backend: ", req.body);
    const {
      name,
      category,
      description,
      duration,
      locations,
      locationNames,
      popular,
      keywords,
      parts,
      parameterCount,
      parameters,
      reportIn,
      about,
    } = req.body;

    if (
      !name?.trim() ||
      !category?.trim() ||
      !description?.trim() ||
      typeof duration !== "string" ||
      !Array.isArray(locations) ||
      !Array.isArray(keywords) ||
      !Array.isArray(parts) ||
      typeof parameterCount !== "number" ||
      !Array.isArray(parameters) ||
      typeof reportIn !== "number" ||
      !about?.trim()
    ) {
      return res.status(400).json({ message: 'All required fields must be provided in the correct format' });
    }

    const slug = slugify(name, { lower: true });

    const existingTest = await Test.findOne({ id: slug });
    if (existingTest) {
      return res.status(409).json({ message: 'Test with this name already exists' });
    }

    const test = await Test.create({
      id: slug,
      name,
      category,
      description,
      duration,
      locations,
      locationNames,
      popular: Boolean(popular),
      keywords,
      parts,
      parameterCount,
      parameters,
      reportIn,
      about,
    });

    return res.status(201).json({ message: 'Test created successfully', test });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: 'Failed to create test',
      error: (err as Error).message,
    });
  }
};

    

// ✅ GET All Tests (without image field)
export const getAllTests = async (req: Request, res: Response) => {
  try {
    const { skip = "0", limit = "0" } = req.query;

    const tests = await Test.find()
      .skip(Number(skip))
      .limit(Number(limit))
      .select(
        "id name category description duration locationNames popular parts parameterCount parameters reportIn about"
      );

    return res.status(200).json({ tests });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to fetch tests",
      error: (err as Error).message,
    });
  }
};

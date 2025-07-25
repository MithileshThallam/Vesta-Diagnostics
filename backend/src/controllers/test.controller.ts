import { Request, Response } from 'express';
import Test from '../models/Test.model.js';

export const createTest = async (req: Request, res: Response) => {
  try {
    const test = await Test.create(req.body);
    res.status(201).json({ test });
  } catch (err) {
    res.status(400).json({ message: 'Failed to create test', error: err });
  }
};

export const getTestsByCategory = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const tests = await Test.find({ category });
    res.json({ tests });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tests' });
  }
};

export const getTestBySlug = async (req: Request, res: Response) => {
  try {
    const { category, slug } = req.params;
    const test = await Test.findOne({ category, slug });
    if (!test) return res.status(404).json({ message: 'Test not found' });
    res.json({ test });
  } catch (err) {
    res.status(500).json({ message: 'Error retrieving test' });
  }
};

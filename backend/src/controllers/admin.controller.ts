import { Request, Response } from 'express';
import SubAdmin from '../models/SubAdmin';
import bcrypt from 'bcrypt';

// CREATE SUB-ADMIN
export const createSubAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, location } = req.body;

    if (!name || !email || !password || !location) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await SubAdmin.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subAdmin = await SubAdmin.create({
      name,
      email,
      password: hashedPassword,
      role: 'sub-admin',
      location,
    });

    res.status(201).json({
      message: 'Sub-admin created successfully',
      subAdmin: {
        id: subAdmin._id,
        name: subAdmin.name,
        email: subAdmin.email,
        location: subAdmin.location,
        role: subAdmin.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Sub-admin creation failed', error: (error as Error).message });
  }
};

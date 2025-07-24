import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const adminLogin = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const admin = await User.findOne({ email });
    if (!admin || (admin.role !== 'admin' && admin.role !== 'sub-admin')) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: admin._id, role: admin.role, location: admin.location },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        location: admin.location,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Admin login failed', error });
  }
};

export const createSubAdmin = async (req: Request, res: Response) => {
  try {
    const { name, email, password, location } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subAdmin = await User.create({
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
    res.status(500).json({ message: 'Sub-admin creation failed', error });
  }
};

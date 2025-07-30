import { Request, Response } from 'express';
import User from '../models/User.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { phone, password, name, email, hasWhatsapp, role = 'user', location } = req.body;

    // Check if user already exists with this phone number
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this phone number' 
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      phone,
      password: hashedPassword,
      name,
      email: email || undefined, // Store as undefined if not provided
      hasWhatsapp: hasWhatsapp || false,
      role,
      ...(role === 'sub-admin' && { location }) // Only include location for sub-admins
    });

    await newUser.save();

    // Return response without sensitive data
    const userResponse = {
      _id: newUser._id,
      phone: newUser.phone,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      hasWhatsapp: newUser.hasWhatsapp,
      ...(newUser.role === 'sub-admin' && { location: newUser.location }),
      createdAt: newUser.createdAt
    };

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });

  } catch (error: any) {
    console.error('Signup error:', error);
    
    // Handle duplicate email error
    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

    // Handle other errors
    return res.status(500).json({ 
      success: false,
      message: 'Internal server error',
      error: error.message 
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;
    console.log("Login Request Received: ", req.body);

    const user = await User.findOne({ phone });
    if (!user || user.role !== 'user') {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Incorrect password' });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
      token,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};

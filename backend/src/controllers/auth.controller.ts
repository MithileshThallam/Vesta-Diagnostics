import { Request, Response } from 'express';
import User from '../models/User.model';
import SubAdmin from '../models/SubAdmin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { phone, password, name, email, hasWhatsapp } = req.body;

    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this phone number' 
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      phone,
      password: hashedPassword,
      name,
      email: email || undefined,
      hasWhatsapp: hasWhatsapp || false,
      role: 'user'
    });

    await newUser.save();

    const userResponse = {
      _id: newUser._id,
      phone: newUser.phone,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      hasWhatsapp: newUser.hasWhatsapp,
      createdAt: newUser.createdAt
    };

    return res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: userResponse
    });

  } catch (error: any) {
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

    // Check hardcoded admin first
    const hardcodedAdmin = {
      phone: '9999999999',
      password: process.env.ADMIN_PASSWORD || 'admin@123',
      name: 'Super Admin',
      role: 'admin',
      _id: 'admin-id-001'
    };

    let user: any = null;
    let userType: 'admin' | 'sub-admin' | 'user' = 'user';

    if (phone === hardcodedAdmin.phone) {
      if (password !== hardcodedAdmin.password) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
      user = hardcodedAdmin;
      userType = 'admin';
    }

    // Check sub-admins
    if (!user) {
      user = await SubAdmin.findOne({ phone });
      if (user) userType = 'sub-admin';
    }

    // Check regular users
    if (!user) {
      user = await User.findOne({ phone });
      if (user) userType = 'user';
    }

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Verify password for non-admin users
    if (userType !== 'admin' && !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    const cookieName = userType === 'admin' ? 'AdminAuthToken' : 
                      userType === 'sub-admin' ? 'SubAdminAuthToken' : 'UserAuthToken';

    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
      path: '/',
    });

    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Login failed' });
  }
};

export const logout = (req: Request, res: Response) => {
  res.clearCookie('UserAuthToken', { path: '/' });
  res.clearCookie('SubAdminAuthToken', { path: '/' });
  res.clearCookie('AdminAuthToken', { path: '/' });

  return res.status(200).json({
    success: true,
    message: 'Logout successful',
  });
};

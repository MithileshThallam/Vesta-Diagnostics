import { Request, Response } from 'express';
import User from '../models/User.model';
import SubAdmin from '../models/SubAdmin';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const signup = async (req: Request, res: Response) => {
  try {
    const { phone, password, name, email, hasWhatsapp } = req.body;

    // Block any role tampering attempts
    const role = 'user';

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
      email: email || undefined,
      hasWhatsapp: hasWhatsapp || false,
      role
    });

    await newUser.save();

    // Prepare response data
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

    if (error.code === 11000 && error.keyPattern?.email) {
      return res.status(400).json({ 
        success: false,
        message: 'User already exists with this email' 
      });
    }

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

    let user: any = null;
    let userType: 'admin' | 'sub-admin' | 'user' = 'user';

    // ✅ Hardcoded admin check
    const hardcodedAdmin = {
      phone: '999-999-9999', // replace with actual phone number
      password: process.env.ADMIN_PASSWORD || 'admin@123', // can use env var
      name: 'Super Admin',
      role: 'admin',
      _id: 'admin-id-001'
    };

    if (phone === hardcodedAdmin.phone) {
      const isMatch = await bcrypt.compare(password, await bcrypt.hash(hardcodedAdmin.password, 10));
      if (!isMatch) {
        return res.status(400).json({ message: 'Incorrect password' });
      }
      user = hardcodedAdmin;
      userType = 'admin';
    }

    // 🔍 Check sub-admins
    if (!user) {
      user = await SubAdmin.findOne({ phone });
      if (user) userType = 'sub-admin';
    }

    // 🔍 Check regular users
    if (!user) {
      user = await User.findOne({ phone });
      if (user) userType = 'user';
    }

    // ❌ No match in any case
    if (!user) {
      return res.status(400).json({ message: 'No user exists with this phone number.' });
    }

    // ✅ Generate token
    const token = jwt.sign(
      { id: user._id, role: user.role, userType },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // 🔐 Set cookie name
    let cookieName = 'UserAuthToken';
    if (userType === 'admin') cookieName = 'AdminAuthToken';
    else if (userType === 'sub-admin') cookieName = 'SubAdminAuthToken';

    // 🍪 Set cookie
    res.cookie(cookieName, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });

    // ✅ Send response
    return res.status(200).json({
      message: 'Login successful',
      user: {
        id: user._id,
        name: user.name,
        phone: user.phone,
        role: user.role,
        userType,
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ message: 'Login failed', error });
  }
};

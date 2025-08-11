import { Request, Response } from 'express';
import SubAdmin from '../models/SubAdmin';
import bcrypt from 'bcrypt';
import User from '../models/User.model.js';
import Booking from '../models/Booking.model.js';
import Test from '../models/Test.model.js';
import mongoose from 'mongoose';


// CREATE SUB-ADMIN
export const createSubAdmin = async (req: Request, res: Response) => {
  try {
    const { phone, branch, password, role } = req.body;

    if (!phone || !branch || !password || !role) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    const existing = await SubAdmin.findOne({ phone });
    if (existing) {
      return res.status(400).json({ message: 'Phone number already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const subAdmin = await SubAdmin.create({
      phone,
      password: hashedPassword,
      role, // Now using the role from request instead of hardcoding
      branch,
    });

    res.status(201).json({
      message: 'Sub-admin created successfully',
      subAdmin: {
        id: subAdmin._id,
        phone: subAdmin.phone, // Changed from name to phone
        role: subAdmin.role,
        branch: subAdmin.branch, // Added branch
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Sub-admin creation failed', error: (error as Error).message });
  }
};

export const getAdminOverview = async (req: Request, res: Response) => {
  try {
    const now = new Date();
    const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Total counts
    const [userCount, subAdminCount, testCount, bookingCount] = await Promise.all([
      User.countDocuments(),
      SubAdmin.countDocuments(),
      Test.countDocuments(),
      Booking.countDocuments(),
    ]);

    // Last month additions
    const [newUsers, newSubAdmins, newTests, newBookings] = await Promise.all([
      User.countDocuments({ createdAt: { $gte: lastMonth } }),
      SubAdmin.countDocuments({ createdAt: { $gte: lastMonth } }),
      Test.countDocuments({ createdAt: { $gte: lastMonth } }),
      Booking.countDocuments({ createdAt: { $gte: lastMonth } }),
    ]);

    const calcPercent = (total: number, added: number): number =>
      total === 0 ? 0 : Math.round((added / total) * 100);

    return res.status(200).json({
      totalUsers: userCount,
      userGrowthPercent: calcPercent(userCount, newUsers),

      totalSubAdmins: subAdminCount,
      subAdminGrowth: newSubAdmins, // raw number

      totalBookings: bookingCount,
      bookingGrowthPercent: calcPercent(bookingCount, newBookings),

      totalTests: testCount,
      testGrowth: newTests, // raw number
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch admin overview',
      error: (err as Error).message,
    });
  }
};

//response 
// {
//   "totalUsers": 2,
//   "userGrowthPercent": 12,
//   "totalSubAdmins": 1,
//   "subAdminGrowth": 2,
//   "totalBookings": 2,
//   "bookingGrowthPercent": 8,
//   "totalTests": 25,
//   "testGrowth": 3
// }

export const getSystemStatus = async (req: Request, res: Response) => {
  try {
    // If this controller works, API is operational
    const system = 'online';
    const api = 'operational';

    // Check MongoDB connection status
    const dbState = mongoose.connection.readyState;
    let database: 'online' | 'disconnected' | 'connecting' | 'disconnecting';

    switch (dbState) {
      case 1:
        database = 'online';
        break;
      case 0:
        database = 'disconnected';
        break;
      case 2:
        database = 'connecting';
        break;
      case 3:
        database = 'disconnecting';
        break;
      default:
        database = 'disconnected';
    }

    // Stubbed value for now
    const paymentGateway = 'maintenance'; // or 'active'

    return res.status(200).json({
      system,
      database,
      api,
      paymentGateway
    });
  } catch (err) {
    return res.status(500).json({
      message: 'Failed to fetch system status',
      error: (err as Error).message,
    });
  }
};
//sample response for above
// {
//   "system": "online",
//   "database": "online",
//   "api": "operational",
//   "paymentGateway": "maintenance"
// }

import { Request, Response } from 'express';
import User from '../models/User.model.js';
import Admin from '../models/Admin.js';
import SubAdmin from '../models/SubAdmin.js';

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    const { id, role } = req.user as { id: string; role: string };

    let user;

    switch (role) {
      case 'user':
        user = await User.findById(id).select('_id name email phone role');
        break;
      case 'admin':
        user = await Admin.findById(id).select('_id name email phone role');
        break;
      case 'sub-admin':
        user = await SubAdmin.findById(id).select('_id name email phone role');
        break;
      default:
        return res.status(400).json({ message: 'Invalid role' });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.status(200).json({
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: 'Internal server error' });
  }
};

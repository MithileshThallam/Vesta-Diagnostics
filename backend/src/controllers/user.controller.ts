// import { Request, Response } from 'express';
// import User from '../models/User.model.js';
// import Admin from '../models/Admin.js';
// import SubAdmin from '../models/SubAdmin.js';

// export const getUserProfile = async (req: Request, res: Response) => {
//   try {
//     console.log("getUserProfile - req.user:", req.user);
    
//     if (!req.user || !req.user.id || !req.user.role) {
//       return res.status(401).json({ message: 'User information missing' });
//     }

//     const { id, role } = req.user as { id: string; role: string };

//     let user;

//     switch (role) {
//       case 'user':
//         user = await User.findById(id).select('_id name email phone role');
//         break;
//       case 'admin':
//         // For hardcoded admin, return the admin data directly
//         if (id === 'admin-id-001') {
//           user = {
//             _id: 'admin-id-001',
//             name: 'Super Admin',
//             email: 'admin@vesta.com',
//             phone: '9999999999',
//             role: 'admin'
//           };
//         } else {
//           user = await Admin.findById(id).select('_id name email phone role');
//         }
//         break;
//       case 'sub-admin':
//         user = await SubAdmin.findById(id).select('_id name email phone role');
//         break;
//       default:
//         return res.status(400).json({ message: 'Invalid role' });
//     }

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     return res.status(200).json({
//         id: user._id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//         role: user.role,
//     });
//   } catch (error) {
//     console.error('getUserProfile error:', error);
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

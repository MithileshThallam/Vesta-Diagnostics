import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'user' | 'admin' | 'sub-admin';
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.UserAuthToken || req.cookies.SubAdminAuthToken || req.cookies.AdminAuthToken;

    if (!token) {
      return res.status(401).json({ message: 'Authentication required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthRequest['user'];
    req.user = decoded;
    console.log("Got access from verifyToken and body is: ", req.body)
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export const requireRole = (allowedRoles: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }
    console.log("Got access from requireRole")
    next();
  };
};

export const requireAdmin = requireRole(['admin']);
export const requireSubAdmin = requireRole(['sub-admin']);
export const requireAdminOrSubAdmin = requireRole(['admin', 'sub-admin']);

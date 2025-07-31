import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role: 'user' | 'admin' | 'sub-admin';
    location?: string;
  };
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    // ✅ Check all possible auth cookies
    const token =
      req.cookies.AdminAuthToken ||
      req.cookies.SubAdminAuthToken ||
      req.cookies.UserAuthToken;

    if (!token) {
      return res.status(401).json({ message: 'Authentication token missing' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as AuthRequest['user'];

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};



export const isAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === 'admin') return next();
  return res.status(403).json({ message: 'Admin access only' });
};

export const isSubAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === 'sub-admin') return next();
  return res.status(403).json({ message: 'Sub-admin access only' });
};

export const isUser = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (req.user?.role === 'user') return next();
  return res.status(403).json({ message: 'User access only' });
};
export const isAdminOrSubAdmin = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  if (req.user?.role === 'admin' || req.user?.role === 'sub-admin') return next();
  return res.status(403).json({ message: 'Admin or Sub-admin access only' });
};

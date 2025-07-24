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
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization token missing' });
    }

    const token = authHeader.split(' ')[1];
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

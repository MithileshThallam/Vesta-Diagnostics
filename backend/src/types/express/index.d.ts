declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'user' | 'admin' | 'sub-admin';
        location?: string;
      };
      file?: Express.Multer.File; // ✅ Add this line to support req.file
    }
  }
}

export {};

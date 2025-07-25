declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: 'user' | 'admin' | 'sub-admin';
        location?: string;
      };
    }
  }
}

export {}; 

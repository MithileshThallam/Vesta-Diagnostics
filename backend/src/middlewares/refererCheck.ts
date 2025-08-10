import { Request, Response, NextFunction } from 'express';

export const checkReferer = (req: Request, res: Response, next: NextFunction) => {
  const referer = req.get('Referer');
  const userAgent = req.get('User-Agent');
  
  // Allow requests without referer (direct API calls from frontend)
  if (!referer) {
    return next();
  }
  
  // Check if referer is from our domain
  const allowedDomains = [
    'http://localhost:5173', // Development
    'http://localhost:3000', // Alternative dev port
    'https://yourdomain.com', // Production domain (replace with actual domain)
  ];
  
  const isAllowedDomain = allowedDomains.some(domain => 
    referer.startsWith(domain)
  );
  
  if (!isAllowedDomain) {
    console.log(`🚫 Blocked request from unauthorized referer: ${referer}`);
    return res.status(403).json({ 
      message: 'Access denied: Invalid referer' 
    });
  }
  
  next();
};

export const strictRefererCheck = (req: Request, res: Response, next: NextFunction) => {
  const referer = req.get('Referer');
  
  // For admin routes, we require a referer
  if (!referer) {
    console.log(`🚫 Blocked admin request without referer from IP: ${req.ip}`);
    return res.status(403).json({ 
      message: 'Access denied: Direct URL access not allowed' 
    });
  }
  
  // Check if referer is from our domain
  const allowedDomains = [
    'http://localhost:5173', // Development
    'http://localhost:3000', // Alternative dev port
    'https://yourdomain.com', // Production domain (replace with actual domain)
  ];
  
  const isAllowedDomain = allowedDomains.some(domain => 
    referer.startsWith(domain)
  );
  
  if (!isAllowedDomain) {
    console.log(`🚫 Blocked admin request from unauthorized referer: ${referer} from IP: ${req.ip}`);
    return res.status(403).json({ 
      message: 'Access denied: Invalid referer for admin route' 
    });
  }
  
  next();
};

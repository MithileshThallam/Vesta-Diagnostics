import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes';
import adminRoutes from './routes/admin.routes';
import bookingRoutes from './routes/bookings.routes';
import testRoutes from './routes/test.routes';
import detailsRoutes from './routes/details.routes'


dotenv.config();

// Connect to database with better error handling
const initializeApp = async () => {
  try {
    await connectDB();
    console.log('✅ Database connected successfully');
    
    const app = express();

    // Security Middleware
    app.use(helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          scriptSrc: ["'self'"],
          imgSrc: ["'self'", "data:", "https:"],
        },
      },
      crossOriginEmbedderPolicy: false,
    }));

    // Rate limiting for all routes
    const generalLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 10000, // limit each IP to 100 requests per windowMs
      message: 'Too many requests from this IP, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Stricter rate limiting for auth routes
    const authLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5000, // limit each IP to 5 requests per windowMs
      message: 'Too many authentication attempts, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Very strict rate limiting for admin routes
    const adminLimiter = rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 1000, // limit each IP to 10 requests per windowMs
      message: 'Too many admin requests, please try again later.',
      standardHeaders: true,
      legacyHeaders: false,
    });

    // Middleware
    app.use(cors({
      origin: process.env.FRONTEND_URL || 'http://localhost:5173', // Explicit origin
      credentials: true,
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(express.json());
    app.use(cookieParser());

    // Apply rate limiting
    app.use(generalLimiter);

    // Routes with specific rate limiting
    app.use('/api/auth', authLimiter, authRoutes);
    app.use('/api/admin', adminLimiter, adminRoutes);
    app.use('/api/bookings', bookingRoutes);
    app.use('/api/tests', testRoutes);
    app.use('/api/details', detailsRoutes);

    // Default route
    app.get('/', (_, res) => {
      res.send('API is running...');
    });

    // Health check route for Vercel
    app.get('/api/health', (_, res) => {
      res.status(200).json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
      });
    });

    const isProduction = process.env.NODE_ENV === 'production';

    // Start local server ONLY in development
    if (!isProduction) {
      const PORT = 5000;
      app.listen(PORT, () => {
        console.log(`Local server: http://localhost:${PORT}`);
      });
    }

    return app;
  } catch (error) {
    console.error('❌ Failed to initialize app:', error);
    throw error;
  }
};

// Initialize the app
const app = initializeApp().catch((error) => {
  console.error('❌ App initialization failed:', error);
  process.exit(1);
});

export default app;
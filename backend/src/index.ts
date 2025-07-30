import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

import authRoutes from './routes/auth.routes.js';
import adminRoutes from './routes/admin.routes.js';
import bookingRoutes from './routes/bookings.routes.js';
import testRoutes from './routes/test.routes.js';
import detailsRoutes from './routes/details.routes.js'


dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
}));
app.use(bodyParser.json());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/tests', testRoutes);
app.use('/api/details',detailsRoutes);


// Default route
app.get('/', (_, res) => {
  res.send('API is running...');
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});

// src/index.ts
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // ✅ use `.js` due to ESM

dotenv.config();
connectDB();

const app = express();

// Middleware to parse JSON
app.use(express.json());

// Sample route
app.get('/', (_req: Request, res: Response) => {
  res.send('🧪 Vesta Diagnostics API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

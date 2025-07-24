// src/routes/auth.routes.ts
import express from 'express';
import { signup, login } from '../controllers/auth.controller.js';
import { validateSignup, validateLogin } from '../middlewares/validateInput.js';

const router = express.Router();

router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

export default router;

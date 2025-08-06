import express from 'express';
import { signup, login ,logout} from '../controllers/auth.controller.js';
import { validateBody } from '../middlewares/validateInput.js';
import { signupSchema, loginSchema } from '../utils/validationSchema.js';

const router = express.Router();

// 📝 POST /api/auth/signup — Register user
router.post('/signup', validateBody(signupSchema), signup);

// 🔐 POST /api/auth/login — Login user
router.post('/login', validateBody(loginSchema), login);

router.post('/logout', logout);

export default router;

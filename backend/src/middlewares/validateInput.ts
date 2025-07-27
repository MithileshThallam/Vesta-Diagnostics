// src/middlewares/validateInput.ts
import { Request, Response, NextFunction } from 'express';
import { signupSchema, loginSchema, createAdminSchema } from '../utils/validationSchema.js';

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    schema.parse(req.body);
    next();
  } catch (err: any) {
    console.log("Error: ", err);
    return res.status(400).json({ errors: err.errors });
  }
};

export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);
export const validateAdminCreation = validate(createAdminSchema);

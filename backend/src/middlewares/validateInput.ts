// src/middlewares/validateInput.ts
import { Request, Response, NextFunction } from 'express';
import { signupSchema, loginSchema, createAdminSchema } from '../utils/validationSchema.js';

const validate = (schema: any) => (req: Request, res: Response, next: NextFunction) => {
  try {
    console.log("Login details received: ", req.body);
    schema.parse(req.body);
    console.log("Details validated");
    next();
  } catch (err: any) {
    console.log("Error: ", err);
    return res.status(400).json({ errors: err.errors });
  }
};

export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);
export const validateAdminCreation = validate(createAdminSchema);

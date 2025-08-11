// src/utils/validationSchemas.ts
import { z } from 'zod';


export const createBookingSchema = z.object({
  name: z.string().min(2).max(50),
  phone: z.string().min(10).max(15).regex(/^[0-9]+$/),
  location: z.string().min(3).max(100),
  date: z.string().regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
            .transform(str => new Date(str))
            .refine(date => date > new Date(), "Date must be in the future"),
  test: z.string().min(1).max(100)
});

export const signupSchema = z.object({
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number can't be longer than 15 digits")
    .regex(/^[0-9]+$/, "Phone number must contain only digits"),
  
  password: z.string()
    .min(6, "Password must be at least 6 characters"),

  name: z.string()
    .min(1, "Name is required"),

  hasWhatsapp: z.boolean()
    .default(false)
    .optional(),

  role: z.enum(['user', 'admin', 'sub-admin'])
    .default('user')
    .optional(),

  location: z.string()
    .optional()
}).refine(data => {
  // Only require location for sub-admins
  if (data.role === 'sub-admin') {
    return !!data.location;
  }
  return true;
}, {
  path: ["location"],
  message: "Location is required for sub-admins",
});

export const loginSchema = z.object({
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number cannot exceed 15 digits')
    .regex(/^[0-9]+$/, 'Phone number must contain only numbers'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createAdminSchema = z.object({
  phone: z.string().min(1, 'Phone is required'),
  role: z.string().min(1, 'Role is required'),
  branch: z.string().min(1, 'Branch is required'),
  password: z.string().min(6, 'Password must be at least 6 characters')
});

export const createTestSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['radiology', 'lab-test']),
  description: z.string().optional(),
  preparation: z.string().optional(),
});

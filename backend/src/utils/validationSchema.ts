// src/utils/validationSchemas.ts
import { z } from 'zod';


export const createBookingSchema = z.object({
  user: z.string().min(24, 'Invalid user ID').max(24), // MongoDB ObjectId
  test: z.string().min(1, 'Test type is required'), // No enum restriction
  date: z.coerce.date()
          .min(new Date(), 'Booking date must be in the future'),
  selectedLocation: z.string().min(1, 'Location is required')
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

  email: z.string()
    .email("Invalid email format")
    .optional(),

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
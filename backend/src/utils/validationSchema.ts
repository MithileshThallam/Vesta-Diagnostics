// src/utils/validationSchemas.ts
import { z } from 'zod';



export const createBookingSchema = z.object({
  tests: z.array(z.string()).min(1, 'At least one test must be selected'),
  selectedLocation: z.string().min(1, 'Location is required'),
  paymentMethod: z.string().min(1, 'Payment method is required'),
  paymentStatus: z.string().min(1, 'Payment status is required'),
  transactionId: z.string().optional(),
});


export const signupSchema = z.object({
  email: z.string().email("Invalid email format").optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  phone: z.string(),
  name: z.string(),
  hasWhatsApp: z.boolean(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Passwords do not match",
});

export const loginSchema = z.object({
 email: z.string().email('Invalid email'),
   password: z.string().min(6, 'Password must be at least 6 characters'),
});

export const createAdminSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  location: z.string().min(1, 'Location is required'),
});

export const createTestSchema = z.object({
  name: z.string().min(1),
  category: z.enum(['radiology', 'lab-test']),
  description: z.string().optional(),
  price: z.number().optional(),
  preparation: z.string().optional(),
});
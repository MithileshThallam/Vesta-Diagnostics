import { z } from 'zod';

// Define the schema for the form data
export const signupSchema = z.object({
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(10, 'Phone number cannot exceed 10 digits')
    .regex(/^\+?\d+$/, 'Phone number can only contain numbers and optional + prefix'),
  email: z.string()
    .email('Invalid email address')
    .optional()
    .or(z.literal('')),
  hasWhatsApp: z.boolean(),
  otp: z.string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP can only contain numbers'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username cannot exceed 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string()
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

// Type for TypeScript usage
export type SignupFormData = z.infer<typeof signupSchema>;

// Validation function
export const validateSignupForm = (data: Partial<SignupFormData>) => {
  try {
    // We use partial because we might validate at different steps
    const result = signupSchema.partial().safeParse(data);
    if (!result.success) {
      return {
        success: false,
        errors: result.error.flatten().fieldErrors
      };
    }
    return {
      success: true,
      data: result.data
    };
  } catch (error) {
    return {
      success: false,
      errors: { general: ['An unexpected error occurred'] }
    };
  }
};
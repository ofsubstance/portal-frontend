import { z } from 'zod';

export const signupValidation = z.object({
  // Step 1: Account Info
  email: z.string().email('Invalid email address').min(1, 'Email is required'),

  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(
      /[!@#$%^&*()]/,
      'Password must contain at least one special character'
    ),

  emailTermsConsent: z
    .boolean()
    .refine(
      (val) => val === true,
      'You must accept Terms of Use and Privacy Policy'
    ),
  smsConsent: z.boolean().optional(),

  firstname: z.string().min(1, 'First Name is required'),
  lastname: z.string().min(1, 'Last Name is required'),
  phone: z.string().optional(),

  profile: z.object({
    businessName: z.string().optional(),
    website: z.string().optional(),
    stateRegion: z.string().min(1, 'State/Region is required'),
    country: z.string().min(1, 'Country is required'),

    utilizationPurpose: z
      .string()
      .min(1, 'Please select how you will utilize the content'),

    interests: z.string().array().optional().default([]),
  }),
});

export const signinValidation = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
  password: z.string().min(6, { message: 'Invalid password' }),
  remember: z.boolean().optional(),
});

export const forgotPasswordValidation = z.object({
  email: z.string().email({ message: 'Invalid email.' }),
});

export const resetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(8, 'Password must be at least 8 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(
        /[!@#$%^&*()]/,
        'Password must contain at least one special character'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match.',
    path: ['confirmPassword'],
  });

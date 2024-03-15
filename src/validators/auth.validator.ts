import { z } from "zod";

export const signupValidation = z
  .object({
    name: z.string().min(1, { message: "Name is required." }),
    email: z.string().email({ message: "Invalid email." }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

export const signinValidation = z.object({
  email: z.string().email({ message: "Invalid email." }),
  password: z.string().min(6, { message: "Invalid password" }),
  remember: z.boolean().optional(),
});

export const forgotPasswordValidation = z.object({
  email: z.string().email({ message: "Invalid email." }),
});

export const resetPasswordValidation = z
  .object({
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters long." }),
    confirmPassword: z.string().optional(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match.",
    path: ["confirmPassword"],
  });

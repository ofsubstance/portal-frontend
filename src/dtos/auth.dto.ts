import {
  forgotPasswordValidation,
  resetPasswordValidation,
  signinValidation,
  signupValidation,
} from "@/validators/auth.validator";

import { z } from "zod";

export type SigninReq = z.infer<typeof signinValidation>;

export type SignupReq = z.infer<typeof signupValidation>;
export type ForgotPasswordReq = z.infer<typeof forgotPasswordValidation>;

export type ResetPasswordReq = z.infer<typeof resetPasswordValidation>;
export interface SigninRes {
  accessToken: string;
  refreshToken: string;
  user: {
    id: string;
    name: string;
    email: string;
    role: string;
  };
}

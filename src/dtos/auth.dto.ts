import {
  forgotPasswordValidation,
  resetPasswordValidation,
  signinValidation,
  signupValidation,
} from '@/validators/auth.validator';

import { z } from 'zod';
import { UserDto } from './user.dto';

export type SigninReq = z.infer<typeof signinValidation>;

export type SignupReq = z.infer<typeof signupValidation>;

export type ForgotPasswordReq = z.infer<typeof forgotPasswordValidation>;

export type ResetPasswordReq = z.infer<typeof resetPasswordValidation>;

export interface SigninRes {
  accessToken: string;
  refreshToken: string;
  user: UserDto;
  sessionId: string;
}

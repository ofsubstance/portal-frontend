export interface SigninReq {
  email: string;
  password: string;
  remember?: boolean;
}

export interface SignupReq {
  email: string;
  name: string;
  password: string;
  confirmPassword?: string;
}

export interface ForgotPasswordReq {
  email: string;
}

export interface ResetPasswordReq {
  password: string;
  confirmPassword?: string;
}

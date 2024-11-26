import { ResetPasswordReq } from '@/dtos/auth.dto';
import authService from '../services/auth.service';
import { useMutation } from '@tanstack/react-query';

function useAuthAction() {
  const signinMutation = useMutation({
    mutationFn: authService.signin,
  });

  const signupMutation = useMutation({
    mutationFn: authService.signup,
  });

  const resendVerificationMutation = useMutation({
    mutationFn: authService.resendVerification,
  });

  const verifyEmail = useMutation({
    mutationFn: authService.verifyEmail,
  });

  const signoutMutation = useMutation({
    mutationFn: authService.signout,
  });

  const googleSigninMutation = useMutation({
    mutationFn: authService.googleSignin,
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async ({
      resetToken,
      data,
    }: {
      resetToken: string;
      data: ResetPasswordReq;
    }) => await authService.resetPassword(resetToken, data),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: authService.forgotPassword,
  });

  return {
    signinMutation,
    signupMutation,
    resendVerificationMutation,
    verifyEmail,
    googleSigninMutation,
    signoutMutation,
    resetPasswordMutation,
    forgotPasswordMutation,
  };
}

export default useAuthAction;

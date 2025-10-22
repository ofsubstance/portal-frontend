import { useNavigate, useSearchParams } from 'react-router-dom';

import AppLogo from '@/components/common/logo/AppLogo';
import { Button, Typography } from '@mui/material';
import PasswordField from '@/components/common/input/PasswordField';
import { ResetPasswordReq } from '@/dtos/auth.dto';
import resetPasswordImage from '@/assets/resetPassword.svg';
import { resetPasswordValidation } from '@/validators/auth.validator';
import { toast } from 'react-toastify';
import useAuthAction from '@/hooks/useAuthAction';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

function ResetPasswordPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { resetPasswordMutation } = useAuthAction();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordReq>({
    resolver: zodResolver(resetPasswordValidation),
  });

  const onSubmit = (data: ResetPasswordReq) => {
    resetPasswordMutation.mutate(
      {
        data,
        resetToken: searchParams.get('token') || '',
      },
      {
        onSuccess: () => {
          toast.success('Password reset successful! You can now log in with your new password.');
          navigate('/signin', { replace: true });
        },
        onError: (error) => {
          toast.error(error.message || 'Password reset failed. Please try again or request a new reset link.');
        },
      }
    );
  };

  return (
    <main className="flex flex-col gap-6 items-center justify-center p-8">
      <AppLogo />
      <object
        type="image/svg+xml"
        data={resetPasswordImage}
        className="max-h-80"
      />
      <h2 className="text-2xl">Reset your password</h2>
      <h3 className="text-lg opacity-70 max-w-2xl text-center">
        Create a new strong password for your account. Make sure it's something
        you can remember, or save it in a secure place
      </h3>

      <form
        className="flex flex-col gap-5 max-w-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="mb-2">
          <Typography variant="body2" color="text.secondary" className="mb-2">
            Your password must include:
          </Typography>
          <ul className="list-disc pl-5 text-sm text-gray-600">
            <li>At least 8 characters</li>
            <li>At least one uppercase letter (A-Z)</li>
            <li>At least one lowercase letter (a-z)</li>
            <li>At least one number (0-9)</li>
            <li>At least one special character (!@#$%^&*())</li>
          </ul>
        </div>

        <PasswordField
          {...register('password')}
          label="New Password"
          variant="outlined"
          fullWidth
          error={!!errors.password}
          helperText={errors?.password?.message}
          placeholder="Enter a strong password"
        />

        <PasswordField
          {...register('confirmPassword')}
          label="Confirm New Password"
          variant="outlined"
          fullWidth
          error={!!errors.confirmPassword}
          helperText={errors?.confirmPassword?.message}
          placeholder="Re-enter your password"
        />

        <Button
          type="submit"
          variant="contained"
          size="large"
          disabled={resetPasswordMutation.isPending}
        >
          {resetPasswordMutation.isPending ? 'Changing Password...' : 'Change Password'}
        </Button>
      </form>
    </main>
  );
}

export default ResetPasswordPage;

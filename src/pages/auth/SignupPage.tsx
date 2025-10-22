import { Button, Typography } from '@mui/material';

import AppLogo from '@/components/common/logo/AppLogo';
import { Link } from 'react-router-dom';
import { SignupForm } from '@/components/auth/SignupForm';
import { SignupReq } from '@/dtos/auth.dto';
import { toast } from 'react-toastify';
import useAuthAction from '@/hooks/useAuthAction';
import { useAuth } from '@/hooks/useAuth';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '@/contexts/AuthContextProvider';

function SignupPage() {
  const { signupMutation, resendVerificationMutation } = useAuthAction();
  const [signupSuccess, setSignupSuccess] = useState(false);
  const { authenticated } = useContext(AuthContext);
  const { redirectBasedOnRole } = useAuth();

  const onSignup = (data: SignupReq) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        localStorage.setItem('email', data.email);
        setSignupSuccess(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const onResendVerification = () => {
    const email = localStorage.getItem('email');

    if (!email) return toast.error('Email not found');

    resendVerificationMutation.mutate(
      { email },
      {
        onSuccess: () => {
          toast.success('Verification email sent successfully');
        },
      }
    );
  };

  useEffect(() => {
    if (authenticated) {
      redirectBasedOnRole();
    }
  }, [authenticated, redirectBasedOnRole]);

  return (
    <main className="flex">
      <section className="flex flex-col p-5 gap-8 items-center justify-center flex-1 min-h-screen">
        <AppLogo />

        {signupSuccess ? (
          <div className="flex flex-col items-center justify-center gap-6 text-center">
            <Typography variant="h5" fontWeight={500} color="black">
              Sign Up Successful!
            </Typography>
            <Typography variant="body1" className="max-w-md">
              Please check your email to verify your account and get access. If
              you don't see the email in your inbox, please check your spam
              folder.
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              className="mt-4"
              onClick={onResendVerification}
            >
              Resend Confirmation Email
            </Button>
            <Typography textAlign={'center'}>
              Start your journey with us{' '}
              <Typography
                fontWeight={600}
                color={'primary'}
                component={Link}
                to="/signin"
              >
                Sign In
              </Typography>
            </Typography>
          </div>
        ) : (
          <div className="w-5/6 md:w-4/6 flex flex-col gap-5">
            <h1 className="text-2xl font-semibold text-gray-600 text-center">
              Create an ALL ACCESS Account to watch all our films for FREE now
            </h1>
            <SignupForm
              onSubmit={onSignup}
              isLoading={signupMutation.isPending}
            />

            <Typography textAlign={'center'}>
              Already have an account?{' '}
              <Typography
                fontWeight={600}
                color={'primary'}
                component={Link}
                to="/signin"
              >
                Sign In
              </Typography>
            </Typography>
          </div>
        )}
      </section>
    </main>
  );
}

export default SignupPage;

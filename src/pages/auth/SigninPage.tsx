import { Button, Divider, Typography, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import { TokenResponse, useGoogleLogin } from '@react-oauth/google';
import { useContext, useEffect } from 'react';

import AppLogo from '@/components/common/logo/AppLogo';
import { AuthContext } from '@/contexts/AuthContextProvider';
import { FcGoogle as GoogleIcon } from 'react-icons/fc';
import SigninForm from '@/components/auth/SigninForm';
import { SigninReq } from '@/dtos/auth.dto';
import useAuthAction from '@/hooks/useAuthAction';
import { useAuth } from '@/hooks/useAuth';

// Import a default poster image - you should replace this with your actual poster image
import posterImage from '@/assets/userManagement.svg';

function SigninPage() {
  const { authenticated, setAuthenticated } = useContext(AuthContext);
  const { signinMutation, googleSigninMutation } = useAuthAction();
  const { redirectBasedOnRole } = useAuth();

  const onSignin = (data: SigninReq) =>
    signinMutation.mutate(data, {
      onSuccess: () => {
        setAuthenticated(true);
      },
    });

  const onGoogleSignin = useGoogleLogin({
    onSuccess: (data: TokenResponse) => {
      googleSigninMutation.mutate(data.access_token, {
        onSuccess: () => {
          setAuthenticated(true);
        },
      });
    },
  });

  useEffect(() => {
    if (authenticated) {
      redirectBasedOnRole();
    }
  }, [authenticated, redirectBasedOnRole]);

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex flex-col items-center mb-6">
            <div className="mb-2">
              <AppLogo />
            </div>
            <Typography
              variant="h5"
              color="primary"
              fontWeight={600}
              className="text-center"
            >
              Welcome Back
            </Typography>
            <Typography
              variant="body2"
              color="textSecondary"
              className="text-center"
            >
              Sign in to continue to your account
            </Typography>
          </div>

          <Paper elevation={2} className="p-6 rounded-lg">
            <Button
              variant="outlined"
              size="medium"
              color="inherit"
              fullWidth
              startIcon={<GoogleIcon size={20} />}
              onClick={() => onGoogleSignin()}
              className="mb-4"
              sx={{ py: 1.5 }}
            >
              Continue with Google
            </Button>

            <div className="relative my-4">
              <Divider>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  className="px-2 bg-white"
                >
                  OR
                </Typography>
              </Divider>
            </div>

            <SigninForm onSubmit={onSignin} />
          </Paper>

          <Typography variant="body2" className="text-center mt-4">
            Don't have an account?{' '}
            <Typography
              component={Link}
              to="/signup"
              color="primary"
              fontWeight={600}
              variant="body2"
              className="hover:underline"
            >
              Sign Up
            </Typography>
          </Typography>
        </div>
      </div>

      {/* Right side - Poster */}
      <div className="hidden lg:flex w-1/2 bg-gray-50">
        <div className="w-full h-full flex flex-col items-center justify-center p-8">
          <img
            src={posterImage}
            alt="Welcome"
            className="w-full max-w-xl object-contain"
          />
        </div>
      </div>
    </div>
  );
}

export default SigninPage;

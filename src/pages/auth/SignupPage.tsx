import { Button, Typography } from "@mui/material";
import { useContext, useState } from "react";

import AppLogo from "@/components/common/logo/AppLogo";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { Link } from "react-router-dom";
import { SignupForm } from "@/components/auth/SignupForm";
import { SignupReq } from "@/dtos/auth.dto";
import { toast } from "react-toastify";
import useAuthAction from "@/hooks/useAuthAction";

function SignupPage() {
  const { setIsAuthenticated } = useContext(AuthContext);
  const { signupMutation, resendVerificationMutation } = useAuthAction();
  const [signupSuccess, setSignupSuccess] = useState(false);

  const onSignup = (data: SignupReq) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        localStorage.setItem("email", data.email);
        setIsAuthenticated(true);
        setSignupSuccess(true);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    });
  };

  const onResendVerification = () => {
    const email = localStorage.getItem("email");

    if (!email) {
      return;
    }
    resendVerificationMutation.mutate(
      { email: email },
      {
        onSuccess: () => {
          toast.success("Verification email sent successfully");
        },
      }
    );
  };

  return (
    <main className="flex">
      <section className="flex flex-col p-5 gap-8 items-center justify-center flex-1 min-h-screen">
        <AppLogo />

        {signupSuccess ? (
          <div className="flex flex-col items-center gap-4">
            <Typography
              variant="h5"
              align="center"
              fontWeight="bold"
              className="text-gray-800"
            >
              Sign Up Successful!
            </Typography>
            <Typography
              variant="body1"
              align="center"
              color="textSecondary"
              className="max-w-md"
            >
              Please check your email to verify your account and get access. If
              you don't see the email in your inbox, please check your spam
              folder.
            </Typography>

            <Button
              variant="outlined"
              color="primary"
              component={Link}
              to="/signin"
              className="mt-4"
              onClick={onResendVerification}
            >
              Resend Confirmation Email
            </Button>
            <Typography textAlign={"center"}>
              Start your journey with us{" "}
              <Typography
                fontWeight={600}
                color={"primary"}
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
            <SignupForm onSubmit={onSignup} />

            <Typography textAlign={"center"}>
              Already have an account?{" "}
              <Typography
                fontWeight={600}
                color={"primary"}
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

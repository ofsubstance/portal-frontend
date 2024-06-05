import { Button, Divider, Typography } from "@mui/material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import signupImage from "@/assets/signup.svg";
import SignupForm from "@/components/auth/SignupForm";
import AppLogo from "@/components/common/logo/AppLogo";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { SignupReq } from "@/dtos/auth.dto";
import useAuthAction from "@/hooks/useAuthAction";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

function SignupPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { signupMutation, googleSigninMutation } = useAuthAction();

  const onSignup = (data: SignupReq) => {
    signupMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
      },
    });
  };

  const onGoogleSignin = useGoogleLogin({
    onSuccess: (data: TokenResponse) => {
      googleSigninMutation.mutate(data.access_token, {
        onSuccess: () => {
          setIsAuthenticated(true);
        },
      });
    },
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <main className="flex">
      <section className="flex-1 p-4 min-h-screen bg-slate-50 border-x border-divider lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signupImage} className="w-3/4" />
      </section>
      <section className="flex flex-col px-6 py-20 gap-10 items-center justify-center flex-1 min-h-screen">
        <AppLogo />

        <h1 className="text-4xl font-semibold">Hello New User!</h1>

        <div className="w-5/6 md:w-4/6 flex flex-col gap-5">
          <Button
            variant="outlined"
            size="large"
            color="ghost"
            startIcon={<GoogleIcon />}
            onClick={() => onGoogleSignin()}
          >
            Continue with Google
          </Button>

          <Divider>OR</Divider>

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
      </section>
    </main>
  );
}

export default SignupPage;

import { Button, Divider, Typography } from "@mui/material";
import { TokenResponse, useGoogleLogin } from "@react-oauth/google";
import { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import signinImage from "@/assets/signin.svg";
import SigninForm from "@/components/auth/SigninForm";
import AppLogo from "@/components/common/logo/AppLogo";
import { AuthContext } from "@/contexts/AuthContextProvider";
import { SigninReq } from "@/dtos/auth.dto";
import useAuthAction from "@/hooks/useAuthAction";
import { FcGoogle as GoogleIcon } from "react-icons/fc";

function SigninPage() {
  const navigate = useNavigate();
  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);
  const { signinMutation, googleSigninMutation } = useAuthAction();

  const onSignin = (data: SigninReq) =>
    signinMutation.mutate(data, {
      onSuccess: () => {
        setIsAuthenticated(true);
      },
    });

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
      <section className="flex flex-col px-6 py-20 gap-10 items-center justify-center flex-1 min-h-screen ">
        <AppLogo />

        <h1 className="text-4xl font-semibold">Hello! Welcome Back.</h1>

        <div className="w-5/6 md:w-4/6 flex flex-col gap-5">
          <Button
            variant="outlined"
            size="large"
            color="ghost"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => onGoogleSignin()}
          >
            Continue with Google
          </Button>

          <Divider>OR</Divider>

          <SigninForm onSubmit={onSignin} />

          <Typography textAlign={"center"}>
            Don't have an account?{" "}
            <Typography
              fontWeight={600}
              color={"primary"}
              component={Link}
              to="/signup"
            >
              Sign Up
            </Typography>
          </Typography>
        </div>
      </section>
      <section className="flex-[1.5] p-4 min-h-screen bg-slate-50 border-x border-slate-200 lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signinImage} className="w-3/4" />
      </section>
    </main>
  );
}

export default SigninPage;

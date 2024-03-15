import AppLogo from "../components/common/logo/AppLogo";
import { Link } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import { SignupReq } from "@/dtos/auth.dto";
import { Typography } from "@mui/material";
import signupImage from "../assets/signup.svg";

function SignupPage() {
  const onSignup = (data: SignupReq) => {
    console.log(data);
  };

  return (
    <main className="flex">
      <section className="flex-1 p-4 min-h-screen bg-slate-50 dark:bg-paper border-x border-divider lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signupImage} className="w-3/4" />
      </section>
      <section className="flex flex-col px-6 py-20 gap-5 items-center justify-center flex-1 min-h-screen">
        <AppLogo />
        <h1 className="text-center text-4xl font-bold">Hello New User!</h1>
        <Typography className="text-center">
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

        <div className="w-5/6 md:w-4/6 mt-5">
          <SignupForm onSubmit={onSignup} />
        </div>
      </section>
    </main>
  );
}

export default SignupPage;

import AppLogo from "../components/common/logo/AppLogo";
import { Link } from "react-router-dom";
import SigninForm from "../components/auth/SigninForm";
import { SigninReq } from "@/dtos/auth.dto";
import { Typography } from "@mui/material";
import signinImage from "../assets/signin.svg";

function SigninPage() {
  const onSignin = (data: SigninReq) => {
    console.log(data);
  };

  return (
    <main className="flex">
      <section className="flex flex-col px-6 py-20 gap-5 items-center justify-center flex-1 min-h-screen ">
        <AppLogo />
        <h1 className="text-center text-4xl font-bold">Welcome Back!</h1>
        <Typography className="text-center">
          New Here?{" "}
          <Typography
            fontWeight={600}
            color={"primary"}
            component={Link}
            to="/signup"
          >
            Create an account
          </Typography>
        </Typography>

        <div className="w-5/6 md:w-4/6 mt-5">
          <SigninForm onSubmit={onSignin} />
        </div>
      </section>
      <section className="flex-[1.5] p-4 min-h-screen bg-slate-50 border-x border-slate-200 lg:flex items-center justify-center hidden ">
        <object type="image/svg+xml" data={signinImage} className="w-3/4" />
      </section>
    </main>
  );
}

export default SigninPage;

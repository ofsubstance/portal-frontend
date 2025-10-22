import { Button, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

import AppLogo from "@/components/common/logo/AppLogo";
import { ForgotPasswordReq } from "@/dtos/auth.dto";
import forgotPasswordImage from "@/assets/forgotPassword.svg";
import { forgotPasswordValidation } from "@/validators/auth.validator";
import { toast } from "react-toastify";
import useAuthAction from "@/hooks/useAuthAction";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { forgotPasswordMutation } = useAuthAction();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ForgotPasswordReq>({
    resolver: zodResolver(forgotPasswordValidation),
  });

  const onSubmit = (data: ForgotPasswordReq) => {
    forgotPasswordMutation.mutate(data, {
      onSuccess: () => {
        toast.success("A recovery email has been sent to your email address");
        navigate(-1);
      },
    });
  };

  return (
    <main className="flex flex-col gap-6 items-center justify-center p-8">
      <AppLogo />
      <object
        type="image/svg+xml"
        data={forgotPasswordImage}
        className="max-h-80"
      />
      <h2 className="text-2xl">Forgot your password?</h2>
      <h3 className="text-lg opacity-70 max-w-2xl text-center">
        Don't worry, it happens to the best of us. Just enter your email address
        below and we'll send you a recovery link
      </h3>

      <form
        className="flex flex-col gap-5 max-w-lg w-full"
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          {...register("email")}
          type="email"
          label="Email"
          variant="outlined"
          fullWidth
          error={!!errors.email}
          helperText={errors?.email?.message}
        />

        <Button
          variant="contained"
          size="large"
          type="submit"
          disabled={forgotPasswordMutation.isPending}
        >
          {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Recovery Email'}
        </Button>

        <Typography className="text-center">
          Remember your password?{" "}
          <Typography
            fontWeight={600}
            color={"primary"}
            component={Link}
            to="/signin"
          >
            Sign In
          </Typography>
        </Typography>
      </form>
    </main>
  );
}

export default ForgotPasswordPage;

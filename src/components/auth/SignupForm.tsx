import { Button, TextField } from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import PasswordField from "@/components/common/input/PasswordField";
import { SignupReq } from "@/dtos/auth.dto";
import { signupValidation } from "@/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignupFormProps {
  onSubmit: SubmitHandler<SignupReq>;
}

function SignupForm({ onSubmit }: SignupFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupReq>({
    resolver: zodResolver(signupValidation),
  });

  return (
    <form
      data-testid="signup-form"
      className="flex flex-col gap-5 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register("name")}
        type="text"
        label="Name"
        variant="outlined"
        fullWidth
        error={!!errors.name}
        helperText={errors?.name?.message}
      />

      <TextField
        {...register("email")}
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
        error={!!errors.email}
        helperText={errors?.email?.message}
      />

      <PasswordField
        {...register("password")}
        label="Password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors?.password?.message}
      />

      <PasswordField
        {...register("confirmPassword")}
        label="Confirm Password"
        variant="outlined"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors?.confirmPassword?.message}
      />

      <Button type="submit" variant="contained" size="large">
        Create Account
      </Button>
    </form>
  );
}

export default SignupForm;

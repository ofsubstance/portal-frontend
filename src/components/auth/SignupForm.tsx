import { Button, IconButton, TextField } from "@mui/material";
import {
  RiEyeCloseLine as InvisibleIcon,
  RiEyeLine as VisibleIcon,
} from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";

import { SignupReq } from "@/dtos/auth.dto";
import { signupValidation } from "@/validators/auth.validator";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface SignupFormProps {
  onSubmit: SubmitHandler<SignupReq>;
}

function SignupForm({ onSubmit }: SignupFormProps) {
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
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

      <TextField
        {...register("password")}
        type={showPassword.password ? "text" : "password"}
        label="Password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors?.password?.message}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  password: !prev.password,
                }))
              }
            >
              {showPassword.password ? <InvisibleIcon /> : <VisibleIcon />}
            </IconButton>
          ),
        }}
      />

      <TextField
        {...register("confirmPassword")}
        type={showPassword.confirmPassword ? "text" : "password"}
        label="Confirm Password"
        variant="outlined"
        fullWidth
        error={!!errors.confirmPassword}
        helperText={errors?.confirmPassword?.message}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={() =>
                setShowPassword((prev) => ({
                  ...prev,
                  confirmPassword: !prev.confirmPassword,
                }))
              }
            >
              {showPassword.confirmPassword ? (
                <InvisibleIcon />
              ) : (
                <VisibleIcon />
              )}
            </IconButton>
          ),
        }}
      />

      <Button type="submit" variant="contained" size="large">
        Create Account
      </Button>
    </form>
  );
}

export default SignupForm;

import {
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  RiEyeCloseLine as InvisibleIcon,
  RiEyeLine as VisibleIcon,
} from "react-icons/ri";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import { SigninReq } from "@/dtos/auth.dto";
import { signinValidation } from "@/validators/auth.validator";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface SigninFormProps {
  onSubmit: SubmitHandler<SigninReq>;
}

function SigninForm({ onSubmit }: SigninFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninReq>({ resolver: zodResolver(signinValidation) });

  return (
    <form
      data-testid="signin-form"
      className="flex flex-col gap-5 w-full"
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

      <TextField
        {...register("password")}
        type={showPassword ? "text" : "password"}
        label="Password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors?.password?.message}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword((prev) => !prev)}>
              {showPassword ? <InvisibleIcon /> : <VisibleIcon />}
            </IconButton>
          ),
        }}
      />

      <div className="flex flex-col sm:items-center sm:flex-row justify-between gap-4">
        <FormControlLabel
          control={<Checkbox {...register("remember")} />}
          label="Keep me signed in"
        />

        <Typography
          fontWeight={600}
          color={"primary"}
          component={Link}
          to="/forgot-password"
        >
          Forgot Password?
        </Typography>
      </div>

      <Button type="submit" variant="contained" size="large">
        Sign In
      </Button>
    </form>
  );
}

export default SigninForm;

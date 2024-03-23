import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
} from "@mui/material";
import { SubmitHandler, useForm } from "react-hook-form";

import { Link } from "react-router-dom";
import PasswordField from "@/components/common/input/PasswordField";
import { SigninReq } from "@/dtos/auth.dto";
import { signinValidation } from "@/validators/auth.validator";
import { zodResolver } from "@hookform/resolvers/zod";

interface SigninFormProps {
  onSubmit: SubmitHandler<SigninReq>;
}

function SigninForm({ onSubmit }: SigninFormProps) {
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

      <PasswordField
        {...register("password")}
        label="Password"
        variant="outlined"
        fullWidth
        error={!!errors.password}
        helperText={errors?.password?.message}
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

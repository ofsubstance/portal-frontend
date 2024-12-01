import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  TextField,
} from "@mui/material";

import { SignupReq } from "@/dtos/auth.dto";
import { useFormContext } from "react-hook-form";

export default function SignupStep1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupReq>();

  return (
    <div className="flex flex-col gap-4">
      <TextField
        {...register("email")}
        fullWidth
        label="Business Email*"
        variant="outlined"
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        {...register("password")}
        fullWidth
        type="password"
        label="Password*"
        variant="outlined"
        error={!!errors.password}
        helperText={errors.password?.message}
      />

      <TextField
        {...register("phone")}
        fullWidth
        label="Mobile Phone"
        variant="outlined"
      />

      <FormControlLabel
        control={<Checkbox {...register("smsConsent")} />}
        label="I agree to receive occasional promotional messages from Of Substance via SMS. Message and data rates may apply. Reply STOP to opt out."
      />

      <FormControl error={!!errors.emailTermsConsent}>
        <FormControlLabel
          control={<Checkbox {...register("emailTermsConsent")} required />}
          label="I agree to receive emails from Of Substance and accept the Terms of Use and Privacy Policy"
        />
        {errors.emailTermsConsent && (
          <FormHelperText color="error">
            {errors.emailTermsConsent.message}
          </FormHelperText>
        )}
      </FormControl>
    </div>
  );
}

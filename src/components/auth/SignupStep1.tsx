import {
  Grid,
  TextField,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { SignupFormData } from './SignupForm'; // Adjust import path

export const Step1 = ({
  register,
  errors,
  watch,
  getValues,
  setValue,
}: {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  watch: (field: keyof SignupFormData) => boolean;
  getValues: UseFormGetValues<SignupFormData>;
  setValue: UseFormSetValue<SignupFormData>;
}) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          {...register('email')}
          fullWidth
          label="Business Email*"
          variant="outlined"
          error={!!errors.email}
          helperText={errors.email?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register('password')}
          fullWidth
          type="password"
          label="Password*"
          variant="outlined"
          error={!!errors.password}
          helperText={errors.password?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <TextField
          {...register('phone')}
          fullWidth
          label="Mobile Phone"
          variant="outlined"
          error={!!errors.phone}
          helperText={errors.phone?.message}
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              {...register('smsConsent')}
              checked={watch('smsConsent')}
              color="primary"
              onClick={() => setValue('smsConsent', !getValues('smsConsent'))}
            />
          }
          label="I agree to receive occasional promotional messages from Of Substance via SMS. Message and data rates may apply. Reply STOP to opt out."
        />
      </Grid>
      <Grid item xs={12}>
        <FormControlLabel
          control={
            <Checkbox
              {...register('emailTermsConsent')}
              checked={getValues('emailTermsConsent')}
              color="primary"
              required
            />
          }
          label="I agree to receive emails from Of Substance and accept the Terms of Use and Privacy Policy"
        />
        {errors.emailTermsConsent && (
          <Typography color="error" variant="caption">
            {errors.emailTermsConsent.message}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

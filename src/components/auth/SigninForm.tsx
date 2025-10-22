import {
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  InputAdornment,
} from '@mui/material';
import { SubmitHandler, useForm } from 'react-hook-form';

import { Link } from 'react-router-dom';
import PasswordField from '@/components/common/input/PasswordField';
import { SigninReq } from '@/dtos/auth.dto';
import { signinValidation } from '@/validators/auth.validator';
import { zodResolver } from '@hookform/resolvers/zod';
import EmailIcon from '@mui/icons-material/Email';

interface SigninFormProps {
  onSubmit: SubmitHandler<SigninReq>;
  isLoading?: boolean;
}

function SigninForm({ onSubmit, isLoading = false }: SigninFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SigninReq>({ resolver: zodResolver(signinValidation) });

  return (
    <form
      data-testid="signin-form"
      className="flex flex-col gap-4 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <TextField
        {...register('email')}
        type="email"
        label="Email"
        variant="outlined"
        fullWidth
        placeholder="your.email@example.com"
        error={!!errors.email}
        helperText={errors?.email?.message}
        size="small"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="action" fontSize="small" />
            </InputAdornment>
          ),
        }}
      />

      <PasswordField
        {...register('password')}
        label="Password"
        variant="outlined"
        fullWidth
        placeholder="Enter your password"
        error={!!errors.password}
        helperText={
          errors?.password?.message ||
          'Must include uppercase, lowercase, number, and special character'
        }
        size="small"
      />

      <div className="flex items-center justify-between gap-2">
        <FormControlLabel
          control={
            <Checkbox {...register('remember')} color="primary" size="small" />
          }
          label={
            <Typography variant="body2" fontSize="0.8rem">
              Keep me signed in
            </Typography>
          }
        />

        <Typography
          fontWeight={600}
          color="primary"
          component={Link}
          to="/forgot-password"
          variant="body2"
          fontSize="0.8rem"
          className="hover:underline"
        >
          Forgot Password?
        </Typography>
      </div>

      <Button
        type="submit"
        variant="contained"
        size="medium"
        className="mt-2"
        sx={{ py: 1 }}
        disabled={isLoading}
      >
        {isLoading ? 'Signing In...' : 'Sign In'}
      </Button>
    </form>
  );
}

export default SigninForm;

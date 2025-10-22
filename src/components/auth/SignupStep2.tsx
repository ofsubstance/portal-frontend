import {
  TextField,
  InputAdornment,
  IconButton,
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Link,
  FormHelperText,
  FormControl,
} from '@mui/material';
import { SignupReq } from '@/dtos/auth.dto';
import { useFormContext } from 'react-hook-form';
import { useState } from 'react';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';

export default function SignupStep2() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupReq>();

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box className="flex flex-col gap-4 sm:gap-6 max-w-md mx-auto">
      <div className="mb-2">
        <Typography variant="body1" color="text.secondary" className="mb-4 sm:mb-6 text-sm sm:text-base">
          Your email will be used to log in and receive important account
          notifications.
        </Typography>
      </div>

      <TextField
        {...register('email')}
        fullWidth
        label="Email"
        variant="outlined"
        placeholder="your.email@example.com"
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <EmailIcon color="action" />
            </InputAdornment>
          ),
        }}
      />

      <TextField
        {...register('password')}
        fullWidth
        type={showPassword ? 'text' : 'password'}
        label="Password"
        variant="outlined"
        placeholder="Create a strong password"
        error={!!errors.password}
        helperText={
          errors.password?.message ||
          'Must include uppercase, lowercase, number, and special character'
        }
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockIcon color="action" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <div className="mt-4">
        <FormControl error={!!errors.emailTermsConsent} fullWidth>
          <FormControlLabel
            control={
              <Checkbox {...register('emailTermsConsent')} color="primary" />
            }
            label={
              <Typography variant="body2">
                I agree to the{' '}
                <Link href="/terms" target="_blank">
                  Terms of Use
                </Link>{' '}
                and{' '}
                <Link href="/privacy" target="_blank">
                  Privacy Policy
                </Link>
              </Typography>
            }
          />
          {errors.emailTermsConsent && (
            <FormHelperText error>
              {errors.emailTermsConsent.message}
            </FormHelperText>
          )}
        </FormControl>
      </div>

      <div>
        <FormControlLabel
          control={<Checkbox {...register('smsConsent')} color="primary" />}
          label={
            <Typography variant="body2">
              I agree to receive SMS notifications about my account, updates,
              and promotions
            </Typography>
          }
        />
      </div>
    </Box>
  );
}

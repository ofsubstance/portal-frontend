import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

import { SignupReq } from '@/dtos/auth.dto';
import { useFormContext } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
import { states } from '@/constants/states';
import { countries } from '@/constants/countries';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import LanguageIcon from '@mui/icons-material/Language';

export default function SignupStep3() {
  const {
    register,
    formState: { errors },
  } = useFormContext<SignupReq>();

  return (
    <div className="flex flex-col gap-4">
      <Typography variant="body1" color="text.secondary" className="mb-2 text-sm sm:text-base">
        Tell us a bit about yourself to personalize your experience.
      </Typography>

      <Grid container spacing={2} className="sm:spacing-3">
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight={500} className="mb-2 text-sm sm:text-base">
            Personal Information
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            {...register('firstname')}
            fullWidth
            label="First Name"
            variant="outlined"
            placeholder="Your first name"
            error={!!errors.firstname}
            helperText={errors.firstname?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            {...register('lastname')}
            fullWidth
            label="Last Name"
            variant="outlined"
            placeholder="Your last name"
            error={!!errors.lastname}
            helperText={errors.lastname?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('phone')}
            fullWidth
            label="Mobile Phone"
            variant="outlined"
            placeholder="Your phone number (optional)"
            error={!!errors.phone}
            helperText={errors.phone?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PhoneIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider className="my-2" />
          <Typography variant="subtitle1" fontWeight={500} className="my-2 text-sm sm:text-base">
            Location
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="state-region-label">State/Region</InputLabel>
            <Select
              {...register('profile.stateRegion')}
              labelId="state-region-label"
              defaultValue=""
              label="State/Region"
              error={!!errors.profile?.stateRegion}
            >
              <MenuItem value="">Select State/Region</MenuItem>
              {states.map((state) => (
                <MenuItem key={state.value} value={state.value}>
                  {state.label}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="error">
              {errors.profile?.stateRegion?.message}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={6}>
          <FormControl fullWidth>
            <InputLabel id="country-label">Country</InputLabel>
            <Select
              {...register('profile.country')}
              labelId="country-label"
              defaultValue=""
              label="Country"
              error={!!errors.profile?.country}
            >
              <MenuItem value="">Select Country</MenuItem>
              {countries.map((country) => (
                <MenuItem key={country.value} value={country.value}>
                  {country.label}
                </MenuItem>
              ))}
            </Select>
            <Typography variant="caption" color="error">
              {errors.profile?.country?.message}
            </Typography>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <Divider className="my-2" />
          <Typography variant="subtitle1" fontWeight={500} className="my-2 text-sm sm:text-base">
            Organization (Optional)
          </Typography>
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('profile.businessName')}
            fullWidth
            label="Organization Name"
            variant="outlined"
            placeholder="Your organization name (optional)"
            error={!!errors.profile?.businessName}
            helperText={errors.profile?.businessName?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <BusinessIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            {...register('profile.website')}
            fullWidth
            label="Website"
            variant="outlined"
            placeholder="Your website URL (optional)"
            error={!!errors.profile?.website}
            helperText={errors.profile?.website?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LanguageIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}

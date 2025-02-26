import {
  Grid,
  TextField,
  InputAdornment,
  Typography,
  Divider,
} from '@mui/material';

import { SignupReq } from '@/dtos/auth.dto';
import { useFormContext } from 'react-hook-form';
import PersonIcon from '@mui/icons-material/Person';
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
      <Typography variant="body1" color="text.secondary" className="mb-2">
        Tell us a bit about yourself to personalize your experience.
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" fontWeight={500} className="mb-2">
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
          <Typography variant="subtitle1" fontWeight={500} className="my-2">
            Location
          </Typography>
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            {...register('profile.stateRegion')}
            fullWidth
            label="State/Region"
            variant="outlined"
            placeholder="Your state or region"
            error={!!errors.profile?.stateRegion}
            helperText={errors.profile?.stateRegion?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            {...register('profile.country')}
            fullWidth
            label="Country"
            variant="outlined"
            placeholder="Your country"
            error={!!errors.profile?.country}
            helperText={errors.profile?.country?.message}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LocationOnIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item xs={12}>
          <Divider className="my-2" />
          <Typography variant="subtitle1" fontWeight={500} className="my-2">
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

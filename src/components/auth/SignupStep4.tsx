import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Typography,
  Paper,
  Grid,
  Chip,
} from '@mui/material';

import { Interests } from '@/constants/enums';
import { SignupReq } from '@/dtos/auth.dto';
import { useFormContext } from 'react-hook-form';

export default function SignupStep4() {
  const {
    getValues,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<SignupReq>();

  // Convert enum to array of strings
  const interestsOptions = Object.values(Interests);

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInterests = getValues('profile.interests') || [];

    const updatedInterests = e.target.checked
      ? [...currentInterests, e.target.value]
      : currentInterests.filter((interest) => interest !== e.target.value);

    setValue('profile.interests', updatedInterests);
  };

  const selectedInterests = watch('profile.interests', []);

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="body1" color="text.secondary" className="mb-2">
        Select content categories that interest you to personalize your
        experience. This step is optional.
      </Typography>

      <FormControl error={!!errors.profile?.interests} fullWidth>
        <FormLabel
          sx={{
            fontSize: '1.15rem',
            fontWeight: 500,
            color: 'text.primary',
            marginBottom: '1rem',
          }}
        >
          What content categories are you most interested in?
        </FormLabel>

        <Typography variant="body2" color="text.secondary" className="mb-4">
          Select all that apply
        </Typography>

        <Grid container spacing={2}>
          {interestsOptions.map((category) => (
            <Grid item xs={12} sm={6} key={category}>
              <Paper
                elevation={selectedInterests.includes(category) ? 2 : 0}
                className={`transition-all duration-200 p-2 ${
                  selectedInterests.includes(category)
                    ? 'bg-primary-50 border border-primary-200'
                    : 'border border-gray-200 hover:border-primary-100'
                }`}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedInterests.includes(category)}
                      onChange={handleInterestsChange}
                      value={category}
                      color="primary"
                    />
                  }
                  label={
                    <Typography
                      variant="body1"
                      fontWeight={
                        selectedInterests.includes(category) ? 500 : 400
                      }
                    >
                      {category}
                    </Typography>
                  }
                  className="w-full m-0"
                />
              </Paper>
            </Grid>
          ))}
        </Grid>

        {errors.profile?.interests && (
          <Typography color="error" variant="caption" className="mt-3">
            {errors.profile.interests.message}
          </Typography>
        )}

        {selectedInterests.length > 0 && (
          <div className="mt-6">
            <Typography variant="subtitle2" className="mb-2">
              Selected Categories ({selectedInterests.length}):
            </Typography>
            <div className="flex flex-wrap gap-2">
              {selectedInterests.map((interest) => (
                <Chip
                  key={interest}
                  label={interest}
                  color="primary"
                  variant="outlined"
                  onDelete={() => {
                    setValue(
                      'profile.interests',
                      selectedInterests.filter((i) => i !== interest)
                    );
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </FormControl>
    </div>
  );
}

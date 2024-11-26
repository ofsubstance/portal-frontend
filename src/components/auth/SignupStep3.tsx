import { Grid, Checkbox, FormControlLabel, Typography } from '@mui/material';
import {
  UseFormRegister,
  FieldErrors,
  UseFormGetValues,
  UseFormSetValue,
} from 'react-hook-form';
import { SignupFormData } from './SignupForm'; // Adjust import path
import { Utilization, Interests } from '@/constants/enums';
import { useState } from 'react';

export const Step3 = ({
  errors,
  getValues,
  setValue,
}: {
  register: UseFormRegister<SignupFormData>;
  errors: FieldErrors<SignupFormData>;
  getValues: UseFormGetValues<SignupFormData>;
  setValue: UseFormSetValue<SignupFormData>;
}) => {
  // Convert enums to arrays of strings
  const utilizationOptions = Object.values(Utilization);
  const interestsOptions = Object.values(Interests);

  const [selectedUtilizationPurpose, setSelectedUtilizationPurpose] = useState(
    getValues('profile.utilizationPurpose') || ''
  );

  const [selectedInterests, setSelectedInterests] = useState(
    getValues('profile.interests') || []
  );

  const handleUtilizationPurposeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedUtilizationPurpose(e.target.value);
    setValue('profile.utilizationPurpose', e.target.value);
  };

  const handleInterestsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInterests = selectedInterests;
    const updatedInterests = e.target.checked
      ? [...currentInterests, e.target.value]
      : currentInterests.filter((c) => c !== e.target.value);
    setSelectedInterests(updatedInterests);
    setValue('profile.interests', updatedInterests);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="subtitle1">
          How will you utilize content on Of Substance?*
        </Typography>
        {utilizationOptions.map((option) => (
          <Grid item xs={12} key={option}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedUtilizationPurpose === option}
                  onChange={handleUtilizationPurposeChange}
                  value={option}
                  color="primary"
                />
              }
              label={option}
            />
          </Grid>
        ))}
        {errors.profile?.utilizationPurpose && (
          <Typography color="error" variant="caption">
            {errors.profile?.utilizationPurpose.message}
          </Typography>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant="subtitle1">
          What content categories are you most interested in (select all that
          apply)?*
        </Typography>
        {interestsOptions.map((category) => (
          <Grid item xs={12} key={category}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={selectedInterests.includes(category)}
                  onChange={handleInterestsChange}
                  value={category}
                  color="primary"
                />
              }
              label={category}
            />
          </Grid>
        ))}
        {errors.profile?.interests && (
          <Typography color="error" variant="caption">
            {errors.profile?.interests.message}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

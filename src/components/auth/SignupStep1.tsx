import {
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Paper,
  Typography,
} from '@mui/material';

import { SignupReq } from '@/dtos/auth.dto';
import { Utilization } from '@/constants/enums';
import { useFormContext } from 'react-hook-form';

export default function SignupStep1() {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext<SignupReq>();

  // Convert enum to array of strings
  const utilizationOptions = Object.values(Utilization);

  const handleUtilizationPurposeChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setValue('profile.utilizationPurpose', e.target.value);
  };

  const selectedValue = watch('profile.utilizationPurpose') || '';

  return (
    <div className="flex flex-col gap-4 sm:gap-6">
      <FormControl
        error={!!errors.profile?.utilizationPurpose}
        required
        fullWidth
      >
        <FormLabel
          sx={{
            fontSize: '1rem',
            fontWeight: 500,
            color: 'text.primary',
            marginBottom: '0.75rem',
            '@media (min-width: 640px)': {
              fontSize: '1.15rem',
              marginBottom: '1rem',
            },
          }}
        >
          How will you use Of Substance?
        </FormLabel>

        <RadioGroup
          value={selectedValue}
          onChange={handleUtilizationPurposeChange}
          className="flex flex-col gap-2 sm:gap-3 mt-2"
        >
          {utilizationOptions.map((option) => (
            <Paper
              key={option}
              elevation={selectedValue === option ? 3 : 1}
              className={`transition-all duration-200 ${selectedValue === option
                  ? 'border-2 border-primary-500'
                  : 'border border-gray-200 hover:border-primary-300'
                }`}
            >
              <FormControlLabel
                value={option}
                control={<Radio />}
                label={
                  <Typography
                    variant="body1"
                    fontWeight={selectedValue === option ? 500 : 400}
                    className="text-sm sm:text-base"
                  >
                    {option}
                  </Typography>
                }
                className="w-full p-2 sm:p-3"
                sx={{ margin: 0 }}
              />
            </Paper>
          ))}
        </RadioGroup>

        {errors.profile?.utilizationPurpose && (
          <Typography color="error" variant="caption" className="mt-2">
            {errors.profile.utilizationPurpose.message}
          </Typography>
        )}
      </FormControl>
    </div>
  );
}

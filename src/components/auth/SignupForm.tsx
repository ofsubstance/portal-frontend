import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupValidation } from '@/validators/auth.validator';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Step1 } from './SignupStep1';
import { Step3 } from './SignupStep3';
import { Step2 } from './SignupStep2';

export type SignupFormData = z.infer<typeof signupValidation>;

export const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignupFormData) => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const {
    register,
    handleSubmit,
    trigger,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupValidation),
    mode: 'onChange',
  });

  const handleNext = async () => {
    let isStepValid = false;

    switch (activeStep) {
      case 0:
        isStepValid = await trigger([
          'email',
          'password',
          'smsConsent',
          'emailTermsConsent',
        ]);
        break;
      case 1:
        isStepValid = await trigger([
          'firstname',
          'lastname',
          'profile.businessName',
          'profile.website',
          'profile.stateRegion',
          'profile.country',
        ]);
        break;
      case 2:
        isStepValid = await trigger([
          'profile.utilizationPurpose',
          'profile.interests',
        ]);
        break;
      default:
        break;
    }

    // Proceed to the next step only if the current step is valid
    if (isStepValid) {
      if (activeStep < steps.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Trigger form submission for the last step
        handleSubmit(onSubmitHandler, onSubmitError)();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmitHandler = (data: SignupFormData) => {
    try {
      onSubmit(data);
    } catch (error) {
      toast.error('Submission failed. Please try again.');
    }
  };

  const onSubmitError = (errors: any) => {
    const errorMessages = Object.values(errors).reduce(
      (acc: string[], curr: any) => {
        if (curr?.message) {
          acc.push(curr.message);
        }
        if (curr?.profile) {
          Object.values(curr.profile).forEach((nestedError: any) => {
            if (nestedError?.message) {
              acc.push(nestedError.message);
            }
          });
        }
        return acc;
      },
      []
    );
    errorMessages.forEach((message) => {
      toast.error(message);
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return (
          <Step1
            register={register}
            errors={errors}
            watch={watch}
            getValues={getValues}
            setValue={setValue}
          />
        );
      case 1:
        return <Step2 register={register} errors={errors} />;
      case 2:
        return (
          <Step3
            register={register}
            errors={errors}
            getValues={getValues}
            setValue={setValue}
          />
        );
      default:
        return <Typography>Confirmation</Typography>;
    }
  };

  const steps = [
    'Account Details',
    'Personal Information',
    'Content Preferences',
  ];

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: 'auto', padding: 2 }}>
      <Box display="flex" justifyContent="center" mb={2}>
        {steps.map((label, index) => (
          <Typography
            key={label}
            variant="subtitle1"
            color={index === activeStep ? 'primary' : 'textSecondary'}
            sx={{
              marginX: 1,
              cursor: 'pointer',
              borderBottom: index === activeStep ? '2px solid' : 'none',
            }}
          >
            {label}
          </Typography>
        ))}
      </Box>

      <form onSubmit={handleSubmit(onSubmitHandler, onSubmitError)}>
        <Box sx={{ mt: 2, mb: 2 }}>{renderStepContent(activeStep)}</Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Back
          </Button>
          {activeStep === steps.length - 1 ? (
            <Button type="submit" variant="contained" color="primary">
              Submit
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext} color="primary">
              Next
            </Button>
          )}
        </Box>
      </form>
    </Box>
  );
};

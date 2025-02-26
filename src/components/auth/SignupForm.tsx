import {
  Button,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from '@mui/material';
import { FormProvider, useForm } from 'react-hook-form';

import { SignupReq } from '@/dtos/auth.dto';
import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import SignupStep4 from './SignupStep4';
import { signupValidation } from '@/validators/auth.validator';
import { toast } from 'react-toastify';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';

const SIGNUP_STEPS = [
  'Get Started',
  'Create Account',
  'Complete Profile',
  'Set Preferences',
];

export const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignupReq) => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const formMethods = useForm<SignupReq>({
    resolver: zodResolver(signupValidation),
    mode: 'onChange',
  });

  const { handleSubmit, trigger } = formMethods;

  const handleNext = async () => {
    let isStepValid = false;

    switch (activeStep) {
      case 0:
        isStepValid = await trigger(['profile.utilizationPurpose']);
        break;
      case 1:
        isStepValid = await trigger(['email', 'password']);
        break;
      case 2:
        isStepValid = await trigger([
          'firstname',
          'lastname',
          'phone',
          'profile.stateRegion',
          'profile.country',
          'profile.businessName',
          'profile.website',
        ]);
        break;
      case 3:
        // Last step is optional, so always validate as true
        isStepValid = true;
        break;
      default:
        break;
    }

    // Proceed to the next step only if the current step is valid
    if (isStepValid) {
      if (activeStep < SIGNUP_STEPS.length - 1) {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      } else {
        // Trigger form submission for the last step
        handleSubmit(onSubmit, onSubmitError)();
      }
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const onSubmitError = (errors: Record<string, unknown>) => {
    const errorMessages = Object.values(errors).reduce(
      (acc: string[], curr: unknown) => {
        if (typeof curr === 'object' && curr !== null) {
          const currObj = curr as {
            message?: string;
            profile?: Record<string, { message?: string }>;
          };
          if (currObj.message) {
            acc.push(currObj.message);
          }
          if (currObj.profile) {
            Object.values(currObj.profile).forEach((nestedError) => {
              if (nestedError?.message) {
                acc.push(nestedError.message);
              }
            });
          }
        }
        return acc;
      },
      []
    );
    errorMessages.forEach((message: string) => {
      toast.error(message);
    });
  };

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SignupStep1 />;
      case 1:
        return <SignupStep2 />;
      case 2:
        return <SignupStep3 />;
      case 3:
        return <SignupStep4 />;
      default:
        return <Typography>Confirmation</Typography>;
    }
  };

  // Step titles and descriptions
  const stepTitles = [
    "Let's get started",
    'Create your account',
    'Tell us about yourself',
    'Set your preferences',
  ];

  const stepDescriptions = [
    'Tell us how you plan to use Of Substance',
    'Set up your login credentials',
    'Share some information to personalize your experience',
    'Select content categories that interest you',
  ];

  return (
    <div className="w-full max-w-3xl m-auto p-4 flex flex-col gap-6">
      <Paper elevation={3} className="p-6 rounded-lg">
        <div className="mb-8 text-center">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            className="mb-2"
          >
            {stepTitles[activeStep]}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {stepDescriptions[activeStep]}
          </Typography>
          {activeStep === 3 && (
            <Typography
              variant="body2"
              color="text.secondary"
              className="mt-2 italic"
            >
              Please select your content preferences to complete signup.
            </Typography>
          )}
        </div>

        <Stepper activeStep={activeStep} alternativeLabel className="mb-8">
          {SIGNUP_STEPS.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...formMethods}>
          <form
            className="space-y-8"
            onSubmit={handleSubmit(onSubmit, onSubmitError)}
          >
            <div className="min-h-[280px] py-4">
              {renderStepContent(activeStep)}
            </div>

            <div className="flex gap-4 justify-between pt-4 border-t border-gray-200">
              <Button
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                size="large"
                className="px-6"
              >
                Back
              </Button>

              {activeStep === SIGNUP_STEPS.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="px-6"
                >
                  Complete Sign Up
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                  size="large"
                  className="px-6"
                >
                  Continue
                </Button>
              )}
            </div>
          </form>
        </FormProvider>
      </Paper>
    </div>
  );
};

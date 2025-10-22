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
import { useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { saveSignupFormData, getSignupFormData, clearSignupFormData } from '@/utils/formPersistence';

const SIGNUP_STEPS = [
  'Get Started',
  'Create Account',
  'Complete Profile',
  'Set Preferences',
];

export const SignupForm = ({
  onSubmit,
  isLoading = false,
}: {
  onSubmit: (data: SignupReq) => void;
  isLoading?: boolean;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const formMethods = useForm<SignupReq>({
    resolver: zodResolver(signupValidation),
    mode: 'onChange',
    defaultValues: getSignupFormData() || {},
  });

  const { handleSubmit, trigger, watch } = formMethods;

  // Save form data on every change
  useEffect(() => {
    const subscription = watch((data) => {
      saveSignupFormData(data as Partial<SignupReq>);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const handleNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Prevent any default form submission
    e.preventDefault();

    let isStepValid = false;

    switch (activeStep) {
      case 0:
        isStepValid = await trigger(['profile.utilizationPurpose']);
        break;
      case 1:
        isStepValid = await trigger(['email', 'password', 'emailTermsConsent']);
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
      // Always just move to the next step, don't submit automatically
      setActiveStep((prevActiveStep) =>
        prevActiveStep < SIGNUP_STEPS.length - 1
          ? prevActiveStep + 1
          : prevActiveStep
      );
    }
  };

  const handleBack = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
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
    (errorMessages as string[]).forEach((message: string) => {
      toast.error(message);
    });
  };

  const handleFormSubmit = (data: SignupReq) => {
    // Clear form data on successful submission
    clearSignupFormData();
    onSubmit(data);
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
    <div className="w-full max-w-3xl m-auto p-2 sm:p-4 flex flex-col gap-4 sm:gap-6">
      <Paper elevation={3} className="p-3 sm:p-6 rounded-lg">
        <div className="mb-4 sm:mb-8 text-center">
          <Typography
            variant="h4"
            fontWeight="bold"
            color="primary"
            className="mb-2 text-lg sm:text-2xl"
          >
            {stepTitles[activeStep]}
          </Typography>
          <Typography variant="body1" color="text.secondary" className="text-sm sm:text-base">
            {stepDescriptions[activeStep]}
          </Typography>
          {activeStep === 3 && (
            <Typography
              variant="body2"
              color="text.secondary"
              className="mt-2 italic"
            >
              This step is optional. Click "Complete Sign Up" when you're ready
              to finish.
            </Typography>
          )}
        </div>

        <Stepper
          activeStep={activeStep}
          alternativeLabel
          className="mb-4 sm:mb-8"
          sx={{
            '& .MuiStepLabel-label': {
              fontSize: '0.75rem',
              '@media (min-width: 640px)': {
                fontSize: '0.875rem',
              },
            },
            '& .MuiStepLabel-labelContainer': {
              marginTop: '4px',
              '@media (min-width: 640px)': {
                marginTop: '8px',
              },
            },
            '& .MuiStepConnector-line': {
              borderTopWidth: '1px',
              '@media (min-width: 640px)': {
                borderTopWidth: '2px',
              },
            },
            '& .MuiStepConnector-root': {
              top: '12px',
              '@media (min-width: 640px)': {
                top: '16px',
              },
            },
            '& .MuiStepLabel-iconContainer': {
              padding: '4px',
              '@media (min-width: 640px)': {
                padding: '8px',
              },
            },
          }}
        >
          {SIGNUP_STEPS.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel
                className="text-xs sm:text-sm"
                sx={{
                  '& .MuiStepLabel-label': {
                    fontSize: '0.7rem',
                    fontWeight: activeStep === index ? 600 : 400,
                    '@media (min-width: 640px)': {
                      fontSize: '0.8rem',
                    },
                  },
                }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        <FormProvider {...formMethods}>
          <form
            className="space-y-8"
            onSubmit={handleSubmit(handleFormSubmit, onSubmitError)}
            noValidate
          >
            <div className="min-h-[200px] sm:min-h-[280px] py-2 sm:py-4">
              {renderStepContent(activeStep)}
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 justify-between pt-4 border-t border-gray-200">
              <Button
                type="button"
                disabled={activeStep === 0}
                onClick={handleBack}
                variant="outlined"
                size="large"
                className="px-4 sm:px-6 w-full sm:w-auto"
              >
                Back
              </Button>

              {activeStep === SIGNUP_STEPS.length - 1 ? (
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  className="px-4 sm:px-6 w-full sm:w-auto"
                  disabled={isLoading}
                >
                  {isLoading ? 'Creating Account...' : 'Complete Sign Up'}
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="contained"
                  onClick={handleNext}
                  color="primary"
                  size="large"
                  className="px-4 sm:px-6 w-full sm:w-auto"
                  disabled={isLoading}
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

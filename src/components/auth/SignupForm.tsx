import { Button, Step, StepLabel, Stepper, Typography } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";

import { SignupReq } from "@/dtos/auth.dto";
import SignupStep1 from "./SignupStep1";
import SignupStep2 from "./SignupStep2";
import SignupStep3 from "./SignupStep3";
import { signupValidation } from "@/validators/auth.validator";
import { toast } from "react-toastify";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

const SIGNUP_STEPS = [
  "Account Details",
  "Personal Information",
  "Content Preferences",
];

export const SignupForm = ({
  onSubmit,
}: {
  onSubmit: (data: SignupReq) => void;
}) => {
  const [activeStep, setActiveStep] = useState(0);

  const formMethods = useForm<SignupReq>({
    resolver: zodResolver(signupValidation),
    mode: "onChange",
  });

  const { handleSubmit, trigger } = formMethods;

  const handleNext = async () => {
    let isStepValid = false;

    switch (activeStep) {
      case 0:
        isStepValid = await trigger([
          "email",
          "password",
          "smsConsent",
          "emailTermsConsent",
        ]);
        break;
      case 1:
        isStepValid = await trigger([
          "firstname",
          "lastname",
          "profile.businessName",
          "profile.website",
          "profile.stateRegion",
          "profile.country",
        ]);
        break;
      case 2:
        isStepValid = await trigger([
          "profile.utilizationPurpose",
          "profile.interests",
        ]);
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
        return <SignupStep1 />;
      case 1:
        return <SignupStep2 />;
      case 2:
        return <SignupStep3 />;
      default:
        return <Typography>Confirmation</Typography>;
    }
  };

  return (
    <div className="w-full max-w-2xl m-auto p-2 flex flex-col gap-6">
      <Stepper activeStep={activeStep} alternativeLabel>
        {SIGNUP_STEPS.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <FormProvider {...formMethods}>
        <form
          className="space-y-6"
          onSubmit={handleSubmit(onSubmit, onSubmitError)}
        >
          {renderStepContent(activeStep)}
          <div className="flex gap-2 justify-between">
            <Button
              disabled={activeStep === 0}
              onClick={handleBack}
              variant="outlined"
            >
              Back
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{
                display:
                  activeStep === SIGNUP_STEPS.length - 1 ? "block" : "none",
              }}
            >
              Submit
            </Button>

            <Button
              variant="contained"
              onClick={handleNext}
              color="primary"
              sx={{
                display:
                  activeStep === SIGNUP_STEPS.length - 1 ? "none" : "block",
              }}
            >
              Next
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
};

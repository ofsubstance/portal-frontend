import { Button, MobileStepper, Typography } from "@mui/material";
import { ReactNode, useState } from "react";

import AppLogo from "@/components/common/logo/AppLogo";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";

interface GuideSectionProps {
  title: ReactNode;
  details: ReactNode;
}
function GuideSection({ title, details }: GuideSectionProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-center">
      <Typography
        variant="h4"
        fontWeight={600}
        className="flex items-center gap-2"
      >
        {title}
      </Typography>
      <Typography component="span" fontWeight={500} fontSize={18}>
        {details}
      </Typography>
    </div>
  );
}

const steps = [
  <GuideSection
    title={
      <>
        Welcome to <AppLogo />
      </>
    }
    details={
      <div className="flex flex-col gap-4">
        <span>
          Here you can access and watch our films with your clients and
          patients, or enjoy them on your own or with friends and family.
        </span>

        <span>
          <strong>Note:</strong> You can view this guide again from the top
          menu.
        </span>
      </div>
    }
  />,
  <GuideSection
    title="Browsing Films"
    details="Discover film details by hovering over a film to reveal its genre, duration, and synopsis. Explore the diversity and find the perfect film for your mood or occasion!"
  />,
  <GuideSection
    title="Watching Films"
    details="Click on a film to access its dedicated page. Here you can unlock the film, enjoy the trailer, watch it, and delve into additional information, including suggested uses, themes, struggles, impact, and more. Uncover the full story behind each film and make the most of your viewing experience!"
  />,
  <GuideSection
    title="Welcome Rewards"
    details="As a new user, enjoy the perk of 3 free film unlocks! Use these to access any film you like and start your cinematic journey with us."
  />,
  <GuideSection
    title="Subscriptions and Purchases"
    details="Unlock films by clicking the unlock button. This will take you to the unlock page, where you can enter the unlock code provided by your clinician or purchase the film. Choose the option that suits you best and gain unlimited access to a world of captivating films."
  />,
  <GuideSection
    title="Available Films"
    details="You can find films that are available to you in the '_____' section. Dive into our curated collection and start watching right away!"
  />,
  <GuideSection
    title="Gaining Credits"
    details="Earn credits to unlock more films by sending us your testimonials and endorsements. Share your experiences and enjoy additional content as a thank you from us!"
  />,
];

export default function UserGuide() {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <div className="space-y-4">
      {steps[activeStep]}

      <MobileStepper
        variant="dots"
        steps={steps.length}
        activeStep={activeStep}
        position="static"
        sx={{
          "&.MuiMobileStepper-root": {
            boxShadow: "none",
          },
        }}
        nextButton={
          <Button
            size="small"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            endIcon={<KeyboardArrowRight />}
          >
            Next
          </Button>
        }
        backButton={
          <Button
            size="small"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<KeyboardArrowLeft />}
          >
            Back
          </Button>
        }
      />
    </div>
  );
}

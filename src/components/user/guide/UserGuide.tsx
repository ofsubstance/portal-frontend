import { Button, MobileStepper, Typography, Box } from '@mui/material';
import { ReactNode, useState } from 'react';

import AppLogo from '@/components/common/logo/AppLogo';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

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
          Your gateway to meaningful, thought-provoking films for personal
          reflection, professional use with clients, or sharing with friends and
          family.
        </span>
        <span>
          <strong>Note:</strong> You can access this guide anytime through the
          account menu in the top-right corner.
        </span>
      </div>
    }
  />,
  <GuideSection
    title="Finding Films"
    details={
      <div className="flex flex-col gap-4">
        <span>
          <strong>Search:</strong> Use the dark search bar in the top navigation
          to instantly find specific films. Results appear as you type, showing
          thumbnails and titles.
        </span>
        <span>
          <strong>Browse:</strong> Explore our collection on the home page, with
          featured films in the hero section and our complete library below.
        </span>
        <span>
          <strong>Filter:</strong> Refine your browsing using the sidebar
          filters to narrow films by genre and tags that match your interests or
          needs.
        </span>
      </div>
    }
  />,
  <GuideSection
    title="Exploring Film Details"
    details={
      <div className="flex flex-col gap-4">
        <span>
          Each film page provides comprehensive information to help you decide
          what to watch:
        </span>
        <span>
          <strong>Film Details:</strong> Genre, duration, publication date and a
          brief description give you a quick overview.
        </span>
        <span>
          <strong>Tags:</strong> Identify themes, topics, and related concepts
          to help you find films relevant to specific needs.
        </span>
        <span>
          <strong>Preview Options:</strong> Watch trailers or pre-roll content
          before committing to the full film.
        </span>
      </div>
    }
  />,
  <GuideSection
    title="Watching Films"
    details={
      <div className="flex flex-col gap-4">
        <span>
          <strong>Start Watching:</strong> Click the "Watch The Film" button on
          any film page to begin playback in our immersive viewer.
        </span>
        <span>
          <strong>Player Controls:</strong> Standard playback controls allow you
          to pause, seek, adjust volume, and toggle fullscreen.
        </span>
        <span>
          <strong>After Watching:</strong> Leave feedback, share the film, or
          explore comments from other viewers below the player.
        </span>
      </div>
    }
  />,
  <GuideSection
    title="Sharing & Engaging"
    details={
      <div className="flex flex-col gap-4">
        <span>
          <strong>Share Films:</strong> Click the "Share This Film" button to
          create a unique link that you can send to clients, colleagues, or
          friends.
        </span>
        <span>
          <strong>Comments:</strong> Engage with other viewers by leaving
          comments on films you've watched. Share insights or reflections to
          enrich the community experience.
        </span>
        <span>
          <strong>Feedback:</strong> Provide structured feedback on films to
          help us improve and to share your experience with the creators.
        </span>
      </div>
    }
  />,
  <GuideSection
    title="Your Profile & Activity"
    details={
      <div className="flex flex-col gap-4">
        <span>
          <strong>Profile Page:</strong> Access your profile through the account
          menu to view your activity history, including comments, feedback, and
          shared links.
        </span>
        <span>
          <strong>Account Settings:</strong> Manage your personal information,
          subscription details, and notification preferences from your profile.
        </span>
        <span>
          <strong>Activity Tracking:</strong> Revisit films you've previously
          watched or commented on through your profile activity log.
        </span>
      </div>
    }
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
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '500px', // Fixed height for the guide modal
        width: '100%',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
        }}
      >
        {steps[activeStep]}
      </Box>

      <MobileStepper
        variant="dots"
        steps={steps.length}
        activeStep={activeStep}
        position="static"
        sx={{
          '&.MuiMobileStepper-root': {
            boxShadow: 'none',
            borderTop: '1px solid rgba(0,0,0,0.1)',
            padding: 2,
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
    </Box>
  );
}

import { Button, MobileStepper, Typography, Box, Paper, useTheme, alpha, Fade } from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';

import AppLogo from '@/components/common/logo/AppLogo';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { RiSearchLine, RiFilterLine, RiPlayCircleLine, RiShareLine, RiUserLine } from 'react-icons/ri';

interface GuideSectionProps {
  title: ReactNode;
  details: ReactNode;
}
function GuideSection({ title, details }: GuideSectionProps) {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={800}>
      <div className="w-full max-w-[800px]">
        <div className="flex flex-col items-center justify-center gap-6 text-center">
          <Typography
            variant="h4"
            fontWeight={600}
            className="flex items-center gap-3"
            sx={{
              color: theme.palette.primary.main
            }}
          >
            {title}
          </Typography>
          <Typography
            component="div"
            fontWeight={400}
            fontSize={18}
            sx={{
              lineHeight: 1.7,
              color: theme.palette.text.secondary,
              '& strong': { color: theme.palette.text.primary, fontWeight: 600 }
            }}
          >
            {details}
          </Typography>
        </div>
      </div>
    </Fade>
  );
}

const steps = [
  <GuideSection
    title={
      <div className="flex flex-col items-center gap-2">
        <Typography variant="h4" color="primary.main" fontWeight={600}>Welcome to</Typography>
        <AppLogo />
      </div>
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
    title={<><RiSearchLine size={28} style={{ marginRight: '8px' }} /> Finding Films</>}
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
    title={<><RiFilterLine size={28} style={{ marginRight: '8px' }} /> Exploring Film Details</>}
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
    title={<><RiPlayCircleLine size={28} style={{ marginRight: '8px' }} /> Watching Films</>}
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
    title={<><RiShareLine size={28} style={{ marginRight: '8px' }} /> Sharing & Engaging</>}
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
    title={<><RiUserLine size={28} style={{ marginRight: '8px' }} /> Your Profile & Activity</>}
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

interface UserGuideProps {
  onClose?: () => void;
}

export default function UserGuide({ onClose }: UserGuideProps) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [fadeIn, setFadeIn] = useState(true);

  // Handle fade transition between steps
  useEffect(() => {
    setFadeIn(true);
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      // Last slide - close the modal
      onClose?.();
    } else {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '600px', // Increased height for better spacing
        width: '100%',
        background: theme.palette.background.paper,
        borderRadius: 2,
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          overflow: 'auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
          position: 'relative'
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
            borderTop: `1px solid ${alpha(theme.palette.divider, 0.6)}`,
            padding: 3,
            backgroundColor: theme.palette.background.paper,
          },
          '& .MuiMobileStepper-dot': {
            margin: '0 4px',
            transition: 'all 0.3s ease',
          },
          '& .MuiMobileStepper-dotActive': {
            width: 16,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main,
          }
        }}
        nextButton={
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleNext}
            endIcon={activeStep === steps.length - 1 ? undefined : <KeyboardArrowRight />}
            sx={{
              borderRadius: 8,
              px: 3,
              py: 1,
              boxShadow: theme.shadows[2],
              '&:hover': {
                boxShadow: theme.shadows[4],
              }
            }}
          >
            {activeStep === steps.length - 1 ? 'Close' : 'Next'}
          </Button>
        }
        backButton={
          <Button
            size="medium"
            variant="outlined"
            onClick={handleBack}
            disabled={activeStep === 0}
            startIcon={<KeyboardArrowLeft />}
            sx={{
              borderRadius: 8,
              px: 3,
              py: 1,
              borderColor: alpha(theme.palette.primary.main, 0.5),
              '&:hover': {
                borderColor: theme.palette.primary.main,
                backgroundColor: alpha(theme.palette.primary.main, 0.04)
              }
            }}
          >
            Back
          </Button>
        }
      />
    </Box>
  );
}

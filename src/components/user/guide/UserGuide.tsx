import { Button, MobileStepper, Typography, Box, useTheme, alpha, Fade } from '@mui/material';
import { ReactNode, useState, useEffect } from 'react';

import AppLogo from '@/components/common/logo/AppLogo';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {
  RiSearchLine,
  RiFilmLine,
  RiShareLine,
  RiPlayCircleLine,
  RiInformationLine,
  RiChatSmileLine,
  RiSparklingLine,
} from 'react-icons/ri';

interface GuideSectionProps {
  title: ReactNode;
  details: ReactNode;
}

function GuideSection({ title, details }: GuideSectionProps) {
  const theme = useTheme();

  return (
    <Fade in={true} timeout={800}>
      <div className="w-full max-w-[720px]">
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <Typography
            variant="h5"
            fontWeight={600}
            className="flex items-center gap-2"
            sx={{ color: theme.palette.primary.main }}
          >
            {title}
          </Typography>
          <Typography
            component="div"
            fontWeight={400}
            fontSize={15}
            sx={{
              lineHeight: 1.65,
              color: theme.palette.text.secondary,
              '& strong': { color: theme.palette.text.primary, fontWeight: 600 },
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
  // Slide 1 — Welcome
  <GuideSection
    title={
      <div className="flex flex-col items-center gap-2">
        <Typography variant="h4" color="primary.main" fontWeight={600}>
          Welcome to
        </Typography>
        <AppLogo />
      </div>
    }
    details={
      <div className="flex flex-col gap-2">
        <span>
          This is where film becomes a tool for reflection, conversation, and real change.
        </span>
        <span>Use with clients. Watch on your own. Share with people who matter.</span>
        <span>
          <strong>Note:</strong> You can revisit this guide anytime from your account menu.
        </span>
      </div>
    }
  />,

  // Slide 2 — Find the Right Film
  <GuideSection
    title={<><RiSearchLine size={28} style={{ marginRight: '8px' }} /> Find the Right Film</>}
    details={
      <div className="flex flex-col gap-2">
        <span>
          <strong>Search:</strong> Know what you're looking for? Use the search bar to find it instantly.
        </span>
        <span>
          <strong>Browse:</strong> Explore our collection on the home page – featured films up top + full library below.
        </span>
        <span>
          <strong>Filter:</strong> Use the sidebar to narrow by topic, theme, or need to find what fits your moment.
        </span>
      </div>
    }
  />,

  // Slide 3 — Film Guidance: More Than Just a Film
  <GuideSection
    title={<><RiInformationLine size={28} style={{ marginRight: '8px' }} /> Film Guidance: More Than Just a Film</>}
    details={
      <div className="flex flex-col gap-2">
        <span>Each film includes guidance to help you use it with intention.</span>
        <span>
          <strong>Pre-Roll:</strong> A short introduction on why we like this film and its potential impact.
        </span>
        <span>
          <strong>Primary Lesson:</strong> The core takeaway that inspired the film.
        </span>
        <span>
          <strong>Themes:</strong> What the film can help explore or unlock.
        </span>
        <span>
          <strong>Impact:</strong> Real examples of how the film has resonated with others.
        </span>
      </div>
    }
  />,

  // Slide 4 — Using Films to Open Conversations
  <GuideSection
    title={<><RiChatSmileLine size={28} style={{ marginRight: '8px' }} /> Using Films to Open Conversations</>}
    details={
      <div className="flex flex-col gap-2">
        <span>Start with a film that touches on what needs to be explored.</span>
        <span>Let the story create space for reflection, honesty, and perspective.</span>
        <span>
          Use it as a shared reference point to access thoughts and emotions that are harder to reach directly.
        </span>
      </div>
    }
  />,

  // Slide 5 — Sharing Films with Clients
  <GuideSection
    title={<><RiShareLine size={28} style={{ marginRight: '8px' }} /> Sharing Films with Clients</>}
    details={
      <div className="flex flex-col gap-2">
        <span>Send films to clients and others using a simple shareable link.</span>
        <span>They can watch without creating an account or entering personal information.</span>
        <span>
          <strong>Clinician Best Practices:</strong> Share through your professional communication method
          and use a single link per film with all clients rather than tracking several individual links per client.
        </span>
        <span>
          Of Substance is designed to support your work without collecting sensitive data so that you can
          focus on the conversation, not the logistics.
        </span>
      </div>
    }
  />,

  // Slide 6 — Extend the Experience
  <GuideSection
    title={<><RiSparklingLine size={28} style={{ marginRight: '8px' }} /> Extend the Experience</>}
    details={
      <div className="flex flex-col gap-2">
        <span>
          <strong>Reflect:</strong> Take a moment to process what stood out.
        </span>
        <span>
          <strong>Comment:</strong> Share your perspective or explore how others experienced it.
        </span>
        <span>
          <strong>Feedback:</strong> Help improve the work and support the creators.
        </span>
      </div>
    }
  />,

  // Slide 7 — Find Your First Film
  <GuideSection
    title={<><RiPlayCircleLine size={28} style={{ marginRight: '8px' }} /> Find your First Film</>}
    details={
      <div className="flex flex-col gap-2">
        <span>
          Start with <strong>TRAPPED</strong>.
        </span>
        <span>
          It's a visually striking, 4 minute film that pulls you in fast and shows how these stories can
          unlock reflection and real conversation that can lead to lasting change.
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

  useEffect(() => {}, [activeStep]);

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      onClose?.();
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        background: theme.palette.background.paper,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 3,
          minHeight: 320,
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
          '& .MuiMobileStepper-dot': { margin: '0 4px', transition: 'all 0.3s ease' },
          '& .MuiMobileStepper-dotActive': {
            width: 16,
            borderRadius: 4,
            backgroundColor: theme.palette.primary.main,
          },
        }}
        nextButton={
          <Button
            size="medium"
            variant="contained"
            color="primary"
            onClick={handleNext}
            endIcon={activeStep === steps.length - 1 ? undefined : <KeyboardArrowRight />}
            sx={{ borderRadius: 8, px: 3, py: 1 }}
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
                backgroundColor: alpha(theme.palette.primary.main, 0.04),
              },
            }}
          >
            Back
          </Button>
        }
      />
    </Box>
  );
}

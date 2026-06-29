import { useState, useEffect } from 'react';
import { Box, Button, Link, Slide, Typography, useTheme } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const STORAGE_KEY = 'cookieConsent';

export default function CookieBanner() {
  const theme = useTheme();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, 'accepted');
    setVisible(false);
  };

  return (
    <Slide direction="up" in={visible} mountOnEnter unmountOnExit>
      <Box
        role="region"
        aria-label="Cookie notice"
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: theme.zIndex.snackbar,
          bgcolor: theme.palette.mode === 'dark' ? '#1a1a1a' : '#111',
          color: '#fff',
          px: { xs: 3, md: 6 },
          py: { xs: 2.5, md: 2 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: { xs: 'flex-start', sm: 'center' },
          justifyContent: 'space-between',
          gap: 2,
          borderTop: `2px solid ${theme.palette.primary.main}`,
        }}
      >
        <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, maxWidth: 700 }}>
          We use essential cookies to keep you securely logged in. No advertising or tracking
          cookies are used.{' '}
          <Link
            component={RouterLink}
            to="/clinical-privacy"
            sx={{ color: theme.palette.primary.light, fontWeight: 600 }}
            underline="hover"
          >
            Learn more
          </Link>{' '}
          or read our{' '}
          <Link
            href="https://ofsubstance.org/for-clinicians#section-q92M9vplbP"
            target="_blank"
            rel="noopener noreferrer"
            sx={{ color: theme.palette.primary.light, fontWeight: 600 }}
            underline="hover"
          >
            Privacy Policy
          </Link>
          .
        </Typography>

        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={handleAccept}
          sx={{ flexShrink: 0, fontWeight: 600, px: 3, borderRadius: 6 }}
        >
          Got it
        </Button>
      </Box>
    </Slide>
  );
}

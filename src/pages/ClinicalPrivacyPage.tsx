import { Box, Button, Container, Divider, Typography, useTheme } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { RiHome4Line as HomeIcon, RiArrowLeftLine as BackIcon } from 'react-icons/ri';
import AppLogo from '@/components/common/logo/AppLogo';

export default function ClinicalPrivacyPage() {
  const theme = useTheme();
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* Header */}
      <Box
        sx={{
          borderBottom: `1px solid ${theme.palette.divider}`,
          py: 2,
          px: { xs: 3, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <AppLogo />
        </Link>

        <Button
          variant="outlined"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          size="small"
          sx={{ borderRadius: 6, fontWeight: 600 }}
        >
          Go to Home
        </Button>
      </Box>

      <Container maxWidth="md" sx={{ py: { xs: 6, md: 10 } }}>
        {/* Page title */}
        <Typography variant="h3" fontWeight={700} gutterBottom>
          Clinical Use &amp; Patient Privacy
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Intro */}
        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3, fontSize: '1.05rem' }}>
          Of Substance is designed to support therapeutic work while minimizing the collection of
          sensitive information.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3, fontSize: '1.05rem' }}>
          Clients can access films through a simple link without creating an account or providing
          any personal information. We do not collect names, emails, or other identifying details
          when a link is accessed.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3, fontSize: '1.05rem' }}>
          Our platform tracks only limited, non-identifiable engagement data (such as total link
          clicks or views) to understand overall usage. We do not track or store individual viewing
          behavior.
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 6, fontSize: '1.05rem' }}>
          Of Substance is not a HIPAA-compliant platform and does not store Protected Health
          Information (PHI). It is intended as a supplemental content tool to be used alongside a
          clinician's existing systems and judgment.
        </Typography>

        <Divider sx={{ my: 4 }} />

        {/* Guidance section */}
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Guidance for Clinicians
        </Typography>

        <Typography variant="body1" sx={{ lineHeight: 1.9, mb: 3, fontSize: '1.05rem' }}>
          Many professionals use Of Substance as part of their therapeutic process. To support
          responsible use, we recommend:
        </Typography>

        <Box component="ul" sx={{ pl: 3, mb: 4 }}>
          {[
            'Share film links through your existing secure communication methods when appropriate',
            'Use general film links rather than creating patient-specific tracking',
            'Avoid including identifying client information in any notes or labels associated with shared links',
            'Treat Of Substance as a supplemental resource, not a system for storing or transmitting protected health information',
          ].map((item) => (
            <Box component="li" key={item} sx={{ mb: 1.5 }}>
              <Typography variant="body1" sx={{ lineHeight: 1.9, fontSize: '1.05rem' }}>
                {item}
              </Typography>
            </Box>
          ))}
        </Box>

        <Typography variant="body1" sx={{ lineHeight: 1.9, fontSize: '1.05rem', mb: 8 }}>
          Our goal is to provide meaningful, accessible content without requiring the exchange of
          sensitive personal data.
        </Typography>

        {/* Bottom home button */}
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            variant="contained"
            color="primary"
            size="large"
            startIcon={<BackIcon />}
            onClick={() => navigate('/')}
            sx={{ borderRadius: 6, fontWeight: 600, px: 5 }}
          >
            Back to Home
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

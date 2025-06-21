import {
  Grid,
  Box,
  Container,
  Typography,
  Divider,
  Link,
  useTheme,
  alpha,
  IconButton,
  Stack,
} from '@mui/material';
import {
  RiFacebookCircleFill as FacebookIcon,
  RiTwitterFill as TwitterIcon,
  RiInstagramLine as InstagramIcon,
  RiYoutubeLine as YoutubeIcon,
  RiMailLine as EmailIcon,
  RiPhoneLine as PhoneIcon,
  RiMapPinLine as LocationIcon,
} from 'react-icons/ri';

import AppLogo from '../logo/AppLogo';

export default function Footer() {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'black',
        color: 'white',
        py: 6,
        borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ mb: 3 }}>
              <AppLogo type="compact" />
            </Box>
            <Typography
              variant="body2"
              sx={{
                mb: 3,
                lineHeight: 1.7,
                opacity: 0.8,
              }}
            >
              Of Substance presents meaningful films that spark conversations,
              foster understanding, and inspire positive change. Our collection
              tells stories that matter, revealing the beauty of the human
              experience.
            </Typography>
            <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
              <IconButton
                sx={{
                  color: '#1877F2',
                  backgroundColor: alpha('#1877F2', 0.1),
                  '&:hover': { backgroundColor: alpha('#1877F2', 0.2) },
                  transition: 'all 0.2s ease',
                }}
                size="small"
                aria-label="Facebook"
              >
                <FacebookIcon size={20} />
              </IconButton>
              <IconButton
                sx={{
                  color: '#1DA1F2',
                  backgroundColor: alpha('#1DA1F2', 0.1),
                  '&:hover': { backgroundColor: alpha('#1DA1F2', 0.2) },
                  transition: 'all 0.2s ease',
                }}
                size="small"
                aria-label="Twitter"
              >
                <TwitterIcon size={20} />
              </IconButton>
              <IconButton
                sx={{
                  color: '#E4405F',
                  backgroundColor: alpha('#E4405F', 0.1),
                  '&:hover': { backgroundColor: alpha('#E4405F', 0.2) },
                  transition: 'all 0.2s ease',
                }}
                size="small"
                aria-label="Instagram"
              >
                <InstagramIcon size={20} />
              </IconButton>
              <IconButton
                sx={{
                  color: '#FF0000',
                  backgroundColor: alpha('#FF0000', 0.1),
                  '&:hover': { backgroundColor: alpha('#FF0000', 0.2) },
                  transition: 'all 0.2s ease',
                }}
                size="small"
                aria-label="YouTube"
              >
                <YoutubeIcon size={20} />
              </IconButton>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -8,
                  width: 40,
                  height: 2,
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1.5}>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: alpha(theme.palette.common.white, 0.8),
                  '&:hover': {
                    color: theme.palette.common.white,
                    transform: 'translateX(5px)',
                  },
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                }}
              >
                Home
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: alpha(theme.palette.common.white, 0.8),
                  '&:hover': {
                    color: theme.palette.common.white,
                    transform: 'translateX(5px)',
                  },
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                }}
              >
                About Us
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: alpha(theme.palette.common.white, 0.8),
                  '&:hover': {
                    color: theme.palette.common.white,
                    transform: 'translateX(5px)',
                  },
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                }}
              >
                Films
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  color: alpha(theme.palette.common.white, 0.8),
                  '&:hover': {
                    color: theme.palette.common.white,
                    transform: 'translateX(5px)',
                  },
                  display: 'inline-block',
                  transition: 'all 0.2s ease',
                }}
              >
                Contact
              </Link>
            </Stack>
          </Grid>

          <Grid item xs={12} sm={6} md={5}>
            <Typography
              variant="h6"
              sx={{
                mb: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                position: 'relative',
                '&:after': {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  bottom: -8,
                  width: 40,
                  height: 2,
                  backgroundColor: theme.palette.primary.main,
                },
              }}
            >
              Contact Us
            </Typography>
            <Stack spacing={2}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                  }}
                >
                  <LocationIcon size={20} color={theme.palette.primary.main} />
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.8 }}>
                  123 Film Street, Creative District, CA 90210
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                  }}
                >
                  <EmailIcon size={20} color={theme.palette.primary.main} />
                </Box>
                <Link
                  href="mailto:contact@ofsubstance.com"
                  underline="none"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.8),
                    '&:hover': { color: theme.palette.primary.main },
                    transition: 'color 0.2s ease',
                  }}
                >
                  contact@ofsubstance.com
                </Link>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: 1,
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    display: 'flex',
                  }}
                >
                  <PhoneIcon size={20} color={theme.palette.primary.main} />
                </Box>
                <Link
                  href="tel:+1-800-123-4567"
                  underline="none"
                  sx={{
                    color: alpha(theme.palette.common.white, 0.8),
                    '&:hover': { color: theme.palette.primary.main },
                    transition: 'color 0.2s ease',
                  }}
                >
                  +1 (800) 123-4567
                </Link>
              </Box>
            </Stack>
          </Grid>
        </Grid>

        <Divider
          sx={{
            mt: 5,
            mb: 3,
            borderColor: alpha(theme.palette.common.white, 0.1),
          }}
        />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'center', sm: 'center' },
            gap: { xs: 2, sm: 0 },
          }}
        >
          <Typography variant="body2" sx={{ opacity: 0.6 }}>
            © {currentYear} Of Substance. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3 }}>
            <Link
              href="#"
              underline="none"
              sx={{
                fontSize: '0.875rem',
                color: alpha(theme.palette.common.white, 0.6),
                '&:hover': { color: theme.palette.common.white },
              }}
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              underline="none"
              sx={{
                fontSize: '0.875rem',
                color: alpha(theme.palette.common.white, 0.6),
                '&:hover': { color: theme.palette.common.white },
              }}
            >
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

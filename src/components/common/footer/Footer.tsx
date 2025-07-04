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
  Paper,
  Chip,
} from '@mui/material';
import {
  RiFacebookCircleFill as FacebookIcon,
  RiTwitterFill as TwitterIcon,
  RiInstagramLine as InstagramIcon,
  RiYoutubeLine as YoutubeIcon,
  RiMailLine as EmailIcon,
  RiPhoneLine as PhoneIcon,
  RiExternalLinkLine as ExternalIcon,
  RiHeartFill as HeartIcon,
} from 'react-icons/ri';

import AppLogo from '../logo/AppLogo';

export default function Footer() {
  const theme = useTheme();

  const currentYear = new Date().getFullYear();

  return (
    <Box
      component="footer"
      sx={{
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${alpha(
            theme.palette.primary.main,
            0.5
          )}, transparent)`,
        },
      }}
    >
      {/* Decorative background elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.1
          )} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -30,
          left: -30,
          width: 150,
          height: 150,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${alpha(
            theme.palette.primary.main,
            0.08
          )} 0%, transparent 70%)`,
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ py: 8 }}>
          <Grid container spacing={6}>
            {/* Brand Section */}
            <Grid item xs={12} md={5}>
              <Stack spacing={4}>
                <Box>
                  <AppLogo type="compact" color="white" />
                  <Typography
                    variant="body1"
                    sx={{
                      mt: 2,
                      mb: 3,
                      lineHeight: 1.8,
                      fontSize: '1.1rem',
                      color: alpha(theme.palette.common.white, 0.9),
                      maxWidth: 400,
                    }}
                  >
                    Meaningful films that spark conversations, foster
                    understanding, and inspire positive change. Stories that
                    matter, revealing the beauty of the human experience.
                  </Typography>
                  <Chip
                    label="Curated with purpose"
                    size="small"
                    sx={{
                      backgroundColor: alpha(theme.palette.primary.main, 0.2),
                      color: theme.palette.primary.light,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.3
                      )}`,
                      fontWeight: 600,
                      '& .MuiChip-label': {
                        fontSize: '0.75rem',
                      },
                    }}
                  />
                </Box>

                {/* Social Media */}
                <Box>
                  <Typography
                    variant="h6"
                    sx={{
                      mb: 2,
                      fontSize: '1rem',
                      fontWeight: 600,
                      color: theme.palette.common.white,
                    }}
                  >
                    Follow Our Journey
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <IconButton
                      sx={{
                        width: 48,
                        height: 48,
                        background: `linear-gradient(135deg, #1877F2, #1557B8)`,
                        color: 'white',
                        '&:hover': {
                          background: `linear-gradient(135deg, #1557B8, #1877F2)`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(24, 119, 242, 0.3)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      aria-label="Facebook"
                    >
                      <FacebookIcon size={22} />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: 48,
                        height: 48,
                        background: `linear-gradient(135deg, #1DA1F2, #0F7CC4)`,
                        color: 'white',
                        '&:hover': {
                          background: `linear-gradient(135deg, #0F7CC4, #1DA1F2)`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(29, 161, 242, 0.3)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      aria-label="Twitter"
                    >
                      <TwitterIcon size={22} />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: 48,
                        height: 48,
                        background: `linear-gradient(135deg, #E4405F, #C72A47)`,
                        color: 'white',
                        '&:hover': {
                          background: `linear-gradient(135deg, #C72A47, #E4405F)`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(228, 64, 95, 0.3)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      aria-label="Instagram"
                    >
                      <InstagramIcon size={22} />
                    </IconButton>
                    <IconButton
                      sx={{
                        width: 48,
                        height: 48,
                        background: `linear-gradient(135deg, #FF0000, #CC0000)`,
                        color: 'white',
                        '&:hover': {
                          background: `linear-gradient(135deg, #CC0000, #FF0000)`,
                          transform: 'translateY(-2px)',
                          boxShadow: '0 8px 25px rgba(255, 0, 0, 0.3)',
                        },
                        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      }}
                      aria-label="YouTube"
                    >
                      <YoutubeIcon size={22} />
                    </IconButton>
                  </Stack>
                </Box>
              </Stack>
            </Grid>

            {/* Navigation Links */}
            <Grid item xs={12} sm={6} md={3}>
              <Stack spacing={3}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: theme.palette.common.white,
                    position: 'relative',
                    pb: 1,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: 30,
                      height: 3,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      borderRadius: 2,
                    },
                  }}
                >
                  Explore
                </Typography>
                <Stack spacing={2}>
                  {[
                    { label: 'Home', href: '#' },
                    { label: 'About Us', href: '#' },
                    { label: 'Films', href: '#' },
                    { label: 'Contact', href: '#' },
                  ].map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      underline="none"
                      sx={{
                        color: alpha(theme.palette.common.white, 0.8),
                        fontSize: '0.95rem',
                        fontWeight: 500,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 1,
                        py: 0.5,
                        '&:hover': {
                          color: theme.palette.primary.light,
                          transform: 'translateX(8px)',
                          '& .external-icon': {
                            opacity: 1,
                            transform: 'translateX(0)',
                          },
                        },
                        transition: 'all 0.3s ease',
                      }}
                    >
                      {item.label}
                      <ExternalIcon
                        size={14}
                        className="external-icon"
                        style={{
                          opacity: 0,
                          transform: 'translateX(-10px)',
                          transition: 'all 0.3s ease',
                        }}
                      />
                    </Link>
                  ))}
                </Stack>
              </Stack>
            </Grid>

            {/* Contact Information */}
            <Grid item xs={12} sm={6} md={4}>
              <Stack spacing={3}>
                <Typography
                  variant="h6"
                  sx={{
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: theme.palette.common.white,
                    position: 'relative',
                    pb: 1,
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      left: 0,
                      bottom: 0,
                      width: 30,
                      height: 3,
                      background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.light})`,
                      borderRadius: 2,
                    },
                  }}
                >
                  Get in Touch
                </Typography>
                <Stack spacing={3}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}, ${alpha(theme.palette.primary.main, 0.05)})`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.4
                        )}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}
                      >
                        <EmailIcon size={20} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: alpha(theme.palette.common.white, 0.7),
                            mb: 0.5,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          Email Us
                        </Typography>
                        <Link
                          href="mailto:contact@ofsubstance.com"
                          underline="none"
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            '&:hover': {
                              color: theme.palette.primary.light,
                            },
                            transition: 'color 0.2s ease',
                          }}
                        >
                          contact@ofsubstance.com
                        </Link>
                      </Box>
                    </Box>
                  </Paper>

                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      background: `linear-gradient(135deg, ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}, ${alpha(theme.palette.primary.main, 0.05)})`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.2
                      )}`,
                      borderRadius: 2,
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        border: `1px solid ${alpha(
                          theme.palette.primary.main,
                          0.4
                        )}`,
                        transform: 'translateY(-2px)',
                      },
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Box
                        sx={{
                          width: 44,
                          height: 44,
                          borderRadius: 2,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                        }}
                      >
                        <PhoneIcon size={20} />
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body2"
                          sx={{
                            color: alpha(theme.palette.common.white, 0.7),
                            mb: 0.5,
                            fontSize: '0.8rem',
                            fontWeight: 500,
                          }}
                        >
                          Call Us
                        </Typography>
                        <Link
                          href="tel:+1-800-123-4567"
                          underline="none"
                          sx={{
                            color: theme.palette.common.white,
                            fontSize: '0.95rem',
                            fontWeight: 600,
                            '&:hover': {
                              color: theme.palette.primary.light,
                            },
                            transition: 'color 0.2s ease',
                          }}
                        >
                          +1 (800) 123-4567
                        </Link>
                      </Box>
                    </Box>
                  </Paper>
                </Stack>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        {/* Bottom Section */}
        <Box
          sx={{
            borderTop: `1px solid ${alpha(theme.palette.common.white, 0.1)}`,
            pt: 4,
            pb: 4,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: { xs: 'column', md: 'row' },
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                order: { xs: 2, md: 1 },
              }}
            >
              <Typography
                variant="body2"
                sx={{
                  color: alpha(theme.palette.common.white, 0.7),
                  fontSize: '0.9rem',
                }}
              >
                © {currentYear} Of Substance. Made with
              </Typography>
              <HeartIcon
                size={16}
                style={{
                  color: theme.palette.primary.main,
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
              <Typography
                variant="body2"
                sx={{
                  color: alpha(theme.palette.common.white, 0.7),
                  fontSize: '0.9rem',
                }}
              >
                for meaningful storytelling
              </Typography>
            </Box>

            <Stack
              direction="row"
              spacing={4}
              sx={{
                order: { xs: 1, md: 2 },
              }}
            >
              <Link
                href="#"
                underline="none"
                sx={{
                  fontSize: '0.85rem',
                  color: alpha(theme.palette.common.white, 0.7),
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.light,
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                underline="none"
                sx={{
                  fontSize: '0.85rem',
                  color: alpha(theme.palette.common.white, 0.7),
                  fontWeight: 500,
                  '&:hover': {
                    color: theme.palette.primary.light,
                  },
                  transition: 'color 0.2s ease',
                }}
              >
                Terms of Service
              </Link>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* CSS Animation */}
      <style>
        {`
          @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.1); }
          }
        `}
      </style>
    </Box>
  );
}

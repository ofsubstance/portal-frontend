import {
  Card,
  Typography,
  Grid,
  Stack,
  Box,
  Chip,
  Link,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import {
  Person as UserIcon,
  Business as BusinessIcon,
  Language as WebsiteIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { UserDto } from '@/dtos/user.dto';

interface UserProfileCardProps {
  user: UserDto;
}

const UserProfileCard = ({ user }: UserProfileCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        mb: 4,
        p: 4,
        borderRadius: 2,
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          color: theme.palette.text.primary,
          fontWeight: 600,
          fontSize: '1.1rem',
          mb: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: 2,
            background: alpha(theme.palette.grey[100], 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <UserIcon sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
        </Box>
        User Profile Details
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: alpha(theme.palette.grey[100], 0.6),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <BusinessIcon sx={{ color: theme.palette.grey[600] }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem', mb: 0.5 }}
                >
                  Business Information
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ fontSize: '1rem' }}
                >
                  {user.profile.business_name}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: alpha(theme.palette.grey[100], 0.6),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <WebsiteIcon sx={{ color: theme.palette.grey[600] }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem', mb: 0.5 }}
                >
                  Website
                </Typography>
                <Link
                  href={
                    user.profile.website.startsWith('http')
                      ? user.profile.website
                      : `https://${user.profile.website}`
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                  }}
                >
                  {user.profile.website}
                </Link>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  background: alpha(theme.palette.grey[100], 0.6),
                  border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                }}
              >
                <LocationIcon sx={{ color: theme.palette.grey[600] }} />
              </Box>
              <Box>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  sx={{ fontSize: '0.8rem', mb: 0.5 }}
                >
                  Location
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{ fontSize: '1rem' }}
                >
                  {user.profile.state_region}, {user.profile.country}
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Grid>

        <Grid item xs={12} md={6}>
          <Stack spacing={3}>
            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: '0.8rem', fontWeight: 600 }}
              >
                Usage Purpose
              </Typography>
              <Chip
                label={user.profile.utilization_purpose}
                variant="outlined"
                sx={{
                  fontSize: '0.85rem',
                  fontWeight: 500,
                  borderColor: alpha(theme.palette.divider, 0.3),
                  color: theme.palette.text.secondary,
                }}
              />
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: '0.8rem', fontWeight: 600 }}
              >
                Areas of Interest
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                {user.profile.interests.map((interest) => (
                  <Chip
                    key={interest}
                    label={interest}
                    size="small"
                    variant="outlined"
                    sx={{
                      fontSize: '0.75rem',
                      fontWeight: 500,
                      borderColor: alpha(theme.palette.divider, 0.3),
                      color: theme.palette.text.secondary,
                    }}
                  />
                ))}
              </Box>
            </Box>

            <Box>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
                sx={{ fontSize: '0.8rem', fontWeight: 600 }}
              >
                Account Status
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5 }}>
                <Chip
                  label={user.role}
                  color={user.role === 'admin' ? 'primary' : 'default'}
                  variant="outlined"
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                />
                <Chip
                  label={user.status}
                  color={user.status === 'active' ? 'success' : 'error'}
                  variant="outlined"
                  sx={{
                    fontSize: '0.85rem',
                    fontWeight: 600,
                  }}
                />
              </Box>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserProfileCard;

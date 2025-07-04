import { useState, useEffect } from 'react';
import { Box, CircularProgress, Typography, Grid } from '@mui/material';
import { UserDto, UserEngagementDto } from '@/dtos/user.dto';
import userService from '@/services/user.service';
import UserProfileCard from './UserProfileCard';
import UserStatsOverview from './UserStatsOverview';
import UserEngagementStats from './UserEngagementStats';
import UserVideoHistory from './UserVideoHistory';
import UserTrendsCard from './UserTrendsCard';

interface UserEngagementDetailsProps {
  userId: string;
  user: UserDto;
}

const UserEngagementDetails = ({
  userId,
  user,
}: UserEngagementDetailsProps) => {
  const [engagement, setEngagement] = useState<UserEngagementDto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEngagement = async () => {
      try {
        const data = await userService.getUserEngagement(userId);
        setEngagement(data);
      } catch (err) {
        setError('Failed to load user engagement data');
      } finally {
        setLoading(false);
      }
    };

    fetchEngagement();
  }, [userId]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          p: 6,
          minHeight: 200,
          bgcolor: 'background.default',
        }}
      >
        <CircularProgress size={32} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          p: 6,
          color: 'error.main',
          bgcolor: 'background.default',
          textAlign: 'center',
        }}
      >
        <Typography>{error}</Typography>
      </Box>
    );
  }

  if (!engagement) {
    return (
      <Box
        sx={{
          p: 6,
          bgcolor: 'background.default',
          textAlign: 'center',
        }}
      >
        <Typography>No engagement data available</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.default',
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      {/* User Profile Summary */}
      <UserProfileCard user={user} />

      {/* Engagement Overview */}
      <UserStatsOverview engagement={engagement} />

      {/* Detailed Statistics */}
      <UserEngagementStats engagement={engagement} />

      {/* Video History and Trends */}
      <Grid container spacing={3} sx={{ mt: 1 }}>
        {engagement.videoSpecificStats.length > 0 && (
          <Grid item xs={12}>
            <UserVideoHistory engagement={engagement} />
          </Grid>
        )}
        <Grid item xs={12}>
          <UserTrendsCard engagement={engagement} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserEngagementDetails;

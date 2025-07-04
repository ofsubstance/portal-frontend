import { Card, Grid, Typography, Box, Paper, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { TrendingUp as TrendIcon } from '@mui/icons-material';
import { UserEngagementDto } from '@/dtos/user.dto';

interface UserTrendsCardProps {
  engagement: UserEngagementDto;
}

const UserTrendsCard = ({ engagement }: UserTrendsCardProps) => {
  const theme = useTheme();

  const StatPaper = ({ children, ...props }: any) => (
    <Paper
      sx={{
        p: 2.5,
        background: alpha(theme.palette.grey[50], 0.5),
        textAlign: 'center',
        borderRadius: 2,
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-1px)',
          boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
        },
      }}
      {...props}
    >
      {children}
    </Paper>
  );

  return (
    <Card
      sx={{
        p: 3,
        borderRadius: 2,
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
        boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
        transition: 'all 0.2s ease',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            background: alpha(theme.palette.grey[100], 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <TrendIcon sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
        </Box>
        <Typography variant="h6" fontSize="1.1rem" fontWeight={600}>
          30-Day Trends
        </Typography>
      </Box>
      <Grid container spacing={2}>
        <Grid item xs={6} sm={3}>
          <StatPaper>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={700}
              sx={{ mb: 0.5 }}
            >
              {engagement.engagementTrends.last30Days.totalWatchSessions}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Watch Sessions
            </Typography>
          </StatPaper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatPaper>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={700}
              sx={{ mb: 0.5 }}
            >
              {engagement.engagementTrends.last30Days.totalWatchTimeMinutes}m
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Watch Time
            </Typography>
          </StatPaper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatPaper>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={700}
              sx={{ mb: 0.5 }}
            >
              {engagement.engagementTrends.last30Days.averageWatchPercentage}%
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Avg Watch %
            </Typography>
          </StatPaper>
        </Grid>
        <Grid item xs={6} sm={3}>
          <StatPaper>
            <Typography
              variant="h5"
              color="text.primary"
              fontWeight={700}
              sx={{ mb: 0.5 }}
            >
              {engagement.engagementTrends.last30Days.uniqueVideosWatched}
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              fontWeight={500}
            >
              Unique Videos
            </Typography>
          </StatPaper>
        </Grid>
      </Grid>
    </Card>
  );
};

export default UserTrendsCard;

import { Card, Grid, Typography, Box, Paper, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { format } from 'date-fns';
import {
  Timeline as StatsIcon,
  PlayCircle as WatchIcon,
} from '@mui/icons-material';
import { UserEngagementDto } from '@/dtos/user.dto';

interface UserEngagementStatsProps {
  engagement: UserEngagementDto;
}

const UserEngagementStats = ({ engagement }: UserEngagementStatsProps) => {
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
    <Grid container spacing={3}>
      {/* Session Stats */}
      <Grid item xs={12} lg={6}>
        <Card
          sx={{
            p: 3,
            height: '100%',
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
              <StatsIcon
                sx={{ color: theme.palette.grey[600], fontSize: 20 }}
              />
            </Box>
            <Typography variant="h6" fontSize="1.1rem" fontWeight={600}>
              Session Statistics
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.sessionStats.activeSessions}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Active Sessions
                </Typography>
              </StatPaper>
            </Grid>
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.sessionStats.engagedSessions}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Engaged Sessions
                </Typography>
              </StatPaper>
            </Grid>
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {Math.round(
                    engagement.sessionStats.averageSessionDuration / 60
                  )}
                  m
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Avg Duration
                </Typography>
              </StatPaper>
            </Grid>
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.sessionStats.lastSessionDate
                    ? format(
                        new Date(engagement.sessionStats.lastSessionDate),
                        'MMM dd'
                      )
                    : '-'}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Last Session
                </Typography>
              </StatPaper>
            </Grid>
          </Grid>
        </Card>
      </Grid>

      {/* Watch Stats */}
      <Grid item xs={12} lg={6}>
        <Card
          sx={{
            p: 3,
            height: '100%',
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
              <WatchIcon
                sx={{ color: theme.palette.grey[600], fontSize: 20 }}
              />
            </Box>
            <Typography variant="h6" fontSize="1.1rem" fontWeight={600}>
              Watch Statistics
            </Typography>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.watchStats.totalWatchSessions}
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
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.watchStats.averageWatchPercentage}%
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
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.watchStats.completedVideos}
                </Typography>
                <Typography
                  variant="caption"
                  color="text.secondary"
                  fontWeight={500}
                >
                  Completed Videos
                </Typography>
              </StatPaper>
            </Grid>
            <Grid item xs={6}>
              <StatPaper>
                <Typography
                  variant="h5"
                  color="text.primary"
                  fontWeight={700}
                  sx={{ mb: 0.5 }}
                >
                  {engagement.watchStats.uniqueVideosWatched}
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
      </Grid>
    </Grid>
  );
};

export default UserEngagementStats;

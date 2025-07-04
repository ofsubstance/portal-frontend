import { Card, Typography, Box, Chip, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { VideoLibrary as VideoIcon } from '@mui/icons-material';
import { UserEngagementDto } from '@/dtos/user.dto';

interface UserVideoHistoryProps {
  engagement: UserEngagementDto;
}

const UserVideoHistory = ({ engagement }: UserVideoHistoryProps) => {
  const theme = useTheme();

  if (engagement.videoSpecificStats.length === 0) {
    return null;
  }

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
          <VideoIcon sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
        </Box>
        <Typography variant="h6" fontSize="1.1rem" fontWeight={600}>
          Recent Video Activity
        </Typography>
      </Box>
      <Box
        sx={{
          maxHeight: 250,
          overflowY: 'auto',
          border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
          borderRadius: 2,
          background: alpha(theme.palette.grey[50], 0.3),
        }}
      >
        {engagement.videoSpecificStats.slice(0, 5).map((video, index) => (
          <Box
            key={index}
            sx={{
              p: 2.5,
              borderBottom:
                index < 4
                  ? `1px solid ${alpha(theme.palette.divider, 0.1)}`
                  : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              transition: 'all 0.2s ease',
              '&:hover': {
                backgroundColor: alpha(theme.palette.grey[100], 0.3),
              },
            }}
          >
            <Box>
              <Typography variant="body1" fontWeight={600} sx={{ mb: 0.5 }}>
                {video.videoTitle}
              </Typography>
              <Typography
                variant="caption"
                color="text.secondary"
                fontWeight={500}
              >
                {video.totalSessions} sessions • {video.totalWatchTimeMinutes}m
                watch time
              </Typography>
            </Box>
            <Chip
              label={`${video.averageWatchPercentage}%`}
              variant="outlined"
              sx={{
                fontWeight: 600,
                fontSize: '0.8rem',
                borderColor: alpha(theme.palette.divider, 0.3),
                color: theme.palette.text.secondary,
              }}
            />
          </Box>
        ))}
      </Box>
    </Card>
  );
};

export default UserVideoHistory;

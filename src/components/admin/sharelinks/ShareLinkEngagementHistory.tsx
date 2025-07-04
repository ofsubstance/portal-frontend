import { Box, Typography, Paper, Chip, Tooltip } from '@mui/material';
import {
  RiUserLine as VisitorIcon,
  RiTimeLine as TimeIcon,
} from 'react-icons/ri';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { EngagementDetail } from '@/dtos/sharelink.dto';

dayjs.extend(relativeTime);

interface ShareLinkEngagementHistoryProps {
  engagementDetails: EngagementDetail[];
}

export default function ShareLinkEngagementHistory({
  engagementDetails,
}: ShareLinkEngagementHistoryProps) {
  const formatDate = (dateString: string) => {
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  if (!engagementDetails.length) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <TimeIcon size={48} color="gray" />
        <Typography variant="h6" color="text.secondary" sx={{ mt: 2, mb: 1 }}>
          No Engagement Data
        </Typography>
        <Typography variant="body2" color="text.secondary">
          This share link hasn't been accessed yet.
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Engagement History
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Showing {engagementDetails.length} access
        {engagementDetails.length === 1 ? '' : 'es'} in chronological order
      </Typography>

      <Paper
        elevation={0}
        sx={{
          border: '1px solid',
          borderColor: 'grey.200',
          borderRadius: 2,
          backgroundColor: 'grey.50',
          maxHeight: 450,
          overflow: 'auto',
        }}
      >
        {engagementDetails.map((detail, index) => (
          <Box
            key={index}
            sx={{
              p: 2.5,
              borderBottom:
                index < engagementDetails.length - 1
                  ? '1px solid rgba(0,0,0,0.08)'
                  : 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
              transition: 'background-color 0.2s',
              '&:hover': {
                backgroundColor: 'grey.100',
              },
            }}
          >
            <Box
              sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}
            >
              <Box
                sx={{
                  p: 1,
                  borderRadius: 1,
                  backgroundColor: 'grey.100',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'text.secondary',
                }}
              >
                <VisitorIcon size={16} />
              </Box>
              <Box>
                <Typography variant="body2" fontWeight={500}>
                  {formatDate(detail.time)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(detail.time).fromNow()}
                </Typography>
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Chip
                label={detail.is_unique ? 'Unique' : 'Return'}
                size="small"
                variant={detail.is_unique ? 'filled' : 'outlined'}
                color={detail.is_unique ? 'primary' : 'default'}
                sx={{
                  fontWeight: 500,
                  fontSize: '0.75rem',
                  height: 24,
                  '& .MuiChip-label': {
                    px: 1,
                  },
                }}
              />
              <Tooltip title={`Access time: ${formatDate(detail.time)}`}>
                <Chip
                  label={dayjs(detail.time).format('h:mm A')}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontWeight: 400,
                    fontSize: '0.75rem',
                    height: 24,
                    color: 'text.secondary',
                    borderColor: 'grey.300',
                    '& .MuiChip-label': {
                      px: 1,
                    },
                  }}
                />
              </Tooltip>
            </Box>
          </Box>
        ))}
      </Paper>
    </Box>
  );
}

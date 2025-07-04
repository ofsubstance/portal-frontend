import { Box, Typography, Grid, Paper } from '@mui/material';
import {
  RiEyeLine as ViewsIcon,
  RiUserLine as VisitorsIcon,
  RiTimeLine as DurationIcon,
  RiCalendarLine as DateIcon,
  RiExternalLinkLine as LinkIcon,
} from 'react-icons/ri';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { ShareLinkAnalyticsDto } from '@/dtos/sharelink.dto';
import ShareLinkStatsCard from './ShareLinkStatsCard';

dayjs.extend(relativeTime);

interface ShareLinkAnalyticsOverviewProps {
  shareLink: ShareLinkAnalyticsDto;
}

export default function ShareLinkAnalyticsOverview({
  shareLink,
}: ShareLinkAnalyticsOverviewProps) {
  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  const getEngagementRate = () => {
    if (shareLink.views === 0) return '0%';
    return `${Math.round(
      (shareLink.unique_visitors / shareLink.views) * 100
    )}%`;
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom fontWeight={600}>
        Analytics Overview
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Performance metrics for this share link
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={3}>
          <ShareLinkStatsCard
            title="Total Views"
            value={shareLink.views}
            icon={<ViewsIcon size={20} />}
            subtitle="Total video views"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ShareLinkStatsCard
            title="Unique Visitors"
            value={shareLink.unique_visitors}
            icon={<VisitorsIcon size={20} />}
            subtitle="Individual users"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ShareLinkStatsCard
            title="Engagement Rate"
            value={getEngagementRate()}
            icon={<LinkIcon size={20} />}
            subtitle="Unique visitors / total views"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <ShareLinkStatsCard
            title="Days Active"
            value={
              shareLink.is_expired
                ? 'Expired'
                : `${shareLink.days_until_expiration}`
            }
            icon={<DurationIcon size={20} />}
            subtitle={shareLink.is_expired ? 'Link expired' : 'Days remaining'}
          />
        </Grid>
      </Grid>

      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom>
          Link Details
        </Typography>
        <Paper
          elevation={0}
          sx={{
            p: 2,
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            backgroundColor: 'grey.50',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Created
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {formatDate(shareLink.created_at)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {dayjs(shareLink.created_at).fromNow()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Expires
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {formatDate(shareLink.expiration_time)}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {shareLink.is_expired
                    ? 'Expired'
                    : dayjs(shareLink.expiration_time).fromNow()}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Last Activity
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {shareLink.last_engagement
                    ? formatDate(shareLink.last_engagement)
                    : 'No activity yet'}
                </Typography>
                {shareLink.last_engagement && (
                  <Typography variant="caption" color="text.secondary">
                    {dayjs(shareLink.last_engagement).fromNow()}
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Created By
                </Typography>
                <Typography variant="body1" fontWeight={500}>
                  {shareLink.user.name}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {shareLink.user.email}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

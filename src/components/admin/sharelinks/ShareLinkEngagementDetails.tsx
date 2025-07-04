import { Box, Paper, Divider } from '@mui/material';
import { ShareLinkAnalyticsDto } from '@/dtos/sharelink.dto';
import ShareLinkAnalyticsOverview from './ShareLinkAnalyticsOverview';
import ShareLinkEngagementHistory from './ShareLinkEngagementHistory';

interface ShareLinkEngagementDetailsProps {
  shareLink: ShareLinkAnalyticsDto;
}

export default function ShareLinkEngagementDetails({
  shareLink,
}: ShareLinkEngagementDetailsProps) {
  return (
    <Box
      sx={{
        p: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1200px' }}>
        <Paper
          elevation={0}
          sx={{
            border: '1px solid',
            borderColor: 'grey.200',
            borderRadius: 2,
            overflow: 'hidden',
            backgroundColor: 'background.paper',
          }}
        >
          <ShareLinkAnalyticsOverview shareLink={shareLink} />
          <Divider sx={{ borderColor: 'grey.200' }} />
          <ShareLinkEngagementHistory
            engagementDetails={shareLink.engagement_details}
          />
        </Paper>
      </Box>
    </Box>
  );
}

import { Grid } from '@mui/material';
import {
  AccessTime as TimeIcon,
  Timeline as StatsIcon,
  Visibility as ViewsIcon,
  Share as ShareIcon,
} from '@mui/icons-material';
import { UserEngagementDto } from '@/dtos/user.dto';
import { StatCard } from '@/components/common';

interface UserStatsOverviewProps {
  engagement: UserEngagementDto;
}

const UserStatsOverview = ({ engagement }: UserStatsOverviewProps) => {
  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      <Grid item xs={6} sm={3}>
        <StatCard
          title="Sessions"
          value={engagement.sessionStats.totalSessions}
          icon={StatsIcon}
          color="secondary"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StatCard
          title="Engagement"
          value={`${engagement.sessionStats.engagementRate}%`}
          icon={ViewsIcon}
          color="success"
        />
      </Grid>
      <Grid item xs={6} sm={3}>
        <StatCard
          title="Shares"
          value={engagement.shareableLinks.totalLinks}
          icon={ShareIcon}
          color="info"
        />
      </Grid>
    </Grid>
  );
};

export default UserStatsOverview;

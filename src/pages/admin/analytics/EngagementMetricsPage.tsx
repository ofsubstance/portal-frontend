import { Paper, Typography, Grid, Box, Tabs, Tab } from '@mui/material';
import { RiUserHeartLine as EngagementIcon } from 'react-icons/ri';
import { useState } from 'react';

// Metric Card Component
interface MetricCardProps {
  title: string;
  value: string;
  unit: string;
  change: number;
  icon: React.ComponentType<{ size: number; color: string }>;
}

function MetricCard({
  title,
  value,
  unit,
  change,
  icon: Icon,
}: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Box display="flex" alignItems="center" mb={2}>
        <Box
          sx={{
            backgroundColor: 'primary.light',
            borderRadius: '50%',
            width: 40,
            height: 40,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mr: 2,
          }}
        >
          <Icon size={20} color="#fff" />
        </Box>
        <Typography variant="h6" fontWeight={500}>
          {title}
        </Typography>
      </Box>

      <Typography variant="h4" fontWeight={600} mb={1}>
        {value}{' '}
        <Typography component="span" variant="body2" color="text.secondary">
          {unit}
        </Typography>
      </Typography>

      <Typography
        variant="body2"
        color={isPositive ? 'success.main' : 'error.main'}
        display="flex"
        alignItems="center"
      >
        {isPositive ? '↑' : '↓'} {Math.abs(change)}% from last month
      </Typography>
    </Paper>
  );
}

// Chart Component Placeholder
function ChartPlaceholder({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <Paper elevation={1} sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" fontWeight={500} mb={1}>
        {title}
      </Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        {description}
      </Typography>
      <Box
        sx={{
          height: 250,
          backgroundColor: 'rgba(0,0,0,0.03)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 1,
        }}
      >
        <Typography color="text.secondary">
          Chart visualization would appear here
        </Typography>
      </Box>
    </Paper>
  );
}

function EngagementMetricsPage() {
  const [timeRange, setTimeRange] = useState(0);

  const handleTimeRangeChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTimeRange(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            User Engagement Metrics
          </Typography>

          <Typography variant="subtitle1">
            Track and analyze user engagement with the platform
          </Typography>
        </div>
        <Box
          sx={{
            backgroundColor: 'primary.light',
            borderRadius: '50%',
            width: 60,
            height: 60,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <EngagementIcon size={30} color="#fff" />
        </Box>
      </Paper>

      {/* Time Range Selector */}
      <Paper sx={{ p: 1, mb: 2 }}>
        <Tabs
          value={timeRange}
          onChange={handleTimeRangeChange}
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Last 7 Days" />
          <Tab label="Last 30 Days" />
          <Tab label="Last 90 Days" />
          <Tab label="Last 12 Months" />
          <Tab label="Custom Range" />
        </Tabs>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Daily Active Users"
            value="2,845"
            unit="users"
            change={12.5}
            icon={EngagementIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Session Duration"
            value="8:24"
            unit="min"
            change={5.3}
            icon={EngagementIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Retention Rate"
            value="68"
            unit="%"
            change={3.2}
            icon={EngagementIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Bounce Rate"
            value="24"
            unit="%"
            change={-8.7}
            icon={EngagementIcon}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="User Activity by Time of Day"
            description="Distribution of user activity across different hours of the day"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="User Retention Cohort"
            description="Retention rates for different user cohorts over time"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Session Duration Distribution"
            description="Distribution of user session durations"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="User Growth Trend"
            description="New and returning users over time"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default EngagementMetricsPage;

import { Paper, Typography, Grid, Box } from '@mui/material';
import { RiLineChartLine as PerformanceIcon } from 'react-icons/ri';

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

function PerformanceMetricsPage() {
  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            App Performance Metrics
          </Typography>

          <Typography variant="subtitle1">
            Monitor and analyze application performance metrics
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
          <PerformanceIcon size={30} color="#fff" />
        </Box>
      </Paper>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Response Time"
            value="380"
            unit="ms"
            change={-5.2}
            icon={PerformanceIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Error Rate"
            value="0.9"
            unit="%"
            change={-25}
            icon={PerformanceIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="API Calls"
            value="17.5k"
            unit="/day"
            change={8.0}
            icon={PerformanceIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Load Time"
            value="1.8"
            unit="sec"
            change={-5.3}
            icon={PerformanceIcon}
          />
        </Grid>
      </Grid>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Server Response Time Trend"
            description="Average server response time in milliseconds over the past 6 months"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Error Rate Trend"
            description="Application error rate percentage over the past 6 months"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="API Calls Volume"
            description="Daily API call volume over the past 6 months"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Page Load Time"
            description="Average page load time in seconds over the past 6 months"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default PerformanceMetricsPage;

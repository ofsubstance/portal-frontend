import {
  Paper,
  Typography,
  Grid,
  Box,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { RiBarChartBoxLine as MacroMetricsIcon } from 'react-icons/ri';
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

// Mock data for content categories
const contentCategories = [
  {
    category: 'Documentary',
    views: 45280,
    avgWatchTime: '12:45',
    completionRate: 68,
    engagement: 4.2,
  },
  {
    category: 'Educational',
    views: 38750,
    avgWatchTime: '8:30',
    completionRate: 72,
    engagement: 4.5,
  },
  {
    category: 'Interviews',
    views: 29450,
    avgWatchTime: '15:20',
    completionRate: 65,
    engagement: 4.0,
  },
  {
    category: 'Short Films',
    views: 52680,
    avgWatchTime: '6:15',
    completionRate: 82,
    engagement: 4.7,
  },
  {
    category: 'Tutorials',
    views: 31240,
    avgWatchTime: '10:50',
    completionRate: 75,
    engagement: 4.3,
  },
];

function MacroContentMetricsPage() {
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
            Macro Content Engagement Metrics
          </Typography>

          <Typography variant="subtitle1">
            Analyze high-level content engagement patterns across the platform
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
          <MacroMetricsIcon size={30} color="#fff" />
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
            title="Total Content Views"
            value="197.4K"
            unit="views"
            change={15.8}
            icon={MacroMetricsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Watch Time"
            value="10:35"
            unit="min"
            change={7.2}
            icon={MacroMetricsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Content Completion Rate"
            value="72"
            unit="%"
            change={4.5}
            icon={MacroMetricsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Engagement Score"
            value="4.3"
            unit="/5"
            change={2.4}
            icon={MacroMetricsIcon}
          />
        </Grid>
      </Grid>

      {/* Content Category Performance */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={500} mb={2}>
          Content Category Performance
        </Typography>
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600}>Category</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Views</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Avg. Watch Time</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Completion Rate (%)</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Engagement Score</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contentCategories.map((row) => (
                <TableRow key={row.category}>
                  <TableCell component="th" scope="row">
                    {row.category}
                  </TableCell>
                  <TableCell align="right">
                    {row.views.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">{row.avgWatchTime}</TableCell>
                  <TableCell align="right">{row.completionRate}%</TableCell>
                  <TableCell align="right">{row.engagement}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Charts */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Content Views by Category"
            description="Distribution of content views across different categories"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Engagement Score Trend"
            description="Average engagement score trend over time"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Watch Time Distribution"
            description="Distribution of watch time across content"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Completion Rate by Content Length"
            description="Correlation between content length and completion rate"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default MacroContentMetricsPage;

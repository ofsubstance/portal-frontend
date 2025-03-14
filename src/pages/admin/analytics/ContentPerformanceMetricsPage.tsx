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
  Chip,
  Avatar,
} from '@mui/material';
import { RiBarChartGroupedLine as ContentMetricsIcon } from 'react-icons/ri';
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

// Mock data for top performing content
const topPerformingContent = [
  {
    id: 1,
    title: 'The Future of Storytelling',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649443692195-U0VTSEYT7EPXFKFRUBWT/Slide%2B1.jpg',
    views: 12450,
    engagement: 4.8,
    completionRate: 85,
    shareRate: 12.3,
  },
  {
    id: 2,
    title: 'Trapped',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649442525770-8J75N5GLA1D2WGVANJE1/Trapped+-+Vimeo+Thumbnail.png',
    views: 9870,
    engagement: 4.6,
    completionRate: 78,
    shareRate: 8.7,
  },
  {
    id: 3,
    title: 'Day 96',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649442673872-FE667OKK8O8GKJDNI9PD/Slide%2B28.jpg',
    views: 8540,
    engagement: 4.5,
    completionRate: 82,
    shareRate: 10.2,
  },
  {
    id: 4,
    title: 'The Art of Visual Storytelling',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649443692195-U0VTSEYT7EPXFKFRUBWT/Slide%2B1.jpg',
    views: 7650,
    engagement: 4.7,
    completionRate: 80,
    shareRate: 9.5,
  },
  {
    id: 5,
    title: 'Behind the Scenes: Documentary Filmmaking',
    thumbnail:
      'https://images.squarespace-cdn.com/content/v1/6247629c7ddcb32cb3082400/1649442673872-FE667OKK8O8GKJDNI9PD/Slide%2B28.jpg',
    views: 6980,
    engagement: 4.4,
    completionRate: 75,
    shareRate: 7.8,
  },
];

function ContentPerformanceMetricsPage() {
  const [timeRange, setTimeRange] = useState(0);
  const [contentType, setContentType] = useState(0);

  const handleTimeRangeChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setTimeRange(newValue);
  };

  const handleContentTypeChange = (
    _event: React.SyntheticEvent,
    newValue: number
  ) => {
    setContentType(newValue);
  };

  return (
    <div className="flex flex-col gap-5">
      <Paper className="md:flex-row flex-col-reverse flex items-center justify-between gap-5 px-4 py-6">
        <div className="space-y-4">
          <Typography variant="h5" fontWeight={600}>
            Content Performance Metrics
          </Typography>

          <Typography variant="subtitle1">
            Detailed analysis of individual content performance
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
          <ContentMetricsIcon size={30} color="#fff" />
        </Box>
      </Paper>

      {/* Filters */}
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 1, mb: 2 }}>
            <Typography variant="body2" color="text.secondary" px={1} pt={1}>
              Time Period
            </Typography>
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
            </Tabs>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 1, mb: 2 }}>
            <Typography variant="body2" color="text.secondary" px={1} pt={1}>
              Content Type
            </Typography>
            <Tabs
              value={contentType}
              onChange={handleContentTypeChange}
              variant="scrollable"
              scrollButtons="auto"
            >
              <Tab label="All Content" />
              <Tab label="Videos" />
              <Tab label="Articles" />
              <Tab label="Podcasts" />
            </Tabs>
          </Paper>
        </Grid>
      </Grid>

      {/* Key Metrics */}
      <Grid container spacing={3} mb={3}>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Top Content Views"
            value="12.4K"
            unit="views"
            change={18.3}
            icon={ContentMetricsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Engagement"
            value="4.6"
            unit="/5"
            change={5.8}
            icon={ContentMetricsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Avg. Completion Rate"
            value="80"
            unit="%"
            change={3.2}
            icon={ContentMetricsIcon}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <MetricCard
            title="Share Rate"
            value="9.7"
            unit="%"
            change={12.5}
            icon={ContentMetricsIcon}
          />
        </Grid>
      </Grid>

      {/* Top Performing Content */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" fontWeight={500} mb={2}>
          Top Performing Content
        </Typography>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>
                  <Typography fontWeight={600}>Content</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Views</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Engagement</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Completion</Typography>
                </TableCell>
                <TableCell align="right">
                  <Typography fontWeight={600}>Share Rate</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {topPerformingContent.map((content) => (
                <TableRow key={content.id}>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={2}>
                      <Avatar
                        variant="rounded"
                        src={content.thumbnail}
                        sx={{ width: 48, height: 36 }}
                      />
                      <Typography variant="body2" fontWeight={500}>
                        {content.title}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    {content.views.toLocaleString()}
                  </TableCell>
                  <TableCell align="right">
                    <Chip
                      label={content.engagement.toFixed(1)}
                      size="small"
                      color={content.engagement >= 4.5 ? 'success' : 'primary'}
                    />
                  </TableCell>
                  <TableCell align="right">{content.completionRate}%</TableCell>
                  <TableCell align="right">{content.shareRate}%</TableCell>
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
            title="Content Performance Over Time"
            description="Views, engagement, and completion rates for top content"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Content Performance by Type"
            description="Comparison of performance metrics across content types"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Audience Retention"
            description="Viewer retention across content duration"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartPlaceholder
            title="Engagement Heatmap"
            description="Engagement patterns across content sections"
          />
        </Grid>
      </Grid>
    </div>
  );
}

export default ContentPerformanceMetricsPage;

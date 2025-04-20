import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  useTheme,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { addDays, format, subDays, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ChartCard } from '../../../components/charts';
import MetricCard from '../../../components/metrics/MetricCard';
import { ChartData } from '../../../components/charts/ChartTypes';
import useMetricsActions from '@/hooks/useMetricsActions';

type SpanType = 'daily' | 'weekly' | 'monthly';

const EngagementMetricsPage: React.FC = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: subMonths(new Date(), 6),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [spanType, setSpanType] = useState<SpanType>('daily');

  const startDate = dateRange[0].startDate || subMonths(new Date(), 6);
  const endDate = dateRange[0].endDate || new Date();

  const { useSessionEngagementQuery, useSessionEngagementDailyQuery } =
    useMetricsActions();

  // Fetch data using hooks
  const { data: sessionEngagement, isLoading: isLoadingSessionEngagement } =
    useSessionEngagementQuery(startDate, endDate);
  const {
    data: sessionEngagementDaily,
    isLoading: isLoadingSessionEngagementDaily,
  } = useSessionEngagementDailyQuery(startDate, endDate);

  const handleSpanTypeChange = (event: SelectChangeEvent) => {
    setSpanType(event.target.value as SpanType);
  };

  // Prepare chart data
  const sessionEngagementRateChartData: ChartData = useMemo(() => {
    if (!sessionEngagementDaily) {
      return {
        type: 'line',
        title: 'Session Engagement Rate',
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [{ data: [], type: 'line', name: 'Engagement Rate (%)' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'line',
      title: 'Session Engagement Rate (Daily)',
      xAxis: {
        type: 'category',
        data: sessionEngagementDaily.data.map((item) =>
          format(new Date(item.date), 'MM/dd')
        ),
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Engagement Rate (%)',
      },
      series: [
        {
          data: sessionEngagementDaily.data.map((item) => item.engagementRate),
          type: 'line',
          name: 'Engagement Rate (%)',
        },
      ],
      color: [primaryColor],
    };
  }, [sessionEngagementDaily, primaryColor]);

  // Session Duration Chart
  const sessionDurationChartData: ChartData = useMemo(() => {
    if (!sessionEngagementDaily) {
      return {
        type: 'bar',
        title: 'Session Count',
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [{ data: [], type: 'bar', name: 'Sessions' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'bar',
      title: 'Daily Session Count',
      xAxis: {
        type: 'category',
        data: sessionEngagementDaily.data.map((item) =>
          format(new Date(item.date), 'MM/dd')
        ),
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Sessions',
      },
      series: [
        {
          data: sessionEngagementDaily.data.map((item) => item.sessions),
          type: 'bar',
          name: 'Total Sessions',
        },
        {
          data: sessionEngagementDaily.data.map((item) => item.engagedSessions),
          type: 'bar',
          name: 'Engaged Sessions',
        },
      ],
      color: [primaryColor, theme.palette.secondary.main],
    };
  }, [sessionEngagementDaily, primaryColor, theme.palette.secondary.main]);

  // Summary metrics
  const engagementMetrics = useMemo(() => {
    return [
      {
        title: 'Total Sessions',
        value: sessionEngagement
          ? sessionEngagement.totalSessions.toString()
          : '-',
        change: '+12%',
        changeType: 'positive',
      },
      {
        title: 'Engaged Sessions',
        value: sessionEngagement
          ? sessionEngagement.engagedSessions.toString()
          : '-',
        change: '+8%',
        changeType: 'positive',
      },
      {
        title: 'Engagement Rate',
        value: sessionEngagement
          ? `${Math.round(sessionEngagement.engagementRate)}%`
          : '-',
        change: '+5%',
        changeType: 'positive',
      },
      {
        title: 'Avg. Session',
        value: sessionEngagement
          ? `${Math.round(sessionEngagement.averageDurationMinutes * 10) / 10}m`
          : '-',
        change: '+1m 15s',
        changeType: 'positive',
      },
      {
        title: 'Total Duration',
        value: sessionEngagement
          ? `${Math.round(sessionEngagement.totalDurationMinutes)}m`
          : '-',
        change: '+10%',
        changeType: 'positive',
      },
    ];
  }, [sessionEngagement]);

  const handleDateChange = (item: RangeKeyDict) => {
    setDateRange([item.selection]);
  };

  const formatDateDisplay = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      return `${format(dateRange[0].startDate, 'MMM dd, yyyy')} - ${format(
        dateRange[0].endDate,
        'MMM dd, yyyy'
      )}`;
    }
    return 'Select date range';
  };

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 2,
          }}
        >
          <Typography variant="h4">User Engagement Metrics</Typography>
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel id="span-type-select-label">Time Span</InputLabel>
              <Select
                labelId="span-type-select-label"
                id="span-type-select"
                value={spanType}
                label="Time Span"
                onChange={handleSpanTypeChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
            <Box sx={{ position: 'relative' }}>
              <Button
                variant="outlined"
                onClick={() => setShowDatePicker(!showDatePicker)}
                sx={{
                  minWidth: '200px',
                  justifyContent: 'space-between',
                  px: 2,
                }}
              >
                {formatDateDisplay()}
              </Button>
              {showDatePicker && (
                <Box
                  sx={{
                    position: 'absolute',
                    right: 0,
                    zIndex: 10,
                    mt: 1,
                    boxShadow: 3,
                    bgcolor: 'background.paper',
                    borderRadius: 1,
                  }}
                >
                  <DateRange
                    editableDateInputs={true}
                    onChange={handleDateChange}
                    moveRangeOnFirstSelection={false}
                    ranges={dateRange}
                    maxDate={new Date()}
                  />
                  <Box
                    sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}
                  >
                    <Button
                      size="small"
                      onClick={() => setShowDatePicker(false)}
                      variant="contained"
                    >
                      Apply
                    </Button>
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Typography variant="body1">
          View user engagement metrics for your application. Select a date range
          to filter the data.
        </Typography>
      </Paper>

      {/* Summary Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {engagementMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
            <MetricCard
              title={metric.title}
              value={metric.value}
              change={metric.change}
              changeType={
                metric.changeType as 'positive' | 'negative' | 'neutral'
              }
            />
          </Grid>
        ))}
      </Grid>

      {/* Session Engagement Rate */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Session Engagement Rate
        </Typography>
        {isLoadingSessionEngagementDaily ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ChartCard chartData={sessionEngagementRateChartData} height={400} />
        )}
      </Box>

      {/* Session Count */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Session Count
        </Typography>
        {isLoadingSessionEngagementDaily ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ChartCard chartData={sessionDurationChartData} height={400} />
        )}
      </Box>

      {/* Session Details */}
      {sessionEngagement && (
        <Paper sx={{ p: 3, mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            Session Details
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Sessions
                </Typography>
                <Typography variant="h5">
                  {sessionEngagement.totalSessions}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Engaged Sessions
                </Typography>
                <Typography variant="h5">
                  {sessionEngagement.engagedSessions}
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Avg. Duration
                </Typography>
                <Typography variant="h5">
                  {Math.round(sessionEngagement.averageDurationMinutes * 10) /
                    10}{' '}
                  min
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
              <Box sx={{ p: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Total Duration
                </Typography>
                <Typography variant="h5">
                  {Math.round(sessionEngagement.totalDurationMinutes)} min
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Paper>
      )}
    </Box>
  );
};

export default EngagementMetricsPage;

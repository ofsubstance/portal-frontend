import React, { useState, useEffect, useMemo } from 'react';
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

const AppPerformanceMetrics: React.FC = () => {
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

  const {
    useDailyActiveUsersQuery,
    useMonthlyActiveUsersQuery,
    useUserTrendQuery,
    useGrowthTrendQuery,
    useRetentionRatesQuery,
  } = useMetricsActions();

  // Fetch data using hooks
  const { data: dau, isLoading: isLoadingDau } =
    useDailyActiveUsersQuery(endDate);
  const { data: mau, isLoading: isLoadingMau } =
    useMonthlyActiveUsersQuery(endDate);
  const { data: userTrend, isLoading: isLoadingUserTrend } = useUserTrendQuery(
    startDate,
    endDate,
    spanType
  );
  const { data: growthTrend, isLoading: isLoadingGrowthTrend } =
    useGrowthTrendQuery(startDate, endDate, spanType);
  const { data: retentionData, isLoading: isLoadingRetention } =
    useRetentionRatesQuery(startDate, endDate);

  const handleSpanTypeChange = (event: SelectChangeEvent) => {
    setSpanType(event.target.value as SpanType);
  };

  // Prepare chart data
  const userTrendChartData: ChartData = useMemo(() => {
    if (!userTrend) {
      return {
        type: 'line',
        title: 'Active Users Trend',
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [{ data: [], type: 'line', name: 'Users' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'line',
      title: `Active Users Trend (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category',
        data: userTrend.data.map((item) =>
          format(new Date(item.date), 'MM/dd')
        ),
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Users',
      },
      series: [
        {
          data: userTrend.data.map((item) => item.count),
          type: 'line',
          name: 'Users',
        },
      ],
      color: [primaryColor],
    };
  }, [userTrend, primaryColor, spanType]);

  const growthTrendChartData: ChartData = useMemo(() => {
    if (!growthTrend) {
      return {
        type: 'line',
        title: 'User Growth Rate',
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [{ data: [], type: 'line', name: 'Growth Rate (%)' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'line',
      title: `User Growth Rate (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category',
        data: growthTrend.data.map((item) =>
          format(new Date(item.date), 'MM/dd')
        ),
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Growth Rate (%)',
      },
      series: [
        {
          data: growthTrend.data.map((item) => item.growthRate),
          type: 'line',
          name: 'Growth Rate (%)',
        },
      ],
      color: [primaryColor],
    };
  }, [growthTrend, primaryColor, spanType]);

  const retentionRateChartData: ChartData = useMemo(() => {
    if (!retentionData) {
      return {
        type: 'bar',
        title: 'User Retention Rate',
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
        },
        series: [{ data: [], type: 'bar', name: 'Retention Rate (%)' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'bar',
      title: 'User Retention Rate',
      xAxis: {
        type: 'category',
        data: retentionData.data.map((item) => item.cohort),
        name: 'Cohort',
      },
      yAxis: {
        type: 'value',
        name: 'Retention Rate (%)',
        max: 100,
      },
      series: [
        {
          data: retentionData.data.map((item) => item.month1),
          type: 'bar',
          name: 'Month 1 Retention (%)',
        },
      ],
      color: [primaryColor],
    };
  }, [retentionData, primaryColor]);

  // Summary metrics
  const updatedSummaryMetrics = useMemo(() => {
    // Get the latest growth data
    const latestGrowth = growthTrend?.data?.length
      ? growthTrend.data[growthTrend.data.length - 1]
      : null;

    // Get the first cohort for retention data
    const firstCohort = retentionData?.data?.length
      ? retentionData.data[0]
      : null;

    return [
      {
        title: 'DAU',
        value: dau ? dau.count.toString() : '-',
        change: '+5%',
        changeType: 'positive',
      },
      {
        title: 'MAU',
        value: mau ? mau.count.toString() : '-',
        change: '+2%',
        changeType: 'positive',
      },
      {
        title: 'User Growth',
        value:
          latestGrowth && typeof latestGrowth.growthRate === 'number'
            ? `${latestGrowth.growthRate}%`
            : '-',
        change:
          latestGrowth && typeof latestGrowth.userCount === 'number'
            ? `+${latestGrowth.userCount}`
            : '-',
        changeType:
          latestGrowth && typeof latestGrowth.growthRate === 'number'
            ? latestGrowth.growthRate >= 0
              ? 'positive'
              : 'negative'
            : 'neutral',
      },
      {
        title: 'Retention',
        value: firstCohort ? `${firstCohort.month1}%` : '-',
        change: firstCohort
          ? `${firstCohort.month1Count}/${firstCohort.totalUsers}`
          : '+2%',
        changeType: firstCohort
          ? firstCohort.month1 > 0
            ? 'positive'
            : 'negative'
          : 'neutral',
      },
    ];
  }, [dau, mau, growthTrend, retentionData]);

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
          <Typography variant="h4">App Performance Metrics</Typography>
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
          View key performance metrics for your application. Select a date range
          to filter the data.
        </Typography>
      </Paper>

      {/* Summary Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {updatedSummaryMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
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

      {/* Active Users Trend */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Active Users Trend
        </Typography>
        {isLoadingUserTrend ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ChartCard chartData={userTrendChartData} height={400} />
        )}
      </Box>

      {/* User Growth Rate */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          User Growth Rate
        </Typography>
        {isLoadingGrowthTrend ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ChartCard chartData={growthTrendChartData} height={400} />
        )}
      </Box>

      {/* User Retention Rate */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          User Retention Rate
        </Typography>
        {isLoadingRetention ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <ChartCard chartData={retentionRateChartData} height={400} />
        )}
      </Box>
    </Box>
  );
};

export default AppPerformanceMetrics;

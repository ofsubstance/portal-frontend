import React, { useState, useEffect, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  useTheme,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Card,
  Divider,
} from '@mui/material';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format, subDays, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ChartCard } from '../../../components/charts';
import { ChartData } from '../../../components/charts/ChartTypes';
import useMetricsActions from '@/hooks/useMetricsActions';
import {
  RiUserLine as DauIcon,
  RiGroupLine as MauIcon,
  RiLineChartLine as GrowthIcon,
  RiUserHeartLine as RetentionIcon,
  RiCalendarEventLine as DateIcon,
} from 'react-icons/ri';

// Add these interface types for different response formats
interface DailyDataPoint {
  date: string;
  count: number;
}

interface WeeklyDataPoint {
  week: string;
  userCount: number;
  growthRate: number;
  previousPeriodCount: number;
}

interface MonthlyDataPoint {
  month: string;
  userCount: number;
  growthRate: number;
  previousPeriodCount: number;
}

// Union type for all possible data points
type DataPoint = DailyDataPoint | WeeklyDataPoint | MonthlyDataPoint;

type SpanType = 'daily' | 'weekly' | 'monthly';

const AppPerformanceMetrics: React.FC = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  // Track if parameters have changed to trigger refetch
  const [paramChangeCounter, setParamChangeCounter] = useState(0);

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [spanType, setSpanType] = useState<SpanType>('daily');

  const startDate = dateRange[0].startDate || subMonths(new Date(), 1);
  const endDate = dateRange[0].endDate || new Date();

  const {
    useDailyActiveUsersQuery,
    useMonthlyActiveUsersQuery,
    useUserTrendQuery,
    useGrowthTrendQuery,
    useRetentionRatesQuery,
  } = useMetricsActions();

  // Fetch data using hooks
  const {
    data: dau,
    isLoading: isLoadingDau,
    refetch: refetchDau,
    error: dauError,
  } = useDailyActiveUsersQuery(endDate);
  const {
    data: mau,
    isLoading: isLoadingMau,
    refetch: refetchMau,
    error: mauError,
  } = useMonthlyActiveUsersQuery(endDate);
  const {
    data: userTrend,
    isLoading: isLoadingUserTrend,
    refetch: refetchUserTrend,
    error: userTrendError,
  } = useUserTrendQuery(startDate, endDate, spanType);
  const {
    data: growthTrend,
    isLoading: isLoadingGrowthTrend,
    refetch: refetchGrowthTrend,
    error: growthTrendError,
  } = useGrowthTrendQuery(startDate, endDate, spanType);
  const {
    data: retentionData,
    isLoading: isLoadingRetention,
    refetch: refetchRetention,
    error: retentionError,
  } = useRetentionRatesQuery(startDate, endDate);

  // Effect to refetch data when parameters change
  useEffect(() => {
    refetchDau().catch((err) => console.error('Error refreshing DAU:', err));
    refetchMau().catch((err) => console.error('Error refreshing MAU:', err));
    refetchUserTrend().catch((err) =>
      console.error('Error refreshing user trend:', err)
    );
    refetchGrowthTrend().catch((err) =>
      console.error('Error refreshing growth trend:', err)
    );
    refetchRetention().catch((err) =>
      console.error('Error refreshing retention data:', err)
    );
  }, [
    startDate,
    endDate,
    spanType,
    paramChangeCounter,
    refetchDau,
    refetchMau,
    refetchUserTrend,
    refetchGrowthTrend,
    refetchRetention,
  ]);

  const handleSpanTypeChange = (event: SelectChangeEvent) => {
    setSpanType(event.target.value as SpanType);
    setParamChangeCounter((prev) => prev + 1);
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

    // Prepare x-axis labels based on span type
    const xAxisLabels = userTrend.data.map((item: any) => {
      if (spanType === 'daily' && 'date' in item) {
        return format(new Date(item.date), 'MM/dd');
      } else if (spanType === 'weekly' && 'week' in item) {
        // Format for weekly data: YYYY-WW to readable format
        const [year, week] = item.week.split('-');
        return `W${week} ${year}`;
      } else if (spanType === 'monthly' && 'month' in item) {
        // Format for monthly data: YYYY-MM to readable format
        const [year, month] = item.month.split('-');
        return `${month}/${year.slice(2)}`;
      }
      // Fallback for any other format
      return (item.date || item.week || item.month || '').toString();
    });

    return {
      type: 'line',
      title: `Active Users Trend (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category',
        data: xAxisLabels,
        name: 'Date',
      },
      yAxis: {
        type: 'value',
        name: 'Users',
      },
      series: [
        {
          data: userTrend.data.map((item: any) =>
            'count' in item ? item.count : item.userCount || 0
          ),
          type: 'line',
          name: 'Users',
        },
      ],
      color: [primaryColor],
    };
  }, [userTrend, primaryColor, spanType]);

  const growthTrendChartData: any = useMemo(() => {
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

    // Prepare x-axis labels based on span type
    const xAxisLabels = growthTrend.data.map((item: any) => {
      if (spanType === 'daily' && 'date' in item) {
        return format(new Date(item.date), 'MM/dd');
      } else if (spanType === 'weekly' && 'week' in item) {
        // Format for weekly data: YYYY-WW to readable format
        const [year, week] = item.week.split('-');
        return `W${week} ${year}`;
      } else if (spanType === 'monthly' && 'month' in item) {
        // Format for monthly data: YYYY-MM to readable format
        const [year, month] = item.month.split('-');
        return `${month}/${year.slice(2)}`;
      }
      // Fallback for any other format
      return (item.date || item.week || item.month || '').toString();
    });

    return {
      type: 'line',
      title: `User Growth Rate (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category',
        data: xAxisLabels,
        name: 'Date',
        axisLabel: {
          rotate: 30,
          margin: 15,
          fontSize: 11,
        },
        axisTick: {
          alignWithLabel: true,
        },
      },
      yAxis: {
        type: 'value',
        name: 'Growth Rate (%)',
      },
      series: [
        {
          data: growthTrend.data.map((item: any) => item.growthRate),
          type: 'line',
          name: 'Growth Rate (%)',
          symbol: 'circle',
          symbolSize: 8,
          emphasis: {
            scale: true,
            focus: 'series',
          },
          markPoint: {
            symbol: 'pin',
            symbolSize: 40,
            data: growthTrend.data
              .map((item: any, index: number) => {
                if (item.growthRate > 50 || item.growthRate < -20) {
                  return {
                    name: item.growthRate > 0 ? 'High Growth' : 'Decline',
                    value: item.growthRate,
                    xAxis: index,
                    yAxis: item.growthRate,
                    itemStyle: {
                      color: item.growthRate > 0 ? '#91cc75' : '#ee6666',
                    },
                  };
                }
                return null;
              })
              .filter(Boolean),
          },
        },
      ],
      color: [primaryColor],
      tooltip: {
        trigger: 'axis',
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = growthTrend.data[index];
          const label = xAxisLabels[index];

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${label}: ${item.growthRate}%
            </div>
            <div style="margin: 3px 0;">Current Users: <strong>${
              item.userCount
            }</strong></div>
            <div style="margin: 3px 0;">Previous Period: <strong>${
              item.previousPeriodCount
            }</strong></div>
            <div style="margin: 3px 0; ${
              item.userCount - item.previousPeriodCount >= 0
                ? 'color:#91cc75'
                : 'color:#ee6666'
            }">
              Net Change: <strong>${
                item.userCount - item.previousPeriodCount
              }</strong>
            </div>
          `;
        },
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderRadius: 4,
        padding: [8, 10],
        textStyle: {
          color: '#fff',
        },
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '18%',
        top: '10%',
        containLabel: true,
      },
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

        changeType: 'positive',
        icon: DauIcon,
      },
      {
        title: 'MAU',
        value: mau ? mau.count.toString() : '-',

        changeType: 'positive',
        icon: MauIcon,
      },
      {
        title: 'User Growth',
        value:
          latestGrowth && typeof latestGrowth.growthRate === 'number'
            ? `${latestGrowth.growthRate}%`
            : '-',

        icon: GrowthIcon,
      },
      {
        title: 'Retention',
        value: firstCohort ? `${firstCohort.month1}%` : '-',

        icon: RetentionIcon,
      },
    ];
  }, [dau, mau, growthTrend, retentionData]);

  const handleDateChange = (item: RangeKeyDict) => {
    setDateRange([item.selection]);
    setParamChangeCounter((prev) => prev + 1);
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
    <Box>
      {/* Header Section */}
      <Card
        elevation={0}
        sx={{
          p: 4,
          mb: 4,
          background: `linear-gradient(135deg, ${primaryColor} 0%, ${theme.palette.primary.dark} 100%)`,
          color: 'white',
          borderRadius: 3,
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', md: 'center' },
            gap: 3,
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight="600" gutterBottom>
              App Performance Metrics
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              View key performance metrics for your application. Select a date
              range to filter the data.
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              flexDirection: { xs: 'column', sm: 'row' },
              width: { xs: '100%', sm: 'auto' },
              '& > *': {
                flex: 1,
                minWidth: { sm: '180px' },
              },
            }}
          >
            <FormControl
              sx={{
                bgcolor: 'rgba(255, 255, 255, 0.1)',
                borderRadius: 1,
                '& .MuiOutlinedInput-root': {
                  height: '45px',
                  color: 'white',
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.3)',
                  },
                  '&:hover .MuiOutlinedInput-notchedOutline': {
                    borderColor: 'rgba(255, 255, 255, 0.5)',
                  },
                },
                '& .MuiInputLabel-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  transform: 'translate(14px, 12px) scale(1)',
                  '&.Mui-focused, &.MuiFormLabel-filled': {
                    transform: 'translate(14px, -9px) scale(0.75)',
                  },
                },
                '& .MuiSvgIcon-root': {
                  color: 'white',
                },
              }}
            >
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
            <Button
              variant="outlined"
              onClick={() => setShowDatePicker(!showDatePicker)}
              sx={{
                height: '45px',
                color: 'white',
                borderColor: 'rgba(255, 255, 255, 0.3)',
                '&:hover': {
                  borderColor: 'rgba(255, 255, 255, 0.5)',
                  bgcolor: 'rgba(255, 255, 255, 0.1)',
                },
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
              startIcon={<DateIcon size={20} />}
            >
              {formatDateDisplay()}
            </Button>
            {showDatePicker && (
              <Card
                elevation={6}
                sx={{
                  position: 'absolute',
                  right: 0,
                  zIndex: 10,
                  mt: 1,
                  overflow: 'hidden',
                }}
              >
                <DateRange
                  editableDateInputs={true}
                  onChange={handleDateChange}
                  moveRangeOnFirstSelection={false}
                  ranges={dateRange}
                  maxDate={new Date()}
                />
                <Divider />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    p: 2,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Button
                    onClick={() => {
                      setShowDatePicker(false);
                      setParamChangeCounter((prev) => prev + 1);
                    }}
                    variant="contained"
                    fullWidth
                    sx={{
                      py: 1,
                      maxWidth: '90%',
                    }}
                  >
                    Apply Date Range
                  </Button>
                </Box>
              </Card>
            )}
          </Box>
        </Box>
      </Card>

      {/* Summary Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {updatedSummaryMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 3,
                bgcolor: 'background.paper',
                transition:
                  'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                },
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box
                    sx={{
                      width: 48,
                      height: 48,
                      borderRadius: 2,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: `${theme.palette.primary.main}15`,
                      color: theme.palette.primary.main,
                      mr: 2,
                      flexShrink: 0,
                    }}
                  >
                    <metric.icon size={24} />
                  </Box>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    sx={{
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      letterSpacing: '0.015em',
                    }}
                  >
                    {metric.title}
                  </Typography>
                </Box>

                <Typography
                  variant="h3"
                  component="div"
                  sx={{
                    mt: 1,
                    mb: 1,
                    fontWeight: 600,
                    fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' },
                    color: 'text.primary',
                    lineHeight: 1.2,
                  }}
                >
                  {metric.value}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={4}>
        {/* Active Users Trend */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              Active Users Trend
            </Typography>
            {isLoadingUserTrend ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : userTrendError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading user trend data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard chartData={userTrendChartData} height={400} />
            )}
          </Card>
        </Grid>

        {/* User Growth Rate */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              User Growth Rate
            </Typography>
            {isLoadingGrowthTrend ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : growthTrendError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading growth trend data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard chartData={growthTrendChartData} height={400} />
            )}
          </Card>
        </Grid>

        {/* User Retention Rate */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              User Retention Rate
            </Typography>
            {isLoadingRetention ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : retentionError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading retention data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard chartData={retentionRateChartData} height={400} />
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppPerformanceMetrics;

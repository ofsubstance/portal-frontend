import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  useTheme,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Divider,
} from '@mui/material';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { addDays, format, subDays, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ChartCard } from '../../../components/charts';
import { ChartData } from '../../../components/charts/ChartTypes';
import useMetricsActions from '@/hooks/useMetricsActions';
import {
  RiGroupLine as SessionsIcon,
  RiUserStarLine as EngagedIcon,
  RiPercentLine as RateIcon,
  RiTimeLine as DurationIcon,
  RiTimerLine as TotalTimeIcon,
  RiCalendarEventLine as DateIcon,
  RiBubbleChartLine as InterestsIcon,
  RiNodeTree as SankeyIcon,
  RiPieChartLine as UtilizationIcon,
} from 'react-icons/ri';
import ReactECharts from 'echarts-for-react';
import { useQuery } from '@tanstack/react-query';

type SpanType = 'daily' | 'weekly' | 'monthly';

interface SessionMetric {
  date: string;
  sessions: number;
  engagedSessions: number;
  engagementRate: number;
  averageDurationMinutes: number;
  totalDurationMinutes: number;
}

interface SessionEngagementResponse {
  data: {
    statusCode: number;
    isSuccess: boolean;
    message: string;
    body: {
      startDate: string;
      endDate: string;
      span: string;
      data: SessionMetric[];
    };
  };
}

// Add this type definition for the formatter function
type TooltipFormatterCallback = (params: any) => string;

const EngagementMetricsPage: React.FC = () => {
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
    useSessionEngagementQuery,
    useSessionEngagementDailyQuery,
    useSessionTimeQuery,
    useUserUtilizationQuery,
    useUserInterestsQuery,
    useInterestSankeyQuery,
  } = useMetricsActions();

  // Fetch data using hooks
  const {
    data: sessionEngagement,
    isLoading: isLoadingSessionEngagement,
    refetch: refetchSessionEngagement,
    error: sessionEngagementError,
  } = useSessionEngagementQuery(startDate, endDate);
  const {
    data: sessionEngagementDaily,
    isLoading: isLoadingSessionEngagementDaily,
    refetch: refetchSessionEngagementDaily,
    error: sessionEngagementDailyError,
  } = useSessionEngagementDailyQuery(startDate, endDate);
  const {
    data: sessionTime,
    isLoading: isLoadingSessionTime,
    refetch: refetchSessionTime,
    error: sessionTimeError,
  } = useSessionTimeQuery(startDate, endDate, spanType);
  const {
    data: userUtilization,
    isLoading: isLoadingUserUtilization,
    refetch: refetchUserUtilization,
    error: userUtilizationError,
  } = useUserUtilizationQuery();
  const {
    data: userInterests,
    isLoading: isLoadingUserInterests,
    refetch: refetchUserInterests,
    error: userInterestsError,
  } = useUserInterestsQuery();
  const {
    data: interestSankey,
    isLoading: isLoadingInterestSankey,
    refetch: refetchInterestSankey,
    error: interestSankeyError,
  } = useInterestSankeyQuery();

  // Effect to refetch data when parameters change
  useEffect(() => {
    refetchSessionEngagement().catch((err) =>
      console.error('Error refreshing session engagement:', err)
    );
    refetchSessionEngagementDaily().catch((err) =>
      console.error('Error refreshing daily session engagement:', err)
    );
    refetchSessionTime().catch((err) =>
      console.error('Error refreshing session time:', err)
    );
    refetchUserUtilization().catch((err) =>
      console.error('Error refreshing user utilization:', err)
    );
    refetchUserInterests().catch((err) =>
      console.error('Error refreshing user interests:', err)
    );
    refetchInterestSankey().catch((err) =>
      console.error('Error refreshing interest sankey:', err)
    );
  }, [
    startDate,
    endDate,
    spanType,
    paramChangeCounter,
    refetchSessionEngagement,
    refetchSessionEngagementDaily,
    refetchSessionTime,
    refetchUserUtilization,
    refetchUserInterests,
    refetchInterestSankey,
  ]);

  const handleSpanTypeChange = (event: SelectChangeEvent) => {
    setSpanType(event.target.value as SpanType);
    setParamChangeCounter((prev) => prev + 1);
  };

  // Helper function to format date labels
  const formatDateLabel = (item: SessionMetric) => {
    if (item.date) {
      return format(new Date(item.date), 'MM/dd');
    }
    return '';
  };

  // Session Engagement Chart
  const sessionEngagementRateChartData = useMemo(() => {
    if (!sessionEngagementDaily) {
      return {
        type: 'line' as const,
        title: 'Session Engagement Rate',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'line' as const, name: 'Engagement Rate' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'line' as const,
      title: `Session Engagement Rate (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data:
          sessionEngagementDaily?.data?.body?.data?.map(formatDateLabel) || [],
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
        type: 'value' as const,
        name: 'Engagement Rate (%)',
      },
      series: [
        {
          data: sessionEngagementDaily.data.body.data.map(
            (item: SessionMetric) => item.engagementRate
          ),
          type: 'line' as const,
          name: 'Engagement Rate (%)',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            opacity: 0.2,
          },
          emphasis: {
            scale: true,
            focus: 'series',
          },
        },
      ],
      color: [primaryColor],
      tooltip: {
        trigger: 'axis' as const,
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = sessionEngagementDaily.data.body.data[
            index
          ] as SessionMetric;
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}: ${item.engagementRate}%
            </div>
            <div style="margin: 3px 0;">Total Sessions: <strong>${item.sessions}</strong></div>
            <div style="margin: 3px 0;">Engaged Sessions: <strong>${item.engagedSessions}</strong></div>
          `;
        } as any,
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
  }, [sessionEngagementDaily, primaryColor, spanType]);

  // Session Duration Chart
  const sessionDurationChartData = useMemo(() => {
    if (!sessionEngagementDaily) {
      return {
        type: 'bar' as const,
        title: 'Session Count',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'bar' as const, name: 'Sessions' }],
        color: [primaryColor],
      };
    }

    return {
      type: 'bar' as const,
      title: `Daily Session Count (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data: sessionEngagementDaily.data.body.data.map(formatDateLabel),
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
        type: 'value' as const,
        name: 'Sessions',
      },
      series: [
        {
          data: sessionEngagementDaily.data.body.data.map(
            (item: SessionMetric) => item.sessions
          ),
          type: 'bar' as const,
          name: 'Total Sessions',
          stack: 'total',
          emphasis: {
            focus: 'series',
          },
        },
        {
          data: sessionEngagementDaily.data.body.data.map(
            (item: SessionMetric) => item.engagedSessions
          ),
          type: 'bar' as const,
          name: 'Engaged Sessions',
          stack: 'engaged',
          emphasis: {
            focus: 'series',
          },
        },
      ],
      color: [primaryColor, theme.palette.secondary.main],
      tooltip: {
        trigger: 'axis' as const,
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = sessionEngagementDaily.data.body.data[
            index
          ] as SessionMetric;
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}
            </div>
            <div style="margin: 3px 0;">Total Sessions: <strong>${item.sessions}</strong></div>
            <div style="margin: 3px 0;">Engaged Sessions: <strong>${item.engagedSessions}</strong></div>
            <div style="margin: 3px 0;">Engagement Rate: <strong>${item.engagementRate}%</strong></div>
          `;
        } as any,
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
  }, [
    sessionEngagementDaily,
    primaryColor,
    theme.palette.secondary.main,
    spanType,
  ]);

  // Session Time Chart
  const sessionTimeChartData = useMemo(() => {
    if (!sessionTime) {
      return {
        type: 'line' as const,
        title: 'Average Session Time',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'line' as const, name: 'Minutes' }],
        color: [primaryColor],
      };
    }

    // Format the date label based on span type
    const formatDateLabel = (item: any) => {
      if (spanType === 'daily' && item.date) {
        return format(new Date(item.date), 'MM/dd');
      } else if (spanType === 'weekly' && item.week) {
        // For weekly data, display in Week-Year format
        const [year, week] = item.week.split('-');
        return `W${week} ${year}`;
      } else if (spanType === 'monthly' && item.month) {
        // For monthly data
        const [year, month] = item.month.split('-');
        return `${month}/${year.slice(2)}`;
      }
      // Fallback
      return item.date || item.week || item.month || '';
    };

    return {
      type: 'line' as const,
      title: `Average Session Time (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data: sessionTime.data.map(formatDateLabel),
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
        type: 'value' as const,
        name: 'Minutes',
      },
      series: [
        {
          data: sessionTime.data.map((item) => item.minutes),
          type: 'line' as const,
          name: 'Avg Minutes',
          symbol: 'circle',
          symbolSize: 8,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            opacity: 0.2,
          },
          emphasis: {
            scale: true,
            focus: 'series',
          },
        },
      ],
      color: [primaryColor],
      tooltip: {
        trigger: 'axis' as const,
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = sessionTime.data[index];
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}
            </div>
            <div style="margin: 3px 0;">Avg. Session: <strong>${item.minutes.toFixed(
              1
            )} minutes</strong></div>
            <div style="margin: 3px 0;">Sessions: <strong>${
              item.sessionCount
            }</strong></div>
          `;
        } as any,
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
  }, [sessionTime, primaryColor, spanType]);

  // User Utilization Chart
  const userUtilizationChartData = useMemo(() => {
    if (!userUtilization) {
      return {
        type: 'pie' as const,
        series: [
          {
            data: [],
            type: 'pie' as const,
            name: 'Utilization',
          },
        ],
      };
    }

    return {
      type: 'pie' as const,
      series: [
        {
          data: userUtilization.data.map((item) => ({
            name: item.purpose,
            value: item.count,
          })),
          type: 'pie' as const,
          name: 'Utilization',
          radius: ['40%', '70%'],
          center: ['50%', '50%'],
          label: {
            show: true,
            formatter: '{b}: {c} ({d}%)',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
      tooltip: {
        trigger: 'item' as const,
        formatter: '{b}: {c} users ({d}%)',
      },
    };
  }, [userUtilization]);

  // User Interests Chart
  const userInterestsChartData = useMemo(() => {
    if (!userInterests) {
      return {
        type: 'bar' as const,
        title: 'User Interests',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'bar' as const, name: 'Interests' }],
      };
    }

    const sortedData = [...userInterests.data].sort(
      (a, b) => b.count - a.count
    );

    return {
      type: 'bar' as const,
      title: 'User Interests',
      xAxis: {
        type: 'value' as const,
        name: 'Users',
      },
      yAxis: {
        type: 'category' as const,
        data: sortedData.map((item) => item.interest),
        name: 'Interest',
        axisLabel: {
          width: 80,
          overflow: 'truncate',
          fontSize: 12,
        },
      },
      series: [
        {
          data: sortedData.map((item) => item.count),
          type: 'bar' as const,
          name: 'Users',
        },
      ],
      color: [theme.palette.primary.main],
      tooltip: {
        trigger: 'axis' as const,
        formatter: '{b}: {c} users',
      },
      grid: {
        left: '25%',
        right: '5%',
        bottom: '10%',
        top: '10%',
        containLabel: false,
      },
    };
  }, [userInterests, theme.palette.primary.main]);

  // Sankey Chart
  const interestSankeyChartData = useMemo(() => {
    if (!interestSankey) {
      return {
        title: 'Interest Connections',
        series: [],
      };
    }

    return {
      title: 'Interest Connections',
      series: [],
    };
  }, [interestSankey]);

  // Summary metrics
  const engagementMetrics = useMemo(() => {
    return [
      {
        title: 'Total Sessions',
        value: sessionEngagement
          ? sessionEngagement.totalSessions.toString()
          : '-',
        changeType: 'positive',
        icon: SessionsIcon,
      },
      {
        title: 'Engaged Sessions',
        value: sessionEngagement
          ? sessionEngagement.engagedSessions.toString()
          : '-',
        changeType: 'positive',
        icon: EngagedIcon,
      },
      {
        title: 'Engagement Rate',
        value: sessionEngagement
          ? `${Math.round(sessionEngagement.engagementRate)}%`
          : '-',
        changeType: 'positive',
        icon: RateIcon,
      },
      {
        title: 'Avg. Session',
        value: sessionEngagement
          ? `${
              Math.round(sessionEngagement.averageDurationMinutes * 10) / 10
            } mins`
          : '-',
        changeType: 'positive',
        icon: DurationIcon,
      },
      {
        title: 'Total Duration',
        value: sessionEngagement
          ? `${Math.round(sessionEngagement.totalDurationMinutes)} mins`
          : '-',
        changeType: 'positive',
        icon: TotalTimeIcon,
      },
    ];
  }, [sessionEngagement]);

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
              User Engagement Metrics
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              View user engagement metrics for your application. Select a date
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
        {engagementMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
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
                  {isLoadingSessionEngagement ? (
                    <CircularProgress size={24} />
                  ) : (
                    metric.value
                  )}
                </Typography>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Session Engagement Section */}
      <Typography
        variant="h5"
        fontWeight="600"
        gutterBottom
        sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <SessionsIcon style={{ marginRight: '10px' }} />
        Session Engagement
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        {/* Session Engagement Rate */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              Session Engagement Rate
            </Typography>
            {isLoadingSessionEngagementDaily ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : sessionEngagementDailyError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading session engagement data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard
                chartData={sessionEngagementRateChartData}
                height={400}
              />
            )}
          </Card>
        </Grid>

        {/* Session Count */}
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              Session Count
            </Typography>
            {isLoadingSessionEngagementDaily ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : sessionEngagementDailyError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading session count data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard chartData={sessionDurationChartData} height={400} />
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Session Time Section */}
      <Typography
        variant="h5"
        fontWeight="600"
        gutterBottom
        sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <DurationIcon style={{ marginRight: '10px' }} />
        Session Time
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              Average Session Time
            </Typography>
            {isLoadingSessionTime ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : sessionTimeError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading session time data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard chartData={sessionTimeChartData} height={400} />
            )}
          </Card>
        </Grid>

        {/* Session Time Summary */}
        {sessionTime && (
          <Grid item xs={12}>
            <Card
              elevation={0}
              sx={{
                p: 3,
                borderRadius: 3,
                bgcolor: 'background.paper',
                border: 1,
                borderColor: 'divider',
              }}
            >
              <Typography
                variant="h5"
                fontWeight="600"
                gutterBottom
                sx={{ mb: 3, pl: 1 }}
              >
                Session Time Summary
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: `${theme.palette.primary.main}08`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      Average Session Time
                    </Typography>
                    <Typography variant="h3" fontWeight="600" align="center">
                      {sessionTime.averageSessionTimeMinutes.toFixed(1)}{' '}
                      <Typography
                        component="span"
                        variant="h5"
                        color="text.secondary"
                      >
                        minutes
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: `${theme.palette.primary.main}08`,
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      gutterBottom
                    >
                      Total Sessions
                    </Typography>
                    <Typography variant="h3" fontWeight="600" align="center">
                      {sessionTime.totalSessions}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* User Interests Section */}
      <Typography
        variant="h5"
        fontWeight="600"
        gutterBottom
        sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <InterestsIcon style={{ marginRight: '10px' }} />
        User Interests
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              Top User Interests
            </Typography>
            {isLoadingUserInterests ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : userInterestsError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading user interests data. Please try again.
                </Typography>
              </Box>
            ) : userInterests ? (
              <Box sx={{ height: 400 }}>
                <ReactECharts
                  style={{ height: '100%', width: '100%' }}
                  option={{
                    title: {
                      text: 'Top User Interests',
                      left: 'center',
                      top: 10,
                      textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal',
                      },
                    },
                    tooltip: {
                      trigger: 'axis',
                      axisPointer: {
                        type: 'shadow',
                      },
                      formatter: function (params: any) {
                        const data = params[0];
                        return `<div style="font-weight:bold">${data.name}</div>
                               <div>${data.value} users (${Math.round(
                          (data.value /
                            userInterests.data.reduce(
                              (sum, item) => sum + item.count,
                              0
                            )) *
                            100
                        )}%)</div>`;
                      },
                    },
                    grid: {
                      top: 50,
                      right: 30,
                      bottom: 30,
                      left: 100,
                      containLabel: true,
                    },
                    xAxis: {
                      type: 'value',
                      name: 'Users',
                      nameLocation: 'middle',
                      nameGap: 30,
                      axisLabel: {
                        formatter: '{value}',
                      },
                    },
                    yAxis: {
                      type: 'category',
                      data: [...userInterests.data]
                        .sort((a, b) => b.count - a.count)
                        .map((item) => item.interest),
                      axisLabel: {
                        fontSize: 12,
                        width: 80,
                        overflow: 'truncate',
                      },
                    },
                    series: [
                      {
                        name: 'Users',
                        type: 'bar',
                        data: [...userInterests.data]
                          .sort((a, b) => b.count - a.count)
                          .map((item) => ({
                            value: item.count,
                            itemStyle: {
                              color: theme.palette.primary.main,
                            },
                          })),
                        label: {
                          show: true,
                          position: 'right',
                          formatter: '{c}',
                          fontSize: 12,
                        },
                        barWidth: '60%',
                        emphasis: {
                          itemStyle: {
                            color: theme.palette.primary.dark,
                          },
                        },
                      },
                    ],
                    animationDuration: 1000,
                    animationEasing: 'cubicOut',
                  }}
                />
              </Box>
            ) : (
              <Typography>No interest data available</Typography>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Interest Connections Section */}
      <Typography
        variant="h5"
        fontWeight="600"
        gutterBottom
        sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <SankeyIcon style={{ marginRight: '10px' }} />
        Interest Connections
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 3, px: 1 }}>
        This circular graph shows how user interests are interconnected. Each
        node represents an interest, and links between nodes show relationships
        between interests. The thickness of connections indicates the number of
        users who share both interests.
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              Interest Network Visualization
            </Typography>
            {isLoadingInterestSankey ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : interestSankeyError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading interest journey data. Please try again.
                </Typography>
              </Box>
            ) : interestSankey ? (
              <Box sx={{ height: 600, position: 'relative' }}>
                <ReactECharts
                  style={{ height: '100%', width: '100%' }}
                  option={{
                    title: {
                      text: 'Interest Connections',
                      left: 'center',
                      top: 10,
                      textStyle: {
                        fontSize: 16,
                        fontWeight: 'normal',
                      },
                    },
                    tooltip: {
                      trigger: 'item',
                      formatter: function (params: any) {
                        if (params.dataType === 'node') {
                          const nodeFreq = interestSankey.nodeFrequencies.find(
                            (n) => n.id === params.data.id
                          );
                          return `<div style="font-weight:bold">${
                            params.name
                          }</div>
                                 <div>Total Users: ${
                                   nodeFreq ? nodeFreq.count : '?'
                                 }</div>`;
                        }
                        return `<div style="font-weight:bold">Connection</div>
                               <div>${params.data.source} → ${params.data.target}</div>
                               <div>Shared Users: ${params.data.value}</div>`;
                      },
                    },
                    legend: [
                      {
                        data: [
                          'Mental Health',
                          'Personal Development',
                          'Addiction Recovery',
                          'Emotional Support',
                          'General',
                        ],
                        orient: 'vertical',
                        right: 10,
                        top: 20,
                      },
                    ],
                    series: [
                      {
                        name: 'Interest Network',
                        type: 'graph',
                        layout: 'circular',
                        data: interestSankey.sankeyData.nodes.map(
                          (node, index) => ({
                            id: node.id,
                            name: node.name,
                            symbolSize:
                              30 +
                              (interestSankey.nodeFrequencies.find(
                                (n) => n.id === node.id
                              )?.count || 0) /
                                5,
                            category: index % 5,
                          })
                        ),
                        links: interestSankey.sankeyData.links.map((link) => ({
                          ...link,
                          lineStyle: {
                            width: Math.max(
                              1,
                              Math.min(10, Math.sqrt(link.value) * 0.7)
                            ),
                          },
                        })),
                        categories: [
                          { name: 'Mental Health' },
                          { name: 'Personal Development' },
                          { name: 'Addiction Recovery' },
                          { name: 'Emotional Support' },
                          { name: 'General' },
                        ],
                        roam: true,
                        label: {
                          show: true,
                          position: 'right',
                          formatter: '{b}',
                        },
                        lineStyle: {
                          color: 'source',
                          curveness: 0.3,
                          opacity: 0.7,
                        },
                        emphasis: {
                          focus: 'adjacency',
                          lineStyle: {
                            width: 6,
                            opacity: 1,
                          },
                        },
                      },
                    ],
                    animationDuration: 1500,
                    animationEasingUpdate: 'quinticInOut',
                  }}
                />
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: 200,
                }}
              >
                <Typography color="text.secondary">
                  No connection data available
                </Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>

      {/* Utilization Purpose Section */}
      <Typography
        variant="h5"
        fontWeight="600"
        gutterBottom
        sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
      >
        <UtilizationIcon style={{ marginRight: '10px' }} />
        Utilization Purpose
      </Typography>
      <Grid container spacing={4} sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              bgcolor: 'background.paper',
              border: 1,
              borderColor: 'divider',
            }}
          >
            <Typography
              variant="h5"
              fontWeight="600"
              gutterBottom
              sx={{ mb: 3, pl: 1 }}
            >
              User Utilization Purpose
            </Typography>
            {isLoadingUserUtilization ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : userUtilizationError ? (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  p: 8,
                  color: 'error.main',
                }}
              >
                <Typography>
                  Error loading user utilization data. Please try again.
                </Typography>
              </Box>
            ) : (
              <ChartCard chartData={userUtilizationChartData} height={400} />
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EngagementMetricsPage;

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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Avatar,
  IconButton,
  Tooltip,
} from '@mui/material';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { addDays, format, subDays, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { ChartCard } from '../../../components/charts';
import { ChartData } from '../../../components/charts/ChartTypes';
import useMetricsActions from '@/hooks/useMetricsActions';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import {
  RiBarChartLine as ViewsIcon,
  RiTimeLine as WatchTimeIcon,
  RiPercentLine as CompletionIcon,
  RiVideoLine as VideoIcon,
  RiCalendarEventLine as DateIcon,
  RiPlayCircleLine as PlayIcon,
  RiShareForwardLine as ShareIcon,
  RiPieChartLine as DropOffIcon,
} from 'react-icons/ri';
import ReactECharts from 'echarts-for-react';

type SpanType = 'daily' | 'weekly' | 'monthly';

const ContentPerformanceMetricsPage: React.FC = () => {
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
  const [selectedVideoId, setSelectedVideoId] = useState('');

  const startDate = dateRange[0].startDate || subMonths(new Date(), 1);
  const endDate = dateRange[0].endDate || new Date();

  const {
    useVideoViewsQuery,
    useVideoPercentageWatchedQuery,
    useVideoSharesQuery,
    useVideoCompletionRatesQuery,
  } = useMetricsActions();
  const { useVideoListQuery } = useVideoManagementActions();

  // Fetch data using hooks
  const { data: videoList, isLoading: isLoadingVideoList } =
    useVideoListQuery();
  const {
    data: videoViews,
    isLoading: isLoadingVideoViews,
    refetch: refetchVideoViews,
    error: videoViewsError,
  } = useVideoViewsQuery(selectedVideoId, startDate, endDate, spanType);
  const {
    data: videoPercentageWatched,
    isLoading: isLoadingVideoPercentageWatched,
    refetch: refetchVideoPercentageWatched,
    error: videoPercentageWatchedError,
  } = useVideoPercentageWatchedQuery(
    selectedVideoId,
    startDate,
    endDate,
    spanType
  );
  const {
    data: videoShares,
    isLoading: isLoadingVideoShares,
    refetch: refetchVideoShares,
    error: videoSharesError,
  } = useVideoSharesQuery(selectedVideoId, startDate, endDate, spanType);
  const {
    data: videoCompletionRates,
    isLoading: isLoadingVideoCompletionRates,
    refetch: refetchVideoCompletionRates,
    error: videoCompletionRatesError,
  } = useVideoCompletionRatesQuery(
    selectedVideoId,
    startDate,
    endDate,
    spanType
  );

  // Effect to refetch data when parameters change
  useEffect(() => {
    if (selectedVideoId) {
      refetchVideoViews().catch((err) =>
        console.error('Error refreshing video views:', err)
      );
      refetchVideoPercentageWatched().catch((err) =>
        console.error('Error refreshing video percentage watched:', err)
      );
      refetchVideoShares().catch((err) =>
        console.error('Error refreshing video shares:', err)
      );
      refetchVideoCompletionRates().catch((err) =>
        console.error('Error refreshing video completion rates:', err)
      );
    }
  }, [
    selectedVideoId,
    startDate,
    endDate,
    spanType,
    paramChangeCounter,
    refetchVideoViews,
    refetchVideoPercentageWatched,
    refetchVideoShares,
    refetchVideoCompletionRates,
  ]);

  const handleSpanTypeChange = (event: SelectChangeEvent) => {
    setSpanType(event.target.value as SpanType);
    setParamChangeCounter((prev) => prev + 1);
  };

  const handleVideoSelect = (videoId: string) => {
    setSelectedVideoId(videoId);
    setParamChangeCounter((prev) => prev + 1);
  };

  // Prepare chart data for video views
  const videoViewsChartData = useMemo(() => {
    if (!videoViews) {
      return {
        type: 'line' as const,
        title: 'Video Views',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'line' as const, name: 'Views' }],
        color: [primaryColor],
      };
    }

    // Helper function to format date labels based on span type
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
      title: `Video Views (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data: videoViews.distribution.map(formatDateLabel),
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
        name: 'Views',
      },
      series: [
        {
          data: videoViews.distribution.map((item) => item.count),
          type: 'line' as const,
          name: 'Views',
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
          const item = videoViews.distribution[index];
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}
            </div>
            <div style="margin: 3px 0;">Views: <strong>${item.count}</strong></div>
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
  }, [videoViews, primaryColor, spanType]);

  // Prepare chart data for video percentage watched
  const videoPercentageWatchedChartData = useMemo(() => {
    if (!videoPercentageWatched) {
      return {
        type: 'line' as const,
        title: 'Average Percentage Watched',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'line' as const, name: 'Percentage' }],
        color: [primaryColor],
      };
    }

    // Helper function to format date labels based on span type
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
      title: `Average Percentage Watched (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data: videoPercentageWatched.distribution.map(formatDateLabel),
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
        name: 'Percentage (%)',
      },
      series: [
        {
          data: videoPercentageWatched.distribution.map(
            (item) => item.averagePercentage
          ),
          type: 'line' as const,
          name: 'Percentage',
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
      color: [theme.palette.secondary.main],
      tooltip: {
        trigger: 'axis' as const,
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = videoPercentageWatched.distribution[index];
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}
            </div>
            <div style="margin: 3px 0;">Avg. Percentage: <strong>${item.averagePercentage.toFixed(
              1
            )}%</strong></div>
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
  }, [
    videoPercentageWatched,
    primaryColor,
    theme.palette.secondary.main,
    spanType,
  ]);

  // Prepare chart data for video shares
  const videoSharesChartData = useMemo(() => {
    if (!videoShares) {
      return {
        type: 'line' as const,
        title: 'Video Shares',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [{ data: [], type: 'line' as const, name: 'Shares' }],
        color: [theme.palette.success.main],
      };
    }

    // Helper function to format date labels based on span type
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
      type: 'bar' as const,
      title: `Video Shares (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data: videoShares.distribution.map(formatDateLabel),
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
        name: 'Shares',
      },
      series: [
        {
          data: videoShares.distribution.map((item) => item.count),
          type: 'bar' as const,
          name: 'Shares',
          barWidth: '60%',
          itemStyle: {
            color: theme.palette.success.main,
          },
          emphasis: {
            itemStyle: {
              color: theme.palette.success.dark,
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)',
            },
          },
        },
      ],
      tooltip: {
        trigger: 'axis' as const,
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = videoShares.distribution[index];
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}
            </div>
            <div style="margin: 3px 0;">Shares: <strong>${item.count}</strong></div>
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
    videoShares,
    theme.palette.success.main,
    theme.palette.success.dark,
    spanType,
  ]);

  // Prepare chart data for video completion rates
  const videoCompletionRatesChartData = useMemo(() => {
    if (!videoCompletionRates) {
      return {
        type: 'bar' as const,
        title: 'Completion Rates',
        xAxis: {
          type: 'category' as const,
          data: [],
        },
        yAxis: {
          type: 'value' as const,
        },
        series: [
          { data: [], type: 'bar' as const, name: 'Completed' },
          { data: [], type: 'bar' as const, name: 'Partial' },
          { data: [], type: 'bar' as const, name: 'Dropped Off' },
        ],
      };
    }

    // Helper function to format date labels based on span type
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

    // Filter out days with zero sessions for cleaner chart
    const filteredDistribution = videoCompletionRates.distribution.filter(
      (item) => item.totalSessions > 0
    );

    return {
      type: 'bar' as const,
      title: `Video Completion and Drop-off Rates (${
        spanType.charAt(0).toUpperCase() + spanType.slice(1)
      })`,
      xAxis: {
        type: 'category' as const,
        data: filteredDistribution.map(formatDateLabel),
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
          name: 'Completed',
          data: filteredDistribution.map((item) => item.completedSessions),
          type: 'bar' as const,
          stack: 'total',
          itemStyle: {
            color: theme.palette.success.main,
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: 'Partial',
          data: filteredDistribution.map((item) => item.partialSessions),
          type: 'bar' as const,
          stack: 'total',
          itemStyle: {
            color: theme.palette.warning.main,
          },
          emphasis: {
            focus: 'series',
          },
        },
        {
          name: 'Dropped Off',
          data: filteredDistribution.map((item) => item.droppedOffSessions),
          type: 'bar' as const,
          stack: 'total',
          itemStyle: {
            color: theme.palette.error.main,
          },
          emphasis: {
            focus: 'series',
          },
        },
      ],
      tooltip: {
        trigger: 'axis' as const,
        formatter: function (params: any) {
          const index = params[0].dataIndex;
          const item = filteredDistribution[index];
          const timeLabel = formatDateLabel(item);

          return `
            <div style="font-weight: bold; margin-bottom: 6px; font-size: 13px;">
              ${timeLabel}
            </div>
            <div style="margin: 3px 0;">Total Sessions: <strong>${item.totalSessions}</strong></div>
            <div style="margin: 3px 0; color: ${theme.palette.success.main}">Completed: <strong>${item.completedSessions} (${item.completionRate}%)</strong></div>
            <div style="margin: 3px 0; color: ${theme.palette.warning.main}">Partial: <strong>${item.partialSessions} (${item.partialRate}%)</strong></div>
            <div style="margin: 3px 0; color: ${theme.palette.error.main}">Dropped Off: <strong>${item.droppedOffSessions} (${item.dropOffRate}%)</strong></div>
          `;
        } as any,
        backgroundColor: 'rgba(50,50,50,0.9)',
        borderRadius: 4,
        padding: [8, 10],
        textStyle: {
          color: '#fff',
        },
      },
      legend: {
        show: true,
        orient: 'horizontal' as 'horizontal',
        top: 0,
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '18%',
        top: '45px',
        containLabel: true,
      },
    };
  }, [
    videoCompletionRates,
    theme.palette.success.main,
    theme.palette.warning.main,
    theme.palette.error.main,
    spanType,
  ]);

  // Summary metrics
  const contentMetrics = useMemo(() => {
    if (
      !videoViews ||
      !videoPercentageWatched ||
      !videoShares ||
      !videoCompletionRates
    ) {
      return [
        {
          title: 'Total Views',
          value: '-',
          icon: ViewsIcon,
        },
        {
          title: 'Total Shares',
          value: '-',
          icon: ShareIcon,
        },
        {
          title: 'Avg Completion',
          value: '-',
          icon: CompletionIcon,
        },
        {
          title: 'Drop-off Rate',
          value: '-',
          icon: DropOffIcon,
        },
        {
          title: 'Total Sessions',
          value: '-',
          icon: PlayIcon,
        },
      ];
    }

    return [
      {
        title: 'Total Views',
        value: videoViews.totalViews.toString(),
        icon: ViewsIcon,
      },
      {
        title: 'Total Shares',
        value: videoShares.totalShares.toString(),
        icon: ShareIcon,
      },
      {
        title: 'Avg Completion',
        value: `${videoPercentageWatched.averagePercentageWatched.toFixed(1)}%`,
        icon: CompletionIcon,
      },
      {
        title: 'Drop-off Rate',
        value: `${videoCompletionRates.dropOffRate.toFixed(1)}%`,
        icon: DropOffIcon,
      },
      {
        title: 'Total Sessions',
        value: videoCompletionRates.totalSessions.toString(),
        icon: PlayIcon,
      },
    ];
  }, [videoViews, videoPercentageWatched, videoShares, videoCompletionRates]);

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
              Content Performance Metrics
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Analyze the performance of individual videos. Select a video and
              date range to view detailed metrics.
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

      {/* Video Selection Section */}
      <Card
        elevation={0}
        sx={{
          p: 3,
          mb: 4,
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
          sx={{ mb: 3, display: 'flex', alignItems: 'center' }}
        >
          <VideoIcon style={{ marginRight: '10px' }} />
          Select a Video to Analyze
        </Typography>

        {isLoadingVideoList ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper} elevation={0}>
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ '& th': { fontWeight: 'bold' } }}>
                  <TableCell>Video</TableCell>
                  <TableCell align="right">Duration</TableCell>
                  <TableCell align="right">Genre</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {videoList?.map((video) => (
                  <TableRow
                    key={video.id}
                    sx={{
                      '&:last-child td, &:last-child th': { border: 0 },
                      bgcolor:
                        selectedVideoId === video.id
                          ? `${theme.palette.primary.main}15`
                          : 'inherit',
                      '&:hover': {
                        bgcolor: `${theme.palette.primary.main}10`,
                      },
                    }}
                  >
                    <TableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar
                          variant="rounded"
                          src={video.thumbnail_url}
                          sx={{ width: 56, height: 40, mr: 2 }}
                        >
                          <VideoIcon />
                        </Avatar>
                        <Typography variant="body2" fontWeight={500}>
                          {video.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell align="right">{video.duration}</TableCell>
                    <TableCell align="right">{video.genre}</TableCell>
                    <TableCell align="right">
                      <Button
                        variant={
                          selectedVideoId === video.id
                            ? 'contained'
                            : 'outlined'
                        }
                        size="small"
                        onClick={() => handleVideoSelect(video.id)}
                      >
                        {selectedVideoId === video.id
                          ? 'Selected'
                          : 'View Metrics'}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Card>

      {selectedVideoId ? (
        <>
          {/* Summary Metrics */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            {contentMetrics.map((metric, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                      {isLoadingVideoViews ||
                      isLoadingVideoPercentageWatched ? (
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

          {/* Views Chart */}
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
          >
            <ViewsIcon style={{ marginRight: '10px' }} />
            Video Views Over Time
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
                {isLoadingVideoViews ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                  </Box>
                ) : videoViewsError ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 8,
                      color: 'error.main',
                    }}
                  >
                    <Typography>
                      Error loading video views data. Please try again.
                    </Typography>
                  </Box>
                ) : (
                  // @ts-ignore
                  <ChartCard chartData={videoViewsChartData} height={400} />
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Percentage Watched Chart */}
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
          >
            <CompletionIcon style={{ marginRight: '10px' }} />
            Video Completion Rate
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
                {isLoadingVideoPercentageWatched ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                  </Box>
                ) : videoPercentageWatchedError ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 8,
                      color: 'error.main',
                    }}
                  >
                    <Typography>
                      Error loading completion rate data. Please try again.
                    </Typography>
                  </Box>
                ) : (
                  // @ts-ignore
                  <ChartCard
                    chartData={videoPercentageWatchedChartData}
                    height={400}
                  />
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Shares Chart */}
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
          >
            <ShareIcon style={{ marginRight: '10px' }} />
            Video Shares
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
                {isLoadingVideoShares ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                  </Box>
                ) : videoSharesError ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 8,
                      color: 'error.main',
                    }}
                  >
                    <Typography>
                      Error loading video shares data. Please try again.
                    </Typography>
                  </Box>
                ) : (
                  // @ts-ignore
                  <ChartCard chartData={videoSharesChartData} height={400} />
                )}
              </Card>
            </Grid>
          </Grid>

          {/* Completion/Drop-off Rates Chart */}
          <Typography
            variant="h5"
            fontWeight="600"
            gutterBottom
            sx={{ mt: 6, mb: 3, display: 'flex', alignItems: 'center' }}
          >
            <DropOffIcon style={{ marginRight: '10px' }} />
            Completion and Drop-off Rates
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
                {isLoadingVideoCompletionRates ? (
                  <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                    <CircularProgress />
                  </Box>
                ) : videoCompletionRatesError ? (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      p: 8,
                      color: 'error.main',
                    }}
                  >
                    <Typography>
                      Error loading completion rates data. Please try again.
                    </Typography>
                  </Box>
                ) : (
                  // @ts-ignore
                  <ChartCard
                    chartData={videoCompletionRatesChartData}
                    height={400}
                  />
                )}
              </Card>
            </Grid>
          </Grid>

          {/* {videoPercentageWatched && videoCompletionRates && (
            <Card
              elevation={0}
              sx={{
                p: 3,
                mb: 4,
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
                sx={{ mb: 3 }}
              >
                Video Performance Summary
              </Typography>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
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
                      Average Watch Percentage
                    </Typography>
                    <Typography variant="h3" fontWeight="600" align="center">
                      {videoPercentageWatched.averagePercentageWatched.toFixed(
                        1
                      )}
                      <Typography
                        component="span"
                        variant="h5"
                        color="text.secondary"
                      >
                        %
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: `${theme.palette.error.main}08`,
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
                      Drop-off Rate
                    </Typography>
                    <Typography variant="h3" fontWeight="600" align="center">
                      {videoCompletionRates.dropOffRate.toFixed(1)}
                      <Typography
                        component="span"
                        variant="h5"
                        color="text.secondary"
                      >
                        %
                      </Typography>
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Box
                    sx={{
                      p: 3,
                      borderRadius: 2,
                      bgcolor: `${theme.palette.success.main}08`,
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
                      Total Shares
                    </Typography>
                    <Typography variant="h3" fontWeight="600" align="center">
                      {videoShares?.totalShares || 0}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )} */}
        </>
      ) : (
        <Card
          elevation={0}
          sx={{
            p: 8,
            borderRadius: 3,
            bgcolor: 'background.paper',
            border: 1,
            borderColor: 'divider',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <VideoIcon size={64} color={`${theme.palette.text.secondary}`} />
          <Typography variant="h5" color="text.secondary" sx={{ mt: 2 }}>
            Select a video to view detailed performance metrics
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default ContentPerformanceMetricsPage;

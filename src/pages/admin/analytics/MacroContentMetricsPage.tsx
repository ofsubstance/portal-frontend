import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  Button,
  useTheme,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Tabs,
  Tab,
  Alert,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from '@mui/material';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { format, subMonths } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import useMetricsActions from '@/hooks/useMetricsActions';
import {
  RiBarChartBoxLine as MacroMetricsIcon,
  RiPlayCircleLine as CompletionIcon,
  RiEyeLine as ViewsIcon,
  RiShareForwardLine as ShareIcon,
  RiLinksLine as ClickthroughIcon,
  RiStarLine as EngagementIcon,
  RiLineChartLine as PatternsIcon,
  RiCalendarEventLine as DateIcon,
} from 'react-icons/ri';
import ReactECharts from 'echarts-for-react';
import { EChartsOption } from 'echarts-for-react';

type SpanType = 'daily' | 'weekly' | 'monthly';

const MacroContentMetricsPage: React.FC = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [activeTab, setActiveTab] = useState(0);
  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: subMonths(new Date(), 1),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [paramChangeCounter, setParamChangeCounter] = useState(0);
  const [spanType, setSpanType] = useState<SpanType>('daily');

  const startDate = dateRange[0].startDate || subMonths(new Date(), 1);
  const endDate = dateRange[0].endDate || new Date();

  const {
    useMacroContentCompletionRatesQuery,
    useMacroContentMostViewedQuery,
    useMacroContentMostSharedQuery,
    useMacroContentLinkClickthroughQuery,
    useMacroContentEngagementScoresQuery,
    useMacroContentViewingPatternsQuery,
  } = useMetricsActions();

  // Fetch all data
  const {
    data: completionRatesData,
    isLoading: isLoadingCompletion,
    error: completionError,
  } = useMacroContentCompletionRatesQuery(startDate, endDate);

  const {
    data: mostViewedData,
    isLoading: isLoadingViewed,
    error: viewedError,
  } = useMacroContentMostViewedQuery(startDate, endDate);

  const {
    data: mostSharedData,
    isLoading: isLoadingShared,
    error: sharedError,
  } = useMacroContentMostSharedQuery(startDate, endDate);

  const {
    data: clickthroughData,
    isLoading: isLoadingClickthrough,
    error: clickthroughError,
  } = useMacroContentLinkClickthroughQuery(startDate, endDate);

  const {
    data: engagementScoresData,
    isLoading: isLoadingEngagement,
    error: engagementError,
  } = useMacroContentEngagementScoresQuery(startDate, endDate);

  const {
    data: viewingPatternsData,
    isLoading: isLoadingPatterns,
    error: patternsError,
  } = useMacroContentViewingPatternsQuery(startDate, endDate);

  const isLoading =
    isLoadingCompletion ||
    isLoadingViewed ||
    isLoadingShared ||
    isLoadingClickthrough ||
    isLoadingEngagement ||
    isLoadingPatterns;

  const hasError =
    completionError ||
    viewedError ||
    sharedError ||
    clickthroughError ||
    engagementError ||
    patternsError;

  // Summary metrics from the data
  const summaryMetrics = useMemo(() => {
    if (
      !mostViewedData ||
      !mostSharedData ||
      !completionRatesData ||
      !engagementScoresData
    ) {
      return [];
    }

    const totalViews = mostViewedData.data.reduce(
      (sum, item) => sum + item.viewCount,
      0
    );
    const totalShares = mostSharedData.data.reduce(
      (sum, item) => sum + item.shareCount,
      0
    );
    const avgCompletion =
      completionRatesData.data.reduce(
        (sum, item) => sum + item.averageCompletion,
        0
      ) / Math.max(completionRatesData.data.length, 1);
    const avgEngagement =
      engagementScoresData.data.reduce(
        (sum, item) => sum + item.engagementScore,
        0
      ) / Math.max(engagementScoresData.data.length, 1);

    return [
      {
        title: 'Total Content Views',
        value: totalViews.toLocaleString(),
        icon: ViewsIcon,
        color: theme.palette.primary.main,
      },
      {
        title: 'Total Shares',
        value: totalShares.toLocaleString(),
        icon: ShareIcon,
        color: theme.palette.success.main,
      },
      {
        title: 'Avg. Completion Rate',
        value: `${avgCompletion.toFixed(1)}%`,
        icon: CompletionIcon,
        color: theme.palette.info.main,
      },
      {
        title: 'Avg. Engagement Score',
        value: avgEngagement.toFixed(1),
        icon: EngagementIcon,
        color: theme.palette.warning.main,
      },
    ];
  }, [
    mostViewedData,
    mostSharedData,
    completionRatesData,
    engagementScoresData,
    theme,
  ]);

  const handleSpanTypeChange = (event: SelectChangeEvent) => {
    setSpanType(event.target.value as SpanType);
    setParamChangeCounter((prev) => prev + 1);
  };

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

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  // Chart options for viewing patterns
  const getViewingPatternsChart = (): EChartsOption => {
    if (!viewingPatternsData) {
      return {
        title: {
          text: 'No Data Available',
          left: 'center',
        },
        xAxis: {
          type: 'category',
          data: [],
        },
        yAxis: {
          type: 'value',
          name: 'Sessions',
        },
        series: [],
      };
    }

    const hourlyData = viewingPatternsData.data.hourlyDistribution.map(
      (item) => ({
        hour: item.hour,
        sessions: item.sessions,
      })
    );

    return {
      title: {
        text: 'Viewing Activity by Hour',
        left: 'center',
      },
      xAxis: {
        type: 'category',
        data: hourlyData.map((item) => item.hour),
      },
      yAxis: {
        type: 'value',
        name: 'Sessions',
      },
      series: [
        {
          data: hourlyData.map((item) => item.sessions),
          type: 'line',
          smooth: true,
          itemStyle: {
            color: primaryColor,
          },
        },
      ],
      tooltip: {
        trigger: 'axis',
        formatter: '{b}: {c} sessions',
      },
    };
  };

  const getCompletionDistributionChart = (): EChartsOption => {
    if (!viewingPatternsData) {
      return {
        title: {
          text: 'No Data Available',
          left: 'center',
        },
        series: [],
      };
    }

    const distributionData =
      viewingPatternsData.data.completionDistribution.map((item) => ({
        name: item.range,
        value: item.percentage,
      }));

    return {
      title: {
        text: 'Completion Rate Distribution',
        left: 'center',
      },
      series: [
        {
          type: 'pie',
          radius: '60%',
          data: distributionData,
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
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c}%',
      },
    };
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Video Completion Rates
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'grey.200' }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        <Typography fontWeight={600}>Video</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>Genre</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Duration</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Completion %</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Sessions</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Watch Time (min)
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {completionRatesData?.data?.length ? (
                      completionRatesData.data.map((item) => (
                        <TableRow key={item.videoId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {item.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.genre}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">{item.duration}</TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`${item.averageCompletion.toFixed(1)}%`}
                              size="small"
                              color={
                                item.averageCompletion >= 70
                                  ? 'success'
                                  : item.averageCompletion >= 50
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            {item.totalSessions}
                          </TableCell>
                          <TableCell align="right">
                            {Math.round(item.totalTimeWatched / 60)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No completion data available for the selected period
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Most Viewed Content
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'grey.200' }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        <Typography fontWeight={600}>Video</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>Genre</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Duration</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Views</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Unique Viewers</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Avg. Completion %
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mostViewedData?.data?.length ? (
                      mostViewedData.data.map((item) => (
                        <TableRow key={item.videoId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {item.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.genre}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">{item.duration}</TableCell>
                          <TableCell align="right">
                            <Typography fontWeight={600} color="primary">
                              {item.viewCount}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">
                            {item.uniqueViewers}
                          </TableCell>
                          <TableCell align="right">
                            {item.averageCompletion.toFixed(1)}%
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No viewing data available for the selected period
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Most Shared Content
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'grey.200' }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        <Typography fontWeight={600}>Video</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>Genre</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Duration</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Shares</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Total Views</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Views per Share
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {mostSharedData?.data?.length ? (
                      mostSharedData.data.map((item) => (
                        <TableRow key={item.videoId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {item.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.genre}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">{item.duration}</TableCell>
                          <TableCell align="right">
                            <Typography fontWeight={600} color="success.main">
                              {item.shareCount}
                            </Typography>
                          </TableCell>
                          <TableCell align="right">{item.totalViews}</TableCell>
                          <TableCell align="right">
                            {item.averageViewsPerShare.toFixed(1)}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No sharing data available for the selected period
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Link Clickthrough Performance
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'grey.200' }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        <Typography fontWeight={600}>Video</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>Genre</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Total Links</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Total Views</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Unique Engagements
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Clickthrough Rate
                        </Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clickthroughData?.data?.length ? (
                      clickthroughData.data.map((item) => (
                        <TableRow key={item.videoId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {item.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.genre}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">{item.totalLinks}</TableCell>
                          <TableCell align="right">{item.totalViews}</TableCell>
                          <TableCell align="right">
                            {item.uniqueEngagements}
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={`${item.clickthroughRate}%`}
                              size="small"
                              color={
                                item.clickthroughRate >= 80
                                  ? 'success'
                                  : item.clickthroughRate >= 50
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No clickthrough data available for the selected
                            period
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        );

      case 4:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Content Engagement Scores
              </Typography>
              <TableContainer
                component={Paper}
                elevation={0}
                sx={{ border: '1px solid', borderColor: 'grey.200' }}
              >
                <Table>
                  <TableHead>
                    <TableRow sx={{ bgcolor: 'grey.50' }}>
                      <TableCell>
                        <Typography fontWeight={600}>Video</Typography>
                      </TableCell>
                      <TableCell>
                        <Typography fontWeight={600}>Genre</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Engagement Score
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Views</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>
                          Avg. Completion
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Shares</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography fontWeight={600}>Feedback</Typography>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {engagementScoresData?.data?.length ? (
                      engagementScoresData.data.map((item) => (
                        <TableRow key={item.videoId} hover>
                          <TableCell>
                            <Typography variant="body2" fontWeight={500}>
                              {item.title}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Chip
                              label={item.genre}
                              size="small"
                              variant="outlined"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <Chip
                              label={item.engagementScore.toFixed(1)}
                              size="small"
                              color={
                                item.engagementScore >= 70
                                  ? 'success'
                                  : item.engagementScore >= 40
                                  ? 'warning'
                                  : 'error'
                              }
                            />
                          </TableCell>
                          <TableCell align="right">
                            {item.metrics.totalViews}
                          </TableCell>
                          <TableCell align="right">
                            {item.metrics.avgCompletion.toFixed(1)}%
                          </TableCell>
                          <TableCell align="right">
                            {item.metrics.shareCount}
                          </TableCell>
                          <TableCell align="right">
                            {item.metrics.feedbackCount}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} align="center" sx={{ py: 4 }}>
                          <Typography color="text.secondary">
                            No engagement data available for the selected period
                          </Typography>
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        );

      case 5:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom fontWeight={600}>
                Viewing Patterns Analysis
              </Typography>
            </Grid>

            {viewingPatternsData && (
              <>
                <Grid item xs={12} md={6}>
                  <Card
                    elevation={0}
                    sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Key Metrics
                    </Typography>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography
                            variant="h4"
                            color="primary"
                            fontWeight={600}
                          >
                            {viewingPatternsData.data.totalSessions}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Sessions
                          </Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ textAlign: 'center' }}>
                          <Typography
                            variant="h4"
                            color="success.main"
                            fontWeight={600}
                          >
                            {viewingPatternsData.data.uniqueViewers}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Unique Viewers
                          </Typography>
                        </Box>
                      </Grid>
                    </Grid>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    elevation={0}
                    sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}
                  >
                    <Typography
                      variant="subtitle1"
                      fontWeight={600}
                      gutterBottom
                    >
                      Session Duration
                    </Typography>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h4"
                        color="info.main"
                        fontWeight={600}
                      >
                        {Math.round(
                          viewingPatternsData.data.sessionDurations.average / 60
                        )}{' '}
                        min
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Average Session Duration
                      </Typography>
                    </Box>
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    elevation={0}
                    sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}
                  >
                    <ReactECharts
                      option={getViewingPatternsChart()}
                      style={{ height: '300px' }}
                    />
                  </Card>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Card
                    elevation={0}
                    sx={{ p: 3, border: '1px solid', borderColor: 'grey.200' }}
                  >
                    <ReactECharts
                      option={getCompletionDistributionChart()}
                      style={{ height: '300px' }}
                    />
                  </Card>
                </Grid>
              </>
            )}
          </Grid>
        );

      default:
        return null;
    }
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
              Macro Content Metrics
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              View key performance metrics for your macro content. Select a date
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

      {/* Error Display */}
      {hasError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load some metrics data. Please try again later.
        </Alert>
      )}

      {/* Loading State */}
      {isLoading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress size={60} />
        </Box>
      )}

      {/* Summary Metrics */}
      {!isLoading && summaryMetrics.length > 0 && (
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {summaryMetrics.map((metric, index) => (
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
      )}

      {/* Tabs and Content */}
      {!isLoading && !hasError && (
        <>
          <Paper sx={{ mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              sx={{
                borderBottom: '1px solid',
                borderColor: 'grey.200',
                '& .MuiTab-root': {
                  textTransform: 'none',
                  fontWeight: 500,
                },
              }}
            >
              <Tab label="Completion Rates" icon={<CompletionIcon />} />
              <Tab label="Most Viewed" icon={<ViewsIcon />} />
              <Tab label="Most Shared" icon={<ShareIcon />} />
              <Tab label="Link Performance" icon={<ClickthroughIcon />} />
              <Tab label="Engagement Scores" icon={<EngagementIcon />} />
              <Tab label="Viewing Patterns" icon={<PatternsIcon />} />
            </Tabs>
          </Paper>

          <Paper sx={{ p: 3 }}>{renderTabContent()}</Paper>
        </>
      )}
    </Box>
  );
};

export default MacroContentMetricsPage;

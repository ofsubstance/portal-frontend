import React, { useState, useMemo } from 'react';
import {
  Box,
  Grid,
  Typography,
  Card,
  useTheme,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Divider,
  Alert,
} from '@mui/material';
import { subDays, format } from 'date-fns';
import { ChartCard } from '../../components/charts';
import useMetricsActions from '@/hooks/useMetricsActions';
import useVideoManagementActions from '@/hooks/useVideoManagementAction';
import useDataExport from '@/hooks/useDataExport';
import { ChartData } from '@/components/charts/ChartTypes';
import {
  RiUserLine,
  RiVideoLine,
  RiTimeLine,
  RiLoginBoxLine,
  RiFileChartLine,
  RiArrowRightSLine,
  RiDownloadLine,
} from 'react-icons/ri';

function DashboardPage() {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;
  const { exportAllData, isExporting, error: exportError } = useDataExport();

  // Date ranges for metrics
  const endDate = new Date();
  const startDate = subDays(endDate, 7);

  // Get metrics data
  const {
    useDailyActiveUsersQuery,
    useMonthlyActiveUsersQuery,
    useUserTrendQuery,
    useSessionEngagementQuery,
  } = useMetricsActions();

  const { useVideoListQuery } = useVideoManagementActions();

  const { data: dau, isLoading: isLoadingDau } =
    useDailyActiveUsersQuery(endDate);
  const { data: mau, isLoading: isLoadingMau } =
    useMonthlyActiveUsersQuery(endDate);
  const { data: userTrend, isLoading: isLoadingUserTrend } = useUserTrendQuery(
    startDate,
    endDate,
    'daily'
  );
  const { data: sessionData, isLoading: isLoadingSession } =
    useSessionEngagementQuery(startDate, endDate);
  const { data: videos, isLoading: isLoadingVideos } = useVideoListQuery();

  // Recent videos for dashboard
  const recentVideos = useMemo(() => {
    if (!videos) return [];
    return [...videos]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, 5);
  }, [videos]);

  // User trend chart data
  const userTrendChartData: ChartData = useMemo(() => {
    if (!userTrend) {
      return {
        type: 'line',
        title: 'Active Users - Last 7 Days',
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

    const xAxisLabels = userTrend.data.map((item) => {
      return format(new Date(item.date), 'MM/dd');
    });

    return {
      type: 'line',
      xAxis: {
        type: 'category',
        data: xAxisLabels,
        name: 'Date',
        axisLabel: {
          rotate: 0,
          margin: 15,
        },
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
          smooth: true,
          showSymbol: true,
          symbolSize: 6,
          lineStyle: {
            width: 3,
          },
          areaStyle: {
            opacity: 0.2,
          },
        },
      ],
      color: [primaryColor],
      tooltip: {
        trigger: 'axis',
      },
    };
  }, [userTrend, primaryColor]);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', sm: 'center' },
          gap: 2,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="600" gutterBottom>
            Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to the Of Substance admin dashboard. Here's an overview of
            your platform.
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<RiDownloadLine />}
          onClick={exportAllData}
          disabled={isExporting}
          sx={{
            height: '45px',
            minWidth: '160px',
            bgcolor: theme.palette.success.main,
            '&:hover': {
              bgcolor: theme.palette.success.dark,
            },
          }}
        >
          {isExporting ? 'Exporting...' : 'Export Data'}
        </Button>
      </Box>

      {exportError && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {exportError}
        </Alert>
      )}

      {/* Stats Overview */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* DAU */}
        <Grid item xs={12} sm={6} md={3}>
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
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
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
                  <RiUserLine size={24} />
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
                  Daily Active Users
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
                {isLoadingDau ? (
                  <CircularProgress size={24} />
                ) : dau ? (
                  dau.count
                ) : (
                  0
                )}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Total Videos */}
        <Grid item xs={12} sm={6} md={3}>
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
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
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
                  <RiVideoLine size={24} />
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
                  Total Videos
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
                {isLoadingVideos ? (
                  <CircularProgress size={24} />
                ) : videos ? (
                  videos.length
                ) : (
                  0
                )}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* Avg Session Duration */}
        <Grid item xs={12} sm={6} md={3}>
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
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
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
                  <RiTimeLine size={24} />
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
                  Avg Session
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
                {isLoadingSession ? (
                  <CircularProgress size={24} />
                ) : sessionData ? (
                  `${Math.round(sessionData.averageDurationMinutes)}min`
                ) : (
                  '0min'
                )}
              </Typography>
            </Box>
          </Card>
        </Grid>

        {/* MAU */}
        <Grid item xs={12} sm={6} md={3}>
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
              sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}
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
                  <RiLoginBoxLine size={24} />
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
                  Monthly Active Users
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
                {isLoadingMau ? (
                  <CircularProgress size={24} />
                ) : mau ? (
                  mau.count
                ) : (
                  0
                )}
              </Typography>
            </Box>
          </Card>
        </Grid>
      </Grid>

      {/* Main Content */}
      <Grid container spacing={4}>
        {/* User Trend Chart */}
        <Grid item xs={12} md={8}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              height: '100%',
              bgcolor: 'background.paper',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h5" fontWeight="600">
                User Activity
              </Typography>
              <Button
                size="small"
                endIcon={<RiArrowRightSLine />}
                sx={{ textTransform: 'none' }}
                onClick={() =>
                  (window.location.href = '/admin/analytics/performance')
                }
              >
                View Details
              </Button>
            </Box>
            {isLoadingUserTrend ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : (
              <ChartCard chartData={userTrendChartData} height={320} />
            )}
          </Card>
        </Grid>

        {/* Recent Videos */}
        <Grid item xs={12} md={4}>
          <Card
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              height: '100%',
              bgcolor: 'background.paper',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 3,
              }}
            >
              <Typography variant="h5" fontWeight="600">
                Recent Videos
              </Typography>
              <Button
                size="small"
                endIcon={<RiArrowRightSLine />}
                sx={{ textTransform: 'none' }}
                onClick={() =>
                  (window.location.href = '/admin/video-management')
                }
              >
                View All
              </Button>
            </Box>

            {isLoadingVideos ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 8 }}>
                <CircularProgress />
              </Box>
            ) : recentVideos.length > 0 ? (
              <Box sx={{ flexGrow: 1, overflow: 'hidden' }}>
                {recentVideos.map((video, index) => (
                  <React.Fragment key={video.id}>
                    <Box sx={{ py: 1.5 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box
                          component="img"
                          src={
                            video.thumbnail_url || 'https://placehold.co/60x40'
                          }
                          alt={video.title}
                          sx={{
                            width: 60,
                            height: 40,
                            objectFit: 'cover',
                            borderRadius: 1,
                            mr: 2,
                          }}
                        />
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography
                            variant="body2"
                            fontWeight={500}
                            noWrap
                            sx={{ mb: 0.5 }}
                          >
                            {video.title}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {format(new Date(video.createdAt), 'MMM dd, yyyy')}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                    {index < recentVideos.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </Box>
            ) : (
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <Typography color="text.secondary">No videos found</Typography>
              </Box>
            )}
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default DashboardPage;

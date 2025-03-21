import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, Stack } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ChartCard } from '../../../components/charts';
import MetricCard from '../../../components/metrics/MetricCard';
import {
  mauData,
  dauData,
  userGrowthRateData,
  userEngagementRateData,
  userRetentionRateData,
  avgSessionDurationData,
  summaryMetrics,
} from '../../../data/appPerformanceData';

const AppPerformanceMetrics: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // In a real app, this would trigger API calls to fetch data for the selected date range
  const handleDateChange = () => {
    console.log('Date range changed:', { startDate, endDate });
    // Here you would call APIs to fetch data for the selected date range
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
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack direction="row" spacing={2}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => {
                  setStartDate(newValue);
                  handleDateChange();
                }}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => {
                  setEndDate(newValue);
                  handleDateChange();
                }}
              />
            </Stack>
          </LocalizationProvider>
        </Box>
        <Typography variant="body1">
          View key performance metrics for your application. Select a date range
          to filter the data.
        </Typography>
      </Paper>

      {/* Summary Metrics */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {summaryMetrics.map((metric, index) => (
          <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
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

      {/* User Activity Charts */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        User Activity
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <ChartCard chartData={mauData} height={300} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard chartData={dauData} height={300} />
        </Grid>
      </Grid>

      {/* User Growth and Engagement Charts */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        User Growth & Engagement
      </Typography>
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <ChartCard chartData={userGrowthRateData} height={300} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard chartData={userEngagementRateData} height={300} />
        </Grid>
      </Grid>

      {/* User Retention and Session Duration Charts */}
      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        User Retention & Session Duration
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard chartData={userRetentionRateData} height={300} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard chartData={avgSessionDurationData} height={300} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppPerformanceMetrics;

import React, { useState } from 'react';
import { Box, Grid, Typography, Paper, Button, useTheme } from '@mui/material';
import { DateRange, Range, RangeKeyDict } from 'react-date-range';
import { addDays, format } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
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
import { ChartData } from '../../../components/charts/ChartTypes';

const AppPerformanceMetrics: React.FC = () => {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const [dateRange, setDateRange] = useState<Range[]>([
    {
      startDate: addDays(new Date(), -30),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showDatePicker, setShowDatePicker] = useState(false);

  // In a real app, this would trigger API calls to fetch data for the selected date range
  const handleDateChange = (item: RangeKeyDict) => {
    setDateRange([item.selection]);
    console.log('Date range changed:', {
      startDate: item.selection.startDate,
      endDate: item.selection.endDate,
    });
    // Here you would call APIs to fetch data for the selected date range
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

  // Apply primary color to all chart data
  const applyPrimaryColor = (chartData: ChartData): ChartData => {
    return {
      ...chartData,
      color: [primaryColor],
    };
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
          <Box sx={{ position: 'relative' }}>
            <Button
              variant="outlined"
              onClick={() => setShowDatePicker(!showDatePicker)}
              sx={{ minWidth: '200px', justifyContent: 'space-between', px: 2 }}
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
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
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

      {/* Monthly Active Users */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Monthly Active Users (MAU)
        </Typography>
        <ChartCard chartData={applyPrimaryColor(mauData)} height={400} />
      </Box>

      {/* Daily Active Users */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Daily Active Users (DAU)
        </Typography>
        <ChartCard chartData={applyPrimaryColor(dauData)} height={400} />
      </Box>

      {/* User Growth Rate */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          User Growth Rate
        </Typography>
        <ChartCard
          chartData={applyPrimaryColor(userGrowthRateData)}
          height={400}
        />
      </Box>

      {/* User Engagement Rate */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          User Engagement Rate
        </Typography>
        <ChartCard
          chartData={applyPrimaryColor(userEngagementRateData)}
          height={400}
        />
      </Box>

      {/* User Retention Rate */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          User Retention Rate
        </Typography>
        <ChartCard
          chartData={applyPrimaryColor(userRetentionRateData)}
          height={400}
        />
      </Box>

      {/* Average Session Duration */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h5" gutterBottom sx={{ mb: 2 }}>
          Average Session Duration
        </Typography>
        <ChartCard
          chartData={applyPrimaryColor(avgSessionDurationData)}
          height={400}
        />
      </Box>
    </Box>
  );
};

export default AppPerformanceMetrics;

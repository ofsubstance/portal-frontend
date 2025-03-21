import React from 'react';
import { Box, Grid, Typography, Paper } from '@mui/material';
import ChartCard from './ChartCard';
import {
  lineChartExample,
  multiLineChartExample,
  areaChartExample,
  stackedAreaChartExample,
  barChartExample,
  groupedBarChartExample,
  stackedBarChartExample,
  pieChartExample,
  donutChartExample,
  scatterChartExample,
} from './ChartExamples';

const ChartDemo: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ p: 3, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Chart Components Demo
        </Typography>
        <Typography variant="body1" paragraph>
          This page demonstrates the various chart types available in the
          application. Each chart is a reusable component that can be configured
          with different data and options.
        </Typography>
      </Paper>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Line Charts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Simple Line Chart"
            description="Shows a single data series over time"
            chartData={lineChartExample}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Multi-Line Chart"
            description="Compares multiple data series over time"
            chartData={multiLineChartExample}
            height={300}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Area Charts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Area Chart"
            description="Emphasizes volume under the line"
            chartData={areaChartExample}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Stacked Area Chart"
            description="Shows cumulative values of multiple series"
            chartData={stackedAreaChartExample}
            height={300}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Bar Charts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ChartCard
            title="Simple Bar Chart"
            description="Shows a single data series as bars"
            chartData={barChartExample}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard
            title="Grouped Bar Chart"
            description="Compares multiple data series side by side"
            chartData={groupedBarChartExample}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard
            title="Stacked Bar Chart"
            description="Shows cumulative values of multiple series"
            chartData={stackedBarChartExample}
            height={300}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Pie Charts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Pie Chart"
            description="Shows proportion of different categories"
            chartData={pieChartExample}
            height={300}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChartCard
            title="Donut Chart"
            description="A pie chart with a hole in the center"
            chartData={donutChartExample}
            height={300}
          />
        </Grid>
      </Grid>

      <Typography variant="h5" gutterBottom sx={{ mt: 4, mb: 2 }}>
        Scatter Charts
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <ChartCard
            title="Scatter Chart"
            description="Shows correlation between two variables"
            chartData={scatterChartExample}
            height={400}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ChartDemo;

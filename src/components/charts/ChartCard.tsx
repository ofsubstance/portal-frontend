import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { ChartCardProps, generateChartOptions } from './ChartTypes';
// Import the echarts instance with registered components
import echarts from '@/utils/chartHelper';

const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  chartData,
  height = 400,
  loading = false,
  className = '',
  onEvents,
}) => {
  const options = generateChartOptions(chartData);

  // Add dataZoom configuration for horizontal scrolling if there are many data points
  if (chartData.xAxis?.data && chartData.xAxis.data.length > 10) {
    if (!options.dataZoom) {
      options.dataZoom = [
        {
          type: 'slider',
          show: true,
          xAxisIndex: [0],
          start: 0,
          end: Math.min(100, 1000 / chartData.xAxis.data.length), // Show fewer points for more spacing
          height: 20,
          bottom: 10,
          borderColor: 'transparent',
          backgroundColor: 'rgba(0,0,0,0.05)',
          fillerColor: 'rgba(80,80,80,0.1)',
          handleIcon:
            'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
          handleSize: '70%',
          handleStyle: {
            color: '#fff',
            shadowBlur: 3,
            shadowColor: 'rgba(0, 0, 0, 0.6)',
            shadowOffsetX: 2,
            shadowOffsetY: 2,
          },
          textStyle: {
            fontSize: 12,
          },
          brushSelect: false,
        },
        {
          type: 'inside',
          xAxisIndex: [0],
          start: 0,
          end: Math.min(100, 1000 / chartData.xAxis.data.length),
          zoomOnMouseWheel: true,
          moveOnMouseWheel: true,
        },
      ];
    }

    // Increase grid bottom to make room for the data zoom slider
    if (!options.grid) {
      options.grid = {};
    }

    // Use type assertion for grid property
    if (options.grid && !Array.isArray(options.grid)) {
      options.grid.bottom = 60;
    }

    // Add point style to make points more visible
    if (
      options.series &&
      Array.isArray(options.series) &&
      options.series.length > 0
    ) {
      options.series.forEach((series: any) => {
        if (series.type === 'line') {
          series.symbolSize = 6; // Larger points
          series.symbol = 'circle';
          series.emphasis = {
            itemStyle: {
              borderWidth: 2,
              shadowBlur: 10,
              shadowColor: 'rgba(0,0,0,0.3)',
            },
          };
        }
      });
    }
  }

  return (
    <Paper
      elevation={1}
      className={`p-4 ${className}`}
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      {title && (
        <Box mb={description ? 1 : 2}>
          <Typography variant="h6" fontWeight={500}>
            {title}
          </Typography>
        </Box>
      )}

      {description && (
        <Box mb={2}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>
      )}

      <Box
        sx={{
          flexGrow: 1,
          position: 'relative',
          minHeight: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {loading ? (
          <CircularProgress />
        ) : (
          <ReactECharts
            option={options}
            style={{ height, width: '100%' }}
            opts={{ renderer: 'canvas' }}
            onEvents={onEvents}
            echarts={echarts}
          />
        )}
      </Box>
    </Paper>
  );
};

export default ChartCard;

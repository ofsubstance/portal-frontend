import { Paper, Typography, Box, CircularProgress } from '@mui/material';
import ReactECharts from 'echarts-for-react';
import { ChartCardProps, generateChartOptions } from './ChartTypes';

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
          />
        )}
      </Box>
    </Paper>
  );
};

export default ChartCard;

import React from 'react';
import { Paper, Typography, Box } from '@mui/material';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';

interface MetricCardProps {
  title: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  change,
  changeType = 'neutral',
}) => {
  return (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div" sx={{ fontWeight: 500, my: 1 }}>
        {value}
      </Typography>
      {change && (
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            color:
              changeType === 'positive'
                ? 'success.main'
                : changeType === 'negative'
                ? 'error.main'
                : 'text.secondary',
          }}
        >
          {changeType === 'positive' ? (
            <TrendingUpIcon fontSize="small" sx={{ mr: 0.5 }} />
          ) : changeType === 'negative' ? (
            <TrendingDownIcon fontSize="small" sx={{ mr: 0.5 }} />
          ) : null}
          <Typography variant="body2">{change}</Typography>
        </Box>
      )}
    </Paper>
  );
};

export default MetricCard;

import { Box, Typography, Paper } from '@mui/material';
import { ReactNode } from 'react';

interface ShareLinkStatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  subtitle?: string;
}

export default function ShareLinkStatsCard({
  title,
  value,
  icon,
  subtitle,
}: ShareLinkStatsCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 2.5,
        border: '1px solid',
        borderColor: 'grey.200',
        borderRadius: 2,
        backgroundColor: 'grey.50',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          borderColor: 'grey.300',
          backgroundColor: 'grey.100',
          transform: 'translateY(-1px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box
          sx={{
            p: 1,
            borderRadius: 1.5,
            backgroundColor: 'grey.100',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'text.secondary',
          }}
        >
          {icon}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          <Typography variant="h6" component="div" fontWeight={600}>
            {value}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {title}
          </Typography>
          {subtitle && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ mt: 0.5, display: 'block' }}
            >
              {subtitle}
            </Typography>
          )}
        </Box>
      </Box>
    </Paper>
  );
}

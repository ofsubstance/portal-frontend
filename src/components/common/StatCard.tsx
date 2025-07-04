import { Card, Box, Typography, useTheme } from '@mui/material';
import { alpha } from '@mui/material/styles';
import { SvgIconComponent } from '@mui/icons-material';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: SvgIconComponent;
  color?: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'error';
}

const StatCard = ({
  title,
  value,
  icon: Icon,
  color = 'primary',
}: StatCardProps) => {
  const theme = useTheme();

  return (
    <Card
      sx={{
        p: 3,
        height: '100%',
        background: theme.palette.background.paper,
        border: `1px solid ${alpha(theme.palette.divider, 0.15)}`,
        borderRadius: 2,
        transition: 'all 0.2s ease',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          border: `1px solid ${alpha(theme.palette.divider, 0.25)}`,
        },
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 2,
            background: alpha(theme.palette.grey[100], 0.8),
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <Icon sx={{ color: theme.palette.grey[600], fontSize: 20 }} />
        </Box>
        <Typography
          color="text.secondary"
          variant="body2"
          fontSize="0.85rem"
          fontWeight={500}
        >
          {title}
        </Typography>
      </Box>
      <Typography
        variant="h5"
        sx={{ fontWeight: 700, color: theme.palette.text.primary }}
      >
        {value}
      </Typography>
    </Card>
  );
};

export default StatCard;

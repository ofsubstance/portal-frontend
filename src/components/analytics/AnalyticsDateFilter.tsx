import {
  Box,
  Button,
  Card,
  Divider,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
  useTheme,
} from '@mui/material';
import { format } from 'date-fns';
import { Range, RangeKeyDict, DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { RiCalendarEventLine as DateIcon } from 'react-icons/ri';

export type SpanType = 'daily' | 'weekly' | 'monthly';

interface AnalyticsDateFilterProps {
  title: string;
  description?: string;
  dateRange: Range[];
  showDatePicker: boolean;
  spanType: SpanType;
  showSpan?: boolean;
  onDateChange: (item: RangeKeyDict) => void;
  onApplyDate: () => void;
  onToggleDatePicker: () => void;
  onSpanChange: (span: SpanType) => void;
}

export default function AnalyticsDateFilter({
  title,
  description,
  dateRange,
  showDatePicker,
  spanType,
  showSpan = true,
  onDateChange,
  onApplyDate,
  onToggleDatePicker,
  onSpanChange,
}: AnalyticsDateFilterProps) {
  const theme = useTheme();
  const primaryColor = theme.palette.primary.main;

  const formatDateDisplay = () => {
    if (dateRange[0].startDate && dateRange[0].endDate) {
      return `${format(dateRange[0].startDate, 'MMM dd, yyyy')} – ${format(
        dateRange[0].endDate,
        'MMM dd, yyyy',
      )}`;
    }
    return 'Select date range';
  };

  const handleSpanChange = (e: SelectChangeEvent) => {
    onSpanChange(e.target.value as SpanType);
  };

  const inputSx = {
    bgcolor: 'rgba(255,255,255,0.1)',
    borderRadius: 1,
    '& .MuiOutlinedInput-root': {
      height: '45px',
      color: 'white',
      '& .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255,255,255,0.3)',
      },
      '&:hover .MuiOutlinedInput-notchedOutline': {
        borderColor: 'rgba(255,255,255,0.5)',
      },
    },
    '& .MuiInputLabel-root': {
      color: 'rgba(255,255,255,0.7)',
      transform: 'translate(14px, 12px) scale(1)',
      '&.Mui-focused, &.MuiFormLabel-filled': {
        transform: 'translate(14px, -9px) scale(0.75)',
      },
    },
    '& .MuiSvgIcon-root': { color: 'white' },
  };

  return (
    <Card
      elevation={0}
      sx={{
        p: 4,
        mb: 4,
        background: `linear-gradient(135deg, ${primaryColor} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        borderRadius: 3,
        position: 'relative',
        // Must be visible so the absolutely-positioned DateRange popup
        // isn't clipped by the Card's default overflow:hidden
        overflow: 'visible',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          justifyContent: 'space-between',
          alignItems: { xs: 'flex-start', md: 'center' },
          gap: 3,
        }}
      >
        <Box>
          <Typography variant="h4" fontWeight="600" gutterBottom>
            {title}
          </Typography>
          {description && (
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              {description}
            </Typography>
          )}
        </Box>

        <Box
          sx={{
            display: 'flex',
            gap: 2,
            flexDirection: { xs: 'column', sm: 'row' },
            width: { xs: '100%', sm: 'auto' },
            '& > *': { flex: 1, minWidth: { sm: '180px' } },
          }}
        >
          {showSpan && (
            <FormControl sx={inputSx}>
              <InputLabel id="span-select-label">Time Span</InputLabel>
              <Select
                labelId="span-select-label"
                value={spanType}
                label="Time Span"
                onChange={handleSpanChange}
              >
                <MenuItem value="daily">Daily</MenuItem>
                <MenuItem value="weekly">Weekly</MenuItem>
                <MenuItem value="monthly">Monthly</MenuItem>
              </Select>
            </FormControl>
          )}

          <Button
            variant="outlined"
            onClick={onToggleDatePicker}
            startIcon={<DateIcon size={20} />}
            sx={{
              height: '45px',
              color: 'white',
              borderColor: 'rgba(255,255,255,0.3)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.5)',
                bgcolor: 'rgba(255,255,255,0.1)',
              },
            }}
          >
            {formatDateDisplay()}
          </Button>

          {showDatePicker && (
            <Card
              elevation={6}
              sx={{ position: 'absolute', right: 16, top: '100%', zIndex: 10, overflow: 'hidden', mt: 1 }}
            >
              <DateRange
                editableDateInputs
                onChange={onDateChange}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                maxDate={new Date()}
              />
              <Divider />
              <Box sx={{ display: 'flex', justifyContent: 'center', p: 2, bgcolor: 'background.paper' }}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={onApplyDate}
                  sx={{ py: 1, maxWidth: '90%' }}
                >
                  Apply Date Range
                </Button>
              </Box>
            </Card>
          )}
        </Box>
      </Box>
    </Card>
  );
}

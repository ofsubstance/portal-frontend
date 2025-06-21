import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Chip,
  Typography,
  Box,
  Card,
  Paper,
  alpha,
  useTheme,
  Divider,
  Grid,
} from '@mui/material';
import {
  RiCalendar2Line as CalendarIcon,
  RiTimeLine as ClockIcon,
  RiArrowDownSLine as ExpandMoreIcon,
  RiPlayCircleLine as PlayIcon,
  RiShareLine as ShareIcon,
  RiInformationLine as InfoIcon,
  RiMovieLine as FilmIcon,
} from 'react-icons/ri';

import { VideoDto } from '@/dtos/video.dto';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface VideoDescriptionItemProps {
  title: string;
  details: string;
}

function VideoDescriptionItem({ title, details }: VideoDescriptionItemProps) {
  const theme = useTheme();

  return (
    <Accordion
      defaultExpanded
      disableGutters
      sx={{
        backgroundColor: 'transparent',
        boxShadow: 'none',
        color: 'white',
        border: `1px solid ${alpha(theme.palette.common.white, 0.15)}`,
        borderRadius: 2,
        mb: 1,
        overflow: 'hidden',
        '&:before': {
          display: 'none',
        },
      }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon size={20} className="text-white" />}
        sx={{
          px: 3,
          py: 1,
          minHeight: '48px',
          backgroundColor: alpha(theme.palette.common.white, 0.05),
          '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.08),
          },
          '& .MuiAccordionSummary-content': {
            margin: '8px 0',
          },
        }}
      >
        <Typography variant="h6" fontWeight={600} fontSize="1rem">
          {title}
        </Typography>
      </AccordionSummary>
      <AccordionDetails sx={{ px: 3, py: 2 }}>
        <Typography variant="body1" lineHeight={1.6} sx={{ opacity: 0.9 }}>
          {details}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
}

interface VideoDetailsHeroProps {
  data: VideoDto;
  onPlay: () => void;
  onPlayTrailer: (type: 'trailer' | 'preroll') => void;
  onShare: () => void;
}

export default function VideoDetailsHero({
  data,
  onPlay,
  onPlayTrailer,
  onShare,
}: VideoDetailsHeroProps) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
        minHeight: { md: 'calc(100vh - 64px)' },
        mt: 0,
      }}
    >
      <Box
        sx={{
          minHeight: { md: 'calc(100vh - 64px)' },
          flex: { md: '0.35' },
          p: { xs: 3, sm: 5, md: 6 },
          pt: { xs: 2, sm: 3, md: 4 },
          backgroundColor: alpha(theme.palette.common.white, 0.05),
          backdropFilter: 'blur(10px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
        }}
      >
        <Card elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
          <img
            style={{
              width: '100%',
              height: 'auto',
              objectFit: 'cover',
              aspectRatio: '16/9',
            }}
            src={data.thumbnail_url}
            alt={data.title}
          />
        </Card>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Button
            variant="contained"
            fullWidth
            startIcon={<PlayIcon />}
            color="primary"
            onClick={() => onPlayTrailer('trailer')}
            size="large"
            sx={{
              py: 1.5,
              borderRadius: 2,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 2,
            }}
          >
            Watch Trailer
          </Button>

          {data.preroll_url && (
            <Button
              variant="contained"
              fullWidth
              startIcon={<PlayIcon />}
              color="primary"
              onClick={() => onPlayTrailer('preroll')}
              size="large"
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontWeight: 600,
                textTransform: 'none',
                boxShadow: 2,
              }}
            >
              Watch Pre-roll
            </Button>
          )}

          <Button
            variant="contained"
            fullWidth
            startIcon={<FilmIcon />}
            onClick={onPlay}
            size="large"
            sx={{
              py: 1.8,
              borderRadius: 2,
              fontWeight: 700,
              textTransform: 'none',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.4)',
              background: 'linear-gradient(15deg, primary, #f7dada)',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              my: 1,
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -2,
                left: -2,
                right: -2,
                bottom: -2,
                background:
                  'linear-gradient(45deg, #b34949, transparent,#b34949 )',
                zIndex: -1,
                animation: 'glowEffect 1.5s ease-in-out infinite alternate',
              },
              '&:hover': {
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.6)',
                transform: 'translateY(-2px)',
                background: 'linear-gradient(135deg, #b34949, #b34949)',
              },
              '@keyframes glowEffect': {
                '0%': { opacity: 0.6 },
                '100%': { opacity: 1 },
              },
            }}
          >
            Watch The Film
          </Button>

          <Button
            variant="outlined"
            fullWidth
            startIcon={<ShareIcon />}
            onClick={onShare}
            size="large"
            sx={{
              mt: 1,
              py: 1.5,
              borderRadius: 2,
              borderColor: alpha(theme.palette.common.white, 0.5),
              color: 'white',
              fontWeight: 600,
              textTransform: 'none',
              '&:hover': {
                borderColor: 'white',
                backgroundColor: alpha(theme.palette.common.white, 0.05),
              },
            }}
          >
            Share This Film
          </Button>
        </Box>

        <Box>
          <Typography variant="h4" fontWeight={700} gutterBottom>
            {data.title}
          </Typography>

          <Box
            sx={{
              display: 'flex',
              gap: 3,
              alignItems: 'center',
              mb: 2.5,
              flexWrap: 'wrap',
            }}
          >
            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <CalendarIcon size={18} />
              {dayjs(data.createdAt).format('MMMM DD, YYYY')}
            </Typography>

            <Typography
              variant="body1"
              sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
            >
              <ClockIcon size={18} />
              {data.duration}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
              Genres:
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
              {data.genre.split(',').map((genre) => (
                <Chip
                  key={genre}
                  label={genre.trim()}
                  sx={{
                    borderRadius: 1,
                    backgroundColor: alpha(theme.palette.primary.main, 0.15),
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* Display tags if available */}
          {data.tags && data.tags.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" sx={{ mb: 1, opacity: 0.9 }}>
                Tags:
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {data.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      borderRadius: 1,
                      backgroundColor: alpha(theme.palette.common.white, 0.1),
                      color: 'white',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      <Box
        sx={{
          p: { xs: 3, sm: 5, md: 6 },
          pt: { xs: 2, sm: 3, md: 4 },
          pb: { xs: 2, sm: 4, md: 5 },
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 1.5,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 0.5 }}>
          <InfoIcon size={20} />
          <Typography variant="h5" fontWeight={700}>
            About This Film
          </Typography>
        </Box>

        <Divider
          sx={{ borderColor: alpha(theme.palette.common.white, 0.1), mb: 1 }}
        />

        <Typography variant="body1" lineHeight={1.6} className="py-2">
          {data.short_desc}
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
          <VideoDescriptionItem title="Synopsis" details={data.about} />
          <VideoDescriptionItem
            title="Primary Lesson"
            details={data.primary_lesson}
          />
          <VideoDescriptionItem title="Theme" details={data.theme} />
          <VideoDescriptionItem title="Impact" details={data.impact} />
        </Box>
      </Box>
    </Box>
  );
}

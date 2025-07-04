import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
  IconButton,
  Tooltip,
  Paper,
  Divider,
  Avatar,
  Alert,
  Chip,
  Grid,
  Card,
  CardContent,
  Fade,
  Zoom,
} from '@mui/material';
import { CreateShareLinkDto, ShareLinkDto } from '@/dtos/sharelink.dto';
import useShareLinkAction from '@/hooks/useShareLinkAction';
import {
  RiFileCopyLine as CopyIcon,
  RiCheckLine as CheckIcon,
  RiEyeLine as ViewsIcon,
  RiTimeLine as ExpirationIcon,
  RiVideoLine as VideoIcon,
  RiShareLine as ShareIcon,
  RiLinksLine as LinkIcon,
  RiShieldCheckLine as SecurityIcon,
} from 'react-icons/ri';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

interface ShareLinkModalProps {
  videoId: string;
  onClose: () => void;
}

const validityOptions = [
  { value: 1, label: '1 day', description: 'Short-term sharing' },
  { value: 7, label: '7 days', description: 'One week access' },
  { value: 30, label: '30 days', description: 'One month access' },
  { value: 90, label: '90 days', description: 'Three months access' },
  { value: 365, label: '1 year', description: 'Long-term sharing' },
];

export default function ShareLinkModal({
  videoId,
  onClose,
}: ShareLinkModalProps) {
  const [validityDays, setValidityDays] = useState<number>(30);
  const [shareLink, setShareLink] = useState<ShareLinkDto | null>(null);
  const [copied, setCopied] = useState(false);

  const { createShareLinkMutation } = useShareLinkAction();

  const handleCreateShareLink = () => {
    const data: CreateShareLinkDto = {
      video_id: videoId,
      validity_days: validityDays,
    };

    createShareLinkMutation.mutate(data, {
      onSuccess: (response) => {
        setShareLink(response);
      },
    });
  };

  const handleCopyLink = async () => {
    if (shareLink?.unique_link) {
      try {
        await navigator.clipboard.writeText(shareLink.unique_link);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (error) {
        console.error('Failed to copy link:', error);
      }
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return dayjs(dateString).format('MMM D, YYYY h:mm A');
  };

  const selectedOption = validityOptions.find(
    (option) => option.value === validityDays
  );

  return (
    <Box sx={{ p: 0, width: '100%', maxWidth: 600, minHeight: 400 }}>
      {!shareLink ? (
        <Fade in timeout={300}>
          <Box>
            {/* Header */}
            <Box sx={{ p: 3, pb: 2 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'primary.50',
                    color: 'primary.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShareIcon size={24} />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  Create Share Link
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Generate a secure, time-limited link to share this video with
                others
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'grey.200' }} />

            {/* Form */}
            <Box sx={{ p: 3 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Link Validity Period
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Choose how long the share link will remain active
              </Typography>

              <FormControl fullWidth sx={{ mb: 4 }}>
                <InputLabel id="validity-days-label">Link Validity</InputLabel>
                <Select
                  labelId="validity-days-label"
                  value={validityDays}
                  label="Link Validity"
                  onChange={(e) => setValidityDays(Number(e.target.value))}
                  sx={{
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'grey.300',
                    },
                    '&:hover .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'grey.400',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: 'primary.main',
                    },
                  }}
                >
                  {validityOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      <Box>
                        <Typography variant="body2" fontWeight={500}>
                          {option.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {option.description}
                        </Typography>
                      </Box>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              {selectedOption && (
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    mb: 3,
                    backgroundColor: 'grey.50',
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 2,
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 1,
                      mb: 1,
                    }}
                  >
                    <SecurityIcon size={16} color="green" />
                    <Typography variant="body2" fontWeight={500}>
                      Security Information
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    The link will expire in{' '}
                    <strong>{selectedOption.label}</strong> and cannot be
                    accessed after that. Only people with the exact link can
                    view the video.
                  </Typography>
                </Paper>
              )}

              {createShareLinkMutation.isError && (
                <Alert severity="error" sx={{ mb: 3 }}>
                  {createShareLinkMutation.error?.message ||
                    'Failed to create share link'}
                </Alert>
              )}

              <Button
                variant="contained"
                fullWidth
                size="large"
                onClick={handleCreateShareLink}
                disabled={createShareLinkMutation.isPending}
                startIcon={
                  createShareLinkMutation.isPending ? (
                    <CircularProgress size={20} color="inherit" />
                  ) : (
                    <LinkIcon />
                  )
                }
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  backgroundColor: 'primary.main',
                  '&:hover': {
                    backgroundColor: 'primary.dark',
                  },
                }}
              >
                {createShareLinkMutation.isPending
                  ? 'Creating Share Link...'
                  : 'Create Share Link'}
              </Button>
            </Box>
          </Box>
        </Fade>
      ) : (
        <Zoom in timeout={400}>
          <Box>
            {/* Success Header */}
            <Box sx={{ p: 3, pb: 2 }}>
              <Box
                sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    borderRadius: 2,
                    backgroundColor: 'success.50',
                    color: 'success.main',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <CheckIcon size={24} />
                </Box>
                <Typography variant="h5" fontWeight={600}>
                  Share Link Created!
                </Typography>
              </Box>
              <Typography variant="body1" color="text.secondary">
                Your share link is ready. Copy and share it with anyone you want
                to give access to this video.
              </Typography>
            </Box>

            <Divider sx={{ borderColor: 'grey.200' }} />

            {/* Video Info */}
            {shareLink.video && (
              <Box sx={{ p: 3, pb: 2 }}>
                <Card
                  elevation={0}
                  sx={{
                    border: '1px solid',
                    borderColor: 'grey.200',
                    borderRadius: 2,
                    backgroundColor: 'grey.50',
                  }}
                >
                  <CardContent sx={{ p: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={shareLink.video.thumbnail_url}
                        variant="rounded"
                        sx={{
                          width: 60,
                          height: 40,
                          bgcolor: 'grey.200',
                          '& .MuiAvatar-img': {
                            objectFit: 'cover',
                          },
                        }}
                      />
                      <Box sx={{ flex: 1 }}>
                        <Typography variant="subtitle1" fontWeight={600}>
                          {shareLink.video.title}
                        </Typography>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            mt: 0.5,
                          }}
                        >
                          <VideoIcon size={14} color="gray" />
                          <Typography variant="body2" color="text.secondary">
                            Shared video
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            )}

            {/* Share Link Section */}
            <Box sx={{ p: 3, pt: 1 }}>
              <Typography variant="subtitle1" fontWeight={600} gutterBottom>
                Your Share Link
              </Typography>

              <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
                <TextField
                  fullWidth
                  value={shareLink.unique_link}
                  variant="outlined"
                  InputProps={{
                    readOnly: true,
                    sx: {
                      backgroundColor: 'background.paper',
                      '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'grey.300',
                      },
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: 'grey.400',
                      },
                    },
                  }}
                />
                <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                  <IconButton
                    onClick={handleCopyLink}
                    color={copied ? 'success' : 'primary'}
                    sx={{
                      border: '1px solid',
                      borderColor: copied ? 'success.main' : 'primary.main',
                      borderRadius: 1,
                      '&:hover': {
                        backgroundColor: copied ? 'success.50' : 'primary.50',
                      },
                    }}
                  >
                    {copied ? <CheckIcon /> : <CopyIcon />}
                  </IconButton>
                </Tooltip>
              </Box>

              {/* Link Details */}
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ExpirationIcon size={16} color="gray" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Expires
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {formatDate(shareLink.expiration_time)}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <ViewsIcon size={16} color="gray" />
                    <Box>
                      <Typography variant="body2" color="text.secondary">
                        Views
                      </Typography>
                      <Typography variant="body2" fontWeight={500}>
                        {shareLink.views || 0}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              </Grid>

              <Alert severity="info" sx={{ mb: 3 }}>
                <Typography variant="body2">
                  <strong>Security Notice:</strong> This link will expire on{' '}
                  {dayjs(shareLink.expiration_time).format('MMM D, YYYY')} and
                  cannot be accessed after that date. Only share with trusted
                  individuals.
                </Typography>
              </Alert>

              <Button
                variant="outlined"
                fullWidth
                size="large"
                onClick={onClose}
                sx={{
                  py: 1.5,
                  fontWeight: 600,
                  textTransform: 'none',
                  borderRadius: 2,
                  borderColor: 'grey.300',
                  color: 'text.primary',
                  '&:hover': {
                    borderColor: 'grey.400',
                    backgroundColor: 'grey.50',
                  },
                }}
              >
                Close
              </Button>
            </Box>
          </Box>
        </Zoom>
      )}
    </Box>
  );
}

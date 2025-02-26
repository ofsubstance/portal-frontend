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
} from '@mui/material';
import { CreateShareLinkDto, ShareLinkDto } from '@/dtos/sharelink.dto';
import useShareLinkAction from '@/hooks/useShareLinkAction';
import {
  RiFileCopyLine as CopyIcon,
  RiCheckLine as CheckIcon,
  RiEyeLine as ViewsIcon,
  RiTimeLine as ExpirationIcon,
  RiVideoLine as VideoIcon,
} from 'react-icons/ri';

interface ShareLinkModalProps {
  videoId: string;
  onClose: () => void;
}

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

  const handleCopyLink = () => {
    if (shareLink?.unique_link) {
      navigator.clipboard.writeText(shareLink.unique_link);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <Box sx={{ p: 3, width: '100%', maxWidth: 500 }}>
      <Typography variant="h6" gutterBottom>
        Create Shareable Link
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
        Generate a unique link to share this video with others. The link will
        expire after the selected period.
      </Typography>

      {!shareLink ? (
        <>
          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="validity-days-label">Link Validity</InputLabel>
            <Select
              labelId="validity-days-label"
              value={validityDays}
              label="Link Validity"
              onChange={(e) => setValidityDays(Number(e.target.value))}
            >
              <MenuItem value={1}>1 day</MenuItem>
              <MenuItem value={7}>7 days</MenuItem>
              <MenuItem value={30}>30 days</MenuItem>
              <MenuItem value={90}>90 days</MenuItem>
              <MenuItem value={365}>1 year</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCreateShareLink}
            disabled={createShareLinkMutation.isPending}
            startIcon={
              createShareLinkMutation.isPending ? (
                <CircularProgress size={20} />
              ) : null
            }
          >
            {createShareLinkMutation.isPending
              ? 'Creating...'
              : 'Create Share Link'}
          </Button>
        </>
      ) : (
        <>
          <Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
            {shareLink.video && (
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  src={shareLink.video.thumbnail_url}
                  variant="rounded"
                  sx={{ width: 60, height: 60, mr: 2 }}
                />
                <Box>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {shareLink.video.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    <VideoIcon
                      style={{ verticalAlign: 'middle', marginRight: 4 }}
                    />
                    Shared video
                  </Typography>
                </Box>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Typography variant="subtitle2" gutterBottom>
              Your shareable link:
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TextField
                fullWidth
                value={shareLink.unique_link}
                variant="outlined"
                InputProps={{
                  readOnly: true,
                }}
              />
              <Tooltip title={copied ? 'Copied!' : 'Copy to clipboard'}>
                <IconButton
                  color="primary"
                  onClick={handleCopyLink}
                  sx={{ ml: 1 }}
                >
                  {copied ? <CheckIcon /> : <CopyIcon />}
                </IconButton>
              </Tooltip>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Typography variant="body2" color="text.secondary">
                <ExpirationIcon
                  style={{ verticalAlign: 'middle', marginRight: 4 }}
                />
                Expires on: {formatDate(shareLink.expiration_time)}
              </Typography>

              <Typography variant="body2" color="text.secondary">
                <ViewsIcon
                  style={{ verticalAlign: 'middle', marginRight: 4 }}
                />
                Views: {shareLink.views || 0}
              </Typography>
            </Box>
          </Paper>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Anyone with this link can view the video until it expires. The link
            is unique and cannot be guessed.
          </Typography>

          <Button variant="outlined" fullWidth onClick={onClose}>
            Close
          </Button>
        </>
      )}
    </Box>
  );
}

import {
  Avatar,
  Box,
  Divider,
  Paper,
  Typography,
  Card,
  CardContent,
  useTheme,
  alpha,
} from '@mui/material';
import { useCommentActions } from '@/hooks/useCommentActions';
import { formatDistanceToNow } from 'date-fns';
import { CommentDto } from '@/dtos/comment.dto';
import { Skeleton } from '@mui/material';
import { RiMessage2Line as CommentIcon } from 'react-icons/ri';

interface VideoCommentListProps {
  videoId: string;
}

export default function VideoCommentList({ videoId }: VideoCommentListProps) {
  const { videoCommentsQuery, getApprovedComments } =
    useCommentActions(videoId);

  const isLoading = videoCommentsQuery.isLoading;
  const approvedComments = getApprovedComments(videoCommentsQuery.data || []);
  const theme = useTheme();

  if (isLoading) {
    return <CommentSkeleton count={3} />;
  }

  if (approvedComments.length === 0) {
    return (
      <Paper
        elevation={1}
        sx={{
          p: 4,
          mt: 4,
          borderRadius: 2,
          backgroundColor: alpha(theme.palette.background.paper, 0.8),
        }}
      >
        <Typography variant="body1" color="text.secondary" align="center">
          No comments yet. Be the first to share your thoughts!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={1}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          mb: 3,
        }}
      >
        <CommentIcon
          size={24}
          style={{ marginRight: 10, color: theme.palette.primary.main }}
        />
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Comments ({approvedComments.length})
        </Typography>
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {approvedComments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </Box>
    </Paper>
  );
}

function CommentItem({ comment }: { comment: CommentDto }) {
  const theme = useTheme();
  const firstLetter = comment.user?.firstname?.[0] || 'U';

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        transition: 'all 0.15s ease',
        '&:hover': {
          boxShadow: 2,
          transform: 'translateY(-1px)',
        },
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Avatar
            sx={{
              bgcolor: theme.palette.primary.main,
              width: 48,
              height: 48,
              boxShadow: 1,
              fontSize: 20,
            }}
          >
            {firstLetter}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                alignItems: 'center',
                gap: 1.5,
                mb: 1.5,
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: 600,
                  color: theme.palette.text.primary,
                }}
              >
                {comment.user?.firstname} {comment.user?.lastname}
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: theme.palette.text.secondary,
                  bgcolor: alpha(theme.palette.primary.main, 0.07),
                  py: 0.5,
                  px: 1,
                  borderRadius: 1,
                  fontWeight: 500,
                }}
              >
                {formatDistanceToNow(new Date(comment.createdAt), {
                  addSuffix: true,
                })}
              </Typography>
            </Box>
            <Typography
              variant="body1"
              sx={{
                lineHeight: 1.6,
                color: theme.palette.text.primary,
              }}
            >
              {comment.text}
            </Typography>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}

function CommentSkeleton({ count }: { count: number }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={2}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 2,
        backgroundColor: alpha(theme.palette.background.paper, 0.8),
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Skeleton variant="circular" width={24} height={24} sx={{ mr: 1.5 }} />
        <Skeleton width="40%" height={32} />
      </Box>

      <Divider sx={{ mb: 3 }} />

      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {Array.from({ length: count }).map((_, index) => (
          <Card key={index} elevation={1} sx={{ borderRadius: 2 }}>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Skeleton variant="circular" width={48} height={48} />
                <Box sx={{ flex: 1 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: 1.5,
                      mb: 1.5,
                    }}
                  >
                    <Skeleton width={120} height={24} />
                    <Skeleton width={80} height={20} />
                  </Box>
                  <Skeleton width="100%" height={20} />
                  <Skeleton width="90%" height={20} />
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Paper>
  );
}

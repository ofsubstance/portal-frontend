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
  Stack,
  Chip,
  Fade,
} from '@mui/material';
import { useCommentActions } from '@/hooks/useCommentActions';
import { formatDistanceToNow } from 'date-fns';
import { CommentDto } from '@/dtos/comment.dto';
import { Skeleton } from '@mui/material';
import {
  RiMessage2Line as CommentIcon,
  RiChat3Line as ChatIcon,
  RiUser3Line as UserIcon,
} from 'react-icons/ri';

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
        elevation={2}
        sx={{
          p: 6,
          mt: 4,
          borderRadius: 3,
          backgroundColor: alpha(theme.palette.background.paper, 0.95),
          backdropFilter: 'blur(10px)',
          border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          textAlign: 'center',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 64,
              height: 64,
              borderRadius: 3,
              background: `linear-gradient(135deg, ${alpha(
                theme.palette.primary.main,
                0.1
              )}, ${alpha(theme.palette.primary.main, 0.05)})`,
              color: theme.palette.primary.main,
            }}
          >
            <ChatIcon size={32} />
          </Box>
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 600,
                color: theme.palette.text.primary,
                mb: 1,
              }}
            >
              No comments yet
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                maxWidth: 400,
                mx: 'auto',
              }}
            >
              Be the first to share your thoughts and start the conversation
              about this film!
            </Typography>
          </Box>
        </Box>
      </Paper>
    );
  }

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Stack spacing={4}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 48,
              height: 48,
              borderRadius: 2,
              background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
              color: 'white',
              boxShadow: theme.shadows[2],
            }}
          >
            <CommentIcon size={24} />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 0.5,
              }}
            >
              Community Discussion
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography
                variant="body2"
                sx={{
                  color: theme.palette.text.secondary,
                }}
              >
                {approvedComments.length} thoughtful comment
                {approvedComments.length !== 1 ? 's' : ''}
              </Typography>
              <Chip
                label={`${approvedComments.length}`}
                size="small"
                sx={{
                  height: 20,
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  backgroundColor: alpha(theme.palette.primary.main, 0.1),
                  color: theme.palette.primary.main,
                  border: `1px solid ${alpha(theme.palette.primary.main, 0.2)}`,
                }}
              />
            </Box>
          </Box>
        </Box>

        <Divider
          sx={{
            borderColor: alpha(theme.palette.divider, 0.1),
            '&::before, &::after': {
              borderColor: alpha(theme.palette.divider, 0.1),
            },
          }}
        />

        <Stack spacing={3}>
          {approvedComments.map((comment, index) => (
            <Fade in={true} timeout={300 + index * 100} key={comment.id}>
              <div>
                <CommentItem comment={comment} />
              </div>
            </Fade>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

function CommentItem({ comment }: { comment: CommentDto }) {
  const theme = useTheme();
  const firstLetter = comment.user?.firstname?.[0] || 'U';
  const fullName =
    `${comment.user?.firstname || ''} ${comment.user?.lastname || ''}`.trim() ||
    'Anonymous User';

  return (
    <Card
      elevation={1}
      sx={{
        borderRadius: 2,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        border: `1px solid ${alpha(theme.palette.divider, 0.08)}`,
        backgroundColor: alpha(theme.palette.background.paper, 0.7),
        '&:hover': {
          boxShadow: theme.shadows[3],
          transform: 'translateY(-2px)',
          backgroundColor: alpha(theme.palette.background.paper, 1),
          border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Stack spacing={2}>
          <Box sx={{ display: 'flex', gap: 2.5 }}>
            <Avatar
              sx={{
                bgcolor: theme.palette.primary.main,
                width: 48,
                height: 48,
                boxShadow: theme.shadows[1],
                fontSize: 20,
                fontWeight: 600,
                border: `2px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              {firstLetter}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Stack spacing={1}>
                <Box
                  sx={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    alignItems: 'center',
                    gap: 1.5,
                  }}
                >
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      color: theme.palette.text.primary,
                      fontSize: '1rem',
                    }}
                  >
                    {fullName}
                  </Typography>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.5,
                    }}
                  >
                    <UserIcon size={14} color={theme.palette.text.secondary} />
                    <Typography
                      variant="caption"
                      sx={{
                        color: theme.palette.text.secondary,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                      }}
                    >
                      {formatDistanceToNow(new Date(comment.createdAt), {
                        addSuffix: true,
                      })}
                    </Typography>
                  </Box>
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    lineHeight: 1.7,
                    color: theme.palette.text.primary,
                    fontSize: '0.95rem',
                    fontWeight: 400,
                  }}
                >
                  {comment.text}
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
}

function CommentSkeleton({ count }: { count: number }) {
  const theme = useTheme();

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        mt: 4,
        borderRadius: 3,
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(10px)',
        border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
      }}
    >
      <Stack spacing={4}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Skeleton
            variant="rectangular"
            width={48}
            height={48}
            sx={{ borderRadius: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Skeleton width="60%" height={28} sx={{ mb: 1 }} />
            <Skeleton width="40%" height={20} />
          </Box>
        </Box>

        <Divider sx={{ borderColor: alpha(theme.palette.divider, 0.1) }} />

        <Stack spacing={3}>
          {Array.from({ length: count }).map((_, index) => (
            <Card key={index} elevation={1} sx={{ borderRadius: 2 }}>
              <CardContent sx={{ p: 3 }}>
                <Stack spacing={2}>
                  <Box sx={{ display: 'flex', gap: 2.5 }}>
                    <Skeleton variant="circular" width={48} height={48} />
                    <Box sx={{ flex: 1 }}>
                      <Stack spacing={1}>
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1.5,
                          }}
                        >
                          <Skeleton width="40%" height={24} />
                          <Skeleton width="25%" height={16} />
                        </Box>
                        <Skeleton width="100%" height={20} />
                        <Skeleton width="85%" height={20} />
                        <Skeleton width="70%" height={20} />
                      </Stack>
                    </Box>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

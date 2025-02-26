import { Avatar, Box, Divider, Paper, Typography } from '@mui/material';
import { useCommentActions } from '@/hooks/useCommentActions';
import { formatDistanceToNow } from 'date-fns';
import { CommentDto } from '@/dtos/comment.dto';
import { Skeleton } from '@mui/material';

interface VideoCommentListProps {
  videoId: string;
}

export default function VideoCommentList({ videoId }: VideoCommentListProps) {
  const { videoCommentsQuery, getApprovedComments } =
    useCommentActions(videoId);

  const isLoading = videoCommentsQuery.isLoading;
  const approvedComments = getApprovedComments(videoCommentsQuery.data || []);

  if (isLoading) {
    return <CommentSkeleton count={3} />;
  }

  if (approvedComments.length === 0) {
    return (
      <Paper className="p-4 mt-4">
        <Typography variant="body1" color="text.secondary" align="center">
          No comments yet. Be the first to share your thoughts!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className="p-4 mt-4">
      <Typography variant="h6" className="mb-4">
        Comments ({approvedComments.length})
      </Typography>

      {approvedComments.map((comment, index) => (
        <Box key={comment.id}>
          <CommentItem comment={comment} />
          {index < approvedComments.length - 1 && <Divider className="my-4" />}
        </Box>
      ))}
    </Paper>
  );
}

function CommentItem({ comment }: { comment: CommentDto }) {
  return (
    <Box className="flex gap-3">
      <Avatar>{comment.user?.firstname?.[0] || 'U'}</Avatar>
      <Box className="flex-1">
        <Box className="flex items-center gap-2 mb-1">
          <Typography variant="subtitle2">
            {comment.user?.firstname} {comment.user?.lastname}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </Typography>
        </Box>
        <Typography variant="body2">{comment.text}</Typography>
      </Box>
    </Box>
  );
}

function CommentSkeleton({ count }: { count: number }) {
  return (
    <Paper className="p-4 mt-4">
      <Skeleton width="40%" height={32} className="mb-4" />

      {Array.from({ length: count }).map((_, index) => (
        <Box key={index}>
          <Box className="flex gap-3 mb-4">
            <Skeleton variant="circular" width={40} height={40} />
            <Box className="flex-1">
              <Box className="flex items-center gap-2 mb-1">
                <Skeleton width="30%" height={24} />
                <Skeleton width="20%" height={20} />
              </Box>
              <Skeleton width="90%" height={20} />
              <Skeleton width="75%" height={20} />
            </Box>
          </Box>
          {index < count - 1 && <Divider className="mb-4" />}
        </Box>
      ))}
    </Paper>
  );
}

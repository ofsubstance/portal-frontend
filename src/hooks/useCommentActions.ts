import {
  CommentDto,
  CommentStatus,
  CreateCommentDto,
} from '@/dtos/comment.dto';
import commentService from '@/services/comment.service';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export const useCommentActions = (videoId?: string) => {
  const queryClient = useQueryClient();

  // Get all comments (for admin)
  const allCommentsQuery = useQuery({
    queryKey: ['comments', 'all'],
    queryFn: () => commentService.getAllComments(),
  });

  // Get comments for a specific video
  const videoCommentsQuery = useQuery({
    queryKey: ['comments', 'video', videoId],
    queryFn: () => commentService.getVideoComments(videoId!),
    enabled: !!videoId,
  });

  // Get comments for the current user

  // Create a new comment
  const createCommentMutation = useMutation({
    mutationFn: (data: CreateCommentDto) => commentService.createComment(data),
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      if (videoId) {
        queryClient.invalidateQueries({
          queryKey: ['comments', 'video', videoId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['comments', 'user'] });
      queryClient.invalidateQueries({ queryKey: ['comments', 'all'] });
    },
  });

  // Update comment status (for admin)
  const updateCommentStatusMutation = useMutation({
    mutationFn: ({
      commentId,
      status,
    }: {
      commentId: string;
      status: CommentStatus;
    }) => commentService.updateCommentStatus(commentId, { status }),
    onSuccess: () => {
      // Invalidate relevant queries to refresh data
      if (videoId) {
        queryClient.invalidateQueries({
          queryKey: ['comments', 'video', videoId],
        });
      }
      queryClient.invalidateQueries({ queryKey: ['comments', 'user'] });
      queryClient.invalidateQueries({ queryKey: ['comments', 'all'] });
    },
  });

  // Filter comments by status
  const getApprovedComments = (comments: CommentDto[] = []) => {
    return comments.filter(
      (comment) => comment.status === CommentStatus.APPROVED
    );
  };

  return {
    allCommentsQuery,
    videoCommentsQuery,
    createCommentMutation,
    updateCommentStatusMutation,
    getApprovedComments,
  };
};

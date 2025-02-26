import { Button, Paper, TextField, Typography } from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentFormData, commentValidation } from '@/dtos/comment.dto';
import { useCommentActions } from '@/hooks/useCommentActions';
import { toast } from 'react-toastify';
import { useState } from 'react';

interface VideoCommentInputProps {
  videoId: string;
}

export default function VideoCommentInput({ videoId }: VideoCommentInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCommentMutation } = useCommentActions(videoId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentValidation),
  });

  const onSubmit = async (data: CommentFormData) => {
    try {
      setIsSubmitting(true);
      await createCommentMutation.mutateAsync({
        text: data.text,
        videoId,
      });
      toast.success('Your comment has been submitted for review');
      reset();
    } catch (error) {
      toast.error('Failed to submit comment. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper className="p-4">
      <Typography variant="h6" className="mb-3">
        Leave a Comment
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('text')}
          multiline
          rows={3}
          fullWidth
          placeholder="Share your thoughts about this video..."
          variant="outlined"
          error={!!errors.text}
          helperText={
            errors.text?.message ||
            'Your comment will be reviewed before being published'
          }
          className="mb-3"
        />
        <div className="flex justify-end">
          <Button type="submit" variant="contained" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </div>
      </form>
    </Paper>
  );
}

import {
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  useTheme,
  alpha,
} from '@mui/material';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { CommentFormData, commentValidation } from '@/dtos/comment.dto';
import { useCommentActions } from '@/hooks/useCommentActions';
import { toast } from 'react-toastify';
import { useState } from 'react';
import {
  RiMessage2Line as CommentIcon,
  RiSendPlaneFill as SendIcon,
} from 'react-icons/ri';

interface VideoCommentInputProps {
  videoId: string;
}

export default function VideoCommentInput({ videoId }: VideoCommentInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { createCommentMutation } = useCommentActions(videoId);
  const theme = useTheme();

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
    <Paper
      elevation={2}
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
          Leave a Comment
        </Typography>
      </Box>

      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          {...register('text')}
          multiline
          rows={4}
          fullWidth
          placeholder="Share your thoughts about this video..."
          variant="outlined"
          error={!!errors.text}
          helperText={
            errors.text?.message ||
            'Your comment will be reviewed before being published'
          }
          sx={{
            mb: 3,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              '&:hover fieldset': {
                borderColor: theme.palette.primary.main,
              },
              '&.Mui-focused fieldset': {
                borderColor: theme.palette.primary.main,
                borderWidth: 2,
              },
            },
          }}
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
            startIcon={<SendIcon />}
            sx={{
              borderRadius: 2,
              px: 3,
              py: 1.2,
              fontWeight: 600,
              textTransform: 'none',
              boxShadow: 1,
              '&:hover': {
                boxShadow: 2,
              },
            }}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Comment'}
          </Button>
        </Box>
      </form>
    </Paper>
  );
}

import {
  Button,
  Paper,
  TextField,
  Typography,
  Box,
  useTheme,
  alpha,
  Stack,
  Fade,
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
  RiUser3Line as UserIcon,
} from 'react-icons/ri';

interface VideoCommentInputProps {
  videoId: string;
}

export default function VideoCommentInput({ videoId }: VideoCommentInputProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { createCommentMutation } = useCommentActions(videoId);
  const theme = useTheme();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentValidation),
  });

  const watchedText = watch('text');

  const onSubmit = async (data: CommentFormData) => {
    try {
      setIsSubmitting(true);
      await createCommentMutation.mutateAsync({
        text: data.text,
        videoId,
      });
      toast.success('Your comment has been submitted for review');
      reset();
      setIsFocused(false);
    } catch (error) {
      toast.error('Failed to submit comment. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Paper
      elevation={isFocused ? 8 : 3}
      sx={{
        p: 4,
        mt: 6,
        borderRadius: 3,
        backgroundColor: alpha(theme.palette.background.paper, 0.95),
        backdropFilter: 'blur(10px)',
        border: isFocused
          ? `2px solid ${alpha(theme.palette.primary.main, 0.3)}`
          : `1px solid ${alpha(theme.palette.divider, 0.1)}`,
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        '&:hover': {
          boxShadow: theme.shadows[6],
        },
      }}
    >
      <Stack spacing={3}>
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
          <Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: theme.palette.text.primary,
                mb: 0.5,
              }}
            >
              Share Your Thoughts
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: theme.palette.text.secondary,
                fontSize: '0.875rem',
              }}
            >
              Join the conversation about this film
            </Typography>
          </Box>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3}>
            <TextField
              {...register('text')}
              multiline
              rows={isFocused ? 5 : 4}
              fullWidth
              placeholder="What did you think of this film? Share your insights, reflections, or questions..."
              variant="outlined"
              error={!!errors.text}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              helperText={
                errors.text?.message ||
                'Your comment will be reviewed before being published'
              }
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  fontSize: '1rem',
                  transition: 'all 0.2s ease',
                  backgroundColor: alpha(theme.palette.background.default, 0.5),
                  '&:hover': {
                    backgroundColor: alpha(
                      theme.palette.background.default,
                      0.7
                    ),
                  },
                  '&:hover fieldset': {
                    borderColor: theme.palette.primary.main,
                  },
                  '&.Mui-focused': {
                    backgroundColor: alpha(
                      theme.palette.background.default,
                      0.9
                    ),
                    '& fieldset': {
                      borderColor: theme.palette.primary.main,
                      borderWidth: 2,
                    },
                  },
                },
                '& .MuiInputBase-input': {
                  lineHeight: 1.6,
                  '&::placeholder': {
                    color: theme.palette.text.secondary,
                    opacity: 0.8,
                  },
                },
                '& .MuiFormHelperText-root': {
                  fontSize: '0.8rem',
                  marginTop: 1,
                  color: errors.text
                    ? theme.palette.error.main
                    : theme.palette.text.secondary,
                },
              }}
            />

            <Fade in={isFocused || watchedText?.length > 0}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Typography
                  variant="caption"
                  sx={{
                    color: theme.palette.text.secondary,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                  }}
                >
                  <UserIcon size={16} />
                  Comments are moderated for quality
                </Typography>

                <Button
                  type="submit"
                  variant="contained"
                  disabled={isSubmitting || !watchedText?.trim()}
                  startIcon={<SendIcon />}
                  sx={{
                    borderRadius: 2,
                    px: 4,
                    py: 1.5,
                    fontWeight: 600,
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    background: `linear-gradient(135deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    boxShadow: theme.shadows[2],
                    '&:hover': {
                      background: `linear-gradient(135deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                      boxShadow: theme.shadows[4],
                      transform: 'translateY(-1px)',
                    },
                    '&:disabled': {
                      background: theme.palette.action.disabledBackground,
                      color: theme.palette.action.disabled,
                    },
                    transition: 'all 0.2s ease',
                  }}
                >
                  {isSubmitting ? 'Publishing...' : 'Publish Comment'}
                </Button>
              </Box>
            </Fade>
          </Stack>
        </form>
      </Stack>
    </Paper>
  );
}

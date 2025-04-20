import { FilmFeedbackSubmitDto } from '@/dtos/feedback.dto';
import feedbackService, {
  FeedbackSubmission,
} from '@/services/feedback.service';
import { useMutation } from '@tanstack/react-query';

const useFeedbackActions = () => {
  const submitFilmFeedbackMutation = useMutation({
    mutationFn: (data: FeedbackSubmission) =>
      feedbackService.submitFeedback(data),
  });

  const submitFilmFeedback = async (
    videoId: string,
    feedbackData: FilmFeedbackSubmitDto
  ) => {
    const feedbackSubmission: FeedbackSubmission = {
      videoId,
      ...feedbackData,
    };

    return submitFilmFeedbackMutation.mutateAsync(feedbackSubmission);
  };

  return {
    submitFilmFeedback,
    isSubmittingFeedback: submitFilmFeedbackMutation.isPending,
  };
};

export default useFeedbackActions;

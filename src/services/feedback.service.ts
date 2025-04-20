import APIUrl from '@/constants/apiUrl';
import httpClient from '../utils/httpClient';

export interface FeedbackSubmission {
  videoId: string;
  engagementLevel: number;
  subjectMatterUsefulness: number;
  outcomeImprovement: number;
  continueUsageLikelihood: number;
  recommendLikelihood: number;
  openEndedFeedback?: string;
}

class FeedbackService {
  /**
   * Submit user feedback about a video
   * @param feedback The feedback data to submit
   * @returns Promise resolving to the API response
   */
  async submitFeedback(feedback: FeedbackSubmission): Promise<any> {
    try {
      const response = await httpClient.post(
        APIUrl.feedback.submit(),
        feedback
      );

      return response.data;
    } catch (error) {
      console.error('Failed to submit feedback:', error);
      throw error;
    }
  }
}

export default new FeedbackService();

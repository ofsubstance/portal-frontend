import { z } from "zod";

export const genaralFeedbackValidation = z.object({
  engagementQuality: z.number().min(1).max(5),
  engagementFrequency: z.number().min(1).max(5),
  outcomeImprovement: z.number().min(1).max(5),
  continueUsageLikelihood: z.number().min(1).max(5),
  recommendLikelihood: z.number().min(1).max(5),
  openEndedFeedback: z
    .string()
    .min(250, { message: "Experience must be at least 250 characters long." }),
});

export const filmFeedbackValidation = z.object({
  engagementLevel: z.number().min(1).max(5),
  subjectMatterUsefulness: z.number().min(1).max(5),
  outcomeImprovement: z.number().min(1).max(5),
  continueUsageLikelihood: z.number().min(1).max(5),
  recommendLikelihood: z.number().min(1).max(5),
  openEndedFeedback: z
    .string()
    .min(250, { message: "Experience must be at least 250 characters long." }),
});

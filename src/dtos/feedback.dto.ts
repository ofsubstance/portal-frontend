import {
  filmFeedbackValidation,
  genaralFeedbackValidation,
} from "@/validators/feedback.validator";

import { z } from "zod";

export type GenaralFeedbackSubmitDto = z.infer<
  typeof genaralFeedbackValidation
>;

export type FilmFeedbackSubmitDto = z.infer<typeof filmFeedbackValidation>;

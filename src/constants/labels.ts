import {
  FilmFeedbackSubmitDto,
  GenaralFeedbackSubmitDto,
} from "@/dtos/feedback.dto";

interface FeedbackQuestionLabel<T> {
  key: keyof T;
  question: string;
  options: string[];
}

export const genaralFeedbackQuestions: FeedbackQuestionLabel<GenaralFeedbackSubmitDto>[] =
  [
    {
      key: "engagementQuality",
      question:
        "How would you rate the quality of engagement while using Of Substance films?",
      options: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
    },
    {
      key: "engagementFrequency",
      question: "How frequently do you engage with Of Substance films?",
      options: ["Never", "Rarely", "Occasionally", "Frequently", "Always"],
    },
    {
      key: "outcomeImprovement",
      question:
        "To what extent do you believe Of Substance films have aided in positively improving outcomes of individuals facing struggles with addiction, mental health, and/or trauma?",
      options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"],
    },
    {
      key: "continueUsageLikelihood",
      question:
        "How likely are you to continue using Of Substance films in your professional practice?",
      options: [
        "Very Unlikely",
        "Unlikely",
        "Neutral",
        "Likely",
        "Very Likely",
      ],
    },
    {
      key: "recommendLikelihood",
      question:
        "How likely are you to recommend Of Substance films to industry professionals?",
      options: [
        "Not at all likely",
        "Slightly likely",
        "Moderately likely",
        "Very likely",
        "Extremely likely",
      ],
    },
  ];

export const filmFeedbackQuestions = (
  filmTitle: string
): FeedbackQuestionLabel<FilmFeedbackSubmitDto>[] => [
  {
    key: "engagementLevel",
    question: `How would you rate your level of engagement in ${filmTitle}?`,
    options: ["Very Poor", "Poor", "Average", "Good", "Excellent"],
  },
  {
    key: "subjectMatterUsefulness",
    question: `How useful is the subject matter of ${filmTitle}?`,
    options: [
      "Not at all useful",
      "Slightly useful",
      "Moderately useful",
      "Very useful",
      "Extremely useful",
    ],
  },
  {
    key: "outcomeImprovement",
    question: `To what extent do you believe ${filmTitle} may aid in positively improving outcomes of individuals facing struggles with addiction, mental health, and/or trauma?`,
    options: ["Not at all", "Slightly", "Moderately", "Very", "Extremely"],
  },
  {
    key: "continueUsageLikelihood",
    question: `How likely are you to continue using ${filmTitle} films in your professional practice?`,
    options: ["Very Unlikely", "Unlikely", "Neutral", "Likely", "Very Likely"],
  },
  {
    key: "recommendLikelihood",
    question: `How likely are you to recommend ${filmTitle} films to industry professionals?`,
    options: [
      "Not at all likely",
      "Slightly likely",
      "Moderately likely",
      "Very likely",
      "Extremely likely",
    ],
  },
];

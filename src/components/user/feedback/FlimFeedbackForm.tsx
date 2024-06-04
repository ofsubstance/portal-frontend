import { Button, Rating, TextField, Typography } from "@mui/material";

import { filmFeedbackQuestions } from "@/constants/labels";
import { FilmFeedbackSubmitDto } from "@/dtos/feedback.dto";
import { filmFeedbackValidation } from "@/validators/feedback.validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface FilmFeedbackFormProps {
  filmTitle: string;
  onSubmit: (data: FilmFeedbackSubmitDto) => void;
}

export default function FlimFeedbackForm({
  filmTitle,
  onSubmit,
}: FilmFeedbackFormProps) {
  const [hover, setHover] = useState<Record<string, number>>({});

  const {
    register,
    watch,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FilmFeedbackSubmitDto>({
    resolver: zodResolver(filmFeedbackValidation),
    defaultValues: {
      engagementLevel: 0,
      subjectMatterUsefulness: 0,
      outcomeImprovement: 0,
      continueUsageLikelihood: 0,
      recommendLikelihood: 0,
      openEndedFeedback: "",
    },
  });

  return (
    <form
      className="flex flex-col w-full gap-4"
      onSubmit={handleSubmit(onSubmit)}
    >
      {filmFeedbackQuestions(filmTitle).map((question) => (
        <div key={question.key} className="space-y-2">
          <Typography
            component="legend"
            color={errors[question.key] ? "error" : "initial"}
          >
            {question.question}
          </Typography>
          <div className="flex items-center gap-2">
            <Rating
              size="large"
              max={5}
              value={watch(question.key) as number}
              onChange={(_e, newValue) => {
                newValue &&
                  setValue(question.key, newValue, {
                    shouldValidate: true,
                  });
              }}
              onChangeActive={(_e, newHover) => {
                setHover((prev) => ({ ...prev, [question.key]: newHover }));
              }}
            />

            <Typography>
              {
                question.options[
                  hover[question.key] !== -1
                    ? hover[question.key] - 1
                    : (watch(question.key) as number) - 1
                ]
              }
            </Typography>
          </div>
        </div>
      ))}

      <Typography component="legend">
        Please let us know about your experience with our film (Film Title).
        We’d love to know how/why you plan to use (Film Title); how you
        anticipate your clients are responding to (Film Title) and why; how you
        plan to apply (Film Title); why you’d share (Film Title) with other
        industry professionals; and anything else that you’d like to share with
        us about your experience. (Min 250 characters)
      </Typography>
      <TextField
        {...register("openEndedFeedback")}
        label="Open Ended Feedback"
        multiline
        rows={4}
        fullWidth
        error={!!errors.openEndedFeedback}
        helperText={errors.openEndedFeedback?.message}
      />

      <Button type="submit" variant="contained" color="primary">
        Submit Feedback
      </Button>
    </form>
  );
}

import { Button, Rating, TextField, Typography } from "@mui/material";

import { GenaralFeedbackSubmitDto } from "@/dtos/feedback.dto";
import { genaralFeedbackQuestions } from "@/constants/labels";
import { genaralFeedbackValidation } from "@/validators/feedback.validator";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

interface GeneralFeedbackFormProps {
  onSubmit: (data: GenaralFeedbackSubmitDto) => void;
}

export default function GeneralFeedbackForm({
  onSubmit,
}: GeneralFeedbackFormProps) {
  const [hover, setHover] = useState<Record<string, number>>({});

  const {
    register,
    watch,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GenaralFeedbackSubmitDto>({
    resolver: zodResolver(genaralFeedbackValidation),
    defaultValues: {
      engagementQuality: 0,
      engagementFrequency: 0,
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
      {genaralFeedbackQuestions.map((question) => (
        <div key={question.key} className="space-y-2">
          <Typography
            component="legend"
            color={errors[question.key] ? "error" : "initial"}
          >
            How would you rate the quality of engagement while using Of
            Substance films?
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
        Please let us know a bit about your experience with Of Substance and our
        films. We’d love to know how/why you’re using the films; how/why your
        clients are responding; how/why you’re applying the films; why you’d
        share Of Substance with other industry professionals; and anything else
        that would be helpful for us to enhance our offerings. (Min 250
        characters)
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

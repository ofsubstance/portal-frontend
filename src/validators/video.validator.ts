import { z } from "zod";

export const videoUploadValidation = z.object({
  video_url: z.string().url({ message: "Invalid video URL." }),
  trailer_url: z.string().url({ message: "Invalid trailer URL." }),
  thumbnail: z.any().refine(
    (data) => {
      return data instanceof File;
    },
    {
      message: "Thumbnail is required.",
      path: ["thumbnail"],
    }
  ),
  title: z.string().min(1, { message: "Title is required." }),
  genre: z.string().min(1, { message: "Genre is required." }),
  duration: z
    .string()
    .regex(/^\d{2}:\d{2}$/, { message: "Invalid duration format." }),
  cost: z.number().int().min(0, { message: "Cost must be a positive number." }),
  short_desc: z.string().min(1, { message: "Short description is required." }),
  about: z.string().min(1, { message: "About is required." }),
  primary_lesson: z.string().min(1, { message: "Primary lesson is required." }),
  theme: z.string().min(1, { message: "Theme is required." }),
  impact: z.string().min(1, { message: "Impact is required." }),
});

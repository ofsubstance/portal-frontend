import { z } from 'zod';

export const videoUploadValidation = z.object({
  video_url: z.string().url({ message: 'Invalid video URL.' }),
  trailer_url: z.string().url({ message: 'Invalid trailer URL.' }),
  preroll_url: z.string().url({ message: 'Invalid trailer URL.' }),
  thumbnail: z
    .any()
    .refine((data) => data instanceof File || typeof data === 'string', {
      message: 'Thumbnail is required.',
      path: ['thumbnail'],
    }),
  title: z.string().min(1, { message: 'Title is required.' }),
  genre: z.string().min(1, { message: 'Genre is required.' }),
  duration: z
    .string()
    .regex(/^\d{1,3}:[0-5][0-9]$/, { message: 'Invalid duration format.' }),

  short_desc: z.string().min(1, { message: 'Short description is required.' }),
  about: z.string().min(1, { message: 'About is required.' }),
  primary_lesson: z.string().min(1, { message: 'Primary lesson is required.' }),
  theme: z.string().min(1, { message: 'Theme is required.' }),
  impact: z.string().min(1, { message: 'Impact is required.' }),
  slideshow: z.boolean().optional(),
});

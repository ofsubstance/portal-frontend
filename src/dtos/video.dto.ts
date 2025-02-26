import { videoUploadValidation } from '@/validators/video.validator';
import { z } from 'zod';

export type VideoUploadDto = z.infer<typeof videoUploadValidation>;

export interface VideoDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  video_url: string;
  trailer_url: string;
  preroll_url: string;
  thumbnail_url: string;
  title: string;
  genre: string;
  duration: string;
  short_desc: string;
  about: string;
  primary_lesson: string;
  theme: string;
  impact: string;
  slideshow: boolean;
  tags?: string[];
}

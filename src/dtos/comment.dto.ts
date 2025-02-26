import { z } from 'zod';

export enum CommentStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}

export interface CommentDto {
  id: string;
  videoId: string;
  userId: string;
  text: string;
  status: CommentStatus;
  createdAt: Date;
  updatedAt: Date;
  user?: {
    id: string;
    firstname: string;
    lastname: string;
  };
  video?: {
    id: string;
    title: string;
  };
}

export interface CreateCommentDto {
  text: string;
  videoId: string;
}

export interface UpdateCommentStatusDto {
  status: CommentStatus;
}

export const commentValidation = z.object({
  text: z
    .string()
    .min(1, { message: 'Comment cannot be empty.' })
    .max(500, { message: 'Comment is too long (max 500 characters).' }),
});

export type CommentFormData = z.infer<typeof commentValidation>;

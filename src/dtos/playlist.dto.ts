import { PlaylistTag } from "@/constants/enums";
import { VideoDto } from "./video.dto";
import { playlistCreateValidation } from "@/validators/playlist.validator";
import { z } from "zod";

export type PlaylistCreateDto = z.infer<typeof playlistCreateValidation>;

export interface PlaylistDto {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  description: string;
  tag: PlaylistTag;
  videos: VideoDto[];
}

import { PlaylistTag } from "@/constants/enums";
import { z } from "zod";

export const playlistCreateValidation = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  tag: z.nativeEnum(PlaylistTag),
  videos: z.array(z.string()).min(1, { message: "Videos are required." })
});

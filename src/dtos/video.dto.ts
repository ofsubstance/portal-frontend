import { videoUploadValidation } from "@/validators/video.validator";
import { z } from "zod";

export type VideoUploadDto = z.infer<typeof videoUploadValidation>;

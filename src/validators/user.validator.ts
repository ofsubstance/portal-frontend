import { z } from "zod";

export const userUpdateValidation = z.object({
  name: z.string().min(1, { message: "Name is required." }),
  email: z.string().email({ message: "Invalid email." }),
  phone: z.string().optional(),
  birthDate: z.date().optional(),
  gender: z.string().optional(),
  language: z.string().optional(),
  location: z.string().optional(),
  bio: z.string().optional(),
});

import { UserRole } from "@/constants/enums";
import { userUpdateValidation } from "@/validators/user.validator";
import { z } from "zod";

export type UserUpdateDto = z.infer<typeof userUpdateValidation>;

export interface UserDto {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar: string;
  createdAt: string;
  updatedAt: string;
  status: string;
  phone?: string;
  birthDate?: Date;
  bio?: string;
  gender?: string;
  language?: string;
  location?: string;
}

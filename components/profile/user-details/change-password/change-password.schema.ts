import { SchemaState } from "@/types/schema";
import z from "zod";

// Minimum 8 characters, at least one uppercase letter, one lowercase letter, one number and one special character
const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$^*-]).{8,}$/,
);

export const changePasswordSchema = z.object({
  oldPassword: z.string().min(1, "Old Password is required"),
  newPassword: z
    .string()
    .min(8, "Password should be at least 8 characters")
    .regex(
      passwordValidation,
      "Password is invalid. Should be at least 8 characters long, at least one uppercase letter, one lowercase letter, one number and one special character",
    ),
  accountPin: z.string().min(1, "Account Pin is required"),
});

export type ChangePasswordPayload = z.infer<typeof changePasswordSchema>;
export type ChangePasswordState = SchemaState<ChangePasswordPayload>;

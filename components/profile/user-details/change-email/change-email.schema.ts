import { SchemaState } from "@/types/schema";
import z from "zod";

export const changeEmailSchema = z.object({
  accountPin: z.string().min(1, "Account Pin is required"),
  emailAddress: z.email("Email address is required"),
});

export type ChangeEmailPayload = z.infer<typeof changeEmailSchema>;
export type ChangeEmailState = SchemaState<ChangeEmailPayload>;

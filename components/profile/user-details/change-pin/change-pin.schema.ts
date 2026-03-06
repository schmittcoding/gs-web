import { SchemaState } from "@/types/schema";
import z from "zod";

export const changePincodeSchema = z
  .object({
    oldPincode: z.string().min(1, "Old Pincode is required"),
    newPincode: z.string().min(6, "Pincode must be exactly 6 characters"),
    confirmPincode: z.string().min(1, "Confirm Pincode is required"),
  })
  .superRefine(({ confirmPincode, newPincode }, ctx) => {
    if (confirmPincode !== newPincode) {
      ctx.addIssue({
        code: "custom",
        message: "The pin did not match",
        path: ["confirmPincode"],
      });
    }
  });

export type ChangePincodePayload = z.infer<typeof changePincodeSchema>;
export type ChangePincodeState = SchemaState<ChangePincodePayload>;

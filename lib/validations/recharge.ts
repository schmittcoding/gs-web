import {
  PROVIDERS_WITH_PROOF,
  PROVIDERS_WITH_REFERENCE,
} from "@/components/recharge/constants.recharge";
import z from "zod";

export const rechargeSchema = z
  .object({
    id: z.string().min(1, "Transaction ID is required"),
    gateway: z.string().min(1, "Payment gateway is required"),
    referenceNumber: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const provider = data.gateway.toLowerCase();
    const needsReference = PROVIDERS_WITH_REFERENCE.includes(provider);

    if (
      needsReference &&
      (!data.referenceNumber || !data.referenceNumber.trim())
    ) {
      ctx.addIssue({
        code: "custom",
        message: "Reference number is required",
        path: ["referenceNumber"],
      });
    }
  });

export type RechargePayload = z.infer<typeof rechargeSchema>;

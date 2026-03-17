import {
  PROVIDERS_WITH_PROOF,
  PROVIDERS_WITH_REFERENCE,
} from "@/components/recharge/constants.recharge";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = ["image/png", "image/jpeg", "image/jpg"];

export const rechargeSchema = z
  .object({
    id: z.string().min(1, "Transaction ID is required"),
    gateway: z.string().min(1, "Payment gateway is required"),
    referenceNumber: z.string().optional(),
    proofImage: z
      .instanceof(File)
      .refine(
        (file) => file.size === 0 || file.size <= MAX_FILE_SIZE,
        "File size must be less than 5MB",
      )
      .refine(
        (file) => file.size === 0 || ACCEPTED_IMAGE_TYPES.includes(file.type),
        "Only PNG and JPG images are accepted",
      )
      .optional(),
  })
  .superRefine((data, ctx) => {
    const provider = data.gateway.toLowerCase();
    const needsReference = PROVIDERS_WITH_REFERENCE.includes(provider);
    const needsProof = PROVIDERS_WITH_PROOF.includes(provider);

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

    if (needsProof && (!data.proofImage || data.proofImage.size === 0)) {
      ctx.addIssue({
        code: "custom",
        message: "Proof of transaction is required",
        path: ["proofImage"],
      });
    }
  });

export type RechargePayload = z.infer<typeof rechargeSchema>;

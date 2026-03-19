/* eslint-disable @next/next/no-img-element */
"use client";

import {
  confirmTransaction,
  ConfirmTransactionResult,
} from "@/app/(dashboard)/recharge/actions";
import { formatCurrency } from "@/lib/formatters";
import { IconReceipt } from "@tabler/icons-react";
import { PropsWithChildren, useActionState, useState } from "react";
import { sileo } from "sileo";
import GameButton from "../common/game.button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Field, FieldLabel } from "../ui/field";
import FormInput from "../ui/form/input.form";
import ReadOnlyField from "../ui/input/read-only";
import Uploader from "../ui/input/uploader";
import { Separator } from "../ui/separator";
import {
  PROVIDERS_WITH_PROOF,
  PROVIDERS_WITH_REFERENCE,
  RECHARGE_MESSAGES,
} from "./constants.recharge";
import {
  ERechargeProvider,
  RechargeDenomination,
  RechargeGateway,
} from "./types.recharge";

type RechargeDialogProps = {
  denomination: RechargeDenomination;
  gateway?: RechargeGateway;
};

export default function RechargeDialog({
  children,
  denomination: { amount, currency, id, price, type },
  gateway,
}: PropsWithChildren<RechargeDialogProps>) {
  const [open, setOpen] = useState(false);
  const [proofFiles, setProofFiles] = useState<File[]>([]);

  const provider = type.toLowerCase();
  const requiresReference =
    !!provider && PROVIDERS_WITH_REFERENCE.includes(provider);
  const requiresProof = !!provider && PROVIDERS_WITH_PROOF.includes(provider);

  const [state, action, pending] = useActionState(
    async (_prev: ConfirmTransactionResult, formData: FormData) => {
      formData.set("id", id);
      formData.set("gateway", type ?? "");

      console.log({ formData });

      if (proofFiles[0]) {
        formData.set("proofImage", proofFiles[0]);
      }

      const result = await confirmTransaction(_prev, formData);

      if (result.success) {
        const gatewayKey = type as keyof typeof ERechargeProvider;
        const notification = RECHARGE_MESSAGES[gatewayKey];
        const isRedirectProvider = ["paymongo", "paypal"].includes(
          provider ?? "",
        );

        if (isRedirectProvider && result.data) {
          window.open(result.data);
        }

        sileo.info({
          title: notification.title,
          description: notification.message,
          duration: 5000,
        });

        setOpen(false);
        setProofFiles([]);
      }

      return result;
    },
    {
      success: false,
      message: "",
    },
  );

  function handleUploadFile(files: File[]) {
    setProofFiles(files);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        className="sm:max-w-lg lg:max-w-md group data-[account=true]:lg:max-w-3xl"
        data-account={!!gateway?.name && !!gateway.image}
      >
        <DialogHeader>
          <DialogTitle>Confirm Recharge</DialogTitle>
          <DialogDescription>
            Review the details below before proceeding.
          </DialogDescription>
        </DialogHeader>
        <form className="space-y-4" action={action}>
          <section className="flex flex-col lg:group-data-[account=true]:flex-row px-4 py-3 gap-4">
            {gateway?.image && (
              <>
                <section className="flex items-center gap-4">
                  <img
                    src={`data:image/png;base64,${gateway?.image}`}
                    alt="Ran Online GS | Recharge"
                    className="relative aspect-square w-1/3 lg:w-62.5"
                  />
                  <div className="flex-1 space-y-2 lg:hidden">
                    {gateway?.name && (
                      <ReadOnlyField
                        className="flex items-center justify-between **:data-[slot='read-only-value']:uppercase"
                        label="Account name"
                      >
                        {gateway.name}
                      </ReadOnlyField>
                    )}
                    {gateway?.number && (
                      <ReadOnlyField
                        className="flex items-center justify-between **:data-[slot='read-only-value']:uppercase"
                        label="Account number"
                      >
                        {gateway.number}
                      </ReadOnlyField>
                    )}
                  </div>
                </section>
                <Separator className="lg:hidden" />
                <Separator orientation="vertical" className="hidden lg:block" />
              </>
            )}
            <section className="flex-1 space-y-3">
              <ReadOnlyField
                className="flex items-center justify-between **:data-[slot='read-only-value']:font-bold **:data-[slot='read-only-value']:text-lg"
                label="You will receive"
              >
                {`${formatCurrency(amount)} R-Coins`}
              </ReadOnlyField>
              <ReadOnlyField
                className="flex items-center justify-between **:data-[slot='read-only-value']:font-bold **:data-[slot='read-only-value']:text-lg"
                label="Amount to pay"
              >
                {formatCurrency(price, 2, currency)}
              </ReadOnlyField>
              <ReadOnlyField
                className="flex items-center justify-between **:data-[slot='read-only-value']:uppercase"
                label="Payment method"
              >
                {type}
              </ReadOnlyField>

              {gateway?.name && (
                <ReadOnlyField
                  className="flex items-center justify-between **:data-[slot='read-only-value']:uppercase max-lg:hidden"
                  label="Account name"
                >
                  {gateway.name}
                </ReadOnlyField>
              )}
              {gateway?.number && (
                <ReadOnlyField
                  className="flex items-center justify-between **:data-[slot='read-only-value']:uppercase max-lg:hidden"
                  label="Account number"
                >
                  {gateway.number}
                </ReadOnlyField>
              )}

              {(requiresProof || requiresReference) && <Separator />}

              {requiresReference && (
                <FormInput
                  id="referenceNumber"
                  name="referenceNumber"
                  placeholder="Enter reference number"
                  label="Reference number"
                  startIcon={IconReceipt}
                />
              )}

              {requiresProof && (
                <Field>
                  <FieldLabel
                    htmlFor="proof"
                    className="text-xs font-medium tracking-wider text-gray-400 uppercase"
                  >
                    Proof of Transaction
                  </FieldLabel>
                  <Uploader
                    key={String(open)}
                    name="proofImage"
                    placeholder="Drag & drop screenshot here, or click to select (PNG, JPG up to 5MB)"
                    onUploadFile={handleUploadFile}
                    maxFiles={1}
                  />
                </Field>
              )}

              {!state.success && state.message && (
                <p className="text-sm text-destructive">{state.message}</p>
              )}
            </section>
          </section>
          <DialogFooter>
            <GameButton
              type="submit"
              loading={pending}
              className="w-full sm:w-auto"
            >
              Confirm
            </GameButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

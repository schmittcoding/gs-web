"use client";

import { useActionState } from "react";
import { useSession } from "../providers/session.provider";
import {
    supportStreamer,
    SupportStreamerState,
} from "@/app/(dashboard)/sas/actions";
import { IconCheck, IconHash, IconUserCheck } from "@tabler/icons-react";
import GameButton from "../common/game.button";
import FormInput from "../ui/form/input.form";
import { DialogClose, DialogFooter } from "../ui/dialog";
import { FieldError } from "../ui/field";

export default function SupportStreamerForm() {
  const { user } = useSession();

  const [state, action, pending] = useActionState<
    SupportStreamerState,
    FormData
  >(supportStreamer, { success: false });

  return state.success ? (
    <section className="px-4 pt-6 pb-8 flex flex-col items-center gap-3 text-center">
      <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center">
        <IconCheck className="size-6 text-primary" />
      </div>
      <p className="font-semibold text-lg">Streamer Supported!</p>
      <p className="text-sm text-gray-400">
        Your support has been recorded. The streamer will receive commissions
        from your future transactions.
      </p>
      <DialogClose asChild>
        <GameButton variant="outline" className="mt-2">
          Close
        </GameButton>
      </DialogClose>
    </section>
  ) : (
    <form action={action} className="space-y-4">
      <div className="px-4 space-y-4">
        <p className="text-sm text-gray-400">
          Enter a streamer code to support your favorite streamer. Your recharge
          transactions will help support them.
        </p>
        {user.supported_code && (
          <div className="flex items-center gap-3 px-3 py-2.5 bg-primary/10 border border-primary/20 shape-main">
            <IconUserCheck className="size-4 text-primary shrink-0" />
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-widest text-gray-500">
                Currently Supporting
              </p>
              <p className="text-sm font-bold text-primary tracking-widest">
                {user.supported_code}
              </p>
            </div>
          </div>
        )}

        <FormInput
          id="code"
          name="code"
          label="Streamer Code"
          placeholder={user.supported_code ?? "Enter streamer code"}
          startIcon={IconHash}
          defaultValue={user.supported_code ?? ""}
        />

        {!state.success && state.error && (
          <FieldError errors={[{ message: state.error }]} />
        )}

        <p className="text-sm text-gray-500">
          {user.supported_code
            ? "You can change the streamer you support at any time."
            : "You can only support one streamer at a time."}
        </p>
      </div>
      <DialogFooter showCloseButton>
        <GameButton
          type="submit"
          loading={pending}
          className="w-full sm:w-auto"
        >
          {user.supported_code ? "Change Streamer" : "Support Streamer"}
        </GameButton>
      </DialogFooter>
    </form>
  );
}

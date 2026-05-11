/* eslint-disable @next/next/no-img-element */
"use client";

import { generateReferralCode } from "@/app/(dashboard)/referrals/actions";
import GameButton from "@/components/common/game.button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { EligibleCharacter } from "@/types/referral";
import { IconCheck } from "@tabler/icons-react";
import { PropsWithChildren, useState, useTransition } from "react";
import { sileo } from "sileo";
import {
  getClassName,
  getSchoolAbbr,
  getSchoolFullName,
} from "../rankings/types.rankings";

type GenerateCodeDialogProps = {
  characters: EligibleCharacter[];
  onSuccess: (code: string) => void;
};

export function GenerateCodeDialog({
  characters,
  onSuccess,
  children,
}: PropsWithChildren<GenerateCodeDialogProps>) {
  const [open, setOpen] = useState(false);
  const [selectedChaNum, setSelectedChaNum] = useState<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const selectedChar = characters.find((c) => c.cha_num === selectedChaNum);

  function handleSubmit() {
    if (!selectedChar) return;

    startTransition(async () => {
      const res = await generateReferralCode({ cha_num: selectedChar.cha_num });

      if (!res.success) {
        sileo.error({
          description: res.message ?? "Failed to generate referral code.",
        });
        return;
      }

      sileo.success({ description: "Referral code generated successfully!" });
      setOpen(false);
      onSuccess(res.referral_code!);
    });
  }

  function handleOpenChange(next: boolean) {
    if (!next) setSelectedChaNum(null);
    setOpen(next);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Generate Referral Code</DialogTitle>
          <DialogDescription>
            Select an eligible character to enrol and generate your code.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-2 px-4">
          {characters.length === 0 ? (
            <p className="text-sm text-gray-500 py-2">
              No eligible characters found. You need at least one character at
              the required level.
            </p>
          ) : (
            <div className="space-y-1.5 max-h-52 overflow-y-auto">
              {characters.map((char) => {
                const isSelected = char.cha_num === selectedChaNum;
                const className = getClassName(char.cha_class);

                return (
                  <button
                    key={char.cha_num}
                    type="button"
                    onClick={() => setSelectedChaNum(char.cha_num)}
                    className={cn(
                      "w-full flex items-center shape-main shape-no-hover gap-3 px-3 py-2 rounded-sm text-left transition-colors",
                      isSelected ? "bg-primary/10" : "hover:bg-gray-800/60",
                    )}
                  >
                    <img
                      className="size-9 rounded-full ring-1 ring-gray-800 shrink-0"
                      alt={className}
                      src={`https://images.ranonlinegs.com/assets/emblems/${className.toLowerCase()}.webp`}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold truncate">
                          {char.cha_name}
                        </span>
                        <span className="text-xs text-gray-500">
                          Lv. {char.cha_level}
                        </span>
                      </div>

                      <p className="text-xs text-gray-400 mt-0.5 flex gap-1 items-center">
                        <img
                          src={`https://images.ranonlinegs.com/assets/campus/${getSchoolAbbr(char.cha_school)}.png`}
                          alt={`Ran Online GS | School | ${getSchoolFullName(char.cha_school)}`}
                          className="size-4"
                        />
                        {className}
                      </p>
                    </div>
                    {isSelected && (
                      <IconCheck className="size-4 text-primary shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}
        </div>

        <DialogFooter>
          <GameButton
            onClick={handleSubmit}
            disabled={!selectedChar || isPending}
            loading={isPending}
            size="default"
            className="w-full sm:w-auto"
          >
            Generate Code
          </GameButton>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

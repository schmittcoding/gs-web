/* eslint-disable @next/next/no-img-element */
"use client";

import {
  registerForEvent,
  updateRegistration,
} from "@/app/(dashboard)/events/actions";
import GameButton from "@/components/common/game.button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SCHOOLS } from "@/lib/events/constants";
import { cn } from "@/lib/utils";
import type {
  EventRegistrationCharacterData,
  EventRegistrationData,
} from "@/types/event";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { sileo } from "sileo";

type RegistrationFormProps = {
  eventId: string;
  minLevel: number;
  characters: EventRegistrationCharacterData[];
  existingRegistrations: EventRegistrationData[];
  onClose?: () => void;
};

export function RegistrationForm({
  eventId,
  minLevel,
  characters,
  existingRegistrations,
  onClose,
}: RegistrationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [selectedChaNum, setSelectedChaNum] = useState<number | null>(
    existingRegistrations[0]?.cha_num ?? null,
  );
  const [joinGvG, setJoinGvG] = useState(
    existingRegistrations[0]?.join_gvg ?? false,
  );
  const [joinKOTH, setJoinKOTH] = useState(
    existingRegistrations[0]?.join_koth ?? false,
  );

  const selectedChar = characters.find((c) => c.cha_num === selectedChaNum);
  const existingReg = existingRegistrations.find(
    (r) => r.cha_num === selectedChaNum,
  );
  const isUpdate = !!existingReg;

  const levelTooLow = selectedChar ? selectedChar.cha_level < minLevel : false;
  const noGuild = selectedChar ? !selectedChar.guild_num : false;
  const noCategorySelected = !joinGvG && !joinKOTH;
  const canSubmit =
    selectedChar && !levelTooLow && !noCategorySelected && !isPending;

  function handleSelectCharacter(char: EventRegistrationCharacterData) {
    setSelectedChaNum(char.cha_num);

    const reg = existingRegistrations.find((r) => r.cha_num === char.cha_num);
    if (reg) {
      setJoinGvG(reg.join_gvg);
      setJoinKOTH(reg.join_koth);
    } else {
      setJoinGvG(char.eligible_gvg);
      setJoinKOTH(char.eligible_koth);
    }
  }

  function handleSubmit() {
    if (!selectedChar || !canSubmit) return;

    startTransition(async () => {
      const res = isUpdate
        ? await updateRegistration(eventId, selectedChar.cha_num, {
            joinGvG,
            joinKOTH,
          })
        : await registerForEvent(eventId, {
            chaNum: selectedChar.cha_num,
            joinGvG,
            joinKOTH,
          });

      if (!res.success) {
        const errorMessages: Record<string, string> = {
          DUPLICATE: "This character is already registered.",
          CLOSED: "Registration is closed.",
          LEVEL_REQ: `Character must be at least level ${minLevel}.`,
          NO_GUILD: "Join a guild first to participate in GvG.",
        };

        sileo.error({
          description:
            errorMessages[res.code ?? ""] ??
            res.message ??
            "Registration failed.",
        });
        return;
      }

      sileo.success({
        description: isUpdate
          ? "Registration updated successfully."
          : "Successfully registered for the event!",
      });
      router.refresh();
      router.push("/events");
      onClose?.();
    });
  }

  //   function handleWithdraw() {
  //     if (!existingReg) return;

  //     startTransition(async () => {
  //       const res = await withdrawRegistration(eventId, existingReg.cha_num);

  //       if (!res.success) {
  //         sileo.error({
  //           description: res.message ?? "Failed to withdraw.",
  //         });
  //         return;
  //       }

  //       sileo.success({ description: "Withdrawn from the event." });
  //       router.refresh();
  //       router.push("/events");
  //       onClose?.();
  //     });
  //   }

  function getSchoolAbbr(school: number) {
    return SCHOOLS.find((s) => s.chaSchool === school)?.name ?? "Unknown";
  }

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <p className="text-sm text-gray-400">Select a character</p>
        <div className="space-y-1.5 max-h-48 overflow-y-auto">
          {characters.length === 0 && (
            <p className="text-sm text-gray-500 py-2">
              No eligible characters found.
            </p>
          )}
          {characters.map((char) => {
            const isSelected = char.cha_num === selectedChaNum;
            const isRegistered = existingRegistrations.some(
              (r) => r.cha_num === char.cha_num,
            );
            const tooLow = char.cha_level < minLevel;

            return (
              <button
                key={char.cha_num}
                type="button"
                onClick={() => handleSelectCharacter(char)}
                className={cn(
                  "w-full flex items-center gap-3 px-3 py-2 rounded-sm text-left transition-colors",
                  isSelected
                    ? "bg-primary/10 ring-1 ring-primary/40"
                    : "hover:bg-gray-800/60",
                  tooLow && "opacity-50",
                )}
              >
                <img
                  className="size-9 rounded-full ring-1 ring-gray-800"
                  alt={`Ran Online GS | Events | ${char.cha_class_name}`}
                  src={`https://images.ranonlinegs.com/assets/emblems/${char.cha_class_name.toLowerCase()}.webp`}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-bold truncate">
                      {char.cha_name}
                    </span>
                    <span className="text-xs text-gray-500">
                      Lv. {char.cha_level}
                    </span>
                    {isRegistered && (
                      <Badge variant="default" className="text-[10px]">
                        Registered
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-gray-400">
                      {getSchoolAbbr(char.cha_school)}
                    </span>
                    {char.guild_name && (
                      <span className="text-xs text-gray-500">
                        {char.guild_name}
                      </span>
                    )}
                  </div>
                </div>
                {tooLow && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <IconAlertTriangle className="size-4 text-destructive shrink-0" />
                    </TooltipTrigger>
                    <TooltipContent>Requires level {minLevel}</TooltipContent>
                  </Tooltip>
                )}
                {isSelected && (
                  <IconCheck className="size-4 text-primary shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {selectedChar && (
        <>
          {levelTooLow && (
            <p className="text-sm text-destructive flex items-center gap-1.5">
              <IconAlertTriangle className="size-4" />
              Level {selectedChar.cha_level} — requires Lv. {minLevel}
            </p>
          )}

          <div className="space-y-3">
            <p className="text-sm text-gray-400">Categories</p>

            <div className="flex items-center gap-2 has-disabled:opacity-50">
              {noGuild ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Checkbox id="gvg" checked={false} disabled />
                      <Label htmlFor="gvg">Guild vs Guild (GvG)</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Must be in a guild</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <Checkbox
                    id="gvg"
                    checked={joinGvG}
                    onCheckedChange={(checked) => setJoinGvG(checked === true)}
                    disabled={levelTooLow}
                  />
                  <Label htmlFor="gvg">Guild vs Guild (GvG)</Label>
                </>
              )}
            </div>

            <div className="flex items-center gap-2 has-disabled:opacity-50">
              {noGuild ? (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center gap-2">
                      <Checkbox id="koth" checked={false} disabled />
                      <Label htmlFor="koth">King of the Hill (KOTH</Label>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>Must be in a guild</TooltipContent>
                </Tooltip>
              ) : (
                <>
                  <Checkbox
                    id="koth"
                    checked={joinKOTH}
                    onCheckedChange={(checked) => setJoinKOTH(checked === true)}
                    disabled={levelTooLow}
                  />
                  <Label htmlFor="koth">King of the Hill (KOTH)</Label>
                </>
              )}
            </div>

            {noCategorySelected && !levelTooLow && (
              <p className="text-xs text-destructive">
                Select at least one category
              </p>
            )}
          </div>

          <div className="flex items-center gap-2 pt-2 justify-end">
            <GameButton
              onClick={handleSubmit}
              disabled={!canSubmit}
              loading={isPending}
              size="default"
              className="w-full"
            >
              {isUpdate ? "Update Registration" : "Register"}
            </GameButton>
            {/* {isUpdate && (
              <GameButton
                onClick={handleWithdraw}
                disabled={isPending}
                loading={isPending}
                variant="destructive"
                size="default"
              >
                {!isPending && <IconLogout />}
                Withdraw
              </GameButton>
            )} */}
          </div>
        </>
      )}
    </div>
  );
}

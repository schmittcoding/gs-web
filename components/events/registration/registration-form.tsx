/* eslint-disable @next/next/no-img-element */
"use client";

import {
  registerForEvent,
  registerGuildForEvent,
} from "@/app/(dashboard)/events/actions";
import GameButton from "@/components/common/game.button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SCHOOLS } from "@/lib/events/constants";
import { cn } from "@/lib/utils";
import type {
  EventCategory,
  EventCharacter,
  EventRegistration,
  GuildMember,
} from "@/types/event";
import { IconAlertTriangle, IconCheck } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { sileo } from "sileo";

type RegistrationFormProps = {
  eventId: string;
  minLevel: number;
  characters: EventCharacter[];
  existingRegistrations: EventRegistration[];
  eventCategory: EventCategory;
  eventSlug: string;
  guildNum?: number;
  guildMembers?: GuildMember[];
  onClose?: () => void;
};

export function RegistrationForm({
  eventId,
  minLevel,
  characters,
  existingRegistrations,
  eventCategory,
  eventSlug,
  guildNum,
  guildMembers,
  onClose,
}: RegistrationFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const isGvG = eventCategory === "gvg";

  // GVG: track selected members; others: track selected character
  const [selectedChaNum, setSelectedChaNum] = useState<number | null>(
    !isGvG ? (existingRegistrations[0]?.cha_num ?? null) : null,
  );
  const [selectedMemberNums, setSelectedMemberNums] = useState<Set<number>>(
    new Set(),
  );

  const selectedChar = !isGvG
    ? characters.find((c) => c.cha_num === selectedChaNum)
    : null;

  // GVG-specific validation
  const levelTooLow =
    selectedChar && selectedChar.cha_level < minLevel
      ? selectedChar.cha_level < minLevel
      : false;

  const hasGuildMembers = guildMembers && guildMembers.length > 0;
  const canSubmit = isPending
    ? false
    : isGvG
      ? hasGuildMembers && selectedMemberNums.size > 0
      : selectedChar !== null && !levelTooLow;

  function handleSelectCharacter(char: EventCharacter) {
    setSelectedChaNum(char.cha_num);
  }

  function handleToggleMember(memberNum: number) {
    const newSet = new Set(selectedMemberNums);
    if (newSet.has(memberNum)) {
      newSet.delete(memberNum);
    } else {
      newSet.add(memberNum);
    }
    setSelectedMemberNums(newSet);
  }

  function handleSubmit() {
    startTransition(async () => {
      let res;

      if (isGvG) {
        if (!guildNum || selectedMemberNums.size === 0) return;
        res = await registerGuildForEvent(eventSlug, {
          guildNum,
          memberChaNum: Array.from(selectedMemberNums),
        });
      } else {
        if (!selectedChar) return;
        res = await registerForEvent(eventSlug, {
          chaNum: selectedChar.cha_num,
        });
      }

      if (!res.success) {
        const errorMessages: Record<string, string> = {
          DUPLICATE: "This character is already registered.",
          CLOSED: "Registration is closed.",
          LEVEL_REQ: `Character must be at least level ${minLevel}.`,
          NO_GUILD: "Join a guild to participate.",
          NOT_GUILD_MASTER: "You must be a guild master to register for GVG.",
          WRONG_CATEGORY:
            "This registration type is not valid for this event.",
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
        description: "Successfully registered for the event!",
      });
      router.refresh();
      router.push("/events");
      onClose?.();
    });
  }

  function getSchoolAbbr(school: number) {
    return SCHOOLS.find((s) => s.chaSchool === school)?.name ?? "Unknown";
  }

  // GVG Form
  if (isGvG) {
    if (!hasGuildMembers) {
      return (
        <div className="space-y-4 p-4">
          <p className="text-sm text-gray-400">
            You must be a guild master to register your guild.
          </p>
        </div>
      );
    }

    return (
      <div className="space-y-4 p-4">
        <div className="space-y-2">
          <p className="text-sm text-gray-400">Select members to participate</p>
          <div className="space-y-1.5 max-h-48 overflow-y-auto">
            {guildMembers!.map((member) => {
              const isSelected = selectedMemberNums.has(member.cha_num);
              const isAlreadyRegistered = member.already_registered;

              return (
                <div
                  key={member.cha_num}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-sm transition-colors hover:bg-gray-800/60"
                >
                  <Checkbox
                    checked={isSelected || isAlreadyRegistered}
                    onCheckedChange={() =>
                      !isAlreadyRegistered &&
                      handleToggleMember(member.cha_num)
                    }
                    disabled={isAlreadyRegistered || isPending}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold truncate">
                        {member.cha_name}
                      </span>
                      <span className="text-xs text-gray-500">
                        Lv. {member.cha_level}
                      </span>
                      {isAlreadyRegistered && (
                        <Badge variant="default" className="text-[10px]">
                          Registered
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-xs text-gray-400">
                        {getSchoolAbbr(member.cha_school)}
                      </span>
                    </div>
                  </div>
                  {isSelected && (
                    <IconCheck className="size-4 text-primary shrink-0" />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2 justify-end">
          <GameButton
            onClick={handleSubmit}
            disabled={!canSubmit}
            loading={isPending}
            size="default"
            className="w-full"
          >
            Register Guild
          </GameButton>
        </div>
      </div>
    );
  }

  // KOTH / level_cap_race Form
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

          <div className="flex items-center gap-2 pt-2 justify-end">
            <GameButton
              onClick={handleSubmit}
              disabled={!canSubmit}
              loading={isPending}
              size="default"
              className="w-full"
            >
              Register
            </GameButton>
          </div>
        </>
      )}
    </div>
  );
}

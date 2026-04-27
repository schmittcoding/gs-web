import type { CharacterClass, School } from "@/types/event";

export const CHARACTER_CLASS_MAP: Record<number, string> = {
  1: "Shaman",
  2: "Brawler",
  3: "Assassin",
  4: "Gunner",
  5: "Swordsman",
  6: "Magician",
  7: "Archer",
  8: "Extreme",
} as const;

export const OVERALL_CLASS_MAP: Record<number, string> = {
  0: "Overall",
  ...CHARACTER_CLASS_MAP,
};

export const CLASSES: CharacterClass[] = [
  { chaClass: 1, name: "Shaman" },
  { chaClass: 2, name: "Brawler" },
  { chaClass: 3, name: "Assassin" },
  { chaClass: 4, name: "Gunner" },
  { chaClass: 5, name: "Swordsman" },
  { chaClass: 6, name: "Magician" },
  { chaClass: 7, name: "Archer" },
  { chaClass: 8, name: "Extreme" },
] as const;

export const SCHOOLS: School[] = [
  { chaSchool: 0, name: "Sacred Gate", abbr: "SG" },
  { chaSchool: 1, name: "Mystic Peak", abbr: "MP" },
  { chaSchool: 2, name: "Phoenix", abbr: "PNX" },
] as const;

export const MATCH_STATUS_POLL_INTERVAL = 60_000;
export const MATCH_STATUS_FAST_POLL_INTERVAL = 10_000;

export function getEventClassName(classId: number): string {
  return (
    CLASSES.find(({ chaClass }) => chaClass === classId)?.name ?? "Unknown"
  );
}

export function mapClassName(clsName?: string) {
  if (!clsName) return undefined;

  return Object.entries(OVERALL_CLASS_MAP).find(
    ([, name]) => name.toLowerCase() === clsName.toLowerCase(),
  )?.[0];
}

import type { CharacterClass, School } from "@/types/event";

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
  return CLASSES[classId].name ?? "Unknown";
}

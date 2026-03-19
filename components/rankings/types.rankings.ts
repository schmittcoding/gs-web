export type GoldRankingEntry = {
  cha_class: number;
  cha_level: number;
  cha_money: number;
  cha_name: string;
  cha_school: number;
  rank_number: number;
};

export type GoldRankingsResponse = {
  data: GoldRankingEntry[];
  limit: number;
  page: number;
  total_items: number;
  total_pages: number;
};

// Ran Online GS school/faction mapping
export const SCHOOL_MAP: Record<number, { name: string; color: string }> = {
  0: { name: "sg", color: "text-primary" },
  1: { name: "mp", color: "text-blue-400" },
  2: { name: "ph", color: "text-accent" },
};

// Ran Online GS class mapping (M/F variants merged to class name only)
export const CLASS_MAP: Record<number, string> = {
  1: "Brawler",
  64: "Brawler",
  2: "Swordsman",
  128: "Swordsman",
  4: "Archer",
  256: "Archer",
  8: "Shaman",
  512: "Shaman",
  16: "Extreme",
  32: "Extreme",
  1024: "Scientist",
  2048: "Scientist",
  4096: "Assassin",
  8192: "Assassin",
  16384: "Magician",
  32768: "Magician",
  262144: "Shaper",
  524288: "Shaper",
};

export function getSchoolName(school: number): string {
  return SCHOOL_MAP[school]?.name ?? "Unknown";
}

export function getSchoolColor(school: number): string {
  return SCHOOL_MAP[school]?.color ?? "text-gray-400";
}

export function getClassName(classId: number): string {
  return CLASS_MAP[classId] ?? "Unknown";
}

export function formatGold(amount: number): string {
  switch (true) {
    case amount >= 1_000_000_000:
      return `${(amount / 1_000_000_000).toFixed(2)}B`;
    case amount >= 1_000_000:
      return `${(amount / 1_000_000).toFixed(2)}M`;
    case amount >= 1_000:
      return `${(amount / 1_000).toFixed(2)}K`;
    default:
      return amount.toLocaleString();
  }
}

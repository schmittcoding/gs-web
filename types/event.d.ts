// gimmick.rs → GimmickType
// Wire values are PascalCase due to #[serde(rename_all = "PascalCase")]
export type GimmickType = "DoublePoints" | "NullDeaths";

// gimmick.rs → EventMatchGimmick
export type EventMatchGimmick = {
  gimmick_id: string; // UUID v4 (36-char hyphenated)
  match_id: string; // UUID v4 (36-char hyphenated)
  gimmick_type: GimmickType;
  gimmick_start_time: string; // ISO-8601 without timezone (e.g. "2026-04-19T14:30:00")
  gimmick_end_time: string; // ISO-8601 without timezone (e.g. "2026-04-19T16:00:00")
  created_at: string; // ISO-8601 without timezone (e.g. "2026-04-19T14:30:00")
};

// gimmick.rs → CreateGimmickRequest
export type CreateGimmickRequest = {
  gimmick_type: GimmickType;
  gimmick_start_time: string; // ISO-8601 without timezone (e.g. "2026-04-19T14:30:00")
  gimmick_end_time: string; // ISO-8601 without timezone (e.g. "2026-04-19T16:00:00")
};

export type EventData = {
  created_at: Date;
  event_end: Date;
  event_id: string;
  event_map_mid: number;
  event_map_sid: number;
  event_name: string;
  event_start: Date;
  is_active: boolean;
  match_duration_min: number;
  min_level: number;
  registration_close: Date;
  registration_open: Date;
  season: number;
  tally_delay_min: number;
  tower_points_per_tick: number;
};

export type EventMatchData = {
  end_time: Date;
  event_id: string;
  kills_counted: number | null;
  kills_rejected: number | null;
  match_date: Date;
  match_id: string;
  match_label: string;
  rows_tallied: number | null;
  start_time: Date;
  tally_completed_at: Date | null;
  tally_scheduled: Date;
  tally_started_at: Date | null;
  tally_status: "Pending" | "Processing" | "Completed";

  tower_points_th?: number;
  tower_points_nuc?: number;
  tower_points_faci?: number;

  tower_winner_th: number | null;
  tower_winner_nuc: number | null;
  tower_winner_faci: number | null;

  gimmicks: EventMatchGimmick[];
};

export type EventRegistrationData = {
  registration_id: string;
  event_id: string;
  cha_num: number;
  user_num: number;
  guild_num: number | null;
  cha_school: number | null;
  cha_class: number;
  cha_level: number;
  join_gvg: boolean;
  join_koth: boolean;
  status: number;
  registered_at: NaiveDateTime;
  updated_at: Date | null;
  ip_address: string | null;
};

export type EventRegistrationCharacterData = {
  cha_class: number;
  cha_class_name: string;
  cha_level: number;
  cha_name: string;
  cha_num: number;
  cha_school: number;
  eligible_gvg: boolean;
  eligible_koth: boolean;
  guild_name: string;
  guild_num: number;
};

// --- Match Status ---

export type DisplayStatus = "IDLE" | "LIVE" | "TALLYING_SOON" | "TALLYING_NOW";

export type MatchStatus = {
  eventId: string;
  currentMatch: {
    matchId: string;
    label: string;
    startTime: string;
    endTime: string;
    tallyScheduled: string;
    displayStatus: DisplayStatus;
    message: string;
  } | null;
  leaderboardStale: boolean;
  lastTallyCompletedAt: string | null;
};

// --- Leaderboards ---

export type GuildRanking = {
  cha_school: number;
  computed_score: number;
  deduction: number;
  event_id: string;
  guild_name: string;
  guild_num: number;
  rank: number;
  total_deaths: number;
  total_kills: number;
  tower_points: number;
};

export type MatchBreakdown = {
  matchId: string;
  label: string;
  kills: number;
  deaths: number;
  tower: number;
};

export type SchoolRanking = {
  cha_school: number;
  computed_score: number;
  deduction: number;
  event_id: string;
  rank: number;
  total_deaths: number;
  total_kills: number;
  total_tower: number;
};

export type KothRanking = {
  rank: number;
  cha_school: number;
  cha_num: number;
  cha_name: string;
  guild_num: number | null;
  guild_name: string | null;
  total_kills: number;
  total_deaths: number;
  deduction: number;
  //   adjustedKills: number;
  //   kdr: number;
};

export type Pagination = {
  page: number;
  page_size: number;
  total_items: number;
};

export type PaginatedResponse<T> = {
  success: boolean;
  pagination: Pagination;
  rankings: T[];
  updatedAt: string;
  matchesTallied: number;
  totalMatches: number;
};

// --- Snapshots ---

export type Snapshot = {
  snapshotId: string;
  matchId: string;
  time: string;
  label: string;
};

// --- Request payloads ---

export type RegisterPayload = {
  chaNum: number;
  joinGvG: boolean;
  joinKOTH: boolean;
};

// --- Constants ---

export type CharacterClass = {
  chaClass: number;
  name: string;
};

export type School = {
  chaSchool: number;
  name: string;
  abbr: string;
};

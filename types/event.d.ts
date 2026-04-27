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

export type EventCategory =
  | "gvg"
  | "koth"
  | "gvg_koth"
  | "level_cap_race"
  | "speed_run";

// category_config.rs → GvgConfig
export type GvgConfig = {
  min_guild_members: number;
  match_duration_min: number;
  tally_delay_min: number;
  event_map_mid: number;
  event_map_sid: number;
};

// category_config.rs → KothConfig
export type KothConfig = {
  match_duration_min: number;
  tally_delay_min: number;
  event_map_mid: number;
  event_map_sid: number;
};

// category_config.rs → GvgKothConfig
export type GvgKothConfig = {
  min_guild_members: number;
  match_duration_min: number;
  tally_delay_min: number;
  event_map_mid: number;
  event_map_sid: number;
};

// category_config.rs → LevelCapRaceConfig
export type LevelCapRaceConfig = {
  max_account_age_days: number;
  target_level: number;
};

// category_config.rs → SpeedRunConfig
export type SpeedRunConfig = {
  dungeon_map_mid: number;
  dungeon_map_sid: number;
  boss_mob_id: number | null;
};

// category_config.rs → CategoryConfig  (#[serde(tag = "type", rename_all = "snake_case")])
export type CategoryConfig =
  | ({ type: "gvg" } & GvgConfig)
  | ({ type: "koth" } & KothConfig)
  | ({ type: "gvg_koth" } & GvgKothConfig)
  | ({ type: "level_cap_race" } & LevelCapRaceConfig)
  | ({ type: "speed_run" } & SpeedRunConfig);

// event.rs → EventDefinition
export type EventDefinition = {
  event_id: string; // UUID
  event_name: string;
  event_slug: string;
  season: number;
  registration_open: string; // ISO NaiveDateTime
  registration_close: string; // ISO NaiveDateTime
  event_start: string; // ISO NaiveDateTime
  event_end: string; // ISO NaiveDateTime
  min_level: number;
  is_active: boolean;
  event_category: EventCategory;
  category_config: CategoryConfig | null;
  created_at: string; // ISO NaiveDateTime
};

// match_schedule.rs → MatchSchedule
export type MatchSchedule = {
  match_id: string; // UUID
  event_id: string; // UUID
  match_label: string | null;
  match_date: string; // ISO NaiveDate (YYYY-MM-DD)
  start_time: string; // ISO NaiveDateTime
  end_time: string; // ISO NaiveDateTime
  tally_scheduled: string; // ISO NaiveDateTime
  tally_status: string; // "Pending" | "Waiting" | "Processing" | "Completed" | "Failed"
  tally_started_at: string | null; // ISO NaiveDateTime
  tally_completed_at: string | null; // ISO NaiveDateTime
  rows_tallied: number | null;
  kills_counted: number | null;
  kills_rejected: number | null;
  tower_points_th: number;
  tower_points_nuc: number;
  tower_points_faci: number;
  tower_winner_th: number | null; // ChaSchool INT of winning school; null = no winner
  tower_winner_nuc: number | null;
  tower_winner_faci: number | null;
};

export type MatchWithGimmicks = MatchSchedule & {
  gimmicks: EventMatchGimmick[];
};

// Event registration (new contract — no join_gvg/join_koth)
export type EventRegistration = {
  registration_id: string;
  event_id: string;
  cha_num: number;
  user_num: number;
  guild_num: number | null;
  cha_school: number | null;
  cha_class: number;
  cha_level: number;
  status: number;
  registered_at: string;
  updated_at: string | null;
  ip_address: string | null;
};

// Event character (new contract — eligible instead of eligible_gvg/eligible_koth)
export type EventCharacter = {
  cha_num: number;
  cha_name: string;
  cha_class: number;
  cha_class_name: string;
  cha_school: number;
  cha_level: number;
  guild_num: number;
  guild_name: string | null;
  guild_leader_name: string | null;
  guild_leader_school: number | null;
  eligible: boolean;
};

// Guild member (from guild-members endpoint)
export type GuildMember = {
  cha_num: number;
  cha_name: string;
  cha_class: number;
  cha_school: number;
  cha_level: number;
  guild_name: string;
  already_registered: boolean;
};

// Guild members response
export type GuildMembersResponse = {
  success: boolean;
  event_id: string | null;
  guild_num: number;
  min_level: number;
  members: GuildMember[];
};

// Guild registration payload
export type GvgRegisterPayload = {
  guildNum: number;
  memberChaNum: number[];
};

// guild_score.rs → GuildEventScore
export type GuildEventScore = {
  rank: number;
  event_id: string; // UUID
  guild_num: number;
  guild_name: string;
  cha_school: number;
  total_kills: number;
  total_deaths: number;
  tower_points: number;
  deduction: number;
  computed_score: number;
};

// school_score.rs → SchoolEventScore
export type SchoolEventScore = {
  rank: number;
  event_id: string; // UUID
  cha_school: number;
  total_kills: number;
  total_deaths: number;
  total_tower: number;
  deduction: number;
  computed_score: number;
};

// koth_score.rs → KOTHScore
export type KOTHScore = {
  rank: number;
  event_id: string; // UUID
  cha_num: number;
  cha_name: string;
  cha_class: number;
  cha_school: number | null;
  guild_num: number | null;
  guild_name: string | null;
  total_kills: number;
  total_deaths: number;
  deduction: number;
};

// level_cap_race_score.rs → LevelCapRaceScore
export type LevelCapRaceScore = {
  rank: number;
  event_id: string; // UUID
  cha_num: number;
  cha_name: string;
  cha_class: number;
  cha_school: number | null;
  guild_num: number | null;
  guild_name: string | null;
  start_level: number;
  current_level: number;
  levels_gained: number;
  level_up_date: string | null;
};

// speed_run_score.rs → SpeedRunScore
export type SpeedRunScore = {
  rank: number;
  event_id: string; // UUID
  cha_num: number;
  cha_name: string;
  cha_class: number;
  cha_school: number | null;
  guild_num: number | null;
  guild_name: string | null;
  completion_time_seconds: number | null;
};

// Pagination envelope (inline — no named struct)
export type PaginationMeta = {
  page: number;
  page_size: number;
  total_items: number;
};

// --- API Response Types ---
export type GetEventDetailsResponse = {
  success: boolean;
  event: EventDefinition | null;
  is_registration_available: boolean;
};

export type GetEventMatchesResponse = {
  success: boolean;
  matches: MatchWithGimmicks[];
};

export type GetEventLeaderboardResponse<T = unknown> = {
  success: boolean;
  pagination: PaginationMeta;
  rankings: T[];
};

// @deprecated
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

// @deprecated
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

// @deprecated
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

// @deprecated
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

// @deprecated
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

// @deprecated
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

// @deprecated
export type MatchBreakdown = {
  matchId: string;
  label: string;
  kills: number;
  deaths: number;
  tower: number;
};

// @deprecated
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

// @deprecated
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

// @deprecated
export type Pagination = {
  page: number;
  page_size: number;
  total_items: number;
};

// @deprecated
export type PaginatedResponse<T> = {
  success: boolean;
  pagination: Pagination;
  rankings: T[];
  updatedAt: string;
  matchesTallied: number;
  totalMatches: number;
};

// --- Snapshots ---

// @deprecated
export type Snapshot = {
  snapshotId: string;
  matchId: string;
  time: string;
  label: string;
};

// --- Request payloads ---

// @deprecated
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

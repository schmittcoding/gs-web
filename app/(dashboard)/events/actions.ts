"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import type {
  EventData,
  EventMatchData,
  EventRegistrationCharacterData,
  EventRegistrationData,
  GuildRanking,
  KothRanking,
  MatchStatus,
  Pagination,
  RegisterPayload,
  SchoolRanking,
  Snapshot,
} from "@/types/event";
import { redirect } from "next/navigation";

type CurrentEventResponse = {
  event: EventData | null;
  success: boolean;
  is_registration_available: boolean;
};

export async function getCurrentEvent(): Promise<CurrentEventResponse> {
  const res = await fetcherPrivate("/v1/events/current", {
    cache: "no-cache",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, event: null, is_registration_available: false };
  }

  return res.json();
}

type EventMatchesResponse = {
  matches: EventMatchData[];
  success: boolean;
};

export async function getEventMatches(
  eventId: string,
): Promise<EventMatchesResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/matches`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, matches: [] };
  }

  return res.json();
}

type RegistrationStatusResponse = {
  event_id: string | null;
  registrations: EventRegistrationData[];
  success: boolean;
};

export async function getRegistrationStatus(
  eventId: string,
): Promise<RegistrationStatusResponse> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/registration-status`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, event_id: null, registrations: [] };
  }

  return res.json();
}

type EligibleCharacterResponse = {
  success: boolean;
  event_id: string | null;
  characters: EventRegistrationCharacterData[];
};

export async function getEligibleCharacters(
  eventId: string,
): Promise<EligibleCharacterResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/characters`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, event_id: null, characters: [] };
  }

  const data: EligibleCharacterResponse = await res.json();
  const filteredCharacters = data.characters.filter(
    ({ eligible_gvg, eligible_koth }) => eligible_gvg || eligible_koth,
  );

  return {
    ...data,
    characters: filteredCharacters,
  };
}

// --- Match Status ---

type MatchStatusResponse = {
  success: boolean;
} & MatchStatus;

export async function getMatchStatus(
  eventId: string,
): Promise<MatchStatusResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/match/status`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      eventId,
      currentMatch: null,
      leaderboardStale: false,
      lastTallyCompletedAt: null,
    };
  }

  return res.json();
}

// --- Registration ---

type RegisterResponse = {
  success: boolean;
  registration?: EventRegistrationData;
  code?: string;
  message?: string;
};

export async function registerForEvent(
  eventId: string,
  payload: RegisterPayload,
): Promise<RegisterResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/register`, {
    method: "POST",
    body: JSON.stringify({
      cha_num: payload.chaNum,
      join_gvg: payload.joinGvG,
      join_koth: payload.joinKOTH,
    }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return res.json();
  }

  return res.json();
}

export async function updateRegistration(
  eventId: string,
  chaNum: number,
  payload: Omit<RegisterPayload, "chaNum">,
): Promise<RegisterResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/register/${chaNum}`, {
    method: "PUT",
    body: JSON.stringify({
      join_gvg: payload.joinGvG,
      join_koth: payload.joinKOTH,
    }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return res.json();
  }

  return res.json();
}

export async function withdrawRegistration(
  eventId: string,
  chaNum: number,
): Promise<{ success: boolean; message?: string }> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/register/${chaNum}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, message: "Failed to withdraw" };
  }

  return res.json();
}

// --- Leaderboards ---

// type GuildLeaderboardResponse = {
//   success: boolean;
//   eventId: string;
//   updatedAt: string;
//   matchesTallied: number;
//   totalMatches: number;
//   pagination: Pagination;
//   rankings: GuildRanking[];
// };

type GuildLeaderboardResponse = {
  success: boolean;
  pagination: Pagination;
  rankings: GuildRanking[];
};

export async function getGuildLeaderboard(
  eventId: string,
  page = 1,
  limit = 20,
): Promise<GuildLeaderboardResponse> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/leaderboard/guild?page=${page}&limit=${limit}`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      pagination: { page, page_size: limit, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

type SchoolLeaderboardResponse = {
  success: boolean;
  eventId: string;
  rankings: SchoolRanking[];
};

export async function getSchoolLeaderboard(
  eventId: string,
): Promise<SchoolLeaderboardResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/leaderboard/school`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, eventId, rankings: [] };
  }

  return res.json();
}

type KothLeaderboardResponse = {
  success: boolean;
  cha_class: number;
  class_name: string;
  pagination: Pagination;
  rankings: KothRanking[];
};

export async function getKothLeaderboard(
  eventId: string,
  chaClass: number,
  page = 1,
  limit = 20,
): Promise<KothLeaderboardResponse> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/leaderboard/koth?cha_class=${chaClass}&page=${page}&limit=${limit}`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      cha_class: chaClass,
      class_name: "",
      pagination: { page, page_size: limit, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

// --- Participants ---
export type GuildParticipant = {
  cha_school: number;
  guild_name: string;
  guild_num: number;
  gvg_count: number;
  koth_count: number;
  member_count: number;
  rank: 1;
};

type GetParticipantResponse<T> = {
  success: boolean;
  pagination: Pagination;
  participants: T[];
};

export async function getGuildParticipants(
  eventId: string,
): Promise<GetParticipantResponse<GuildParticipant>> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/participants/guilds?page=1&limit=100`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      pagination: { page: 1, page_size: 100, total_items: 0 },
      participants: [],
    };
  }

  return res.json();
}

export type KothParticipant = {
  cha_class: number;
  cha_level: number;
  cha_name: string;
  cha_num: number;
  cha_school: number;
  guild_name: string;
  guild_num: number;
  join_gvg: boolean;
  join_koth: boolean;
};

export async function getKothParticipants(
  eventId: string,
  chaClass: number,
): Promise<GetParticipantResponse<KothParticipant>> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/participants/characters?cha_class=${chaClass}&page=1&limit=100`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      pagination: { page: 1, page_size: 100, total_items: 0 },
      participants: [],
    };
  }

  return res.json();
}

// --- Snapshots ---

type SnapshotListResponse = {
  success: boolean;
  eventId: string;
  snapshots: Snapshot[];
};

export async function getSnapshots(
  eventId: string,
): Promise<SnapshotListResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/snapshots`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, eventId, snapshots: [] };
  }

  return res.json();
}

export async function getSnapshotGuilds(
  eventId: string,
  snapshotId: string,
): Promise<GuildLeaderboardResponse> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/snapshots/${snapshotId}/guilds`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      pagination: { page: 1, page_size: 0, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

export async function getSnapshotSchools(
  eventId: string,
  snapshotId: string,
): Promise<SchoolLeaderboardResponse> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/snapshots/${snapshotId}/schools`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, eventId, rankings: [] };
  }

  return res.json();
}

export async function getSnapshotKoth(
  eventId: string,
  snapshotId: string,
  chaClass: number,
): Promise<KothLeaderboardResponse> {
  const res = await fetcherPrivate(
    `/v1/events/${eventId}/snapshots/${snapshotId}/koth?class=${chaClass}`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      cha_class: chaClass,
      class_name: "",
      pagination: { page: 1, page_size: 0, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

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
  const res = await fetcherPrivate("/v1/events/current");

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
  const res = await fetcherPrivate(`/v1/events/${eventId}/registration-status`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, event_id: null, registrations: [] };
  }

  return res.json();
}

export async function getEligibleCharacters(eventId: string): Promise<{
  success: boolean;
  event_id: string | null;
  characters: EventRegistrationCharacterData[];
}> {
  const res = await fetcherPrivate(`/v1/events/${eventId}/characters`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, event_id: null, characters: [] };
  }

  return res.json();
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

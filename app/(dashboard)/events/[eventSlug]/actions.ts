"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { mapClassName } from "@/lib/events/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import {
  GetEventDetailsResponse,
  GetEventLeaderboardResponse,
  GetEventMatchesResponse,
  LevelCapRaceScore,
} from "@/types/event";
import { redirect } from "next/navigation";

export async function getEventDetails(
  eventSlug: string,
): Promise<GetEventDetailsResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventSlug}`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    if (res.status === 404) {
      redirect("/events");
    }

    return { success: false, event: null, is_registration_available: false };
  }

  return res.json();
}

export async function getCapRaceLeaderboard(
  eventSlug: string,
  activeClass?: string,
  page = 1,
  pageSize = 100,
): Promise<GetEventLeaderboardResponse<LevelCapRaceScore>> {
  const params = new URLSearchParams();

  params.append("page", page.toString());
  params.append("page_size", pageSize.toString());

  const clsName = mapClassName(activeClass);
  if (!!activeClass && !!clsName) {
    params.append("cha_class", clsName);
  }

  const res = await fetcherPrivate(
    `/v1/events/${eventSlug}/leaderboard?${params.toString()}`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return {
      success: false,
      pagination: { page, page_size: pageSize, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

export async function getEventMatches(
  eventSlug: string,
): Promise<GetEventMatchesResponse> {
  const res = await fetcherPrivate(`/v1/events/${eventSlug}/matches`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    if (res.status === 404) {
      redirect("/events");
    }

    return { success: false, matches: [] };
  }

  return res.json();
}

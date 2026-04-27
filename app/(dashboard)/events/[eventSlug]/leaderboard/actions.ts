import { AUTH_CONFIG } from "@/lib/constants";
import { CLASSES } from "@/lib/events/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import {
  GetEventLeaderboardResponse,
  GuildEventScore,
  KOTHScore,
} from "@/types/event";
import { redirect } from "next/navigation";

export async function getGuildLeaderboard(
  eventSlug: string,
): Promise<GetEventLeaderboardResponse<GuildEventScore>> {
  const res = await fetcherPrivate(
    `/v1/events/${eventSlug}/leaderboard/guild?page=1&page_size=20`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    if (res.status === 404) {
      redirect("/events");
    }

    return {
      success: false,
      pagination: { page: 1, page_size: 10, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

export async function getClassLeaderboard(
  eventSlug: string,
  activeClass: string = "Shaman",
): Promise<GetEventLeaderboardResponse<KOTHScore>> {
  const selectedClass = CLASSES.find(
    (c) => c.name.toLowerCase() === activeClass.toLowerCase(),
  );
  const res = await fetcherPrivate(
    `/v1/events/${eventSlug}/leaderboard/koth?page=1&page_size=100&cha_class=${selectedClass?.chaClass ?? ""}`,
    {
      cache: "no-cache",
    },
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    if (res.status === 404) {
      redirect("/events");
    }

    return {
      success: false,
      pagination: { page: 1, page_size: 10, total_items: 0 },
      rankings: [],
    };
  }

  return res.json();
}

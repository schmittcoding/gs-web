"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import {
  EventSnapshotWithSchedule,
  GetEventSnapshotResponse,
  GetEventSnapshotsResponse,
  SnapshotGuildScore,
  SnapshotKOTHScore,
} from "@/types/event";
import { redirect } from "next/navigation";

export async function getSnapshots(
  eventSlug: string,
): Promise<GetEventSnapshotsResponse<EventSnapshotWithSchedule>> {
  const res = await fetcherPrivate(`/v1/events/${eventSlug}/snapshots`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    if (res.status === 404) {
      redirect("/events");
    }

    return {
      success: false,
      snapshots: [],
    };
  }

  return res.json();
}

export async function getGuildSnapshots(
  eventSlug: string,
  snapshotId: string,
): Promise<GetEventSnapshotResponse<SnapshotGuildScore>> {
  const res = await fetcherPrivate(
    `/v1/events/${eventSlug}/snapshots/${snapshotId}/guild`,
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
      rankings: [],
    };
  }

  return res.json();
}

export async function getKOTHSnapshot(
  eventSlug: string,
  snapshotId: string,
  filterClass: number = 1,
): Promise<GetEventSnapshotResponse<SnapshotKOTHScore>> {
  const params = new URLSearchParams();

  params.set("cha_class", filterClass.toString());
  params.set("page", "1");
  params.set("page_size", "100");

  const res = await fetcherPrivate(
    `/v1/events/${eventSlug}/snapshots/${snapshotId}/koth?${params.toString()}`,
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
      rankings: [],
    };
  }

  return res.json();
}

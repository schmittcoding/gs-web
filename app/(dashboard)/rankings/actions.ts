"use server";

import { type GoldRankingsResponse } from "@/components/rankings/types.rankings";
import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { redirect } from "next/navigation";

const EMPTY_RESPONSE: GoldRankingsResponse = {
  data: [],
  limit: 0,
  page: 1,
  total_items: 0,
  total_pages: 0,
};

export async function getGoldRankings(
  page: number = 1,
  limit: number = 10,
  search: string = "",
): Promise<GoldRankingsResponse> {
  const params = new URLSearchParams({
    page: String(page),
    limit: String(limit),
  });

  if (search) {
    params.set("search", search);
  }

  const res = await fetcherPrivate(`/v1/rankings/gold?${params}`);

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return EMPTY_RESPONSE;
  }

  return res.json();
}

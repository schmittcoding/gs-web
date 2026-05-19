"use server";

import { requireCsrf } from "@/lib/csrf";
import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import {
  CreatorApplicationStatusResponse,
  CreatorCommissionEntry,
  CreatorSummary,
} from "@/types/creator";
import { redirect } from "next/navigation";

export type ApplyStreamerState = {
  success: boolean;
  error?: string;
};

export async function applyAsStreamer(
  _prevState: ApplyStreamerState,
  formData: FormData,
): Promise<ApplyStreamerState> {
  await requireCsrf();

  const body = {
    personal_facebook_url: formData.get("personal_facebook_url") || null,
    discord_account: formData.get("discord_account") || null,
    content_links: formData.get("content_links") || null,
  };

  const res = await fetcherPrivate("/v1/creator/apply", {
    method: "POST",
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    const error = await res.json().catch(() => null);
    return {
      success: false,
      error: error?.error ?? "Failed to submit application.",
    };
  }

  return { success: true };
}

export async function getStreamerApplication(): Promise<{
  success: boolean;
  data: CreatorApplicationStatusResponse | null;
}> {
  const res = await fetcherPrivate("/v1/creator/application");

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    return { success: false, data: null };
  }

  const data: CreatorApplicationStatusResponse = await res.json();
  return { success: true, data };
}

export type SupportStreamerState = {
  success: boolean;
  error?: string;
};

export async function supportStreamer(
  _prevState: SupportStreamerState,
  formData: FormData,
): Promise<SupportStreamerState> {
  await requireCsrf();

  const code = formData.get("code");

  const res = await fetcherPrivate("/v1/creator/support", {
    method: "POST",
    body: JSON.stringify({ code: code || null }),
  });

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    const error = await res.json().catch(() => null);
    return {
      success: false,
      error: error?.error ?? "Failed to support streamer.",
    };
  }

  return { success: true };
}

export async function getStreamerCommissions(
  page: number = 1,
  pageSize: number = 10,
): Promise<{ success: boolean; data: CreatorCommissionEntry[]; total: number }> {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });

  const res = await fetcherPrivate(`/v1/creator/commissions?${params}`);

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    return { success: false, data: [], total: 0 };
  }

  const json: { data: CreatorCommissionEntry[]; total_records: number } =
    await res.json();
  return { success: true, data: json.data, total: json.total_records };
}

export async function getStreamerSummary(): Promise<{
  success: boolean;
  data: CreatorSummary | null;
}> {
  const res = await fetcherPrivate("/v1/creator/summary");

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    return { success: false, data: null };
  }

  const data: CreatorSummary = await res.json();
  return { success: true, data };
}

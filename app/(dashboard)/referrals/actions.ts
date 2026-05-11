"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import {
  EligibleCharacter,
  GenerateReferralRequest,
  ReferralDetailsResponse,
} from "@/types/referral";
import { redirect } from "next/navigation";

export async function getReferralDetails(): Promise<ReferralDetailsResponse | null> {
  const res = await fetcherPrivate("/v1/referrals/details");

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    return null;
  }

  return res.json();
}

export async function getEligibleReferralCharacters(): Promise<
  EligibleCharacter[]
> {
  const res = await fetcherPrivate("/v1/referrals/characters?type=1");

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    return [];
  }

  return res.json();
}

export async function generateReferralCode(
  payload: GenerateReferralRequest,
): Promise<{ success: boolean; referral_code?: string; message?: string }> {
  const res = await fetcherPrivate("/v1/referrals/generate", {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    if (res.status === 401) redirect(AUTH_CONFIG.loginPath);
    const body = await res.json().catch(() => ({}));
    return { success: false, message: body.message ?? "Failed to generate code." };
  }

  const data = await res.json();
  return { success: true, referral_code: data.referral_code };
}

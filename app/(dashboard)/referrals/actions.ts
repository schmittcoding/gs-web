"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { ReferralCodeDetail } from "@/types/referral";
import { redirect } from "next/navigation";

export async function getReferralDetails(): Promise<ReferralCodeDetail | null> {
  const res = await fetcherPrivate("/v1/referral/details");

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return null;
  }

  return res.json();
}

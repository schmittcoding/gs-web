"use server";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { UserProfile } from "@/types/profile";
import { TransactionsResponse } from "@/types/transaction";
import { redirect } from "next/navigation";

export async function getProfile() {
  const res = await fetcherPrivate("/v1/user/profile");

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, data: null };
  }

  const data: UserProfile = await res.json();
  return { success: true, data };
}

export async function getTransactions(page: number = 1) {
  const res = await fetcherPrivate(
    `/v1/payments/get-recharge-logs?page=${page}&limit=10`,
  );

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    return { success: false, data: null };
  }

  const data: TransactionsResponse = await res.json();
  console.log({ data });
  return { success: true, data };
}

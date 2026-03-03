import "server-only";

import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { UserProfile } from "@/types/profile";
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

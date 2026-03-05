"use server";

import {
  changePasswordSchema,
  ChangePasswordState,
} from "@/components/profile/user-details/change-password/change-password.schema";
import { AUTH_CONFIG } from "@/lib/constants";
import { fetcherPrivate } from "@/lib/fetcher";
import { UserProfile } from "@/types/profile";
import { TransactionsResponse } from "@/types/transaction";
import { redirect } from "next/navigation";
import z from "zod";

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
  return { success: true, data };
}

export async function changePassword(
  _prevState: ChangePasswordState,
  formData: FormData,
) {
  const raw = {
    oldPassword: formData.get("old_password"),
    newPassword: formData.get("new_password"),
    accountPin: formData.get("account_pin"),
  };

  const parsed = changePasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { success: false, error: z.flattenError(parsed.error).fieldErrors };
  }

  const res = await fetcherPrivate("/v1/auth/change-password", {
    method: "POST",
    body: JSON.stringify({
      old_password: raw.oldPassword,
      new_password: raw.newPassword,
      pincode: raw.accountPin,
    }),
  });

  if (!res.ok) {
    if (res.status === 401) {
      redirect(AUTH_CONFIG.loginPath);
    }

    const error = await res.json().catch(() => null);
    return {
      success: false,
      error: error?.error ?? "Failed to change password.",
    };
  }

  return { success: true };
}

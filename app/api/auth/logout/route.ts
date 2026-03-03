import { logout as apiLogout } from "@/lib/auth/api.auth";
import { hashToken } from "@/lib/auth/utils.auth";
import { AUTH_CONFIG } from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST() {
  const cookieStore = await cookies();
  const token = cookieStore.get(AUTH_CONFIG.cookieName)?.value;

  if (token) {
    await apiLogout(token);

    const tokenHash = await hashToken(token);
    revalidateTag(`session:${tokenHash}`, {});
  }

  cookieStore.delete(AUTH_CONFIG.cookieName);

  return NextResponse.json({ success: true });
}

"use server";

import { cookies } from "next/headers";
import { CartItem } from "./types.cart";

const CART_COOKIE_KEY = process.env.NEXT_PUBLIC_CART_COOKIE_KEY ?? "gs_cart";

/**
 * Server-side: read cart from cookies using `next/headers`.
 * Only call this from Server Components or server actions.
 */
export async function getCartFromCookiesServer(): Promise<CartItem[]> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(CART_COOKIE_KEY)?.value;

  if (!raw) return [];

  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

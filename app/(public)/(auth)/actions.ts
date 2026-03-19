"use server";

import { login as apiLogin } from "@/lib/auth/api.auth";
import { parseSetCookie } from "@/lib/auth/utils.auth";
import { AUTH_CONFIG } from "@/lib/constants";
import {
  ForgotPasswordPayload,
  forgotPasswordSchema,
  LoginPayload,
  loginSchema,
  RegisterPayload,
  registerSchema,
} from "@/lib/validations/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import z, { ZodFlattenedError } from "zod";

export type LoginState = {
  error?: string | ZodFlattenedError<LoginPayload>["fieldErrors"];
  success?: boolean;
};

/**
 * Handles user login by processing form data, validating credentials, and setting authentication cookies.
 *
 * @param _prevState - The previous login state (unused, required by server action signature)
 * @param formData - Form data containing username, password, and rememberMe flag
 * @returns A promise that resolves to a LoginState object containing either an error or redirects on success
 * @throws Redirects to the default auth redirect path on successful login
 *
 * @remarks
 * - Validates form input against the loginSchema
 * - Calls the apiLogin function to authenticate credentials
 * - Sets secure HTTP-only cookies with appropriate SameSite policy
 * - Automatically redirects on successful authentication
 *
 * @example
 * ```typescript
 * const result = await loginAction(prevState, formData);
 * if (result.error) {
 *   // Handle validation or login errors
 * }
 * ```
 */
export async function loginAction(
  _prevState: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const raw = {
    username: formData.get("username"),
    password: formData.get("password"),
  };

  const parsed = loginSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: z.flattenError(parsed.error).fieldErrors };
  }

  const result = await apiLogin(parsed.data);

  if (!result.success || !result.setCookieHeader) {
    return { error: result.error ?? "Login failed. Please try again" };
  }

  const cookieStore = await cookies();
  const parsedCookie = parseSetCookie(result.setCookieHeader);

  if (parsedCookie) {
    cookieStore.set(AUTH_CONFIG.cookieName, parsedCookie.value, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: parsedCookie.maxAge ?? 60 * 60 * 24 * 7,
      ...(parsedCookie.domain && { domain: parsedCookie.domain }),
    });
  }

  redirect(AUTH_CONFIG.defaultRedirect);
}

/* ── Registration availability checks ─────────────── */

export async function checkUsernameAvailability(
  username: string,
): Promise<{ available: boolean; error?: string }> {
  try {
    const res = await fetch(`${AUTH_CONFIG.apiUrl}/v1/auth/validate-username`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username }),
    });
    const data = await res.json();
    return { available: data, error: data.error };
  } catch {
    return { available: false, error: "Unable to verify username" };
  }
}

/* ── Register action ──────────────────────────────── */

export type RegisterState = {
  error?: string;
  success?: boolean;
};

export async function registerAction(
  _prevState: RegisterState,
  payload: RegisterPayload,
): Promise<RegisterState> {
  const parsed = registerSchema.safeParse(payload);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
    return { error: firstError };
  }

  try {
    const res = await fetch(`${AUTH_CONFIG.apiUrl}/v1/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });

    const data = await res.json();

    if (!res.ok) {
      return { error: data.error ?? data.message ?? "Registration failed" };
    }

    return { success: true };
  } catch {
    return { error: "Unable to connect to the server. Please try again." };
  }
}

/* ── Forgot Password action ──────────────────────── */

export type ForgotPasswordState = {
  error?: string | z.ZodFlattenedError<ForgotPasswordPayload>["fieldErrors"];
  success?: boolean;
};

export async function forgotPasswordAction(
  _prevState: ForgotPasswordState,
  formData: FormData,
): Promise<ForgotPasswordState> {
  const raw = {
    username: formData.get("username"),
    email: formData.get("email"),
  };

  const parsed = forgotPasswordSchema.safeParse(raw);

  if (!parsed.success) {
    return { error: z.flattenError(parsed.error).fieldErrors };
  }

  try {
    await fetch(`${AUTH_CONFIG.apiUrl}/v1/auth/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed.data),
    });
  } catch {
    // Silently swallow — always return success to avoid leaking account info
  }

  return { success: true };
}

export async function checkEmailAvailability(
  email: string,
): Promise<{ available: boolean; error?: string }> {
  try {
    const res = await fetch(`${AUTH_CONFIG.apiUrl}/v1/auth/validate-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return { available: data, error: data.error };
  } catch {
    return { available: false, error: "Unable to verify email" };
  }
}

"use server";

import { login as apiLogin } from "@/lib/auth/api.auth";
import { parseSetCookie } from "@/lib/auth/utils.auth";
import { AUTH_CONFIG } from "@/lib/constants";
import { LoginPayload, loginSchema } from "@/lib/validations/auth";
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

  console.log({ parsed });

  if (!parsed.success) {
    return { error: z.flattenError(parsed.error).fieldErrors };
  }

  const result = await apiLogin(parsed.data);

  console.log({ result });

  if (!result.success || !result.setCookieHeader) {
    return { error: result.error ?? "Login failed. Please try again" };
  }

  const cookieStore = await cookies();
  const parsedCookie = parseSetCookie(result.setCookieHeader);

  console.log({ parsedCookie });

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

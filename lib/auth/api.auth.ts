import "server-only";
import { AUTH_CONFIG } from "../constants";
import { fetcherPrivate, fetcherPublic } from "../fetcher";
import { LoginPayload } from "../validations/auth";
import { hashToken } from "./utils.auth";

export type User = {
  user_num: number;
  user_email: string;
  user_name: string;
  user_role: "admin" | "player";
  web_points: number;
  mileage_points: number;
};

export type SessionPayload = {
  user: User;
  expires_at: string;
};

export type LoginCredentials = Omit<LoginPayload, "rememberMe">;

export type LoginResponse = {
  success: boolean;
  user?: User;
  error?: string;
};

/**
 * Validates an authentication token and returns the session payload if valid.
 *
 * @param token - The authentication token to validate
 * @returns A promise that resolves to the session payload if the token is valid and not expired,
 *          or null if the token is invalid, the validation request fails, or the token has expired.
 *          Errors during validation are logged and return null rather than throwing.
 *
 * @example
 * ```typescript
 * const session = await validateToken(myToken);
 * if (session) {
 *   console.log("Token is valid, user:", session);
 * } else {
 *   console.log("Token is invalid or expired");
 * }
 * ```
 */
export async function validateToken(
  token: string,
): Promise<SessionPayload | null> {
  try {
    const tokenHash = await hashToken(token);

    const response = await fetcherPrivate("/v1/auth/validate", {
      next: {
        revalidate: AUTH_CONFIG.sessionCacheTtl,
        tags: [`session:${tokenHash}`],
      },
    });

    if (!response.ok) return null;

    const data: SessionPayload = await response.json();

    if (new Date(data.expires_at) < new Date()) return null;

    return data;
  } catch (error) {
    console.error("[auth-api] Token validation failed:", error);
    return null;
  }
}

/**
 * Authenticates a user with the provided credentials.
 * @param credentials - The login credentials containing username/email and password
 * @returns A promise that resolves to a login response with optional set-cookie header
 * @returns Returns an object with `success: true` and `user` data on successful authentication
 * @returns Returns an object with `success: false` and an `error` message on failure
 * @throws Does not throw; errors are caught and returned in the response object
 * @example
 * const response = await login({ username: "user@example.com", password: "password" });
 * if (response.success) {
 *   console.log("Logged in as:", response.user);
 * } else {
 *   console.error("Login failed:", response.error);
 * }
 */
export async function login(
  credentials: LoginCredentials,
): Promise<LoginResponse & { setCookieHeader?: string }> {
  try {
    const response = await fetcherPublic("/v1/auth/authenticate", {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(credentials),
      cache: "no-store",
    });

    const setCookieHeader = response.headers.get("set-cookie");

    if (!response.ok) {
      const body = await response.json().catch(() => {});
      return {
        success: false,
        error: body.error ?? `Login failed`,
      };
    }

    const data: User = await response.json();

    return {
      success: true,
      user: data,
      setCookieHeader: setCookieHeader ?? undefined,
    };
  } catch (error) {
    console.error("[auth-api] Login request failed:", error);
    return { success: false, error: "Network error - please try again." };
  }
}

/**
 * Logs out the user by sending a logout request to the authentication server.
 * @param token - The authentication token to be included in the logout request cookie.
 * @returns A promise that resolves when the logout request completes.
 * @throws Logs errors to console if the logout request fails, but does not throw.
 */
export async function logout(): Promise<void> {
  try {
    await fetcherPrivate("/v1/auth/logout", {
      method: "POST",
      cache: "no-store",
    });
  } catch (error) {
    console.error("[auth-api] Logout request failed:", error);
  }
}

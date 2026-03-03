type ParsedCookie = {
  value: string;
  maxAge?: number;
  domain?: string;
};

export function parseSetCookie(header: string): ParsedCookie | null {
  const parts = header.split(";").map((p) => p.trim());
  const [nameValue] = parts;

  if (!nameValue) return null;

  const eqIndex = nameValue.indexOf("=");
  if (eqIndex === -1) return null;

  const value = nameValue.substring(eqIndex + 1);

  let maxAge: number | undefined;
  let domain: string | undefined;

  for (const part of parts.slice(1)) {
    const lower = part.toLowerCase();
    if (lower.startsWith("max-age=")) {
      maxAge = parseInt(part.split("=")[1], 10);
    } else if (lower.startsWith("domain=")) {
      domain = part.split("=")[1];
    }
  }

  return { value, maxAge, domain };
}

/**
 * Generates a SHA-256 hash of a token and returns the first 16 hexadecimal characters.
 *
 * @param token - The token string to hash
 * @returns A promise that resolves to the first 8 bytes of the SHA-256 hash as a hex string (16 characters)
 *
 * @example
 * const hash = await hashToken("my-secret-token");
 * // Returns something like: "a1b2c3d4e5f6g7h8"
 */
export async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray
    .slice(0, 8)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

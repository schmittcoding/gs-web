export function fetcherPublic(url: string, init?: RequestInit) {
  return fetch(`${process.env.API_URL}${url}`, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...init?.headers,
    },
    signal: AbortSignal.timeout(30000),
    ...init,
  });
}

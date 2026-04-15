import { fetcherPublic } from "@/lib/fetcher";
import { DownloadItem } from "@/types/download";

type DownloadsResponse = {
  data: DownloadItem[];
};

export async function getClientDownloadLink(): Promise<string | null> {
  try {
    const res = await fetcherPublic("/v1/downloads?category=1&limit=1", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const json: DownloadsResponse = await res.json();
    return json.data?.[0]?.link ?? null;
  } catch {
    return null;
  }
}

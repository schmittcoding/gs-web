export type DownloadItem = {
  id: string; // UUID (e.g. "550e8400-e29b-41d4-a716-446655440000")
  provider: string;
  link: string;
  status: number; // u8 — 0 = inactive, 1 = active
  type: number; // i16 — download category/type discriminator
  version: string;
};

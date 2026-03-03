import { User } from "@/lib/auth/api.auth";

export type UserProfile = User & {
  created_at?: string;
  last_updated?: string;
  user_available: number;
};
